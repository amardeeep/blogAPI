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
//get all posts
app.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await queries.getPosts();
    console.log(posts);
    res.send(posts);
  })
);
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
