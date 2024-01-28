const express = require("express");
const router = require("./router");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(router);
app.listen(8080, () => {
  console.log("APP LISTENING ON PORT 8080");
});
