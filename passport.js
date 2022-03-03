/**
 * @file This file implements two passport strategies instrumental in authenticating requests to the 
 * Api endpoints. The local strategy is first used when a user logs in to use the app. Once the user
 * is authenticated and a json web token iscreated, subsequent http requests receive the json web token 
 * as headers. This validates the request by decoding the Json Web Token returned to the user, then checking the user ID from the payload against the users collection in the database.
 
 * @requires passport Used to create strategies for authenticating and authorising requests to the Api endpoints.
 * @requires passport-local Used to create a local strategy.
 * @requires passport-jwt Used to create a jwt strategy and to extract tokens from requests.
 * @requires './models.js' The file where data schemas and models are defined.
 */

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/** Configures and registers a local authentication strategy */
passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(username + "  " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        if (!user) {
          console.log("incorrect username");
          return callback(null, false, {
            message: "Incorrect username.",
          });
        }

        if (!user.validatePassword(password)) {
          console.log("incorrect password");
          return callback(null, false, { message: "Incorrect password." });
        }

        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

/** Configures and registers a local authentication strategy */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
