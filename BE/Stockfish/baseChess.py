import chess
from .setup.stockfish_setup import create_stockfish_instance


def base_chess(fen_string):
    board = chess.Board()
    moves = fen_string.split(" ")
    if fen_string.strip():  # Check if fen_string is not empty
        moves = fen_string.split()
        for move in moves:
            board.push_san(move)

    stockfish = create_stockfish_instance()
    stockfish.set_fen_position(board.fen())

    stockfish_output = stockfish.get_top_moves(1)
    move = stockfish_output[0]['Move']
    return move


# print(BaseChess("e4 e5 Nf3 Nc6"))
