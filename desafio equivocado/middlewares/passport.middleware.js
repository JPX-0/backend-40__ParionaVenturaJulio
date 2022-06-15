const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { 
  loginApi, 
  registerApi, 
  serializeApi, 
  deserializeApi 
} = require("../api/passport.api");

// Passport Local Strategy
passport.use("login", new LocalStrategy(loginApi));
passport.use("register", new LocalStrategy({ passReqToCallback: true }, registerApi));

// Serializacion:
passport.serializeUser(serializeApi)

// Deserializacion:
passport.deserializeUser(deserializeApi)

module.exports = passport;