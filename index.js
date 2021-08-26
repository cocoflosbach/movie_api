const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/movies", (req, res) => {
  res.json(topTenMovies);
});

app.get("/", (req, res) => {
  res.send("Welcome to the MyFlix app API!");
});

app.listen(8081, () => {
  console.log("Your app is listening on port 8081.");
});
