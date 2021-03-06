require('dotenv').config();
//set our api for the bot
const Discord = require('discord.js');
const client = new Discord.Client();
//console log our bots name to let us know we've joined the server
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//take our token from .env
client.login(process.env.DISCORD_TOKEN);
//construct our playing card deck object
class Deck {
  constructor() {
    this.deck = [];
    //build out each array with suits and numbers
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

    //two loops, one for each array, and pull out one suit and one number
    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(`${values[value]} of ${suits[suit]}`);
      }
    }
  }
  //randomize the items in our deck object
  shuffle() {
    const { deck } = this;
    let m = deck.length,
      i;
    
    while (m) {
      i = Math.floor(Math.random() * m--);
      //pull a suit and a card, and randomize the results into a new object
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }
  //take last item off of deck (card we just made)
  deal() {
    return this.deck.pop();
  }
}
//UI logic
//function to be called by user, with prompted response
function shuffleCards() {
  deck1.shuffle();
  let message = `smoke or fire?`;
  return message;
}
//function to draw card by user, handle logic, and return results
function drawCard(userChoice) {
  
  let result = deck1.deal();
  let tmp = result;
  let hist = tmp.slice(0,1);
  let smoke = "!smoke";
  let fire = "!fire";
  let color;
  let choice = userChoice;
  let number; 
  //define the colors of each card to compare with user response
  if(tmp.includes("Spades") === true || tmp.includes("Clubs") === true) {
    color = smoke;
  } else {
    color = fire;
  }
//unless hist returns a character, set number to value of hist
  if(isNaN(hist) === false){
    number = parseInt(hist);
  }

  //convert face cards to numbers for logic separation
  if(hist === "J"){
    number = 11;
  }else if(hist === "Q"){
    number = 12;
  }else if(hist === "K"){
    number = 13;
  }else if(hist === "A"){
    number = 14;
  }else{
    hist = hist;
  }
  //temporary storage for the last value of our counter.
  lastCount = counter;
  
  //put the card drawn in an array for storage
  history.push(number);
  //this is our comparator for the higher/lower user commands
  let lastNumber = history[history.length -2];

  //statement evaluates user input to control logic flow and reply to user
  switch(choice){
    case "!smoke":
      if(color === choice){
        counter++;
        let message =  tmp + " Correct! Drinks: "  +  lastCount + " " + ". ";
        return message;
      }else{
        let message = tmp + " " + "Wrong! Take "  + lastCount + " drink(s). ";
        return message;
      }
    case "!fire":
      if(color === choice){
        counter++;
        let message =   tmp + " Correct! Drinks: "  +  lastCount + " " + ". ";
        return message;
      }else{
        let message =  tmp + " " + "Wrong! Take "  + lastCount + " drink(s). ";
        counter = 1;
        return message;
      }
    case "!higher":
      if(number > lastNumber){
        counter++;
        let message =    tmp + " Correct! Drinks: "  +  lastCount + " " + ". ";
        return message;
      }else if(number === lastNumber){
        let message =  tmp + " " + "Wrong! Take "  + (lastCount*2) + " drink(s). ";
        counter = 1;
        return message;
      }else{
        let message =  tmp + " " + "Wrong! Take "  + lastCount + " drink(s). ";
        counter = 1;
        return message;
      }
    case "!lower":
      if(number < lastNumber){
        counter++;
        let message =   tmp + " Correct! Drinks: "  +  lastCount + " " + ". ";
        return message;
      }else if(number === lastNumber){
        let message =  tmp + " " + "Wrong! Take "  + (lastCount*2) + " drink(s). ";
        counter = 1;
        return message;
      }else{
        let message =  tmp + " " + "Wrong! Take "  + lastCount + " drink(s). ";
        counter = 1;
        return message;
      }
    default:
      let message =  "Something went wrong. Please enter another command. ";
      return message;
      }
    }


const deck1 = new Deck();
const history = [];
let counter = 1;
let lastCount;
client.on('message', msg => {
  if(msg.content === '!smoke or fire') {
    let response = shuffleCards();
    msg.reply('you ready??');
    msg.reply(response);
  }
    if(msg.content === '!smoke') {
      let userChoice = msg.content;
      let result = drawCard(userChoice,history,counter);
      msg.reply(result);
      msg.reply("Smoke or fire, low or higher?");  
    }
    if(msg.content === '!fire') {
      let userChoice = msg.content;
      let result = drawCard(userChoice,history,counter);
      msg.reply(result);
      msg.reply("Smoke or fire, lower or higher?");
    }
    if(msg.content === '!higher') {
      let userChoice = msg.content;
      let result = drawCard(userChoice,history,counter);
      msg.reply(result);
      msg.reply("Smoke or fire, lower or higher?");
    }
    if(msg.content === '!lower') {
      let userChoice = msg.content;
      let result = drawCard(userChoice,history,counter);
      msg.reply(result);
      msg.reply("Smoke or fire, lower or higher?");
    }
    if(msg.content === '!pass') {
      msg.reply("Next player, you're up!");
      msg.reply("Smoke or fire, lower or higher?");
    }
});


