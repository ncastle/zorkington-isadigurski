const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
//..................................................................Capitalized Letter
function cap(word) {
  let firstLetter = word[0];
  let restOfWord = word.slice(1);
  return firstLetter.toUpperCase() + restOfWord.toLowerCase();
}
//.......................................................................Player Object
let playerObj = {
  'name': '',
  'location': 'Outside Main St.',
  'inventory': ''
}
////.....................................................................State Machine
/*We planned on using a state machine and might use it in the future if needed but excluded it in this version*/
//let rooms = {
//  "kingsLanding": { canChangeTo: ["cherryGarcia", "jumanji", "officeSpace", "escapeRoom"] },
//  "cherryGarcia": { canChangeTo: ["officeSpace"] },
//  "jumanji": { canChangeTo: ["kingsLanding", "cherryGarcia", "officeSpace", "escapeRoom"] },
//  "officeSpace": { canChangeTo: ["kingsLanding", "cherryGarcia", "jumanji", "escapeRoom"] },
//  "escapeRoom": { canChangeTo: [""] }
//}
//
//let roomLookup = {
//  'kingsLanding': kingsLanding,
//  'cherryGarcia': cherryGarcia,
//  'jumanji': jumanji,
//  'officeSpace': officeSpace,
//  'escapeRoom': escapeRoom
//}
//
//let currentState = 'kingsLanding'
//let currentRoom = roomLookup[currentState]
//
//function enterRoom(newRoom) {
//  let validTransitions = rooms[currentRoom.name].canChangeTo;
//  if (validTransitions.includes(newRoom.name)) {
//    currentRoom = newRoom;
//  } else {
//    throw 'Invalid room transition attempted - from ' + currentRoom + "to" + newRoom.name;
//  }
//}
//.......................................................................Room Template
/*We built this with the intentions of using it along side the state machines*/
//class Room {
//  constructor(name, inv, locked = false) {
//    this.name = name
//    this.inv = inv
//    this.locked = locked
//  }
//}
//
//let room1 = new Room('Foyer', [keys, knife, trident Gum, old seven days], true)
//let room2 = new Room('King's Landing', [], true)
//let room3 = new Room('Cherry Garcia', [], true)
//let room4 = new Room('Jumanji', [], true)
//let room5 = new Room('Office Space', [], true)
//let room6 = new Room('Escape Room', [], true)
//............................................................................Response
let yesResponse = ['Y', 'Yes', 'YES', 'yes', 'y']
let noResponse = ['N', 'No', 'NO', 'no', 'n']
let response = ""
//....................................................................................

start();
//.....................................................................Welcome Message
async function start() {
  playerObj.name = await ask("\nWhat is your name peasant?\n\n")
  console.log("\n" + cap(playerObj.name) + ", Most people are so ungrateful to be alive but not you." +
    "\nYou are standing outside 182 Main Street between Church and South Winooski." +
    "\nThere is a door here. A keypad sits on the handle. On the door is a handwritten sign.")
  playerObj.location = 'Outside Main St'
  while (response !== 'exit') {
    response = await ask('\n>_')
    if (noResponse.includes(response)) {
      console.log("Goodbye")
      process.exit()
    } else if (yesResponse.includes(response)) {
      //.......................................................Outside 182 Main Street
    } else if (response.toLowerCase() === "read sign") {
      response = console.log('\nThe sign says "Welcome to Burlington Code Academy!' +
        '\nCome on up to the third floor.' +
        '\nIf the door is locked, use the code 12345."');
    } else if (response === "take sign") {
      response = console.log('\nThat would be selfish. How will other students find their way?');
    } else if (response === "open door") {
      response = console.log("\nThe door is locked. There is a keypad on the door handle.")
    } else if (response === "enter code 12345") {
      playerObj.location = 'In the Foyer'
      response = console.log("\nYou are in a Foyer.\nAhead of you are a set of stairs and four items lay on a table \n(A set of keys,  a knife, Trident Gum, and an old Seven Days).\n")
      console.log(playerObj)
      //check
      //............................................................Foyer.....Room One
    } else if (response.toLowerCase() === "grab items") {
      response = console.log("\nYou grab the items and add them to your inventory.")
    } else if (response.toLowerCase() === "go up stairs") {
      playerObj.location = 'In the Hallway'
      response = console.log("\nYou walk up the stairs and enter a hallway with five doors numbered 1 through 5\n")
      console.log(playerObj) //check
      //...................................................King's Landing.....Room Two
    } else if (response.toLowerCase() === "enter door 1") {
      playerObj.location = 'Kings Landing'
      response = console.log(`\nYou have entered the "King's Landing". A strange individial is sitting at a desk mumbling about a missing Seven Days\n`)
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "give seven days") {
      response = console.log('\nThe strange man looks into your eyes, flips you a coin and says "Keep the change you filthy animal"')
    } else if (response.toLowerCase() === "exit room") {
      playerObj.location = 'Hallway'
      response = console.log("\nYour're back in the hallway stairing at a 3D photo\n")
      console.log(playerObj) //check
      //..................................................Cherry Garcia.....Room Three
    } else if (response.toLowerCase() === "enter door 2") {
      playerObj.location = 'cherry garcia room'
      response = console.log(`\nThere is a freezer in the middle of the room, do you want to "put the ice cream in freezer"\n`)
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "put the ice cream in the freezer") {
      response = console.log(`\nYour Strawberry Cheese Cake ice cream will be safe in here, go to room 4 to get a spoon\n`)
    } else if (response.toLowerCase() === "exit room" && playerObj.location == 'cherry garcia room') {
      playerObj.location = 'Hallway'
      response = console.log("\nYou're back in the hallway staring at the 3D photo again. A kid tugs your pants and says its a schooner." +
        `You reply it's not a schooner...It's a Sailboat.  The little boy replies with "A schooner IS a sailboat stupid head!"\n`)
      console.log(playerObj) //check  
      //.........................................................Jumanji.....Room Four
    } else if (response.toLowerCase() === "enter door 3") {
      response = console.log(`\nDoor is locked. Where are the keys?\n`)
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "use keys") {
      response = console.log(`\nDoor unlocks, enter room`)
    } else if (response.toLowerCase() === "enter room") {
      response = console.log(`\nA lion roars and you immediately close the door`)
    } else if (response.toLowerCase() === "exit room") {
      playerObj.location = 'In the Hallway'
      response = console.log("\nYou're in the hallway now\n")
      console.log(playerObj) //check
      //....................................................Office Space.....Room Five
    } else if (response.toLowerCase() === "enter door 4") {
      response = console.log(`\nWelcome to the kitchen.\nLet me give you a tour.` +
        `\nHere we have a microwave, dishwasher, fridge, and some cupboards.` +
        `\nFeel free to USE anything, but don't forget to clean up after yourself\n`)
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "use microwave") {
      response = console.log(`\nClose the door it smells like someone nuked some fish in there.  The smell covers the whole room.`)
    } else if (response.toLowerCase() === "use dishwasher") {
      response = console.log(`\nThe dishwasher is in use at the moment.  You don't want to ruin the cycle.  A clean dish is a good dish.`)
    } else if (response.toLowerCase() === "open fridge") {
      response = console.log(`\nThe fridge was recently cleaned and everything tossed.  No one takes there items home.`)
    } else if (response.toLowerCase() === "open cupboards") {
      response = console.log(`\nYou have found the GOLDEN SPOON, do you have anything to "TRADE" for it.`)
    } else if (response.toLowerCase() === "trade knife") {
      response = console.log(`\nIt's dangerous to go alone! Take This.  The GOLDEN SPOON has been added to your inventory list`)
    } else if (response.toLowerCase() === "exit room") {
      playerObj.location = 'In the Hallway'
      response = console.log(`\nYou're in the hallway now\n`)
      console.log(playerObj) //check
      //......................................................Escape Room.....Room Six
    } else if (response.toLowerCase() === "enter door 5") {
      response = console.log("\nIt's a room inside a room inside a room...if you want to exit I'll give you a hint.\n")
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "hint") {
      response = console.log(`\nReverse Text The Name of The Room You're In`)
    } else if (response.toLowerCase() === "mooR epacsE") {

      response = console.log(`\nYou're in the hallway now\n`)
      console.log(playerObj) //check
      //..........................................................................Exit   
    } else if (response.toLowerCase() === "end game") {
      console.log("\nIt’s understanding that makes it possible for people like us to tolerate a person like yourself.")
      process.exit()
    } else {
      console.log(`\nI don't recognize that command`)
    }
  }
}
//CapsLock = when you type READ SIGN => I don't recognize that command => We need to do a toLowerCase (Finished)
//Need to not be able to walk up stairs in Foyer until items are picked up
//Need to put a True/False statement on door 3 to enter.  The door is locked but you are able to enter it.
//Need to make every "exit room", specific to its room.  When you type in "exit room", it loops back and always states "You're back in the hallway staring at a 3D photo"
//

//sanitize inputs (door code)