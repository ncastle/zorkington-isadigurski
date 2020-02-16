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
  'inventory': [],
  'status': ''
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
let response = ""
//....................................................................................

start();
//.....................................................................Welcome Message
async function start() {
  playerObj.name = await ask("\nWhat is your name peasant?\n\n")
  console.log(playerObj.name.toUpperCase() + ", Most people are so ungrateful to be alive but not you." +
    "You are standing outside 182 Main Street between Church and South Winooski." +
    "There is a door here. A keypad sits on the handle.  On the door is a handwritten sign. " +
    "If you ever want to know your location, as well as what you have in your possession, just say 'check status'")
    playerObj.location = 'outside 182 Main St'
    playerObj.status = ''
    playerObj.inventory = []
  while (response !== 'exit') {
    response = await ask('\n>_')
    
    //..........................................................EXIT STATEMENTS 
    //THIS BELOW IS FOR EXITING CHERRY GARCIA ROOM
    if (response.toLowerCase() === "exit room" && playerObj.location == 'in the Cherry Garcia room') {
      playerObj.location = 'in the Hallway'
      response = console.log("\nYou're back in the hallway staring at the 3D photo again. A kid tugs your pants and says its a schooner." +
        `You reply it's not a schooner...It's a Sailboat.  The little boy replies with "A schooner IS a sailboat stupid head!"\n`)
        console.log(playerObj) //check
    //THIS BELOW IS FOR EXITING JUMANJI
    } else if (response.toLowerCase() === "exit room" && playerObj.location == 'in Jumanji') {
        playerObj.location = 'in the Hallway'
        response = console.log("\nYou're in the hallway now\n")
        console.log(playerObj) //check

    //THIS BELOW IS FOR EXITING THE KITCHEN/OFFICE SPACE  
    } else if (response.toLowerCase() === "exit room" && playerObj.location == 'in the Kitchen') {
        playerObj.location = 'in the Hallway'
        response = console.log(`\nYou're in the hallway now\n`)
        console.log(playerObj) //check

    //THIS IS FOR EXITING THE ESCAPE ROOM
    } else if (response.toLowerCase() === "mooR epacsE" && playerObj.location == 'in Escape Room') {
        playerObj.location = 'in the Hallway'
        response = console.log(`\nYou're in the hallway now\n`)
        console.log(playerObj) //check
    //.................................................................................GAME STARTS HERE
  
      //.......................................................Outside 182 Main Street
    } else if (response === "check status") {
      console.log(playerObj.name + ", you are " + playerObj.location + ".\nYour inventory consists of the following items: " + playerObj.inventory + ".\n" + 
      "You are feeling " + playerObj.status + ".")

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
      response = console.log("\nYou are in a Foyer. Ahead of you are a set of stairs and four items lay on a table (A set of keys, a grenade, a pint of Strawberry Cheesecake ice cream, and an old Seven Days).\n")
      console.log(playerObj)
      //check
      //............................................................Foyer.....Room One
    } else if (response.toLowerCase() === "grab items") {
      playerObj.inventory.push('Keys', 'Grenade', 'Ice Cream', 'Seven Days')
      response = console.log("\nYou grab the items and add them to your inventory.")
      console.log(playerObj)
    } else if (response.toLowerCase() === "go up stairs") {
      playerObj.location = 'in the Hallway'
      let statusQues = await ask(playerObj.name + ", before you proceed, please describe in one word how you are feeling. ")
      playerObj.status = statusQues
      response = console.log("\nYour feeling status has been updated to " + playerObj.status + ".\n" + "Now you walk up the stairs and enter a hallway with five doors numbered 1 through 5.\n")
      console.log(playerObj) //check
      //...................................................King's Landing.....Room Two
    } else if (response.toLowerCase() === "enter door 1") {
      playerObj.location = 'in Kings Landing'
      response = console.log(`\nYou have entered the "King's Landing". A strange individial is sitting at a desk mumbling about a missing Seven Days\n`)
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "give seven days") {
      playerObj.inventory.splice(playerObj.inventory.indexOf('Seven Days'), 3)
      response = console.log('\nThe strange man looks into your eyes, flips you a coin and says "Keep the change you filthy animal"')
      console.log(playerObj)
    } else if (response.toLowerCase() === "exit room") {
      playerObj.location = 'in the Hallway'
      response = console.log("\nYou're back in the hallway stairing at a 3D photo\n")
      console.log(playerObj) //check
      //..................................................Cherry Garcia.....Room Three
    } else if (response.toLowerCase() === "enter door 2") {
      playerObj.location = 'in the Cherry Garcia room'
      response = console.log(`\nThere is a freezer in the middle of the room, do you want to "put the ice cream in the freezer"?\n`)
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "put the ice cream in the freezer") {
      playerObj.inventory.splice(playerObj.inventory.indexOf('Ice Cream'), 2)
      response = console.log(`\nYour Strawberry Cheese Cake ice cream will be safe in here, go to room 4 to get a spoon\n`)
    
    //............................................."exit room" ===> EXIT CHERRY GARCIA (SEE EXIT CODE AT TOP OF WHILE LOOP)
    //.........................................YOU ARE BACK IN HALLWAY
    
    } else if (response.toLowerCase() === "enter door 3") { 
      //.....................................................................Jumanji 
      response = console.log(`\nDoor is locked. Where are the keys?\n`)
    } else if (response.toLowerCase() === "use keys") {
      response = console.log(`\nDoor unlocks, enter room`)
    } else if (response.toLowerCase() === "enter room") {
      playerObj.location = 'in Jumanji'
      response = console.log(`\nA giant lion charges at you from across the room! 'Drop the grenade' and get out!!`)
    } else if (response.toLowerCase() === 'drop the grenade') {
      playerObj.inventory.splice(playerObj.inventory.indexOf('Grenade'), 1)
      console.log(`\nGrenade is dropped! Now exit room!!`)
    //..............................................."exit room" ===> EXIT JUMANJI (SEE EXIT CODE AT TOP OF WHILE LOOP)
    //............................................YOU ARE BACK IN HALLWAY
      //................................................................Kitchen
    } else if (response.toLowerCase() === "enter door 4") {
      playerObj.location = 'in the Kitchen'
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
      response = console.log(`\nThere is a spoon! You should take it, as I believe you need that for something...`)
    } else if (response.toLowerCase() === "take spoon") {
      playerObj.inventory.push('Spoon')
      response = console.log(`\nThe spoon has been added to your inventory list`)
    

    //..............................................."exit room" ===> EXIT KITCHEN (SEE EXIT CODE AT TOP OF WHILE LOOP)
    //.........................................YOU ARE BACK IN HALLWAY
    
      //.................................................................Escape Room
    } else if (response.toLowerCase() === "enter door 5") {
      playerObj.location = 'in Escape Room'
      response = console.log("\nIt's a room inside a room inside a room...if you want to exit I'll give you a hint.\n")
      console.log(playerObj) //check
    } else if (response.toLowerCase() === "hint") {
      response = console.log(`\nReverse Text The Name of The Room You're In`)

    //..............................................."exit room" ===> EXIT ESCAPE ROOM (SEE EXIT CODE AT TOP OF WHILE LOOP)
    
      //........................................................................Exit   
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
//Need to make every "exit room", specific to its room.  When you type in "exit room", it loops back and always states "You're back in the hallway staring at a 3D photo" (Finshed)
//Need to reorganize/rename a lot of things
//Need to have an end?
//Want to drop/pick items in certain rooms
//Want to use room objects to use boolean value for "locked/unlocked" property

//sanitize inputs (door code)