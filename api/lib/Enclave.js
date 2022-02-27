const { createHash, randomBytes } = require("crypto");
const secp256k1 = require("secp256k1/elliptic");

const createPrivateKey = () => {
  let privateKey;
  do {
    privateKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));
  return privateKey;
};

const Enclave = privateKeyArg => {
  const privateKey = privateKeyArg || createPrivateKey();
  const publicKey = secp256k1.publicKeyCreate(privateKey);
  return {
    privateKey,
    publicKey,
    publicKeyString: publicKey.toString("hex"),
    sign(data) {
      const dataHash = createHash("sha256")
        .update(data)
        .digest();
      const result = secp256k1.sign(dataHash, privateKey);
      return result.signature;
    },
    verify: secp256k1.verify
  };
};

module.exports = Enclave;
