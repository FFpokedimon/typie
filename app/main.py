import os
from flask import Flask, render_template
import secrets
from app.db.db_connection import database
from app.models.user_model import User
from app.models.game_model import Game

app = Flask(__name__, instance_path=os.getcwd())
app.config["SECRET_KEY"] = secrets.token_urlsafe(32)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/typie.db"
app.config['SQLALCHEMY_ECHO'] = True

database.init_app(app)
with app.app_context():
    database.create_all()


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/levels")
def levels():
    return render_template("levels.html")


@app.route("/sandbox")
def sandbox():
    return render_template("sandbox.html")


@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")


@app.route("/profile")
def profile():
    return render_template("profile.html")


if __name__ == "__main__":
    app.run(port=8081, debug=True)
