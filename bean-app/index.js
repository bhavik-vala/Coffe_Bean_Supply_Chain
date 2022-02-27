const fallback = require("express-history-api-fallback");
const express = require("express");
const app = express();
const root = `${__dirname}/dist/bean-app`;
app.use(express.static(root));
app.use(fallback("index.html", { root }));

const UI_PORT = process.env.UI_PORT || 3000;

app.listen(UI_PORT, "0.0.0.0", () => {
  console.info(`http://0.0.0.0:${UI_PORT}`);
});
