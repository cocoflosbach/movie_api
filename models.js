/**
 * @file The models file defined the schemas for documents held in the movies and users collections in
 * the myFunFlix database. These schemas are used to create models, which in turn are used in http requests
 * to Api endpoints to create, read, update and delete documents from the database.
 * @requires mongoose Connects the app to the database and implements data schemas using models.
 * @requires bcrypt Used to implement encryption on user passwords.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/** Schema for the movies collection */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/** Schema for the users collection */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Method to encrypt user passwords when creating a new user or updating an existing user's information.
 * @method hashPassword
 * @param {*} password - The user's password taken from the request body.
 * @returns {string} String containing the encrypted password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Method used to validate a user's password against the encrypted version in the database
 * when the user attempts to log in.
 * @method validatePassword
 * @param {*} password - Password submitted by the user when logging in.
 * @returns {boolean} True if the password submitted when encrypted matches the encrypted password
 * taken from the database.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/** Schema for the users collection */
let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birth: { type: String, required: true },
  Death: { type: String },
  Films: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/** Schema for the users collection */
let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

/** Creates a model for the movies database collection using the movieSchema */
let Movie = mongoose.model("Movie", movieSchema);

/** Creates a model for the users database collection using the usereSchema */
let User = mongoose.model("User", userSchema);

/** Creates a model for the directors database collection using the directorSchema */
let Director = mongoose.model("Director", directorSchema);

/** Creates a model for the genre database collection using the genreSchema */
let Genre = mongoose.model("Genre", genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
