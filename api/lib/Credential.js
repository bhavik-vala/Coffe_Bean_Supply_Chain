const config = require("../config");
const path = require("path");
const { createContext, CryptoFactory } = require("sawtooth-sdk/signing");
const fs = require("fs");

const Credential = () => {
  const context = createContext("secp256k1");
  const privateKey = context.newRandomPrivateKey();
  const output = privateKey.asHex();
  // if (writeOutput) {
  //   fs.writeFileSync(
  //     path.join(config.KEY_LOCATION, `${keyName}.priv`),
  //     output,
  //     err => {
  //       if (err) {
  //         return console.error(err);
  //       }
  //     }
  //   );
  //   // Return Private Key Bytes
  //   return privateKey.privateKeyBytes;
  // } else {
  // Return Private Key Hex
  return output;
  // }
};

module.exports = Credential;
