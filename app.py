from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

random_number = random.randint(1, 50)
attempts = 0


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/guess", methods=["POST"])
def guess():
    global random_number, attempts

    data = request.get_json()
    num = int(data["guess"])

    attempts += 1

    if num > random_number:
        return jsonify({
            "message": "Guess a smaller number!",
            "attempts": attempts,
            "correct": False
        })

    elif num < random_number:
        return jsonify({
            "message": "Guess a greater number!",
            "attempts": attempts,
            "correct": False
        })

    else:
        return jsonify({
            "message": "Congratulations! You guessed it!",
            "attempts": attempts,
            "correct": True
        })


@app.route("/new-game", methods=["POST"])
def new_game():
    global random_number, attempts

    random_number = random.randint(1, 50)
    attempts = 0

    return jsonify({
        "message": "New game started!"
    })


if __name__ == "__main__":
    app.run(debug=True)