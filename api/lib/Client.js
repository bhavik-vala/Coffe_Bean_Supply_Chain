const { CryptoFactory, createContext } = require("sawtooth-sdk/signing");
const { protobuf } = require("sawtooth-sdk");
const fetch = require("node-fetch");
const Enclave = require("./Enclave");
const utils = require("../../contract/utils");

const config = require("../config");
const { hash, getUserPriKey } = require("./Utils");
const { actors } = require("../../contract/constants");

class Client {
  constructor(privateKey) {
    const privateKeyStrBuf = Buffer.from(privateKey, "hex");
    this.enclave = Enclave(privateKeyStrBuf);
    this.publicKey = this.enclave.publicKey;
    this.address = config.FAMILY_NAMESPACE;
  }

  /**
   *
   * @param {*} payload
   * @param {*HttpResponse} res
   */
  async submit(payload, res) {
    payload.timestamp = new Date().toUTCString();
    const transaction = await this._wrapTransaction(payload);
    const transactions = [transaction];
    const batch = await this._wrapBatch(transactions);
    const batches = [batch];
    const batchListBytes = await this._wrapBatchList(batches);
    return this._postBatches(batchListBytes)
      .then(data => {
        return res.json({
          success: true,
          message: "Transaction Submitted",
          data: {
            ...data,
            ...payload.data
          }
        });
      })
      .catch(error => {
        console.error(error);
        return res.json({
          success: false,
          error
        });
      });
  }

  _wrapTransaction(payload) {
    return new Promise(resolve => {
      const addresses = [];
      const { data } = payload;
      const { user, bean, actor } = data;
      // Actor Address is the address of persion performing action
      if (user && user["id"] && user["actor"]) {
        addresses.push(utils.getActorAddress(user["id"], user["actor"]));
      }
      if (bean && bean["id"]) {
        addresses.push(utils.getActorAddress(bean["id"], actors.BEAN));
      }
      if (actor) {
        addresses.push(
          utils.getActorAddress(this.enclave.publicKeyString, actor)
        );
      }

      const inputAddressList = [this.address];
      const outputAddressList = addresses;
      const payloadBytes = Buffer.from(new String(JSON.stringify(payload)));
      console.info(
        `${config.FAMILY_NAME}-${config.FAMILY_VERSION}-${payload.timestamp}`
      );
      const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: config.FAMILY_NAME,
        familyVersion: config.FAMILY_VERSION,
        inputs: inputAddressList,
        outputs: outputAddressList,
        signerPublicKey: this.enclave.publicKeyString,
        nonce: `${Math.random()}`,
        batcherPublicKey: this.enclave.publicKeyString,
        dependencies: [],
        payloadSha512: hash(payloadBytes)
      }).finish();
      // Sign the batch header and create the batch
      const transactionSignature = this.enclave
        .sign(transactionHeaderBytes)
        .toString("hex");
      const transaction = protobuf.Transaction.create({
        header: transactionHeaderBytes,
        headerSignature: transactionSignature,
        payload: payloadBytes
      });
      resolve(transaction);
    });
  }

  _wrapBatch(transactions) {
    return new Promise(resolve => {
      // Batch the transactions and encode a batch header
      const batchHeaderBytes = protobuf.BatchHeader.encode({
        signerPublicKey: this.enclave.publicKeyString,
        transactionIds: transactions.map(txn =>
          txn.headerSignature.toString("hex")
        )
      }).finish();

      // Sign the batch header and create the batch
      const batchSignature = this.enclave
        .sign(batchHeaderBytes)
        .toString("hex");
      const batch = protobuf.Batch.create({
        header: batchHeaderBytes,
        headerSignature: batchSignature,
        transactions: transactions
      });
      resolve(batch);
    });
  }

  _wrapBatchList(batches) {
    return new Promise(resolve => {
      const batchListBytes = protobuf.BatchList.encode({
        batches
      }).finish();
      resolve(batchListBytes);
    });
  }

  _postBatches(batchListBytes) {
    return fetch(`${config.REST_API_URL}/batches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      body: batchListBytes
    }).then(response => response.json());
  }
}

module.exports = Client;
