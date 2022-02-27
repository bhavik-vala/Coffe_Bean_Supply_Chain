const crypto = require("crypto");
const { InvalidTransaction } = require("sawtooth-sdk/processor/exceptions");
const fs = require("fs");
const { FAMILY_NAMESPACE, actors, actorsNamespace } = require("./constants");

const encodePayload = value =>
  value ? Buffer.from(new String(JSON.stringify(value))) : null;

module.exports = {
  encodePayload,
  toInvalidTransaction: err => {
    throw new InvalidTransaction(err.message ? err.message : err);
  },
  getActorAddress: (input, actor) => {
    const idAddress = crypto
      .createHash("sha512")
      .update(input)
      .digest("hex")
      .toLowerCase()
      .slice(0, 60);
    // 6 + 4 + 60 = 70
    return `${actorsNamespace[actor]}${idAddress}`;
  },
  setEntry: (context, address, newStateValue) => {
    console.log(newStateValue);
    const entries = {
      [address]: encodePayload(newStateValue)
    };
    return context.setState(entries);
  },
  decodePayload: buffer => {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(buffer.toString()));
      } catch (error) {
        reject(error);
      }
    });
  }
};
