const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));

app.use(express.static("public"));

let topMovies = [
  {
    id: "1",
    title: "The Notebook",
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8082, () => {
  console.log("Your app is listening on port 8082.");
});
