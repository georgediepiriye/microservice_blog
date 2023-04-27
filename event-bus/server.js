const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:5000/events", event);
  axios.post("http://localhost:6001/events", event);

  res.send({ status: "ok" });
});

app.listen("7000", () => {
  console.log("serving running on post 7000");
});
