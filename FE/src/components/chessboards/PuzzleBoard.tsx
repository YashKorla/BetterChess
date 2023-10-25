import React, { useEffect , useState} from "react";
import { Chessboard } from "react-chessboard";
import { Square, Piece, BoardOrientation } from "react-chessboard/dist/chessboard/types";
import { useAppDispatch, useAppSelector } from "../../app-state/hooks";
import { Chess } from "chess.js";
import { fetchOnePuzzle, quitPuzzles, updateTrack } from "../../app-state/features/puzzleSlice";

const boardWidth = (window.innerHeight - 120)* 80/100;
const chess = new Chess();
let moveCount = 1;
let countLivesLost = 0;

const PuzzleBoard = () => {
    const dispatch = useAppDispatch();

    const puzzleCount = useAppSelector((state)=>{
        return state.puzzle.puzzleCounter;
    })
	const puzzle = useAppSelector((state)=>{
        return state.puzzle.puzzleState.puzzles[state.puzzle.puzzleCounter];
    })

    const [position,setPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ');
    const [currentRating,setCurrentRating] = useState(600);
    const [orientation,setOrientation] = useState<BoardOrientation>('white');

    const solution = puzzle.moves.split(" ");
    console.log(solution);

    useEffect(()=>{
        chess.load(puzzle.fen);
        chess.move({from: solution[0].slice(0,2), to: solution[0].slice(-2)});
        chess.turn() === 'b' ? setOrientation('black') : setOrientation('white');
        setPosition(chess.fen())
    },[puzzleCount]);

    const makeBotMove = ()=>{
        chess.move({from:solution[moveCount].slice(0,2),to:solution[moveCount].slice(-2)});
        setPosition(chess.fen());
        moveCount++;
    }
		
	const handleDrop = (source: Square, target: Square, piece: Piece)=>{
        try{
            chess.move({from:source,to:target,promotion:piece});
            moveCount++;
            setPosition(chess.fen());
            
            if(source!==solution[moveCount-1].slice(0,2) || target!==solution[moveCount-1].slice(-2)){
                moveCount=1;
                countLivesLost++;
                dispatch(fetchOnePuzzle({
                    puzzle_rating:{
                        rating: currentRating,
                        start:false,
                    }
                }))
                setCurrentRating(currentRating+100);
                dispatch(updateTrack({rating:puzzle.rating, solved: false}));
                if(countLivesLost === 3){
                    dispatch(quitPuzzles());
                }
                return true;
            }
            else if(moveCount===solution.length){
                moveCount=1;
                dispatch(fetchOnePuzzle({
                    puzzle_rating:{
                        rating: currentRating,
                        start:false,
                    }
                }))
                setCurrentRating(currentRating+100);
                dispatch(updateTrack({rating:puzzle.rating, solved: true}));
            }
            else{
                makeBotMove();
            }
            return true;
        }catch(e){console.log(e); return false}
	};

	return (
		<Chessboard
			position={position}
			onPieceDrop={handleDrop}
			boardWidth={boardWidth}
			customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
			customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
			animationDuration={100}
			arePremovesAllowed={false}
			boardOrientation={orientation}
		/>
	);
};
export default PuzzleBoard;
