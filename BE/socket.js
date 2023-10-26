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
const port = process.env.SOCKET_PORT || 7070;
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
		if(data.room === undefined){
			cb({error: "Enter room"})
		}
		else if(data.time === undefined){
			cb({error: "Select a time"});
		}
		else if(joinData.players === 0){
			socket.join(data.room);
			joinData.players = 1;
			joinData.time = data.time;
			cb({color: 'white'});
		}
		else if(joinData.players===1){  
			if(data.time !== joinData.time){
				cb({error:'Ensure both players select same time'}); 
			}  
			else{
				socket.join(data.room);  
				joinData.players = 2;
				cb({color:'black'})
				io.in(data.room).emit('start_game');       
			}
		}  
		else{
			cb({error:'room already taken'}); 
		}  
	}) 

	socket.on('send_move', (data, cb) => {     
		try{
			chess.move({from: data.source, to: data.target, promotion: data.piece[1].toLowerCase()}) 
			const p = chess.fen();
			cb({position: p, success: true, isCheck: chess.inCheck()});   
			socket.to(data.room).emit('recieve_move', p);  
			io.in(data.room).emit('toggle_timer', chess.turn()); //chess.turn() returns 'w' or 'b'
			io.in(data.room).emit('recieve_pgn', chess.pgn());
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
			cb({position:chess.fen(),success:false})
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

	socket.on('send_moveSAN',(data,cb)=>{
		try{      
			const move = chess.move(data.move);
			cb({position: chess.fen(), text: 'Move made', error: false});
			socket.to(data.room).emit('recieve_move',{move: move, position: chess.fen()})
			io.in(data.room).emit('toggle_timer', chess.turn()); //chess.turn() returns 'w' or 'b'
			io.in(data.room).emit('recieve_pgn', chess.pgn());
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
			cb({position: chess.fen(), text:'Invalid move', error:true});
		}
	})
	
});

instrument(io, {auth: false});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${port}`);
});
   