const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { commentId, postId, content, status } = data;
    const post = posts[postId];
    post.comments.push({ commentId, content, status });
  }

  if (type === "CommentUpdated") {
    const { commentId, postId, status, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.commentId === commentId;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(6001, async () => {
  console.log("server running on port 6001");
  const res = await axios.get("http://localhost:7000/events");

  for (let event of res.data) {
    console.log("Processing events: ", event.type);
    handleEvent(event.type, event.data);
  }
});
