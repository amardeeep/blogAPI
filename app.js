const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Moshi Moshi");
});
app.listen(3000, () => {
  "Listening on Port 3000";
});
