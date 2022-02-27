// Utils
const crypto = require("crypto");

const leafHash = (x, length = 64) =>
  crypto
    .createHash("sha512")
    .update(x)
    .digest("hex")
    .toLowerCase()
    .substring(0, length);

// Constants
const FAMILY_NAME = process.env.FAMILY_NAME || "bean-famiy";
const FAMILY_NAMESPACE = leafHash(FAMILY_NAME).substring(0, 6);
const FAMILY_VERSION = process.env.FAMILY_VERSION || "1.0";

// Actions
const stages = {
  HARVEST: "harvest",
  CERTIFICATE: "certificate",
  SHIPPING: "shipping",
  WAREHOUSE: "warehouse",
  ROASTING: "roasting",
  PACKAGING: "packaging",
  WHOLESALER: "wholesaler",
  DISTRIBUTOR: "distributor",
  RETAILER: "retailer"
};

const actors = {
  ADMIN: "ADMIN",
  FARMER: "FARMER",
  BEAN: "BEAN",
  CERTIFICATE_AUTHORITY: "CERTIFICATE_AUTHORITY",
  WHOLESALER: "WHOLESALER",
  DISTRIBUTOR: "DISTRIBUTOR",
  RETAILER: "RETAILER",
};

const actorsNamespace = {};
Object.keys(actors).forEach(key => {
  actorsNamespace[key] = `${FAMILY_NAMESPACE}${leafHash(key, 4)}`;
});

const actions = {
  REGISTER_USER: "REGISTER_USER",
  REGISTER_ADMIN: "REGISTER_ADMIN",
  TRACK_BEANS: "TRACK_BEANS",
  HARVEST: "HARVEST",
  CERTIFY_BEANS: "CERTIFY_BEANS",
  SHIP_TO_WAREHOUSE: "SHIP_TO_WAREHOUSE",
  RECEIVE_SHIPMENT: "RECEIVE_SHIPMENT",
  ROASTING_DONE: "ROASTING_DONE",
  PACKAGE: "PACKAGE",
  SEND_FOR_ROASTING: "SEND_FOR_ROASTING",
  DO_PACKAGING: "DO_PACKAGING",
  TRANSPORT_TO_WAREHOUSE: "TRANSPORT_TO_WAREHOUSE",
  SEND_TO_WHOLESALER: "SEND_TO_WHOLESALER",
  SEND_TO_DISTRIBUTOR: "SEND_TO_DISTRIBUTOR",
  SEND_TO_RETAILER: "SEND_TO_RETAILER",
  ADD_BRANDING: "ADD_BRANDING"
};

const errors = {
  NO_ID_GIVEN: "ID is not supplied in request payload",
  NO_ACTOR_GIVEN: "Actor is not supplied in request payload",
  EXISTING: "ID is already been taken",
  NOT_EXIST: "ID is not registered",
  USER_DOES_NOT_EXIST: "User is not registered on platform",
  PROCESSOR_DATA_MISSING: "Processor details missing",
  DISTRIBUTOR_DATA_MISSING: "Distributor details missing",
  WHOLESALER_DATA_MISSING: "Wholesaler details missing",
  WAREHOUSE_DATA_MISSING: "Warehouse details missing",
  ALREADY_REGISTERED: "User already registered",
  ACCESS_DENIED: "Access Denied for action",
  NOT_SHIPPING: "Not in shipping stage",
  INVALID_ACTOR: "Invalid Actor for the action"
};

module.exports = {
  FAMILY_NAME,
  FAMILY_NAMESPACE,
  FAMILY_VERSION,
  FAMILY_NAMESPACES: [FAMILY_NAMESPACE],
  FAMILY_VERSIONS: [FAMILY_VERSION],
  BEAN_NAMESPACE: 9999,
  stages,
  actors,
  actorsNamespace,
  actions,
  errors
};
