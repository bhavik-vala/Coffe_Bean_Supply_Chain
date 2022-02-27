const { actors } = require("../../contract/constants");

exports.adminInput = {
  mail: "admin@domain.com",
  password: "admin",
  name: "admin",
  actor: actors.ADMIN,
  approved: true
};
exports.farmerInput = {
  mail: "farmer@domain.com",
  password: "farmer",
  name: "Michel",
  location: "LA New York",
  address: "Virginia, LA, New York",
  actor: actors.FARMER
};

exports.caInput = {
  mail: "ca@domain.com",
  password: "ca",
  name: "ca",
  actor: actors.CERTIFICATE_AUTHORITY
};

exports.distInput = {
  mail: "dist@domain.com",
  password: "dist",
  name: "dist",
  actor: actors.DISTRIBUTOR
};
exports.wholeInput = {
  mail: "whole@domain.com",
  password: "whole",
  name: "whole",
  actor: actors.WHOLESALER
};

exports.retailerInput = {
  mail: "retailer@domain.com",
  password: "retailer",
  name: "retailer",
  actor: actors.RETAILER
};

exports.harvestInput = {
  // farmerName: "Michel",
  // registrationNumber: "FARM1",
  // location: "LA New York",
  coffeeBeanType: "Cuppa",
  temperature: "20degree",
  humidity: "3%",
  on: "2018-02-13T04:51:49.070Z"
};

exports.certifyInput = {
  typeOfSeed: "Cuppa",
  coffeeBeanFamily: "Cuppa",
  fertilizerUsed: "PH PA",
  farmAddress: "Virginia, LA, New York",
  on: "2019-02-13T04:51:49.070Z"
};

exports.toProcessorInput = {
  location: "India",
  processorRegId: "1",
  info: "More info about processor"
};

exports.toWarehouseInput = {
  location: "India",
  processorRegId: "1",
  info: "More info about processor"
};

exports.trackInput = {
  lang: 0.0,
  lat: 2.3333,
  temp: -3
};

exports.shippingInput = {
  timeOfDeparture: "2018-02-13T04:51:49.070Z",
  estimatedTimeOfArrival: "2018-03-13T04:51:49.070Z",
  dispatchDetails: "DS DS Alpino"
};

exports.shipmentReceivedInput = {
  name: "Amul Global Warehouse",
  location: "LA New York",
  arrivalMode: "Truck",
  storageCondition: "COOL",
  on: "2018-02-13T04:51:49.070Z"
};

exports.roastingInput = {
  registrationNumber: "ROAST1"
};

exports.packagingInput = {
  roastingQuality: "GOOD",
  temperature: "20degree",
  typeOfSeed: "Cuppa",
  coffeeBeanFamily: "Cuppa",
  batchId: "1"
};
