from flask import Flask, render_template, request, jsonify, session
import random

app = Flask(__name__)

app.secret_key = "guessing-game-secret-key"


@app.route("/")
def home():

    if "random_number" not in session:
        session["random_number"] = random.randint(1, 50)
        session["attempts"] = 0

    return render_template("index.html")


@app.route("/guess", methods=["POST"])
def guess():

    data = request.get_json()

    num = int(data["guess"])

    random_number = session["random_number"]

    session["attempts"] += 1

    attempts = session["attempts"]

    if num > random_number:

        return jsonify({
            "message": "Too high! Try a smaller number.",
            "status": "high",
            "attempts": attempts,
            "correct": False
        })

    elif num < random_number:

        return jsonify({
            "message": "Too low! Try a greater number.",
            "status": "low",
            "attempts": attempts,
            "correct": False
        })

    else:

        return jsonify({
            "message": "You guessed it!",
            "status": "correct",
            "attempts": attempts,
            "correct": True
        })


@app.route("/new-game", methods=["POST"])
def new_game():

    session["random_number"] = random.randint(1, 50)

    session["attempts"] = 0

    return jsonify({
        "message": "New game started!"
    })


if __name__ == "__main__":
    app.run(debug=True)