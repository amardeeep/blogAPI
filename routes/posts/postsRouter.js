const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const queries = require("../../prisma/queries");
const postsRouter = Router();
//create post
postsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    await queries.postPosts(title, content);
    res.send("Post was Created");
  })
);
//get all posts
postsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await queries.getPosts();
    res.send(posts);
  })
);
//get a single post
postsRouter.get(
  "/:postid",
  asyncHandler(async (req, res) => {
    const postid = parseInt(req.params.postid);
    const post = await queries.getPost(postid);
    res.send(post);
  })
);
//get all comments of a post
postsRouter.get(
  "/:postid/comments",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postid);
    const comments = await queries.getComments(postId);
    res.send(comments);
  })
);
//get a single comment of a post
postsRouter.get(
  "/:postid/comments/:commentid",
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    const comment = await queries.getComment(commentid);
    res.send(comment);
  })
);
//delete a post and associated comments
postsRouter.delete(
  "/:postid",
  asyncHandler(async (req, res) => {
    const postid = parseInt(req.params.postid);
    await queries.deletePost(postid);
    res.send("Post Deleted");
  })
);
module.exports = { postsRouter };
