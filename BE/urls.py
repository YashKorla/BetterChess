from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from .Routes.routes import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('antichess/', antichess_route),
    path('atomic/', atomic_chess_route),
    path('base/', base_chess_route),
    path('crazy-house/', crazy_house_chess_route),
    path('giveaway/', give_away_chess),
    path('hoarde/', hoarde_chess_route),
    path('king-of-the-hill/', king_of_the_hill_chess_route),
    path('racing-kings/', racing_kings_chess_route),
    path('suicide/', suicide_chess_route),
    path('three-check/', three_check_chess_route),
]
