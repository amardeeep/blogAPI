const LocalStrategy = require("passport-local").Strategy;
const queries = require("./prisma/queries");
module.exports = new LocalStrategy(async (username, password, done) => {
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
    console.log(error);
    return done(error);
  }
});
