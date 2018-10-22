const http = require('http');
const readline = require('readline');
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

function MadLibComponents(input) {
  this.blanks = input.blanks;
  this.title = input.title;
  this.value = sanitizeValue(input.value);
}

function start() {
  getMadLib(handleResponse);
}

function getTemplate(userAnswers, value) {
  let template = '';
  let arrayLength = value.length;

  let endsOnUserInput = userAnswers.length === arrayLength;

  for (i = 0; i < arrayLength; i++) {
    template += value[i];

    if (i < arrayLength - 1) {
      template += userAnswers[i];
    }

    if (endsOnUserInput && i === (arrayLength - 1)) {
      template += userAnswers[i];
    }
  }
  
  rl.close()
  return template;
}

function getMadLib(callback) {
  http.get(options, res => {
    // handleResponse
    callback(res, returnJson);
  })
  .on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
  });
}

function handleResponse(res, callback) {
  // returnJson
  res.on('data', chunk => callback(chunk, printNewMadLib));
}

function returnJson(rawData, callback) {
    try {
      // printNewMadLib
      callback(JSON.parse(rawData), handleAnswer);
    } catch (e) {
      console.error(e.message);
    }
}

function printNewMadLib(input, callback) {
  let madLibParts = new MadLibComponents(input);

  rl.question(`Welcome to Mad Libs! Ready to play?\n`, (answer) => {
    // handleAnswer
    callback(madLibParts, answer, handleUserInput);
  });
}

function handleAnswer(madLibParts, answer, callback) {
  if (['y', 'yes'].includes(answer.toLowerCase())) {
    // handleUserInput
    callback(madLibParts.blanks, madLibParts.value, getUserInput);
  } else {
    console.log('Goodbye!');
    rl.close();
  }
}

function handleUserInput(parts, value, callback) {
  // getUserInput
  callback(parts, (userAnswers) => {
    console.log(getTemplate(userAnswers, value));
  });
}

function userPrompt(part) {
  console.log(`Please enter a(n) ${part}:`);
  rl.prompt();
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
      // getTemplate
      callback(userResponses);
    }
  });
}

function sanitizeValue(value) {
  return value.filter(item => item !== 0);
}

module.exports = { start, getTemplate };
