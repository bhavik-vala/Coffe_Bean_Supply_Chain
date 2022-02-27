const { TransactionProcessor } = require("sawtooth-sdk/processor");
const BeanHandler = require("./bean_handler");

// In docker, the address would be the validator's container name
// with port 4004
const address = process.env.VALIDATOR_URL || "tcp://127.0.0.1:4004";
const transactionProcessor = new TransactionProcessor(address);

transactionProcessor.addHandler(new BeanHandler());

transactionProcessor.start();
