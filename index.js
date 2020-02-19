/** Good start to what will be a good working game and a cool story line! One big thing to remember is to remove unused code like functions that you
 *  don't use and comments before submitting your project. Good comments for sectioning out code, but maybe a few more intermediate comments would be good.
 *  The long if-else chains are a little hard to read, so some spacing might be a good improvement for readability. Your game works with a specific set of
 *  commands and in a specific order, which completes the stories, but maybe you could try to add a little bit of flexibility to where you go and when.
 *  You have the right idea when picking up items and giving them to the right person/place. Maybe you can try to implement a way that you can pick up
 *  specific items from a room and be able to drop an item in any other room. **/
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
  'hunger_level': '',
  'been_to': []
}
/** Remember to remove all of this commented code for submissions, you can always save it to another file or look back at an old commit. **/
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
  console.log(`\n` + playerObj.name.toUpperCase() + `, Most people are so ungrateful to be alive but not you. You are standing outside 182 Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle.  On the door is a handwritten sign. If you ever want to know your location, as well as what you have in your possession, just say 'check status'`)
  playerObj.location = 'outside 182 Main St'
  playerObj.hunger_level = 'Mild'
  playerObj.inventory = []
  playerObj.been_to = []

  while (response !== 'exit') {
    response = await ask('\n>_')

    //..........................................................EXIT STATEMENTS
    //THIS BELOW IS FOR EXITING King's Landing
    if (response.toLowerCase() === "exit room" && playerObj.location == 'in Kings Landing') {
      playerObj.location = 'in the Hallway'
      console.log("\nYou're back in the hallway stairing at a 3D photo\n")

    //THIS BELOW IS FOR EXITING CHERRY GARCIA ROOM
    } else if (response.toLowerCase() === "exit room" && playerObj.location == 'in the Cherry Garcia room') {
      playerObj.location = 'in the Hallway'
      console.log(`\nYou're in the hallway now.\n`)

      //THIS BELOW IS FOR EXITING JUMANJI
    } else if (response.toLowerCase() === "exit room" && playerObj.location == 'in Jumanji') {
      playerObj.location = 'in the Hallway'
      console.log("\nYou're in the hallway now.\n")


      //THIS BELOW IS FOR EXITING THE KITCHEN/OFFICE SPACE
    } else if (response.toLowerCase() === "exit room" && playerObj.location == 'in the Kitchen') {
      playerObj.location = 'in the Hallway'
      console.log(`\nYou're back in the hallway staring at the 3D photo again. A kid tugs your pants and says its a schooner. You reply it's not a schooner...It's a Sailboat.  The little boy replies with "A schooner IS a sailboat stupid head!"\n`)


      //THIS IS FOR EXITING THE ESCAPE ROOM
    } else if (response === "mooR epacsE" && playerObj.location == 'in Escape Room') {

      console.log(`\nGame Over! Go home!\n`)
      process.exit()

      //.................................................................................GAME STARTS HERE
      /** Good use of comments to section out your code **/

      //.......................................................Outside 182 Main Street
    } else if (response === "check status") {
      console.log(playerObj.name + ", you are " + playerObj.location + ".\nYour inventory consists of the following items: " + playerObj.inventory + ".\n" +
        "Your hunger level is " + playerObj.hunger_level + ".")
    } else if (response.toLowerCase() === "read sign") {
      console.log('\nThe sign says "Welcome to Burlington Code Academy!' +
        '\nCome on up to the third floor.' +
        '\nIf the door is locked, use the code 12345."');
    } else if (response === "take sign") {
      console.log('\nThat would be selfish. How will other students find their way?');
    } else if (response === "open door") {
      console.log("\nThe door is locked. There is a keypad on the door handle.")
    } else if (response === "enter code 12345") {
      playerObj.location = 'In the Foyer'
      console.log("\nYou are in a Foyer. Ahead of you are a set of stairs and four items lay on a table (A set of keys, a grenade, a pint of Strawberry Cheesecake ice cream, and an old Seven Days). You will need all these things, so please 'grab items'\n")

      //............................................................Foyer.....

    } else if (response.toLowerCase() === "grab items" && playerObj.location == 'In the Foyer') {
      playerObj.inventory.push('Keys', 'Grenade', 'Ice Cream', 'Seven Days')
      console.log("\nYou grab the items and add them to your inventory.")
    } else if (response.toLowerCase() === "go up stairs") {
      playerObj.location = 'in the Hallway'
      console.log("\nYou walk up the stairs and enter a hallway with five doors numbered 1 through 5.\n")

      //...................................................King's Landing.....Door 1

    } else if (response.toLowerCase() === "enter door 1") {
      playerObj.hunger_level = 'Mild'
      playerObj.location = 'in Kings Landing'
      playerObj.been_to.push(1)
      console.log(`\nYou have entered the "King's Landing". You look a little hungry! Your hunger level will increase as you go along, until you find something to eat.\nA strange individial is sitting at a desk mumbling about a missing Seven Days\n`)
    } else if (response.toLowerCase() === "give seven days" && playerObj.inventory.includes('Seven Days')) {
      playerObj.inventory.splice(playerObj.inventory.indexOf('Seven Days'), 3)
      console.log('\nThe strange man looks into your eyes, flips you a coin and says "Keep the change you filthy animal"')

      //..................................................Cherry Garcia.....Door 2

    } else if (response.toLowerCase() === "enter door 2" && playerObj.been_to.includes(1)) {
      playerObj.hunger_level = 'Moderate'
      playerObj.location = 'in the Cherry Garcia room'
      playerObj.been_to.push(2)
      console.log(`\nThere is a freezer in the middle of the room. You should "put the ice cream in the freezer".\n`)
    } else if (response.toLowerCase() === "put the ice cream in the freezer" && playerObj.inventory.includes('Ice Cream')) {
      playerObj.inventory.splice(playerObj.inventory.indexOf('Ice Cream'), 2)
      console.log(`\nYour Strawberry Cheese Cake ice cream will be safe in here. You need to find a spoon in one of the next rooms!\n`)
      //............................................."exit room" ===> EXIT CHERRY GARCIA (SEE EXIT CODE AT TOP OF WHILE LOOP)

      //.........................................YOU ARE BACK IN HALLWAY

    } else if (response.toLowerCase() === "enter door 3" && playerObj.been_to.includes(2)) {
      //.....................................................................Jumanji.....Door 3
      console.log(`\nDoor is locked. Where are the keys?\n`)
    } else if (response.toLowerCase() === "use keys") {
      console.log(`\nDoor unlocks, enter room`)
    } else if (response.toLowerCase() === "enter room" && playerObj.been_to.includes(2)) {
      playerObj.hunger_level = 'Hangry'
      playerObj.location = 'in Jumanji'
      playerObj.been_to.push(3)
      console.log(`\nA giant lion charges at you from across the room! 'Drop the grenade' and get out!!`)
    } else if (response.toLowerCase() === 'drop the grenade') {
      playerObj.inventory.splice(playerObj.inventory.indexOf('Grenade'), 1)
      console.log(`\nGrenade is dropped! Now exit room!!`)
      //..............................................."exit room" ===> EXIT JUMANJI (SEE EXIT CODE AT TOP OF WHILE LOOP)

      //............................................YOU ARE BACK IN HALLWAY

      //................................................................Kitchen.......Door 4
    } else if (response.toLowerCase() === "enter door 4" && playerObj.been_to.includes(3)) {
      playerObj.hunger_level = 'Critical'
      playerObj.been_to.push(4)
      playerObj.location = 'in the Kitchen'
      console.log(`\nWelcome to the kitchen.\nLet me give you a tour.` +
        `\nHere we have a microwave, dishwasher, fridge, and some cupboards.` +
        `\nFeel free to USE anything, but don't forget to clean up after yourself` +
        `\nYour hunger level has reached critical mass!\n`)
    } else if (response.toLowerCase() === "use microwave") {
      console.log(`\nClose the door it smells like someone nuked some fish in there.  The smell covers the whole room.`)
    } else if (response.toLowerCase() === "use dishwasher") {
      console.log(`\nThe dishwasher is in use at the moment.  You don't want to ruin the cycle.  A clean dish is a good dish.`)
    } else if (response.toLowerCase() === "open fridge") {
      console.log(`\nThe fridge was recently cleaned and everything tossed.  No one takes there items home.`)
    } else if (response.toLowerCase() === "open cupboards") {
      console.log(`\nThere is a spoon! You should take it, as I believe you need that for something...`)
    } else if (response.toLowerCase() === "take spoon") {
      playerObj.inventory.push('Spoon')
      console.log(`\nYou have your spoon! There's a secret door back to room 2! 'Take the secret door' to fulfill your hunger!`)
    } else if (response === 'take the secret door') {
      playerObj.location = 'in the Cherry Garcia room'
      console.log("There's the freezer! 'Take out the ice cream'!")
    } else if (response.toLowerCase() === 'take out the ice cream') {
      console.log("Okay, now eat it before you die!")
    } else if (response.toLowerCase() === 'eat ice cream' && playerObj.inventory.includes('Spoon')) {
      playerObj.hunger_level = 'Fulfilled'
      console.log("Your hunger has been fulfilled! Exit room, and then enter the 5th and final door!")
      //..............................................."exit room" ===> EXIT KITCHEN (SEE EXIT CODE AT TOP OF WHILE LOOP)

      //.........................................YOU ARE BACK IN HALLWAY

      //.................................................................Escape Room.......Door 5
    } else if (response.toLowerCase() === "enter door 5" && playerObj.been_to.includes(4)) {
      playerObj.location = 'in Escape Room'
      playerObj.been_to.push(5)
      console.log("\nIt's a room inside a room inside a room...if you want to exit I'll give you a hint.\n")
    } else if (response.toLowerCase() === "hint") {
      console.log(`\nReverse Text The Name of The Room You're In`)

      //..............................................."exit room" ===> EXIT ESCAPE ROOM (SEE EXIT CODE AT TOP OF WHILE LOOP)


    } else if (response.toLowerCase() === 'eat ice cream') {
      console.log("You can't eat ice cream")
      //........................................................................Exit
    } else if (response.toLowerCase() === "end game") {
      console.log("\nIt’s understanding that makes it possible for people like us to tolerate a person like yourself.")
      process.exit()
    } else {
      console.log(`\nI don't recognize that command`)
    }
  }
}

/** Nice use of comments to keep track of what you have and haven't done. Remember to pull these out for your submission for better readability and
    organization. Maybe you can keep a TODO.txt file to keep these in. Then you can add that file to your .gitignore so that it is not tracked by git **/
//CapsLock = when you type READ SIGN => I don't recognize that command => We need to do a toLowerCase (Finished)
//Need to not be able to walk up stairs in Foyer until items are picked up
//Need to put a True/False statement on door 3 to enter.  The door is locked but you are able to enter it.
//Need to make every "exit room", specific to its room.  When you type in "exit room", it loops back and always states "You're back in the hallway staring at a 3D photo" (Finshed)
//Need to reorganize/rename a lot of things
//Need to have an end? (Finshed)
//Want to drop/pick items in certain rooms
//Want to use room objects to use boolean value for "locked/unlocked" property
//When removing items, we wanted to removes specific items.  It turns out it kept removing one item every time you gave a command to use an item.

//sanitize inputs (door code)
