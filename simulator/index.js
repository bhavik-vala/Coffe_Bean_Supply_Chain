const {
  BEAN_TRACKING,
  POST_TRACK_API,
  TIMEOUT,
  GET_BEANS
} = require("./config");

const request = require("request");
const faker = require("faker");

const SHIPPED = [];
let beansData = [];

const track = () => {
  beansData.forEach(obj => {
    const storeData = {
      temperature: faker.random.number(30),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude()
    };
    request(
      POST_TRACK_API(obj.id),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(storeData)
      },
      (err, response) => {
        if (!err) console.debug(`${obj.id} tracked`);
      }
    );
  });
};

const getBeans = () => {
  request(
    GET_BEANS,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    },
    (err, response) => {
      if (!err && response.body) {
        let { body } = response;
        body = JSON.parse(body);
        beansData = body
          .map(obj => {
            const { data, address } = obj;
            return data;
          })
          .filter(data => data["stage"] == "shipping");
      }
    }
  );
};

const start = () => {
  getBeans();
  setTimeout(() => {
    setInterval(getBeans, 30000);
    setInterval(track, 5000);
  }, 5000);
};

start();

process.on("error", err => console.error(err));
