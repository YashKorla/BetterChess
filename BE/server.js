const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const gameRouter = require("./routes/games.routes");
const userRouter = require("./routes/users.routes");

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

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "https://localhost:3000",
		method: ["GET", "POST"],
	},
});

let color = "";
io.on("connection", (socket) => {
	socket.on("create_game", (data) => {
		if (color === "") {
			color = data.color;
			socket.emit("join_room", data.color);
		}
		socket.join(data.room);
	});

	socket.on("send_move", (data) => {
		socket.to(data.room).emit("receive_move", data.move);
	});
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${port}`);
});

/**
 * USER ROUTES
 * --------------------------------
 * POST - http://localhost:5000/users/register --- Accepts user details in the body
 * POST - http://localhost:5000/users/login --- Accepts user credentials in the body
 */

/**
 * GAME ROUTES
 * --------------------------------
 * POST - http://localhost:5000/games/game-history --- Accepts user id in the body
 * POST - http://localhost:5000/games/add-game --- Accepts game details in the body
 */
