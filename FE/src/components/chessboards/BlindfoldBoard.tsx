import { Box, Button, FormControlLabel, IconButton, Switch, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { socket } from '../../socket';

const boardWidth = (window.innerHeight - 120)* 75/100;

const BlindfoldBoard = (props:any) => {
    const [showBoard, setShowBoard]=useState(false);
    const [position, setPosition]= useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ')

    const moveFeed = props.color==='black'? "White's last move: " : "Black's's last move: ";
    const [oppMove, setOppMove]= useState('');  
    const [move, setMove]= useState('');
    const [helperText, setHelperText]= useState('');
    const [error, setError]= useState(false);
    const [myMove, setMyMove]= useState('');
    const [isDisabled, setIsDisabled]=useState(true);

	socket.on('start_game', ()=>{
        props.color==='white' && setIsDisabled(false);
	})

    const sendMove = () => {
		socket.emit("send_moveSAN", { move:myMove, room: props.room }, (data:any)=>{
			setPosition(data.position);
			setHelperText(data.text);
            setError(data.error);
            setIsDisabled(!data.error)
		});
	};

    socket.on('recieve_move',(data)=>{
        setOppMove(moveFeed + data.move.san);
        setPosition(data.position)
        setIsDisabled(false)
    })

  return (
    <Box height={boardWidth} sx={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>

        <Typography variant='h3'>{oppMove}</Typography>

        {showBoard && 
        <Chessboard 
            boardWidth={boardWidth-200}
            position={position}
            customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
			customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
            isDraggablePiece={()=>{return false}}
            boardOrientation={props.color}
        />}

        <TextField 
            error={error}
            helperText={helperText}
            autoFocus
            id='roomInput'
            variant='filled' 
            hiddenLabel
            required 
            type='text'
            disabled={isDisabled}
            onChange={(e)=>{setMyMove(e.target.value)}}
            InputProps={{
                endAdornment: (
                    <>
                        <Switch onChange={(e)=>{setShowBoard(e.target.checked)}}/>
                        <IconButton>
                            <Button variant='contained' color='secondary' onClick={sendMove}>Make Move</Button>
                        </IconButton>
                    </>
                ),
            }}
            InputLabelProps={{sx:{color:'white'}}}
        />
    </Box>
  )
}

export default BlindfoldBoard