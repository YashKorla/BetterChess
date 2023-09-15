from django.http import HttpResponse
from ..Stockfish.AntiChessBoard import anti_chess
from ..Stockfish.AtomicBoard import atomic_chess
from ..Stockfish.BaseChess import base_chess
from ..Stockfish.CrazyhouseBoard import crazy_house_chess
from ..Stockfish.GiveawayBoard import give_away_chess
from ..Stockfish.HordeBoard import hoarde_chess
from ..Stockfish.KingOfTheHillBoard import king_of_the_hill_chess
from ..Stockfish.RacingKings import racing_king_chess
from ..Stockfish.SuicideBoard import suicide_chess
from ..Stockfish.ThreeCheckBoard import three_check_chess
import json


def antichess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = anti_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def atomic_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = atomic_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def base_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = base_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def crazy_house_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = crazy_house_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def give_away_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = give_away_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def hoarde_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = hoarde_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def king_of_the_hill_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = king_of_the_hill_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def racing_kings_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = racing_king_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def suicide_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = suicide_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")


def three_check_chess_route(request):
    try:
        request_body = json.loads(request.body)
        ai_move = three_check_chess(request_body["move"])
        return HttpResponse(ai_move)
    except:
        return HttpResponse("Error")
