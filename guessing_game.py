import random

random_number = random.randint(1, 50) # random number between 1 and 50;

num = int(input("Enter the number you guessed : "))
attempts = 1
while num != random_number:
    attempts += 1
    if num > random_number:
        num = int(input("Guess a smaller number : "))
    elif num < random_number:
        num = int(input("Guess a greater number : "))

print ("Congrats!! the guessed number is : ", num)
print ("You took", attempts, "attempts.")