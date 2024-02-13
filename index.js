// Import necessary libraries
import inquirer from 'inquirer';
import chalk from 'chalk';
// Function to generate a random number between min and max (inclusive)
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Main game function
const playGame = async () => {
    const randomNumber = generateRandomNumber(1, 100);
    let attempts = 0;
    console.log(chalk.blue('Guess the number between 1 and 100'));
    let guessedCorrectly = false;
    while (!guessedCorrectly) {
        const answers = await inquirer.prompt([
            {
                type: 'number',
                name: 'guess',
                message: chalk.yellow('Enter your guess:'),
                validate: (input) => {
                    return (input >= 1 && input <= 100) || 'Please enter a number between 1 and 100.';
                },
            },
        ]);
        attempts++;
        if (answers.guess === randomNumber) {
            console.log(chalk.green(`Correct! The number was ${randomNumber}. It took you ${attempts} attempts.`));
            guessedCorrectly = true;
        }
        else if (answers.guess < randomNumber) {
            console.log(chalk.red('Too low! Try again.'));
            console.log(chalk.magenta(`Attempt #${attempts}`)); // Show attempt number
        }
        else {
            console.log(chalk.red('Too high! Try again.'));
            console.log(chalk.magenta(`Attempt #${attempts}`)); // Show attempt number
        }
    }
    // Ask if the user wants to play again
    const playAgainAnswers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Do you want to play again?',
            default: false,
        },
    ]);
    if (playAgainAnswers.playAgain) {
        playGame();
    }
    else {
        console.log(chalk.blue('Thanks for playing!'));
        console.log(chalk.yellow(`The last number was ${randomNumber}.`)); // Show the last random number before exiting
        console.log(chalk.blue('Goodbye.'));
    }
};
// Start the game
playGame().catch(error => console.error(error));
