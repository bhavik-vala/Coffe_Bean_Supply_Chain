const { createHash } = require("crypto");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const config = require("../config");
const Credential = require("./Credential");
const { getUser } = require("../controller/authentication");

const leafHash = (input, length) =>
  createHash("sha512")
    .update(input)
    .digest("hex")
    .toLowerCase()
    .slice(0, length);

const getState = address => {
  return fetch(`${config.REST_API_URL}/state?address=${address}`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(data =>
      data.data.map(obj => {
        obj.data = JSON.parse(Buffer.from(obj.data, "base64").toString());
        return obj;
      })
    );
};

module.exports = {
  leafHash,
  getState,
  hash: (input, length) =>
    createHash("sha512")
      .update(input)
      .digest("hex")
      .toLowerCase()
      .slice(0, length),
  getUserPriKey: mail => {
    return getUser(mail);
    // var userprivkeyfile = path.join(pathDir, `${userid}.priv`);
    // const exists = fs.existsSync(userprivkeyfile);
    // if (exists) {
    //   try {
    //     const output = fs.readFileSync(userprivkeyfile);
    //     return Buffer.from(output.toString(), "hex");
    //   } catch (error) {
    //     return Credential();
    //   }
    // } else {
    // }
  }
};
