from stockfish import Stockfish

def create_fairystockfish_instance():

    stockfish=Stockfish(path="C:/Users/Neel/misc/fairy-stockfish-largeboard_x86-64.exe ")
    stockfish.set_depth(20)#How deep the AI looks
    stockfish.set_skill_level(20)#Highest rank stockfish
    return stockfish