const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());

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
app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(error => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/", (req, res) => {
  res.send("Welcome to the MyFlix app API!");
});

// Add new movie
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = "Movie data missing in request body";
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    topMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Get a movie by title
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get a list of all genres
app.get("/genres", (req, res) => {
  Genres.find()
    .then(genres => {
      res.status(201).json(genres);
    })
    .catch(error => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get a list of all directors
app.get("/directors", (req, res) => {
  Directors.find()
    .then(directors => {
      res.status(201).json(directors);
    })
    .catch(error => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/directors/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then(director => {
      res.json(director);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Add a user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
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
});

// Get all users
app.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.put("/users/username", (req, res) => {
  res.send("Successful PUT request updating data on an existing user");
});

app.post("/users/favorites", (req, res) => {
  res.send("Successful POST request adding new movie to user favorites list");
});

app.delete("/users/favorites", (req, res) => {
  res.send(
    "Successful DELETE request removing a movie from user favorites list"
  );
});

app.delete("/users/username", (req, res) => {
  res.send("Successful DELETE request removing a user");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8082, () => {
  console.log("Your app is listening on port 8082.");
});
