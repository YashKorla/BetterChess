import chess
import chess.variant
from .setup.fairystockfish_setup import create_fairystockfish_instance

# stockfish.set_elo_rating(3000)


def king_of_the_hill_chess(fen_string):
    board = chess.variant.KingOfTheHillBoard()
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


# print(KingOfTheHillChess("e2e4 d7d5 e4d5 d8d5 b1c3"))
