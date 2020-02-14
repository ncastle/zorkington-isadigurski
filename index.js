const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines
let states = {
  'roomOne': { canChangeTo: ['roomTwo'] },
  'roomTwo': { canChangeTo: ['roomThree'] },
  'roomThree': { canChangeTo: ['roomOne'] }
};

let currentState = "green";

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}
//Room Template.................................................
class Room {
  constructor(desc, inv, locked) {
    this.desc = desc
    this.inv = inv
    this.locked = locked
  }
}

let insideOne = new Room('', [], true)
let insideTwo = new Room('', [], true)
let insideThree = new Room('', [], true)
let insideFour = new Room('', [], true)
let insideFive = new Room('', [], true)
//..............................................................
let yesResponse = ['Y', 'Yes', 'YES', 'yes', 'y']
let noResponse = ['N', 'No', 'NO', 'no', 'n']
//let theResponse = ""
//..............................................................

start();

async function start() {
//player1.name = null;
//player1.name = userName;
  let response = await ask("\nI want to play a game. It's similar to the game you play.  Would you like to continue Y or N?\n\n>_")

  if (noResponse.includes(response)) {
    console.log("Goodbyes")
    process.exit()
    //playerName = null;
    //plyerName = userName;
  } else if (yesResponse.includes(response)) {
    let userName = await ask("\nWhat is your name player?\n\n>_")

    //let response = await ask("\nMost people are so ungrateful to be alive but not you" + playerName)
 } else {
   console.log("Peace Out")
   process.exit()
 }
 //.............................................................
let getResponseMainSt = thePrompt => {
  let theResponse = "";

 if (thePrompt === "read sign\n\n") {
   theResponse = "The sign says 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code12345'";
 } else if (thePrompt === "take sign") {
   theResponse = "The door is locked. There is a keypad on the door handle. \n"
 } return theResponse;
}};
