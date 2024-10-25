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
//authenticate user using local strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;
passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    const user = await queries.getUser(jwt_payload.username);
    if (user) {
      return done(null, true);
    } else {
      return done(null, false);
    }
  })
);
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.getUser(username);
      if (!user) {
        return done(null, false, { message: "Incorrect Credentials" });
      }
      if (user.password != password) {
        return done(null, false, { message: "Incorrect Credentials" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
app.post("/login", async (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      res.status(400).json({ message: "Error loggin you in", user });
    }
    if (!user) {
      res.status(500).json({ message: "Unauthorized" });
    } else {
      const token = jwt.sign(user, SECRET_KEY);
      res.json(token);
    }
  })(req, res);
});
//add protected route
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Protected route",
    });
  }
);
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
