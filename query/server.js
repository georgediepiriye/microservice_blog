const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

const posts = {};

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
    const { commentId, postId, content } = data;
    const post = posts[postId];
    post.comments.push({ commentId, content });
  }
  console.log(posts);
  res.send({});
});

app.listen(6000, () => {
  console.log("server running on port 6000");
});
