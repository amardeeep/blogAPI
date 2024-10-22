const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const queries = require("../../prisma/queries");
const commentsRouter = Router();
//create comment
commentsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { content, postid } = req.body;
    const postId = parseInt(postid);
    await queries.postComment(content, postId);
    res.send("Comment was Created");
  })
);
//delete a comment
commentsRouter.delete(
  "/:commentid",
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    await queries.deleteComment(commentid);
    res.send("Comment Deleted");
  })
);
//update a comment
commentsRouter.put(
  "/:commentid",
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    const { updated_content } = req.body;
    await queries.updateComment(commentid, updated_content);
    res.send("Comment Updated");
  })
);
module.exports = { commentsRouter };
