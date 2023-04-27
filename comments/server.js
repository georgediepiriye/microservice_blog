const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors")
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.status(200).send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:7000/events", {
    type: "CommentCreated",
    data: {
      commentId,
      postId: req.params.id,
      content,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received event :", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("server running...");
});
