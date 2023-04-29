const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:7000/events", {
      type: "CommentModerated",
      data: {
        commentId: data.commentId,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
    res.send({});
  } else {
    res.send({});
  }
});

app.listen(8000, () => {
  console.log("server running on port 8000");
});
