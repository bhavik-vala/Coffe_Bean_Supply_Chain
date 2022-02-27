const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || "8080";
exports.BEAN_TRACKING = "BEAN_TRACKING";

exports.POST_TRACK_API = beanId =>
  `http://${API_HOST}:${API_PORT}/track/${beanId}`;

exports.GET_BEANS = `http://${API_HOST}:${API_PORT}/state/beans`;
exports.TIMEOUT = process.env.TIMEOUT || 30000;
