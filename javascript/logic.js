var arrOptions = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"] //all of the possible options
var correctRed = [];
var correctBlue = [];
var flipped = 0; //counts how many cards are currently flipped over
var turn = 1; //turn 1 = RED, turn 2 = BLUE
var scoreRed = 0; 
var scoreBlue = 0;
var card1Val; //value of the first card flipped
var card2Val; //value of the second card flipped
var card1Id; //position of the fist card flipped
var card2Id; //position of the second card flipped

//shuffle the array of options
arrOptions.sort(function() { return 0.5 - Math.random() });

//apply array contents to cards
var assign = function() {
  for (var i = 0; i < arrOptions.length; i++) {
    $("#card"+[i]+"").data("value", arrOptions[i]);
  }
}

var clearCards = function() {
  card1Val = "";
  card2Val = "";
}

//Check for winner
var checkWin = function() {
  if (correctRed.length + correctBlue.length == arrOptions.length) {
    if (correctRed.length > correctBlue.length) {
      $("#status").text("Red Wins!!");
    } else {
      $("#status").text("Blue Wins!!");
    }
  }
}

//check cards for a match 
//if correct player goes again, otherwise play passes
var checkMatch = function() {
  console.log(card1Val);
  console.log(card2Val);
  if(card1Val == card2Val) {
    lockCard();
    if (turn == 1) {
      $("#status").text('Correct! Red, you go again!');
      $("#" + card1Id + "").addClass("red");
      $("#" + card2Id + "").addClass("red");
      correctRed.push(card1Id, card2Id);
    } else if (turn == 2) {
      $("#status").text('Correct! Blue, you go again!');
      $("#" + card1Id + "").addClass("blue");
      $("#" + card2Id + "").addClass("blue");
      correctBlue.push(card1Id, card2Id);
    }
    console.log("Correct! You go again!");
    if(turn == 1) {
      scoreRed++;
      $("#redScore").text(scoreRed);
    } else {
      scoreBlue++;
      $("#blueScore").text(scoreBlue);
    } 
    checkWin();
  } else {
    if (turn == 1) {
      $("#status").text("Sorry, no match! Blue's turn!");
    } else if (turn == 2) {
      $("#status").text("Sorry, no match! Red's turn!");
    }
    console.log("No match! Next players turn");
    //keep cards flipped over for 1 second so players can see values
      setTimeout(function(){ flipBack() } , 1500);
    if(turn == 1) {
      turn++;
      // redTurn();
    } else {
      turn = 1;
      // blueTurn();
    }
  }
  clearCards();
}

//lock cards if correct to avoid double clicks
//ToDo -- LockCard is not working? class being removed but cards still clickable????
var lockCard = function() {
  console.log("locking " + card1Id);
  console.log("locking " + card2Id);
  $("#" + card1Id + "").removeClass("card");
  $("#" + card2Id + "").removeClass("card");
}

//flip both cards back over
var flipBack = function() {
  $("#" + card1Id + "").children('h2').text("");
  $("#" + card2Id + "").children('h2').text("");
}

assign();

//reveal value of card when a it is clicked
//TODO: rewrite this into function - repeat code 
$(".card").on("click", function() {
  if (flipped == 0) {
    card1Val = $(this).data('value');
    card1Id = this.id;
    $(this).children('h2').text($(this).data('value'));
    flipped++;
  }  else if (flipped == 1) {
    card2Val = $(this).data('value');
    card2Id = this.id;
    $(this).children('h2').text($(this).data('value'));
    checkMatch();
    flipped = 0;
  }
});

console.log(arrOptions);

