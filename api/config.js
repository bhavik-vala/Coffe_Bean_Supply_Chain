const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const { actors } = require("../contract/constants");

const leafHash = x =>
  crypto
    .createHash("sha512")
    .update(x)
    .digest("hex")
    .toLowerCase()
    .substring(0, 64);

// const loadConfig = (defaultValue = {}) => {
//   try {
//     return require(process.env.CONFIG_PATH || "./config.json");
//   } catch (err) {
//     // Throw error on bad JSON, otherwise ignore
//     if (err instanceof SyntaxError) throw err;
//     return {};
//   }
// };

// const config = loadConfig();

// Constants
const FAMILY_NAME = process.env.FAMILY_NAME || "bean-famiy";
const FAMILY_NAMESPACE = leafHash(FAMILY_NAME).substring(0, 6);
const FAMILY_VERSION = process.env.FAMILY_VERSION || "1.0";
const KEY_LOCATION =
  process.env.KEY_LOCATION || path.join(__dirname, "../keys");
const REST_API_URL = process.env.REST_API_URL || "http://localhost:8008";
const MONGODB_HOST = process.env.MONGODB_HOST || "localhost";
const MONGODB_PORT = process.env.MONGODB_PORT || "27017";

const exists = fs.existsSync(KEY_LOCATION);

if (!exists) {
  fs.mkdirSync(KEY_LOCATION);
}

module.exports = {
  FAMILY_NAME,
  FAMILY_NAMESPACE,
  FAMILY_VERSION,
  KEY_LOCATION,
  REST_API_URL,
  BEAN_TRACKING: "BEAN_TRACKING",
  MONGODB: `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/bean_supply_chain`,
  PORT: 8080,
  HOST: "0.0.0.0",
  ADMIN: {
    mail: "admin@domain.com",
    password: "admin",
    name: "admin",
    actor: actors.ADMIN,
    approved: true
  }
};
