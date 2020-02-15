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
  'location': 'Outside Main St.',
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
    "\nYou are standing outside 182 Main Street between Church and South Winooski." +
    "\nThere is a door here. A keypad sits on the handle.  On the door is a handwritten sign.\n")
  while (response !== 'exit') {
    response = await ask('>_')
    if (noResponse.includes(response)) {
      console.log("Goodbye")
      process.exit()
    } else if (yesResponse.includes(response)) {
      //.......................................................Outside 182 Main Street
    } else if (response.toLowerCase() === "read sign") {
      response = console.log('\nThe sign says "Welcome to Burlington Code Academy!\n' +
        'Come on up to the third floor.\n' +
        'If the door is locked, use the code 12345."\n');
    } else if (response === "take sign") {
      response = console.log('That would be selfish. How will other students find their way?');
    } else if (response === "open door") {
      response = console.log("The door is locked. There is a keypad on the door handle.\n")
    } else if (response === "enter code 12345") {
      playerObj.location = 'In the Foyer'
      response = console.log("You are in a Foyer. Ahead of you are a set of stairs and four items lay on a table (A set of keys,  a knife, Trident Gum, and an old Seven Days).\n")
      console.log(playerObj)
      //.......................................................................Foyer
    } else if (response.toLowerCase() === "grab items") {
      response = console.log("\nYou grab the items and add them to your inventory.\n")
    } else if (response.toLowerCase() === "go up stairs") {
      response = console.log("\nYou walk up the stairs and enter a hallway with five doors numbered 1 through 5\n")
      //..............................................................King's Landing
    } else if (response.toLowerCase() === "enter door 1") {
      response = console.log(`\nYou have entered the "King's Landing". A strange individial is sitting at a desk mumbling about a missing Seven Days\n`)
    } else if (response.toLowerCase() === "give seven days") {
      response = console.log('\nThe strange man looks into your eyes, flips you a coin and says "Keep the change you filthy animal"\n')
    } else if (response.toLowerCase() === "exit room") {
      response = console.log("\nYour're back in the hallway stairing at a 3D photo\n")
      //...............................................................Cherry Garcia
    } else if (response.toLowerCase() === "enter door 2") {
      response = console.log(`\nThere is a freezer in the middle of the room, do you want to "put the ice cream in freezer"\n`)
    } else if (response.toLowerCase() === "put the ice cream in the freezer") {
      response = console.log(`\nYour Strawberry Cheese Cake ice cream will be safe in here, go to room 4 to get a spoon\n`)
    } else if (response.toLowerCase() === "exit room") {
      response = console.log("\nYou're back in the hallway staring at the 3D photo again. A kid tugs your pants and says its a schooner." +
        `You reply it's not a schooner...It's a Sailboat.  The little boy replies with "A schooner IS a sailboat stupid head!"\n`)
      //.....................................................................Jumanji
    } else if (response.toLowerCase() === "enter door 3") {
      response = console.log(`\nDoor is locked. Where are the keys?\n`)
    } else if (response.toLowerCase() === "use keys") {
      response = console.log(`\nDoor unlocks, enter room\n`)
    } else if (response.toLowerCase() === "A lion roars and you immediately close the door") {
      response = console.log(`\n\n`)
    } else if (response.toLowerCase() === "exit room") {
      response = console.log("\nYou're in the hallway now\n")
      //................................................................Office Space
    } else if (response.toLowerCase() === "enter door 4") {
      response = console.log(`\nWelcome to the kitchen.\nLet me give you a tour.` + 
      `\nHere we have a microwave, dishwasher, fridge, and some cupboards.` +
      `\nFeel free to USE anything, but don't forget to clean up after yourself\n`)
    } else if (response.toLowerCase() === "use microwave") {
      response = console.log(`\nClose the door it smells like someone nuked some fish in there.  The smell covers the whole room.\n`)
    } else if (response.toLowerCase() === "use dishwasher") {
      response = console.log(`\nThe dishwasher is in use at the moment.  You don't want to ruin the cycle.  A clean dish is a good dish.\n`)
    } else if (response.toLowerCase() === "open fridge") {
      response = console.log(`\nThe fridge was recently cleaned and everything tossed.  No one takes there items home.\n`)
    } else if (response.toLowerCase() === "open cupboards") {
      response = console.log(`\nYou have found the GOLDEN SPOON, do you have anything to "TRADE" for it.\n`)
    } else if (response.toLowerCase() === "take GOLDEN SPOON") {
      response = console.log(`\nThe GOLDEN SPOON has been added to your inventory\n`)
    } else if (response.toLowerCase() === "trade knife") {
      response = console.log(`\nYou may now "TAKE" the GOLDEN SPOON\n`)
    } else if (response.toLowerCase() === "exit room") {
      response = console.log(`\nYou're in the hallway now\n`)
      //.................................................................Escape Room
    } else if (response.toLowerCase() === "enter door 5") {
      response = console.log("\nIt's a room inside a room inside a room...if you want to exit I'll give you a hint.\n")
    } else if (response.toLowerCase() === "hint") {
      response = console.log(`Reverse Text The Name of The Room You're In`)
    } else if (response.toLowerCase() === "mooR epacsE") {
      response = console.log(`\nYou're in the hallway now\n`)
      //........................................................................Exit   
    } else if (response.toLowerCase() === "end game") {
      console.log("\nPeace Out\n")
      process.exit()
    } else {
      console.log(`\nI don't recognize that command\n`)
    }
  }
}
//CapsLock = when you type READ SIGN => I don't recognize that command => We need to do a toLowerCase (Finished)
//Need to not be able to walk up stairs in Foyer until items are picked up
//Need to put a True/False statement on door 3 to enter.  The door is locked but you are able to enter it.
//Need to make every "exit room", specific to its room.  When you type in "exit room", it loops back and always states "You're back in the hallway staring at a 3D photo"
//

//sanitize inputs (door code)
