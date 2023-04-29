const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {

  const { type, data } = req.body;
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

  res.send({});
});

app.listen(6001, () => {
  console.log("server running on port 6001");
});
