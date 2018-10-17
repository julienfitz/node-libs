const http = require('http');
const readline = require('readline');
const madLibs = require('./utils');
const host = 'madlibz.herokuapp.com';
const path = '/api/random';
const options = {
  host: host,
  path: path
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

getMadLib();

function MadLibComponents(input) {
  this.blanks = input.blanks;
  this.title = input.title;
  this.value = sanitizeValue(input.value);
}

function getMadLib() {
  http.get(options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        printNewMadLib(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
  });
}

function printNewMadLib(input) {
  let madLibParts = new MadLibComponents(input);
  let userInput = [];

  rl.question(`Welcome to Mad Libs! Ready to play?\n`, (answer) => {
    if (answer.toLowerCase() === 'yes' || 'y') {
      handleUserInput(madLibParts.blanks, madLibParts.value);
    } else {
      console.log('Goodbye!');
      rl.close();
    }
  });
}

function getUserInput(parts, callback) {
  let userResponses = [];
  let i = 0;

  userPrompt(parts[i]);

  rl.on('line', (line) => {
    userResponses.push(line);
    i++;
    if ( i < parts.length ) {
      userPrompt(parts[i]);
    } else {
      rl.close();
      callback(userResponses);
    }
  });
}

function userPrompt(part) {
  console.log(`Please enter a(n) ${part}:`);
  rl.prompt();
}

function handleUserInput(parts, value) {
  getUserInput(parts, (userAnswers) => {
    console.log(madLibs.getTemplate(userAnswers, value));
  });
}

function sanitizeValue(value) {
  return value.filter(item => item !== 0);
}
