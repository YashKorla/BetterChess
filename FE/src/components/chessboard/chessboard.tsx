import React from 'react';
import {Chess} from 'chess.ts';
import { Chessboard } from 'react-chessboard';
import { useState } from 'react';
import { Square,Piece } from 'react-chessboard/dist/chessboard/types';


export const StandardBoard = ()=>{

    
    const chess = new Chess();
    const [game,setGame] = useState(new Chess());

    function safeGameMutate(modify: any){
        setGame((g: any)=>{
            const update = {...g}
            modify(update)
            return update;
        })
    }

    function onDrop(source: any,target: any){
        let move = null;
        safeGameMutate((game:any)=>{
          move = game.move({
            from:source,
            to: target,
            promotion:'q'
          })
      })
       return true;
      }

    return(
        <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={500}
        />
    )
} 
