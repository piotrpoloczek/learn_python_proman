from flask import Flask, render_template, request, redirect, url_for, session
from util import util
from app import app
import os


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    if util.is_logged():
        user_name = session['user_name']
    else:
        user_name = None
    return render_template('app/index.html', user_name = user_name)

@app.route("/design/")
def design():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('app/design.html')