const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),

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

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send("Welcome to the MyFlix app API!");
});

/*app.get('/students', (req, res) => {
   res.send('Successful GET request returning data on all the students');
});*/

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

app.get("/movies/:title", (req, res) => {
  res.json(
    topMovies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

app.get("/movies/:genre", (req, res) => {
  res.send("Successful GET request returning data on a genre");
});

app.get("/movies/:directors:", (req, res) => {
  res.send("Successful GET request returning data on a director");
});

app.post("/users", (req, res) => {
  res.send("Successful POST request adding a new user");
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
