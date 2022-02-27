// const { expect } = require("chai");
// const fetch = require("node-fetch");
// const { actors } = require("../../contract/constants");
// const api = require("../index");
// const { ADMIN, PORT, HOST } = require("../config");


// // Response stores
// let token = "";
// let bean = {};

// // 1. ARRANGE
// // 2. ACT
// // 3. ASSERT
// /**
//  * Start API before testing
//  */
// before(done => {
//   setTimeout(async () => {
//     const response = await fetch(api);
//     if (response.status === 200) {
//       done();
//     }
//   }, 1000);
// });

// after(() => {
//   console.log(bean);
//   process.exit();
// });

// // beforeEach(done => {
// //   setTimeout(() => {
// //     if (bean.id) trackBeans();
// //     done();
// //   }, 500);
// // });

// const trackBeans = async () => {
//   const response = await fetch(`${api}/track/${bean.id}`, {
//     method: "POST",
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(trackInput)
//   });
//   const body = await response.json();
//   const { status } = response;
//   expect(status).to.be.equal(200);
// };

// describe("Admin", () => {
//   it("register Admin", async () => {
//     const response = await fetch(`${api}/auth/register/admin`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
//   it("Login as Admin", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(ADMIN)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Farmer", () => {
//   it("register Farmer", async () => {
//     const response = await fetch(`${api}/auth/register/user`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(farmerInput)
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
//   it("approve Farmer", async () => {
//     const response = await fetch(
//       `${api}/api/approve/user/${farmerInput.mail}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: token }
//       }
//     );
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Certificate Authority", () => {
//   it("register Certificate Authority", async () => {
//     const response = await fetch(`${api}/auth/register/user`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(caInput)
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
//   it("approve Certificate Authority", async () => {
//     const response = await fetch(`${api}/api/approve/user/${caInput.mail}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: token }
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Distributor", () => {
//   it("register Distributor", async () => {
//     const response = await fetch(`${api}/auth/register/user`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(distInput)
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
//   it("approve Distributor", async () => {
//     const response = await fetch(`${api}/api/approve/user/${distInput.mail}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: token }
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Wholesaler", () => {
//   it("register Wholesaler", async () => {
//     const response = await fetch(`${api}/auth/register/user`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(wholeInput)
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
//   it("approve Wholesaler", async () => {
//     const response = await fetch(`${api}/api/approve/user/${wholeInput.mail}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: token }
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Beans Harvest", () => {
//   it("Login as Farmer", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(farmerInput)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
//   it("Harvest", async () => {
//     const response = await fetch(`${api}/api/bean/create`, {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(harvestInput)
//     });
//     const body = await response.json();
//     const { data } = body;
//     bean = data.bean;
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Beans Certify", () => {
//   it("Login as Certificate Authority", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(caInput)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
//   it("Certify", async () => {
//     const response = await fetch(`${api}/api/bean/${bean.id}/certify`, {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json"
//       }
//     });
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Beans transfer to Processor", () => {
//   it("Login as Farmer", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(farmerInput)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
//   it("Send to Processor", async () => {
//     const response = await fetch(`${api}/api/bean/${bean.id}/processor`, {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(toProcessorInput)
//     });
//     const body = await response.json();
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Beans transfer to Warehouse", () => {
//   it("Login as Farmer", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(farmerInput)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
//   it("Send to Warehouse", async () => {
//     const response = await fetch(`${api}/api/bean/${bean.id}/warehouse`, {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(toWarehouseInput)
//     });
//     const body = await response.json();
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Track Beans", () => {
//   it("Track Beans", async () => {
//     trackBeans();
//   });
// });

// describe("Sell Beans to Wholeseler", () => {
//   it("Login as Farmer", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(farmerInput)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
//   it("Sell to Wholeseler", async () => {
//     const response = await fetch(
//       `${api}/api/bean/${bean.id}/wholesaler/${wholeInput.mail}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json"
//         }
//       }
//     );
//     const body = await response.json();
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });

// describe("Sell Beans to Distributor", () => {
//   it("Login as Wholeseler", async () => {
//     const response = await fetch(`${api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(wholeInput)
//     });
//     const { status } = response;
//     const body = await response.json();
//     token = body.token;
//     expect(status).to.be.equal(200);
//   });
//   it("Sell to Distributor", async () => {
//     const response = await fetch(
//       `${api}/api/bean/${bean.id}/distributor/${distInput.mail}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json"
//         }
//       }
//     );
//     const body = await response.json();
//     const { status } = response;
//     expect(status).to.be.equal(200);
//   });
// });
