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
    return queries.get_everything('boards')
    # return queries.get_boards()


@api_board_bp.route("/boards/<int:board_id>/")
@json_response
def get_board(board_id: int):
    """
    """
    return queries.get_everything_by_id('boards','id',board_id)


@api_board_bp.route("/cards/<int:card_id>/")
@json_response
def get_card(card_id: int):
    """
    """
    return queries.get_everything_by_id('cards','id',card_id)


@api_board_bp.route("/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_everything_by_id('cards','board_id',board_id)


### example get column
@api_board_bp.route("/boards/<int:board_id>/columns/")
@json_response
def get_columns_for_board(board_id: int):
    """
    All columns that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_everything_by_id('columns','board_id',board_id)

@api_board_bp.route("/boards/column/<int:column_id>/cards/")
@json_response
def get_cards_for_columns(column_id: int):
    """
    All cards that belongs to a column
    :param column_id: id of the parent column
    """
    return queries.get_everything_by_id('cards','column_id',column_id)


@api_board_bp.route("/boards/", methods=["POST"])
@json_response
def create_board():
    board_title = request.get_json()["title"]
    queries.add_board(board_title)
    return {"title": board_title, "http_code": 201}


@api_board_bp.route("/boards/columns/", methods=["POST"])
@json_response
def create_column():
    data = request.get_json()
    board_id = request.get_json()["board_id"]
    title = request.get_json()["title"]
    column_order = len(queries.get_everything_by_id('columns', 'board_id', board_id)) + 1
    queries.add_column(board_id, title, column_order)
    return data, 201


@api_board_bp.route("/boards/columns/cards/", methods=["POST"])
@json_response
def create_card():
    data = request.get_json()
    column_id = request.get_json()["column_id"]
    title = request.get_json()["title"]
    card_order = len(queries.get_everything_by_id('cards','column_id',column_id)) + 1
    print(card_order)
    queries.add_card(column_id, title, card_order)
    return data, 201