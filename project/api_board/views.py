from flask import Flask, render_template, request, redirect, url_for, jsonify, json, Request
from api_board import api_board_bp
from util.util import json_response
from util import queries
import json


@api_board_bp.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('api_board/index.html')

@api_board_bp.route("/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()

@api_board_bp.route("/boards/<int:board_id>/")
@json_response
def get_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_board(board_id)

@api_board_bp.route("/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@api_board_bp.route("/boards/", methods=["POST"])
@json_response
def create_board():
    board_title = request.get_json()["title"]
    queries.add_board(board_title)
    return {"title": board_title, "http_code": 201}


@api_board_bp.route("/boards/<int:board_id>/cards/", methods=["POST"])
# @json_response
# def create_board():
#     board_title = request.get_json()["title"]
#     queries.add_board(board_title)
#     return board_title, 201


@api_board_bp.route("/boards/board")
@json_response
def post_board():
    board_title = request.json()
    return board_title, 201