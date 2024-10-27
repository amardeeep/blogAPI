const queries = require("../../prisma/queries");
const asyncHandler = require("express-async-handler");
const { Router } = require("express");
const signupRouter = Router();
signupRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    await queries.createUser(username, email, password);
    res.send("User created");
  })
);
module.exports = { signupRouter };
