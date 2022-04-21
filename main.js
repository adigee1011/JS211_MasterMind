'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let counter = 0;



const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let solutionArray = solution.split('');
  console.log(solutionArray);
  let guessArray = guess.split('');
  console.log(guessArray);

  let correctLetterLocations = 0;
  let correctLetter = 0;
  counter++;

  for (let i=0;i<solutionArray.length;i++) {
    if(solutionArray[i] == guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
      console.log(guessArray);
      console.log(correctLetterLocations);
    }

}

for (let i=0;i<solutionArray.length;i++) {
  let targetIndex = solutionArray.indexOf(guessArray[i])
  if (targetIndex != -1) {
    correctLetter++;
    solutionArray[targetIndex] = null;
    console.log(correctLetter);
  }


}
let hint = `There are ${correctLetterLocations} letters at correct locations and ${correctLetter} letters present but at incorrect locations`
board.push(guess+ ": " + hint);
console.log(board);


}

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  console.log(solution);
  console.log(guess)
  // your code here
  if(guess === solution) {
    console.log( 'You guessed it')
  } else {
    console.log("this is turn no:", counter)
    generateHint(guess)
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    if(counter<3) {
    getPrompt();
    } else {
    return;
    }
    
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}