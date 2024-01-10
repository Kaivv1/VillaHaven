const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Register = require("../Models/Register");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await Register.findById(jwt_payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);

module.exports = passport;
