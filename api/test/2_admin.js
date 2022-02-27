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

after(() => {
  process.exit();
});

describe("Admin", () => {
  it("register Admin", async () => {
    const response = await fetch(`${api}/auth/register/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { status } = response;
    expect(status).to.be.equal(200);
  });
  it("Login as Admin", async () => {
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockup.adminInput)
    });
    const { status } = response;
    const body = await response.json();
    token = body.token;
    expect(status).to.be.equal(200);
  });
});
