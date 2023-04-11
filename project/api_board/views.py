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

@api_board_bp.route("/statuses")
@json_response
def get_satatuses():
    """
    All the statuses
    """
    return queries.get_statuses()

@api_board_bp.route("/boards/<int:board_id>/")
@json_response
def get_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_board(board_id)

@api_board_bp.route("/cards/<int:card_id>/")
@json_response
def get_card(card_id: int):
    """
    """
    return queries.get_card(card_id)

@api_board_bp.route("/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)

### example get column
@api_board_bp.route("/boards/<int:board_id>/column/")
@api_board_bp.route("/boards/<int:board_id>/column/<int:column_id>/cards/")


@api_board_bp.route("/status/<int:status_id>")
@json_response
def get_status(status_id: int):
    """
    """
    return queries.get_status(status_id)


@api_board_bp.route("/boards/", methods=["POST"])
@json_response
def create_board():
    board_title = request.get_json()["title"]
    queries.add_board(board_title)
    return {"title": board_title, "http_code": 201}


@api_board_bp.route("/boards/cards/", methods=["POST"])
@json_response
def create_card():
    data = request.get_json()
    board_id = request.get_json()["board_id"]
    status_id = request.get_json()["status_id"]
    title = request.get_json()["title"]
    card_order = request.get_json()["card_order"]
    queries.add_card(board_id, status_id, title, card_order)
    return data, 201


