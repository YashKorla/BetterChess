const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const {instrument} = require('@socket.io/admin-ui')
const { Chess } = require("chess.js");

require("dotenv").config();

const app = express();
app.use(cors()); 
// app.use(express.json());
// const port = process.env.SOCKET_PORT || 7000;
const server = http.createServer(app);

const chess = new Chess();
let joinData = {players: 0, time: 3};

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000", "https://admin.socket.io"],
		credentials: true,
		method: ["GET", "POST"],
	},
 
});  
io.on("connection", (socket) => { 

	socket.on('join_room', (data, cb) => {
		if(joinData.players === 0){
			socket.join(data.room);
			joinData.players = 1;
			joinData.time = data.time;
			cb({color: 'white'});
		}
		else if(joinData.players===1){
			if(data.time !== joinData.time){
				cb({error:'Select same time'}); 
			}  
			else{
				socket.join(data.room);  
				joinData.players = 2;
				cb({color:'black'})
				io.in(data.room).emit('start_game', {gameStarted: true});      
			}
		}  
		else{
			cb({error:'room already taken'}); 
		}  
	}) 

	socket.on('send_move', (data, cb) => {     
		try{
			chess.move({from: data.source, to: data.target, promotion: data.piece})
			const p = chess.fen();
			cb({position: p, success: true}); 
			socket.to(data.room).emit('recieve_move', p);  
			io.in(data.room).emit('toggle_timer', chess.turn()); //chess.turn() returns 'w' or 'b'
			if(chess.isGameOver()){
				if(chess.isInsufficientMaterial() || chess.isStalemate() || chess.isThreefoldRepetition()){
					io.in(data.room).emit('recieve_winner',{isDraw:true})
					chess.clear();
					chess.load(startingPosition);
					joinData = {players: 0, time: 3};
				}
				else{
					const winner = chess.turn()==='b' ? 'white' : 'black';
					io.in(data.room).emit('recieve_winner',{winner:winner})   
					chess.clear();
					chess.load(startingPosition);
					joinData = {players: 0, time: 3};
				}
			}
		}catch(e){
			cb({success:false})
		}
	})  

	socket.on('set_winner',(data)=>{
		io.in(data.room).emit('recieve_winner',{winner: data.winner})
		chess.clear(); 
		chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
		joinData = {players: 0, time: 3};
	})

	socket.on('get_piece', (square, cb)=>{
		cb(chess.get(square))
	})

	socket.on('get_moves', (data, cb)=>{
		cb(chess.moves(data)) 
	})
	
});

instrument(io, {auth: false});

server.listen(7000, (err) => {
	if (err) throw err;
	console.log(`Listening on port 7000`);
});
  