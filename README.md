# movie_api

## Documentation page

"This is a REST API for an application called “myFlix” that interacts with a database that stores data about different movies. The target audience for this API are front end developers who will build interactive front end designs that utilise this API. Another target group are movie lovers who appreciate an app that helps list all the information they need about their favorite movies"

It will consist of a well-designed REST API and architected database built using JavaScript, Node.js, Express, and MongoDB. The REST API will be accessed via commonly used HTTP methods like GET and POST. Similar methods (CRUD) will be used to retrieve data from your database and store that data in a non-relational way.

Business Logic	URL	HTTP Method	Request body data format	Response body data format
Get a list of all movies	/movies	GET	None	A JSON object holding data about all movies
Get data about a single movie by title	/movies/[Title]	GET	None	A JSON object holding data about a single movie,
Example:
{
Title: "Something Evil", Description: "A horror tale about a young couple moving into a Bucks County, Pennsylvania farmhouse, unaware that it is occupied by an unseen presence", Genre: { Name: "Horror", Description: "Horror is a genre of film in which a story is told to deliberately scare or frighten the audience, through suspense, violence or shock" }, Director: { Name: "Steven Spielberg", Bio: "Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is currently the most commercially successful director", Birth: "1946" }, Imagepath: "https://m.media-amazon.com/images/M/MV5BNDc5NGMxM2QtNzBjZS00OGViLWExMzQtODNhMGNiYzlkZDk0XkEyXkFqcGdeQXVyNjQxODA2ODA@._V1_.jpg", Featured: false } }
Get data about a Genre	/genres/[Name]	GET	None	A JSON object holding data about all the movies in specified genre
Get data about a Director	/directors/[Name]	GET	None	A JSON object holding data about a single director,
Example:
{
"Name": "Nick Cassavetes",
"Bio": "Nick Cassavetes Nicholas David Rowland Cassavetes is an American actor, director, and writer",
"Birth": "1959",
"Films": [ObjectId("613f3c56f001030c8c917805")] }
Add a new user	/users	POST	A JSON object holding data about a user to add,
Example:
{
"Username": "cocoboco",
"Password": "coco4bocoishere",
"Email": "coco@boco.com",
"Birthday": "12/12/12" }	A JSON object holding data about a user sucessfully added,
Example:
{
"Username": "cocoboco",
"Password": "coco4bocoishere",
"Email": "coco@boco.com",
"Birthday": "12/12/12" } }
Update a user's info	/users/[username]	PUT	A JSON object holding data about user info to update,
Example:
{
"Email": "coco@boco.com"
A JSON object holding data about a user info sucessfully updated,
Example:
{
"Username": "cocoboco",
"Password": "coco4bocoishere",
"Email": "coco@boco.com",
"Birthday": "12/12/12" } }
Add movie to user favorite list	/users/:Username/movies/:[MovieID]	POST	None	A JSON object holding data about a movie that was added,
Example:
{
"_id": "61433de06345a16076908387",
"Username": "cocoboco",
"Password": "coco4bocoishere",
"Email": "cocomo@bocomo.com",
"Birthday": "2012-12-11T23:00:00.000Z",
"FavoriteMovies": [ "613757e0f001030c8c917801" ], "__v": 0 }
Remove movie from user favorite list	/users/:Username/movies/:[MovieID]	DELETE	None	A text message indicating whether the movie was successfully removed
Remove a user	/users/[username]	DELETE	None	A text message indicating whether the user was successfully removed
