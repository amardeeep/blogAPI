const express = require("express");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
const queries = require("./prisma/queries");
const { postsRouter } = require("./routes/posts/postsRouter");
const { commentsRouter } = require("./routes/comments/commentsRouter");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routers here
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
//create a user by signing up
app.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    await queries.createUser(username, email, password);
    res.send("User created");
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
