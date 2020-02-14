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
//......................................................................Player Object
let playerObj = {
  'name': '',
  'location': '',
  'inventory': ''
}

//.......................................................................Room Template
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
//............................................................................Response
let yesResponse = ['Y', 'Yes', 'YES', 'yes', 'y']
let noResponse = ['N', 'No', 'NO', 'no', 'n']
let response = ""
//....................................................................................

start();
//.....................................................................Welcome Message
async function start() {
  console.log("\nMost people are so ungrateful to be alive but not you." +
    "182 Main St. You are standing on Main Street between Church and South Winooski." +
    "There is a door here. A keypad sits on the handle.  On the door is a handwritten sign.\n")
  while (response !== 'exit') {
    response = await ask('>_')
    if (noResponse.includes(response)) {
      console.log("Goodbyes")
      process.exit()
    } else if (yesResponse.includes(response)) {
      //.......................................................Outside 182 Main Street
    } else if (response === "read sign") {
      response = console.log('The sign says "Welcome to Burlington Code Academy!\n' +
        ' Come on up to the third floor.' +
        ' If the door is locked, use the code 12345."');
    } else if (response === "take sign") {
      response = console.log('That would be selfish. How will other students find their way?\n');
    } else if (response === "open door") {
      response = console.log("The door is locked. There is a keypad on the door handle.\n")
    } else if (response === "enter code 54321") {
      response = console.log("You are in a Foyer. Ahead of you are a set of stairs and four items lay on a table (A set of keys,  a knife, Trident Gum, and an old Seven Days).\n")
      //.......................................................................Foyer
    } else if (response === "take items") {
      response = console.log("You grab the items and add them to your inventory.\n")
    } else if (response === "go up stairs") {
      response = console.log("You walk up the stairs and enter a hallway with five doors numbered 1 through 5\n")
      //......................................................................Room One
    } else if (response === "enter door 1") {
      response = console.log("A strange individial is sitting at a desk mumbling about a missing Seven Days")
    } else if (response === "give seven days") {
      response = console.log('The strange man looks into your eyes, flips you a coin and says "Keep the change you filthy animal"')
    } else if (response === "exit room") {
      response = console.log("Your're back in the hallway stairing at a 3D photo")
      //......................................................................Room Two
    } else if (response === "enter door 2") {
      response = console.log("")
    } else if (response === "exit room") {
      response = console.log("You're back in the hallway staring at the 3D photo again. A kid tugs your pants and says its a schooner." +
        `You reply it's not a schooner...It's a Sailboat.  The little boy replies with "A schooner IS a sailboat stupid head!"`)
      //....................................................................Room Three
    } else if (response === "enter door 3") {
      response = console.log(`Door is locked. Where are the keys?`)
    } else if (response === "use keys") {
      response = console.log(`Door unlocks, enter room`)
    } else if (response === "enter room") {
      response = console.log(``)
    } else if (response === "exit room") {
      response = console.log("You're in the hallway now")
      //.....................................................................Room Four
    } else if (response === "enter door 4") {
      response = console.log("")
    } else if (response === "exit room") {
      response = console.log(`You're in the hallway now`)
      //.....................................................................Room Five
    } else if (response === "enter door 5") {
      response = console.log("")
    } else if (response === "exit room") {
      response = console.log(`You're in the hallway now`)
      //..........................................................................Exit   
    } else {
      console.log("Peace Out")
      process.exit()
    }
  }
}