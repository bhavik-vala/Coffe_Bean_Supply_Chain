const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const morgan = require("morgan");
const uuid = require("uuid/v4");
const atob = require("atob");

const Client = require("./lib/Client");
const { REST_API_URL, ADMIN, PORT, HOST, MONGODB } = require("./config");
const {
  actors,
  actions,
  actorsNamespace,
  stages
} = require("../contract/constants");
const { getState, getBean, getBeans, getUser } = require("./services/state");
const authentication = require("./controller/authentication");

const app = express();
mongoose.connect(MONGODB, {
  useNewUrlParser: true
});
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
//Logger
if (process.env.NODE_ENV === "production")
  app.use(
    morgan(function(tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms"
      ].join(" ");
    })
  );

app.get("/", (req, res) => {
  res.json({
    success: true
  });
});

app.all("/api/*", authentication.validate);

app.post("/auth/login", async (req, res) => {
  const { mail, password } = req.body;
  authentication
    .token(mail, password)
    .then(response => {
      res.json(response);
    })
    .catch(message => {
      res.status(401).json({ message });
    });
});

app.get("/auth/register/admin", (req, res) => {
  authentication
    .register(ADMIN)
    .then(result => authentication.getUser(ADMIN.mail))
    .then(dbResponse => {
      const { id, name, actor, mail, privateKey } = dbResponse;
      const client = new Client(privateKey);
      return client.submit(
        {
          action: actions.REGISTER_USER,
          data: {
            actor: actors.ADMIN,
            user: {
              id,
              name,
              mail,
              actor
            }
          }
        },
        res
      );
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

app.post("/auth/register/user", async (req, res) => {
  const { body } = req;
  authentication
    .register(body)
    .then(response => {
      res.json({
        data: response
      });
    })
    .catch(message => {
      console.error(message);
      res.status(401).json({ message });
    });
});

app.post("/track/:beanId", async (req, res) => {
  const { beanId } = req.params;
  const adminResponse = await authentication.getUser(ADMIN.mail);
  const { privateKey, actor } = adminResponse;
  const client = new Client(privateKey);
  // Register User into the chain
  await client.submit(
    {
      action: actions.TRACK_BEANS,
      data: {
        actor,
        bean: {
          id: beanId
        },
        data: req.body
      }
    },
    res
  );
});

/**
 * Add /api to make in autheorized only
 */
app.get("/users", (req, res) => {
  authentication.getUsers().then(users => res.json(users));
});

app.post("/approve/user/:mail", async (req, res) => {
  const { mail } = req.params;
  let userResponse;
  let adminResponse;
  userResponse = await authentication.approveUser(mail);
  if (!userResponse) {
    return res.status(404).json({ message: "Not found" });
  }
  adminResponse = await authentication.getUser(ADMIN.mail);
  // Open Client with Admin Access
  const { privateKey, actor } = adminResponse;
  const client = new Client(privateKey);
  // Register User into the chain
  await client.submit(
    {
      action: actions.REGISTER_USER,
      data: {
        actor,
        user: userResponse
      }
    },
    res
  );
});

app.post("/reset/password", async (req, res) => {
  const { mail = ADMIN.mail, password = "password" } = req.body;
  const userResponse = await authentication.resetUser(mail, password);
  res.json({ message: `reseted password is '${password}'` });
});

/**
 * Create Bean
 */
app.post("/api/bean/create", async (req, res) => {
  const { privateKey, actor } = req.user;
  if (actor != actors.FARMER) {
    return res
      .status(401)
      .json({ message: `Access Denied. required ${actors.FARMER}` });
  }
  const id = uuid();
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.HARVEST,
      data: {
        bean: {
          id,
          ...req.body
        },
        actor
      }
    },
    res
  );
});

/**
 * Certify Beans
 */
app.post("/api/bean/:beanId/certify", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId } = req.params;
  if (actor != actors.CERTIFICATE_AUTHORITY) {
    return res.status(401).json({
      message: `Access Denied. required ${actors.CERTIFICATE_AUTHORITY}`
    });
  }
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.CERTIFY_BEANS,
      data: {
        bean: {
          id: beanId
        },
        data: req.body,
        actor
      }
    },
    res
  );
});

/**
 * Transport Beans to Processor
 */
app.post("/api/bean/ship/:beanId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId } = req.params;
  if (actor != actors.FARMER) {
    return res
      .status(401)
      .json({ message: `Access Denied. required ${actors.FARMER}` });
  }
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.SHIP_TO_WAREHOUSE,
      processor: req.body,
      data: {
        bean: {
          id: beanId
        },
        data: req.body,
        actor
      }
    },
    res
  );
});

/**
 * Transport to warehouse
 */
app.post("/api/bean/receive/:beanId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId } = req.params;
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.RECEIVE_SHIPMENT,
      processor: req.body,
      data: {
        bean: {
          id: beanId
        },
        data: req.body,
        actor
      }
    },
    res
  );
});

/**
 * Transport to warehouse
 */
app.post("/api/bean/roast/:beanId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId } = req.params;
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.SEND_FOR_ROASTING,
      processor: req.body,
      data: {
        bean: {
          id: beanId
        },
        data: req.body,
        actor
      }
    },
    res
  );
});

/**
 * Transport to warehouse
 */
app.post("/api/bean/package/:beanId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId } = req.params;
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.ROASTING_DONE,
      processor: req.body,
      data: {
        bean: {
          id: beanId
        },
        data: req.body,
        actor
      }
    },
    res
  );
});

/**
 * Send to WholeSaler
 */
app.post("/api/bean/:beanId/wholesaler/:userId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId, userId } = req.params;
  const user = await authentication.getUser(userId);
  if (actor != actors.FARMER) {
    return res
      .status(401)
      .json({ message: `Access Denied. required ${actors.FARMER}` });
  }
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.SEND_TO_WHOLESALER,
      data: {
        user,
        bean: {
          id: beanId
        },
        actor
      }
    },
    res
  );
});

/**
 * Send to WholeSaler
 */
app.post("/api/bean/:beanId/distributor/:userId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId, userId } = req.params;
  const user = await authentication.getUser(userId);

  if (actor != actors.WHOLESALER) {
    return res
      .status(401)
      .json({ message: `Access Denied. required ${actors.WHOLESALER}` });
  }
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.SEND_TO_DISTRIBUTOR,
      data: {
        user,
        bean: {
          id: beanId
        },
        actor
      }
    },
    res
  );
});

/**
 * Send to Reailer
 */
app.post("/api/bean/:beanId/retailer/:userId", async (req, res) => {
  const { privateKey, actor } = req.user;
  const { beanId, userId } = req.params;
  const user = await authentication.getUser(userId);

  if (actor != actors.DISTRIBUTOR) {
    return res
      .status(401)
      .json({ message: `Access Denied. required ${actors.DISTRIBUTOR}` });
  }
  const client = new Client(privateKey);
  // Harvest Beans by Farmer into the chain
  await client.submit(
    {
      action: actions.SEND_TO_RETAILER,
      data: {
        user,
        bean: {
          id: beanId
        },
        actor
      }
    },
    res
  );
});

app.get("/state", async (req, res) => {
  const response = await getState(req.query);
  res.json(response);
});

app.get("/state/bean/:id", async (req, res) => {
  const response = await getBean(req.params.id);
  res.json(response);
});

app.get("/state/beans", async (req, res) => {
  const response = await getBeans();
  res.json(response);
});

app.get("/namespace", (req, res) => {
  res.json(actorsNamespace);
});

app.get("/actors", (req, res) => {
  res.json(
    Object.keys(actorsNamespace).filter(
      key => key != actors.BEAN && key != actors.ADMIN
    )
  );
});

app.get("/stages", (req, res) => {
  res.json(stages);
});

app.post("/api/submit", async (req, res) => {
  // const client = new Client("admin");
  // await client.submit(req.body, res);
});

app.listen(PORT, HOST, () => {
  console.log("Server listening at 8080");
});

module.exports = `http://${HOST}:${PORT}`;
