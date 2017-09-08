var arrOptions = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"] //all of the possible options
var correctRed = 0;
var correctBlue = 0;
var flipped = 0; //counts how many cards are currently flipped over
var turn = 1; //turn 1 = RED, turn 2 = BLUE
var scoreRed = 0;
var scoreBlue = 0;
var card1Val; //value of the first card flipped
var card2Val; //value of the second card flipped
var card1Id; //position of the fist card flipped
var card2Id; //position of the second card flipped



//apply array contents to cards
var startGame = function() {
  //shuffle the array of options
  // arrOptions.sort(function() { return 0.5 - Math.random() });
  console.log(arrOptions);

  correctBlue = 0;
  correctRed = 0;


  for (var i = 0; i < arrOptions.length; i++) {
    $("#card" + [i] + "").data("value", arrOptions[i]);
    $("#card" + [i] + "").children('h2').text("");
  }

  if (!$(".card").hasClass("card-active")) {
    $(".card").addClass('card-active');
    $(".card").removeClass('red blue');
  }
  enableCards();
}

//reveal value of card when a it is clicked
//TODO: rewrite this into function - repeat code 
var enableCards = function() {
  console.log('ENABLING all cards')
  $(".card-active").on("click", function() {
    if (flipped == 0) {
      card1Val = $(this).data('value');
      card1Id = this.id;
      lockCard(card1Id);
      $(this).children('h2').text($(this).data('value'));
      flipped++;
    } else if (flipped == 1) {
      disableCards();

      card2Val = $(this).data('value');
      card2Id = this.id;
      lockCard(card2Id);

      $(this).children('h2').text($(this).data('value'));
      checkMatch();
      flipped = 0;
    }
  });
}

//flip both cards back over
var flipBack = function() {
  $("#" + card1Id + "").children('h2').text("");
  $("#" + card2Id + "").children('h2').text("");
  // enableCards();
}

//lock cards if correct to avoid double clicks
//ToDo -- LockCard is not working? class being removed but cards still clickable????
// var lockCard = function() {
//   console.log("locking " + card1Id);
//   console.log("locking " + card2Id);
//   $("#" + card1Id + "").removeClass('card-active');
//   $("#" + card2Id + "").removeClass('card-active');

//   $("#" + card1Id + "").off('click');
//   $("#" + card2Id + "").off('click');
// }

var lockCard = function(id) {
  console.log("locking " + id);
  $("#" + id + "").off('click');
}

var disableCards = function() {
  console.log('disabling all cards')
  $(".card").off('click');
}



var clearCards = function() {
  card1Val = "";
  card2Val = "";
}

//Check for winner
var checkWin = function() {
  if (correctRed + correctBlue == (arrOptions.length / 2)) {
    if (correctRed > correctBlue) {
      $("#status").text("Red Wins!!");
      scoreRed++;
      $("#redScore").text(scoreRed);
    } else if (correctRed < correctBlue) {
      $("#status").text("Blue Wins!!");
      scoreBlue++;
      $("#blueScore").text(scoreBlue);
    } else {
      $("#status").text("Wow! Tie Game!!");
    }
    setTimeout(startGame, 1500);
  }
}



if (turn == 1) {

} else {

}

//check cards for a match 
//if correct player goes again, otherwise play passes
var checkMatch = function() {
  console.log(card1Val);
  console.log(card2Val);
  if (card1Val == card2Val) {
    $("#" + card1Id + "").removeClass('card-active');
    $("#" + card2Id + "").removeClass('card-active');

    if (turn == 1) {
      $("#status").text('Correct! Red, you go again!');
      $("#" + card1Id + "").addClass("red");
      $("#" + card2Id + "").addClass("red");
      correctRed++;
    } else if (turn == 2) {
      $("#status").text('Correct! Blue, you go again!');
      $("#" + card1Id + "").addClass("blue");
      $("#" + card2Id + "").addClass("blue");
      correctBlue++;
    }
    console.log("Correct! You go again!");

    checkWin();
    enableCards();
  } else {
    if (turn == 1) {
      $("#status").text("Sorry, no match! Blue's turn!");
    } else if (turn == 2) {
      $("#status").text("Sorry, no match! Red's turn!");
    }
    console.log("No match! Next players turn");
    //keep cards flipped over for 1 second so players can see values
    setTimeout(flipBack, 1500);
    // enableCards();
    setTimeout(enableCards, 1500);
    if (turn == 1) {
      turn++;
    } else {
      turn = 1;
    }
  }
  clearCards();
}

startGame();
// enableCards();