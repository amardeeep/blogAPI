//import required dependencies
const express = require("express");
const env = require("./config");
const passport = require("passport");
//import strategies
const jwtStrategy = require("./jwtAuth");
const localStrategy = require("./localStrategy");
//import routers
const postsRouter = require("./routes/posts/postsRouter");
const commentsRouter = require("./routes/comments/commentsRouter");
const signupRouter = require("./routes/signup/signup");
const loginRouter = require("./routes/login/login");
//create express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//initialise strategies
passport.use(jwtStrategy);
passport.use(localStrategy);
//Routers here
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.listen(env.PORT, () => {
  console.log(`Listening on PORT ${env.PORT}`);
});
