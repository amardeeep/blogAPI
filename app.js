const express = require("express");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
const queries = require("./prisma/queries");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Moshi Moshi");
});
//create post
app.post(
  "/posts",
  asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const post = await queries.postPosts(title, content);
    console.log(post);
    res.send("Post was Created");
  })
);
//create comment
app.post(
  "/comments",
  asyncHandler(async (req, res) => {
    const { content, postid } = req.body;
    console.log(req.body);
    const postId = parseInt(postid);
    const comment = await queries.postComment(content, postId);
    console.log(comment);
    res.send("Comment was Created");
  })
);
//get all posts
app.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await queries.getPosts();
    res.send(posts);
  })
);
//get a single post
app.get(
  "/posts/:postid",
  asyncHandler(async (req, res) => {
    const postid = parseInt(req.params.postid);
    const post = await queries.getPost(postid);
    res.send(post);
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
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
