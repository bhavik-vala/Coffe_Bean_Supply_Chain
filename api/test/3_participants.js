const { expect } = require("chai");
const fetch = require("node-fetch");
const api = require("../index");
const {
  farmerInput,
  wholeInput,
  distInput,
  caInput,
  retailerInput
} = require("./mockup");

before(done => {
  setTimeout(async () => {
    const response = await fetch(api);
    if (response.status === 200) {
      done();
    }
  }, 1000);
});

after(() => {
  process.exit();
});

describe("Farmer", () => {
  it("register Farmer", async () => {
    const response = await fetch(`${api}/auth/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(farmerInput)
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("approve Farmer", async () => {
    const response = await fetch(
      `${api}/api/approve/user/${farmerInput.mail}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token }
      }
    );
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});

describe("Certificate Authority", () => {
  it("register Certificate Authority", async () => {
    const response = await fetch(`${api}/auth/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(caInput)
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("approve Certificate Authority", async () => {
    const response = await fetch(`${api}/api/approve/user/${caInput.mail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});

describe("Distributor", () => {
  it("register Distributor", async () => {
    const response = await fetch(`${api}/auth/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(distInput)
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("approve Distributor", async () => {
    const response = await fetch(`${api}/api/approve/user/${distInput.mail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});

describe("Wholesaler", () => {
  it("register Wholesaler", async () => {
    const response = await fetch(`${api}/auth/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(wholeInput)
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("approve Wholesaler", async () => {
    const response = await fetch(`${api}/api/approve/user/${wholeInput.mail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});

describe("Retailer", () => {
  it("register Retailer", async () => {
    const response = await fetch(`${api}/auth/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(retailerInput)
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("approve Retailer", async () => {
    const response = await fetch(`${api}/api/approve/user/${retailerInput.mail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
});
