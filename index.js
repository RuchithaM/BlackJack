


let firstNumber;
let secoundNumber;
let cards = [];
let isAlive = false;
let hasBlackjack=false;
let sum;
var audio;

let msgEl = document.querySelector(".msg-el");
let cardEl = document.querySelector(".card-el");
let sumEl = document.querySelector(".sum-el");
let plyEl = document.querySelector(".player-el");

let player = {
  name: "",
  chips:0
}

player.name = prompt("Enter player's name: ");
plyEl.textContent=player.name+": $"+player.chips;




function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1; //without +1 it will return number b/w 0-12; A(1) -> retun 11; 11 12 13 -> return 10
  if (randomNumber === 1) return 11;
  if (randomNumber > 10) return 10;
  else return randomNumber;
}


function startGame() {

  playSound("card-drop");
  isAlive = true;
  firstNumber = getRandomCard();
  secoundNumber = getRandomCard();
  cards = [firstNumber, secoundNumber];
  sum = firstNumber + secoundNumber;
  renderGame();
}



function renderGame() {

  if (sum < 21) {
    msg = "Do you want to draw another card?";
  } else if (sum === 21) {
    msg = "You got Blackjack!";
    hasBlackjack=true;
    playSound("won");
    player.chips+=20;

  } else {
    msg = "You are out of the game!";
    isAlive=false;
    playSound("lost");
    player.chips-=10;
  }
  msgEl.textContent = msg;
  cardEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if(player.chips>0){
    plyEl.textContent=player.name+": $"+player.chips;
  } else{
    player.chips=145;
  }

}

function playSound(sound){
  sound+=".mp3";
  audio = new Audio(sound).play();

}


function newCard(){
  if(!hasBlackjack && (isAlive)){
    playSound("card-drop");
    let newcard = getRandomCard();
    sum += newcard;
    cards.push(newcard);
    renderGame();
  }
}
