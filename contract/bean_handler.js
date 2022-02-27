const { TransactionHandler } = require("sawtooth-sdk/processor/handler");
const {
  actions,
  errors,
  stages,
  actors,
  FAMILY_NAME,
  FAMILY_NAMESPACES,
  FAMILY_VERSIONS
} = require("./constants");
const utils = require("./utils");

const registerUser = (context, transaction, userState, userAddress, user) => {
  if (userState && userState.length) {
    return utils.toInvalidTransaction(errors.ALREADY_REGISTERED);
  }
  return utils.setEntry(context, userAddress, {
    ...user, // Copy User Data to Store
    transaction
  });
};

class Handler extends TransactionHandler {
  constructor() {
    super(FAMILY_NAME, FAMILY_VERSIONS, FAMILY_NAMESPACES);
  }

  apply(transactionProcessRequest, context) {
    // Return Promise at End
    return utils
      .decodePayload(transactionProcessRequest.payload)
      .then(async payload => {
        console.debug(`Payload Received ${JSON.stringify(payload)}`);

        const { action, data, timestamp } = payload;
        const { signerPublicKey } = transactionProcessRequest.header;
        const { user, bean, actor } = data;

        let payloadData = data["data"] || {};

        let userAddress = "";
        let actorAddress = "";
        let beanAddress = "";

        let transaction = {};
        let addressValues = {};

        let userState = {};
        let beanState = {};
        let actorState = {};

        let stateFetchAddressList = [];

        let actorStateExists;
        let beanStateExists;
        let userStateExists;

        let actorStateValue;
        let beanStateValue;
        let userStateValue;

        let additionalInfo;
        let stateResult;

        /**
         * Actor Address is the address of persion performing action
         **/
        if (user && user["id"] && user["actor"]) {
          userAddress = utils.getActorAddress(user["id"], user["actor"]);
          stateFetchAddressList.push(userAddress);
        }
        if (bean && bean["id"]) {
          beanAddress = utils.getActorAddress(bean["id"], actors.BEAN);
          stateFetchAddressList.push(beanAddress);
        }
        if (actor) {
          actorAddress = utils.getActorAddress(signerPublicKey, actor);
          stateFetchAddressList.push(actorAddress);
        }

        /**
         * Transaction data to be attached on
         * every data
         */
        transaction = {
          action,
          by: actorAddress || userAddress,
          publicKey: signerPublicKey,
          on: timestamp
        };
        additionalInfo = {
          user: user ? user["actor"] : null,
          actor: actor,
          action: action
        };

        /**
         * Get state value from sawtooth state
         */
        addressValues = await context
          .getState(stateFetchAddressList)
          .catch(utils.toInvalidTransaction);

        /**
         * Store state representation in variable from State
         */
        userState = addressValues[userAddress];
        beanState = addressValues[beanAddress];
        actorState = addressValues[actorAddress];

        /**
         * Store if state exists boolean for this address
         */
        userStateExists = userState && userState.length > 0;
        beanStateExists = beanState && beanState.length > 0;
        actorStateExists = actorState && actorState.length > 0;

        /**
         * State value decodes state
         */
        userStateValue =
          userStateExists && (await utils.decodePayload(userState));
        beanStateValue =
          beanStateExists && (await utils.decodePayload(beanState));
        actorStateValue =
          actorStateExists && (await utils.decodePayload(actorState));

        /** Destruct */
        let {
          typeOfSeed,
          coffeeBeanFamily,
          fertilizerUsed,
          farmAddress,
          timeOfDeparture,
          estimatedTimeOfArrival,
          dispatchDetails,
          name,
          location,
          arrivalMode,
          storageCondition,
          roastingQuality,
          batchId,
          temperature,
          longitude,
          latitude,
          registrationNumber
        } = payloadData;

        /**
         * Check actor type is actually given type
         * @param {*} actor
         */
        const checkActorType = actor =>
          actorStateValue && actorStateValue["actor"] == actor;

        switch (action) {
          /**
           * Store the harvested beans into the blockchain
           */
          case actions.HARVEST:
            if (!beanAddress) {
              return utils.toInvalidTransaction(errors.NO_ID_GIVEN);
            }
            if (beanStateExists) {
              return utils.toInvalidTransaction(errors.EXISTING);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            // if (!checkActorType(actors.FARMER)) {
            //   return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            // }
            let { id, humidity, coffeeBeanType } = bean;
            const harvest = {
              farmerName: actorStateValue["name"],
              registrationNumber: actorStateValue["id"],
              location: actorStateValue["location"],
              coffeeBeanType,
              temperature: bean["temperature"],
              humidity,
              on: timestamp
            };
            stateResult = {
              id,
              harvest,
              stage: stages.HARVEST,
              ownedBy: actorStateValue["id"]
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Registered CA certified beans
           */
          case actions.CERTIFY_BEANS:
            console.debug(action);
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            // if (!checkActorType(actors.CERTIFICATE_AUTHORITY)) {
            //   return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            // }

            const certificate = {
              certifierName: actorStateValue["name"],
              registrationNumber: actorStateValue["id"],
              typeOfSeed,
              coffeeBeanFamily,
              fertilizerUsed,
              farmAddress,
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              certificate,
              stage: stages.CERTIFICATE
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Transport to Processor with Processor details
           */
          case actions.SHIP_TO_WAREHOUSE:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            const shipping = {
              timeOfDeparture,
              estimatedTimeOfArrival,
              dispatchDetails,
              on: timestamp,
              tracking: []
            };
            stateResult = {
              ...beanStateValue,
              shipping,
              stage: stages.SHIPPING
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Transport to Processor with Processor details
           */
          case actions.RECEIVE_SHIPMENT:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            const warehouse = {
              name,
              location,
              arrivalMode,
              storageCondition,
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              warehouse,
              stage: stages.WAREHOUSE
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Packaged from Processor Beans get bean id
           * and then gets transported to warehouse
           */
          case actions.SEND_FOR_ROASTING:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            const roasting = {
              registrationNumber,
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              roasting,
              stage: stages.ROASTING
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Packaged from Processor Beans get bean id
           * and then gets transported to warehouse
           */
          case actions.ROASTING_DONE:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            const packaging = {
              typeOfSeed,
              coffeeBeanFamily,
              batchId,
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              roasting: {
                ...beanStateValue.roasting,
                roastingQuality,
                temperature
              },
              packaging,
              stage: stages.PACKAGING
            };
            return utils.setEntry(context, beanAddress, stateResult);

          /**
           * Wholesaler buys these beans as batches and
           * gets ownership transferred from farmer
           * {
           *  user:{
           *   id: 1,
           *   actor: WHOLESALER
           *  },
           * actor:FARMER
           * }
           */
          case actions.SEND_TO_WHOLESALER:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            if (!userStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            if (beanStateValue["ownedBy"] !== actorStateValue["id"]) {
              return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            }
            const wholesaler = {
              name: userStateValue["name"],
              registrationNumber: userStateValue["id"],
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              wholesaler,
              ownedBy: userStateValue["id"],
              stage: stages.WHOLESALER
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Ditributor buys beans batches from wholesaler
           * and adds his branding for bean batches bought
           *  {
           *  user:{
           *   id: 1,
           *   actor: DISTRIBUTOR
           *  },
           *  actor: WHOLESALER
           * }
           */
          case actions.SEND_TO_DISTRIBUTOR:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            if (!userStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            if (beanStateValue["ownedBy"] !== actorStateValue["id"]) {
              return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            }
            const distributor = {
              name: userStateValue["name"],
              registrationNumber: userStateValue["id"],
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              distributor,
              ownedBy: userStateValue["id"],
              stage: stages.DISTRIBUTOR
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Ditributor buys beans batches from wholesaler
           * and adds his branding for bean batches bought
           *  {
           *  user:{
           *   id: 1,
           *   actor: RETAILER
           *  },
           *  actor: DISTRIBUTOR
           * }
           */
          case actions.SEND_TO_RETAILER:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (!actorStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            if (!userStateExists) {
              return utils.toInvalidTransaction(errors.USER_DOES_NOT_EXIST);
            }
            if (beanStateValue["ownedBy"] !== actorStateValue["id"]) {
              return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            }
            const retailer = {
              name: userStateValue["name"],
              registrationNumber: userStateValue["id"],
              on: timestamp
            };
            stateResult = {
              ...beanStateValue,
              retailer,
              ownedBy: userStateValue["id"],
              stage: stages.RETAILER
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Get Beans condition data updated throughout
           * the tracking process
           * {
           *   track:{
           *      ...info
           *   },
           *   bean:{
           *     id: 1
           *   }
           * }
           */
          case actions.TRACK_BEANS:
            if (!beanStateExists) {
              return utils.toInvalidTransaction(errors.NOT_EXIST);
            }
            if (beanStateValue && !beanStateValue[stages.SHIPPING]) {
              return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            }
            let tracking = {
              temperature,
              longitude,
              latitude,
              on: timestamp
            };

            const trackingResult = beanStateValue.tracking || [];
            trackingResult.push(tracking);

            stateResult = {
              ...beanStateValue,
              tracking: trackingResult
            };
            return utils.setEntry(context, beanAddress, stateResult);
          /**
           * Register user along with actor ADMIN tag
           */
          case actions.REGISTER_USER:
            if (actor !== actors.ADMIN) {
              return utils.toInvalidTransaction(errors.ACCESS_DENIED);
            }

            return registerUser(
              context,
              transaction,
              userState,
              userAddress,
              user
            );
          /**
           * Register user with Admin level access
           */
          case actions.REGISTER_ADMIN:
            return registerUser(
              context,
              transaction,
              userState,
              userAddress,
              user
            );
          /**
           * Throw invalid transaction
           */
          default:
            utils.toInvalidTransaction(`${action} is not valid`);
            break;
        }
      })
      .then(addressOutputs => {
        if (addressOutputs.length === 0) {
          return utils.toInvalidTransaction("State Error");
        }
        console.debug(`Completed ${JSON.stringify(addressOutputs)}`);
        return;
      })
      .catch(utils.toInvalidTransaction);
  }
}

module.exports = Handler;
