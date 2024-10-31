const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const env = require("../../config");
const loginRouter = Router();
loginRouter.post("/", async (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      res.status(400).json({ message: "Error loggin you in", err: err });
    } else if (!user) {
      res.status(500).json({ message: "Unauthorized" });
    } else {
      const token = jwt.sign(user, env.SECRET_KEY);
      res.json(token);
    }
  })(req, res);
});
module.exports = loginRouter;
