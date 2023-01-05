var cards = [1,2,3,4,5,6,7,8,9,10,11];

var deck = {
  diamonds: [1,2,3,4,5,6,7,8,9,10],
  hearts: [1,2,3,4,5,6,7,8,9,10],
  clubs: [1,2,3,4,5,6,7,8,9,10],
  spades: [1,2,3,4,5,6,7,8,9,10]
}

var playerScore = 0;
var playerCards = [];
var playerStand = false;
var playerBust = false;

var dealerScore = 0;
var dealerCards = [];
var dealerStand = false;
var dealerBust = false;

var gameActive = true;


function randomizer(limit){
  return Math.floor(Math.random() * limit);
}

// function drawCardbackup() {
//   var cardSuitNo = randomizer(4);
//   var cardSuit = Object.keys(deck)[cardSuitNo];
//   console.log(cardSuit);
//   // var card = deck.diamonds[randomizer(deck.diamonds.length)];
//   var cardValue = deck.diamonds.splice(randomizer(deck.diamonds.length),1);
//   // var cardValue = Object.   deck. .splice(randomizer(deck.diamonds.length),1);
//   console.log(cardValue);
//   return cardValue[0];
// }

function drawCard() {
  var chosenCard = [];
  var cardSuitNo = randomizer(4);
  var cardValueNo = randomizer(Object.values(deck)[cardSuitNo].length);
  
  var cardSuit = Object.keys(deck)[cardSuitNo];
  // console.log(cardSuit);
  var cardValue = Object.values(deck)[cardSuitNo].splice(cardValueNo,1);
  // console.log(cardValue);
  var drawnCard = [cardSuit, cardValue];
  
  chosenCard.push(drawnCard);

  return chosenCard[0];
}

function cardsString(cardArray){
  var outputString ="";

  for (var i = 0; i < cardArray.length; i++) {
    outputString += `${cardArray[i][1]} of ${cardArray[i][0]}, `;
  }
  return outputString;
}

function calculateScore(cardArray){
  var score = 0;

  for (var i = 0; i < cardArray.length; i++) {
    score += parseInt(cardArray[i][1]);
  }
  return score;
}

function printCardsAndScores() {
  console.log(`Your cards: ${cardsString(playerCards)}`);
  console.log(`Your score: ${calculateScore(playerCards)}`);
  console.log(`Dealer cards: ${cardsString(dealerCards)}`);
  console.log(`Dealer score: ${calculateScore(dealerCards)}`);
}

function startGame() {
  
  alert("Welcome to c4rli's blackjack!\n\nInstructions:\nTo play press 'ok' to hit and 'cancel' to stand.")
  playerCards.push(drawCard());
  dealerCards.push(drawCard());
  playerCards.push(drawCard());
  dealerCards.push(drawCard());
  evaluateScores();

  printCardsAndScores();

  console.log(deck);
}

function playerTurn() {
  var playerMove = confirm(`~~~~ c4rli's blackjack ~~~~~

Your cards: ${cardsString(playerCards)}
Your score: ${playerScore}

Dealer cards: ${cardsString(dealerCards)}
Dealer score: ${dealerScore}

Press "ok" to hit and "cancel" to stand.
`);

  if (playerMove){
    playerCards.push(drawCard());
  }
  else if (playerMove == false){
    playerStand = true;
  }
}

function dealerTurn() {
  if (playerStand) {
    alert(`~~~~ c4rli's blackjack ~~~~~

    Your cards: ${cardsString(playerCards)}
    Your score: ${playerScore}
    
    Dealer cards: ${cardsString(dealerCards)}
    Dealer score: ${dealerScore}`)
  }

  if (dealerScore <= 16){
    dealerCards.push(drawCard());
  }
  else{
    dealerStand = true;
  }
}

function evaluateScores() {
  playerScore = calculateScore(playerCards);
  dealerScore = calculateScore(dealerCards);

  if (playerScore >= 21){
    playerStand = true;
  }
  if (playerScore > 21) {
    playerBust = true;
  }
  if (dealerScore > 21) {
    dealerBust = true;
  }
}

function results() {
  evaluateScores();
  var resultString;

  if (((playerBust != true && dealerBust != true) && (playerScore < dealerScore)) || playerBust && dealerBust != true){
    resultString = "Dealer Wins!";
  }
  else if (((playerBust != true && dealerBust != true) && (playerScore > dealerScore)) || dealerBust && playerBust != true) {
    resultString = "You Win!";
  }
  else if ((playerBust != true && dealerBust != true) && playerScore == dealerScore) {
    resultString = "Push!";
  }
  else if (dealerBust && playerBust) {
    resultString = "Both bust but Dealer Wins! ... remember the house always wins ;)";
  }

  alert(`~~~~ c4rli's blackjack ~~~~~

RESULT: ${resultString}

Your cards: ${cardsString(playerCards)}
Your score: ${playerScore}

Dealer cards: ${cardsString(dealerCards)}
Dealer score: ${dealerScore}`);
}

function playAgain(){
  var playAgain = confirm(`~~~~ c4rli's blackjack ~~~~~

Play again?`);
  if (playAgain) {
    playerScore = 0;
    playerCards = [];
    playerStand = false;
    playerBust = false;

    dealerScore = 0;
    dealerCards = [];
    dealerStand = false;
    dealerBust = false;

    gameActive = true;
    main();
  }
}

function main() {
  startGame();

  while (gameActive){
    evaluateScores();
    if (playerStand != true){
      playerTurn(); 
    }
    if (dealerStand != true ){
      dealerTurn();
    }
    if ((dealerStand === true) && (playerStand === true)){
    gameActive = false;
    }
    printCardsAndScores();
  }
  results();
}

main();
playAgain();

