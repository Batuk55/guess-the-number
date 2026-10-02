# 🎯 Guess The Number

A simple and interactive **Guess The Number** web game built with **Python, Flask, HTML, CSS, and JavaScript**.

The game generates a random number between **1 and 50**, and the player has to guess the number. After every guess, the game provides a hint telling the player whether to guess a **smaller** or **greater** number.

---

## 🎮 Live Demo

🌐 **Play the game:**
https://guess-the-number-objf.onrender.com/

---

## 📌 Features

* 🎯 Random number generation between 1 and 50
* 🔢 User input for making guesses
* ⬆️ Hint to guess a greater number
* ⬇️ Hint to guess a smaller number
* 📊 Tracks the number of attempts
* 🎉 Displays a success message when the correct number is guessed
* 🔄 New Game option
* 🎨 Interactive and responsive gaming interface
* 🐍 Python Flask backend
* 🌐 HTML, CSS and JavaScript frontend

---

## 🛠️ Technologies Used

### Backend

* **Python**
* **Flask**
* **Random module**

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript**

### Development Tools

* **Visual Studio Code**
* **Git**
* **GitHub**

### Deployment

* **Render**

---

## 📂 Project Structure

```text
Guessing Game/
│
├── app.py
├── guessing_game.py
├── requirements.txt
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

---

## ⚙️ How the Game Works

1. The Flask application starts the game.
2. Python generates a random number between **1 and 50**.
3. The player enters a number through the web interface.
4. The guess is sent to the Flask backend.
5. Python compares the user's guess with the randomly generated number.
6. The backend returns a hint:

   * **"Guess a greater number"**
   * **"Guess a smaller number"**
   * **Correct guess**
7. The number of attempts is updated after every guess.
8. The player can start a new game at any time.

---

## 🐍 Original Python Game Logic

The core game was initially created as a simple Python console program:

```python
import random

random_number = random.randint(1, 50)

num = int(input("Enter the number you guessed : "))

attempts = 1

while num != random_number:

    attempts += 1

    if num > random_number:
        num = int(input("Guess a smaller number : "))

    elif num < random_number:
        num = int(input("Guess a greater number : "))

print("Congrats!! the guessed number is : ", num)
print("You took", attempts, "attempts.")
```

The project was later converted into a **web-based game using Flask**, while keeping the same core guessing logic.

---

## 🚀 Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Batuk55/guess-the-number.git
```

Move into the project directory:

```bash
cd guess-the-number
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the Flask application

```bash
python app.py
```

The application should start on:

```text
http://127.0.0.1:5000/
```

Open the URL in your browser and start playing.

---

## 📦 Requirements

The main dependency is:

```text
Flask
```

All required Python packages are listed in:

```text
requirements.txt
```

---

## 🔮 Future Improvements

Possible improvements for future versions:

* 🏆 High-score system
* ⏱️ Timer-based gameplay
* 🎚️ Multiple difficulty levels
* 🔢 Different number ranges
* 👤 Player names
* 🏅 Leaderboard
* 🌙 Dark/Light mode
* 🔊 Sound effects
* 📱 Improved mobile interface
* 💾 Persistent scores using a database

---

## 🎯 Learning Objectives

This project demonstrates the fundamentals of:

* Python programming
* Conditional statements
* Loops
* Random number generation
* Functions
* Flask routing
* HTTP requests
* Frontend-backend communication
* HTML/CSS/JavaScript integration
* Git and GitHub
* Web deployment

---

## 👨‍💻 Author

**Batuk Singh**

B.Tech — Computer Science Engineering
Specialization: Data Science

GitHub:
https://github.com/Batuk55

---

## 📄 License

This project is open-source and available for learning and educational purposes.
