from stockfish import Stockfish

def create_stockfish_instance():
    stockfish=Stockfish(path="C:/Users/Neel/misc/stockfish/stockfish-windows-x86-64-avx2.exe ")
    stockfish.set_depth(20)  # How deep the AI looks
    stockfish.set_skill_level(20)  # Highest rank stockfish
    return stockfish