const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
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
  comments.push({ commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:7000/events", {
    type: "CommentCreated",
    data: {
      commentId,
      postId: req.params.id,
      content,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received: ", type);
  if (type === "CommentModerated") {
    const { postId, commentId, status, content } = data;
    const comments = commentsByPostId[postId];
    let comment = comments.find((comment) => {
      return comment.commentId === commentId;
    });

    comment.status = status;
    await axios.post("http://event-bus-srv:7000/events", {
      type: "CommentUpdated",
      data: {
        commentId,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4000, () => {
  console.log("server running...");
});
