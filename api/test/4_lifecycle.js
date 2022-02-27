const { expect } = require("chai");
const fetch = require("node-fetch");
const api = require("../index");
const mockup = require("./mockup");

before(done => {
  setTimeout(async () => {
    const response = await fetch(api);
    if (response.status === 200) {
      done();
    }
  }, 1000);
});
let bean;
let token;

after(() => {
  console.log(bean);
  process.exit();
});

const login = async input => {
  const response = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  const { status } = response;
  const body = await response.json();
  token = body.token;
  expect(status).to.be.equal(200);
};
exports.login = login;

describe("Beans Harvest", () => {
  it("Harvest", async () => {
    await login(mockup.farmerInput);
    const response = await fetch(`${api}/api/bean/create`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.harvestInput)
    });
    const body = await response.json();
    const { data } = body;
    bean = data.bean;
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});

describe("Beans Certify", () => {
  it("Certify", async () => {
    await login(mockup.caInput);

    const response = await fetch(`${api}/api/bean/${bean.id}/certify`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.certifyInput)
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});

describe("Shipping Beans", () => {
  it("Send to Shipping", async () => {
    await login(mockup.farmerInput);
    const response = await fetch(`${api}/api/bean/ship/${bean.id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.shippingInput)
    });
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("Receive from Warehouse", async () => {
    const response = await fetch(`${api}/api/bean/receive/${bean.id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.shipmentReceivedInput)
    });
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("Send for Roasting ", async () => {
    const response = await fetch(`${api}/api/bean/roast/${bean.id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.roastingInput)
    });
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("Send for Packaging ", async () => {
    const response = await fetch(`${api}/api/bean/package/${bean.id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.packagingInput)
    });
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });

  it("Sell to Wholesaler", async () => {
    await login(mockup.farmerInput);
    const response = await fetch(
      `${api}/api/bean/${bean.id}/wholesaler/${mockup.wholeInput.mail}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("Sell to Distributor", async () => {
    await login(mockup.wholeInput);
    const response = await fetch(
      `${api}/api/bean/${bean.id}/distributor/${mockup.distInput.mail}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("Sell to Reailer", async () => {
    await login(mockup.distInput);
    const response = await fetch(
      `${api}/api/bean/${bean.id}/retailer/${mockup.retailerInput.mail}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );
    const body = await response.json();
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});
