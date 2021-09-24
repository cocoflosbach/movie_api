const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genre = Models.Genre;

/*mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

let auth = require("./auth")(app);

const cors = require("cors");
app.use(cors());

const passport = require("passport");
require("./passport");

const { check, validationResult } = require("express-validator");

app.use(express.static("public"));

let topMovies = [
  {
    id: "1",
    title: "Notebook",
    year: "2004",
    genre: "Romance"
  },
  {
    id: "2",
    title: "A Star Is Born",
    year: "2018",
    genre: "Romance"
  },
  {
    id: "3",
    title: "Pride And Prejudice",
    year: "2004",
    genre: "Romance"
  },
  {
    id: "4",
    title: "The Sound Of Music",
    year: "1965",
    genre: "Romance"
  },
  {
    id: "5",
    title: "Get Out",
    year: "2017",
    genre: "Horror"
  },
  {
    id: "6",
    title: "Behind Her Eyes",
    year: "2021",
    genre: "Psychological"
  },
  {
    id: "7",
    title: "Mad Max Fury Road",
    year: "2015",
    genre: "Post-apocalypse/Fantasy"
  },
  {
    id: "8",
    title: "Avengers: Endgame",
    year: "2019",
    genre: "Action"
  },
  {
    id: "9",
    title: "Pretty Woman",
    year: "2004",
    genre: "Romance"
  },
  {
    id: "10",
    title: "A Quiet place",
    year: "2018",
    genre: "Horror"
  }
];

//Get a list of all movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then(movies => {
        res.status(201).json(movies);
      })
      .catch(error => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to the MyFlix app API!");
});

// Add new movie
app.post(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("body: ", req.body);
    let newMovie = req.body;

    if (!newMovie.title) {
      const message = "Movie data missing in request body";
      res.status(400).send(message);
    } else {
      newMovie.id = uuid.v4();
      topMovies.push(newMovie);
      res.status(201).send(newMovie);
    }
  }
);

// Get a movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get a list of all genres
app.get(
  "/genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Genre.find()
      .then(genre => {
        res.status(201).json(genre);
      })
      .catch(error => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Get genre by name
app.get(
  "/genre/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Genre.findOne({ Name: req.params.Name })
      .then(genre => {
        res.json(genre);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get a list of all directors
app.get(
  "/directors",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Directors.find()
      .then(directors => {
        res.status(201).json(directors);
      })
      .catch(error => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Directors.findOne({ Name: req.params.Name })
      .then(director => {
        res.json(director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Add a user
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    //console.log("body: ", req.body);
    // check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then(users => {
        res.status(201).json(users);
      })
      .catch(error => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/

app.put(
  "/users/:Username",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }, // this line makes sure that the updated document is required
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Add a movie to a user's list of favorites
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Remove a movie to a user's list of favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Remove an existing user
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(user => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/*app.listen(8082, () => {
  console.log("Your app is listening on port 8082.");
});*/

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("listening on Port " + port);
});
