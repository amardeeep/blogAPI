const express = require("express");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
const queries = require("./prisma/queries");
const { postsRouter } = require("./routes/posts/postsRouter");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//postsRouter
app.use("/posts", postsRouter);
//create comment
app.post(
  "/comments",
  asyncHandler(async (req, res) => {
    const { content, postid } = req.body;
    const postId = parseInt(postid);
    await queries.postComment(content, postId);
    res.send("Comment was Created");
  })
);

//get all comments of a post
app.get(
  "/posts/:postid/comments",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postid);
    const comments = await queries.getComments(postId);
    res.send(comments);
  })
);
//get a single comment of a post
app.get(
  "/posts/:postid/comments/:commentid",
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    const comment = await queries.getComment(commentid);
    res.send(comment);
  })
);
//delete a comment
app.delete(
  "/comments/:commentid",
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    await queries.deleteComment(commentid);
    res.send("Comment Deleted");
  })
);

//for development only get all comments
app.get(
  "/comments",
  asyncHandler(async (req, res) => {
    const comments = await queries.getAllComments();
    res.send(comments);
  })
);
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
