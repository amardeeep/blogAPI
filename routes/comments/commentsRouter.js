const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const queries = require("../../prisma/queries");
const passport = require("passport");
const commentsRouter = Router();
//create comment
commentsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    await queries.deleteComment(commentid);
    res.send("Comment Deleted");
  })
);
//update a comment
commentsRouter.put(
  "/:commentid",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    const commentid = parseInt(req.params.commentid);
    const { updated_content } = req.body;
    await queries.updateComment(commentid, updated_content);
    res.send("Comment Updated");
  })
);
module.exports = commentsRouter;
