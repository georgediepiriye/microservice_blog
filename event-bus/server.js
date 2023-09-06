const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post("http://posts-clusterip-srv:5000/events", event);
  axios.post("http://comments-clusterip-srv:4000/events", event);
  axios.post("http://query-clusterip-srv:6001/events", event);
  axios.post("http://moderation-clusterip-srv:8000/events", event);

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen("7000", () => {
  console.log("serving running on post 7000");
});
