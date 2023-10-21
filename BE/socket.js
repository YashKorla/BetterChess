const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { Chess } = require("chess.js");

const chess = new Chess();
let joinData = {players: 0, time: 3};

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

});
io.on("connection", (socket) => { 
	console.log("connected to ", socket.id);

	socket.on('join_room', (data, cb) => {
		console.log(data);
		if(joinData.players === 0){
			socket.join(data.room);
			console.log("1st player joined");
			joinData.players = 1;
			joinData.time = data.time;
			cb({color: 'white'});
		}
		else if(joinData.players===1){
			if(joinData.time !== data.time){
				cb({error:'Ensure that both players select same time control'});
			}
			else{
				socket.join(joinData.room);
				console.log("2nd player joined");
				joinData.players = 2;
				cb({color:'black'})
			} 
		}  
		else{
			cb({error:'room already taken'});
		} 
	}) 

	socket.on('send_move', (data, cb) => {  
		console.log(data);
		socket.broadcast.emit('recieve_move', data);
	})
	
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${port}`);
});
  