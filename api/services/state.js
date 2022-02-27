const fetch = require("node-fetch");
const atob = require("atob");
const queryString = require("query-string");

const { getActorAddress } = require("../../contract/utils");
const { actors, actorsNamespace } = require("../../contract/constants");
const { REST_API_URL } = require("../config");

const getState = async qs => {
  let response;
  console.info(`${REST_API_URL}/state?${queryString.stringify(qs)}`);
  try {
    response = await fetch(
      `${REST_API_URL}/state?${queryString.stringify(qs)}`
    ).then(result => result.json());
  } catch (error) {
    return [];
  }

  const { data } = response;
  const result = data.map(obj => {
    try {
      obj.data = JSON.parse(atob(obj.data));
    } catch (error) {}
    return obj;
  });
  return result;
};

module.exports = {
  getState,
  getBeans: () => {
    const beanAddress = actorsNamespace["BEAN"];

    return getState({ address: beanAddress });
  },
  getBean: id => {
    const beanAddress = getActorAddress(id, actors.BEAN);
    return getState({ address: beanAddress }).then(arr => arr && arr[0]);
  }
};
