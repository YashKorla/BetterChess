import chess
import chess.variant
from setup.fairystockfish_setup import create_fairystockfish_instance

# stockfish.set_elo_rating(3000)

def BaseChess(fen_string):
    board = chess.variant.AntichessBoard()
    moves = fen_string.split(" ")
    
    if fen_string.strip():  # Check if fen_string is not empty
        moves = fen_string.split()
        for move in moves:
            board.push_san(move)

    stockfish = create_fairystockfish_instance()
    stockfish._set_option("UCI_Variant", type(board).uci_variant, True)

    stockfish.set_fen_position(board.fen())
    stockfish_output = stockfish.get_top_moves(1)
    move = stockfish_output[0]['Move']

    return move


print(BaseChess("e2e3 b8c6 f1a6 b7a6"))


