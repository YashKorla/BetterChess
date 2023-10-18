const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const port = process.env.SOCKET_PORT || 7000;

app.use(cors());
app.use(express.json());

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		method: ["GET", "POST"],
	},
	// handlePreflightRequest: (req, res) => {
	// 	res.writeHead(200, {
	// 		"Access-Control-Allow-Origin": "http://localhost:3000",
	// 		"Access-Control-Allow-Headers": "X-Requested-With",
	// 		"Access-Control-Allow-Methods": "GET,POST",
	// 		"Access-Control-Allow-Credentials": true,
	// 	});
	// },
});

// let color = "";
io.on("connection", (socket) => {
	console.log("connection established");
	socket.on("create_game", (data) => {
		console.log("game created");
		console.log(data.room);
		// if (color === "") {
		// 	console.log("color allotted");
		// 	color = data.color;
		// 	socket.emit("join_room", data.color);
		// }
		socket.join(data.room);
	});

	socket.on("send_move", (data) => {
		console.log("move sent");
		console.log(data.room);
		socket.to(data.room).emit("receive_move", data.move);
		// socket.broadcast.emit("recieve_move", data.move);
	});
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${port}`);
});
