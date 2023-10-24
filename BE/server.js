const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const gameRouter = require("./routes/games.routes");
const userRouter = require("./routes/users.routes");
const puzzleRouter = require("./routes/puzzles.routes");

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", (err) => {
	if (err) throw err;
	console.log("MongoDB connection established successfully");
});

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/puzzles", puzzleRouter);

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${port}`);
});

/**
 * USER ROUTES
 * --------------------------------
 * POST - http://localhost:5000/users/register --- Accepts user details in the body
 * POST - http://localhost:5000/users/login --- Accepts user credentials in the body
 * POST - http://localhost:5000/users/search-users --- Acccepts username entered by user in the body
 */

/**
 * GAME ROUTES
 * --------------------------------
 * POST - http://localhost:5000/games/game-history --- Accepts user id in the body
 * POST - http://localhost:5000/games/add-game --- Accepts game details in the body
 */

/**
 * FRIEND ROUTES
 * --------------------------------
 * POST - http://localhost:5000/users/list-friends --- Accepts the user id in the body
 * POST - http://localhost:5000/users/add-friend --- Accepts the user id of the player and friend
 */
