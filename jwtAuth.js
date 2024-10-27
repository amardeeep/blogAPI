const queries = require("./prisma/queries");
const env = require("./config");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const SECRET_KEY = env.SECRET_KEY;
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;
module.exports = new JWTStrategy(opts, async (jwt_payload, done) => {
  const user = await queries.getUser(jwt_payload.username);
  if (user) {
    return done(null, true);
  } else {
    return done(null, false);
  }
});
