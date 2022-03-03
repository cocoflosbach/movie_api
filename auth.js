/**
 * @file The auth file implements the login logic for registered users.
 * @requires passport Used to create strategies for authenticating and authorising requests to the Api endpoints.
 * @requires './passport.js' The file where the passport strategies are implemented.
 * @requires jsonwebtoken Used to create json web tokens for authorising requests to protected endpoints.
 */

const jwtSecret = "your_jwt_secret"; // Should be the same code used in the jwtStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // your local passport file

/**
 * Generates a json web token that is used to authorise requests to protected routes that implement
 * the jwt passport strategy.
 * @function generateJWTToken
 * @param {*} user - Authenticated user returned by the local passport strategy.
 * @returns {string} A json web token.
 */

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

/**
 * Implements and exports a POST request to the /login endpoint for logging in an existing user.
 * It requireas the user's Username and password to be inputed in the form firelds. These user information
 * is then checked and if the user exits, a json web token is created for this user and sent back
 * to the user alongside the page authorization was requested for.
 * @param {*} app The express application created in the index file.
 * @param {*} router
 * @returns {Object} An object containing the record for the logged in user and the json web token.
 */

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
