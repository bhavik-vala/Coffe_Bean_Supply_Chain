//Import's
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");
const crypto = require("crypto");
const secp256k1 = require("secp256k1/elliptic");

const { actors } = require("../../contract/constants");
const Credential = require("../lib/Credential");

const cryptoSecret = "secret";

//Schema
const { UserSchema } = require("../models");

//Models
const User = mongoose.model("registerUser", UserSchema, "User");

//Token
const token = (mail, password) => {
  password = crypto
    .createHmac("sha256", cryptoSecret)
    .update(password)
    .digest("hex");
  const sessionKey = uuid();
  const sessionCreatedOn = new Date();
  const data = {
    sessionKey,
    sessionCreatedOn
  };

  return User.findOneAndUpdate(
    {
      mail: mail,
      password: password
    },
    { $set: data },
    { new: true }
  )
    .exec()
    .then(result => {
      if (!result || result.mail != mail) {
        throw Error("User credentials not valid");
      }
      let payload = {
        name: result.name,
        mail: result.mail,
        privateKey: result.privateKey,
        sessionKey: sessionKey,
        actor: result.actor
      };
      let token = jwt.sign(payload, cryptoSecret);
      return { token, user: payload };
    });
};

const getUser = mail => {
  return User.findOne({ mail })
    .lean()
    .exec();
};

const getUsers = () => {
  return User.find()
    .lean()
    .exec();
};

const approveUser = mail => {
  const data = { approved: true };
  return User.findOneAndUpdate({ mail }, { $set: data }, { new: true })
    .lean()
    .select("-privateKey -password -_id -__v -sessionKey -sessionCreatedOn")
    .exec();
};

const resetUser = (mail, password) => {
  const data = {
    password: crypto
      .createHmac("sha256", cryptoSecret)
      .update(password)
      .digest("hex")
  };
  return User.findOneAndUpdate({ mail }, { $set: data }, { new: true })
    .lean()
    .select("-privateKey -password -_id -__v -sessionKey -sessionCreatedOn")
    .exec();
};

//Register User
const register = async data => {
  const { name, mail, password, actor, approved = false } = data;
  if (!actors[actor]) {
    throw Error(`${actor} not found`);
  }

  const dbRecord = await User.findOne({ mail })
    .lean()
    .exec();
  if (dbRecord) {
    throw Error(`Already exists`);
  }

  const privateKey = Credential();
  const publicKey = secp256k1
    .publicKeyCreate(Buffer.from(privateKey, "hex"))
    .toString("hex");

  const user = {
    id: publicKey,
    mail,
    name,
    actor,
    privateKey,
    //Encrypt Password
    password: crypto
      .createHmac("sha256", cryptoSecret)
      .update(password)
      .digest("hex")
  };

  const stored = await new User(user).save();
  return stored;
};

// Find and update password
const update = (req, res, next) => {
  //To Filter
  let filter = {
    mail: req.body.mail,
    password: crypto
      .createHmac("sha256", cryptoSecret)
      .update(req.body.password)
      .digest("hex")
  };
  //To Update
  let data = {
    password: crypto
      .createHmac("sha256", cryptoSecret)
      .update(req.body.newPassword)
      .digest("hex")
  };
  User.findOneAndUpdate(
    filter,
    { $set: data },
    {
      new: true
    }
  ).exec();
};

//Validate User
const validate = (req, res, next) => {
  // check header or url parameters or post parameters for token
  let token = req.headers["authorization"] || "";
  // verifies secret and checks exp
  jwt.verify(token, cryptoSecret, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failed to authenticate token."
      });
    } else {
      // if everything is good, save to request for use in other routes
      req.user = decoded;
      next();
    }
  });
};

//Exports Public Methods
module.exports = {
  token,
  update,
  validate,
  getUser,
  getUsers,
  approveUser,
  register,
  resetUser
};
