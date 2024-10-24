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
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.getUser(username);
      if (!user || user.password != password) {
        return done(null, false, { message: "Incorrect Username or Password" });
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
    res.send(user);
  })(req, res);
});
//
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

// // Configure passport local strategy
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email", // if using email instead of username
//       passwordField: "password",
//     },
//     async (email, password, done) => {
//       try {
//         // Find user by email
//         const user = await User.findOne({ email });

//         // User not found
//         if (!user) {
//           return done(null, false, { message: "Invalid credentials" });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Invalid credentials" });
//         }

//         // Remove password from user object
//         const userObject = user.toJSON();
//         delete userObject.password;

//         return done(null, userObject);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // Login endpoint
// const login = async (req, res) => {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred during authentication",
//       });
//     }

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: info.message || "Authentication failed",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//       },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       success: true,
//       token,
//       user,
//     });
//   })(req, res);
// };

// // Auth middleware for protected routes
// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// // Example usage
// app.post("/auth/login", login);

// // Protected route example
// app.get("/protected", auth, (req, res) => {
//   res.json({
//     success: true,
//     data: "Protected data",
//     user: req.user,
//   });
// });
//
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
