const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("/events", "http://localhost:4000/events");
  axios.post("/events", "http://localhost:5000/events");
  axios.post("/events", "http://localhost:6000/events");

  res.send({ status: "ok" });
});

app.listen("7000", () => {
  console.log("serving running on post 7000");
});
