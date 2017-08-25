var arrOptions = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"] //all of the possible options
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

assign()

//check cards for a match 
//if correct player goes again, otherwise play passes
var checkMatch = function() {
  if(card1Val == card2Val) {
    console.log("Correct! You go again!");
    if(turn == 1) {
      scoreRed++;
      $("#redScore").text(scoreRed);
    } else {
      scoreBlue++;
      $("#blueScore").text(scoreBlue);
    }
  } else {
    console.log("No match! Next players turn");
      setTimeout(function(){ flipBack() } , 1000);
    if(turn == 1) {
      turn++;
    } else {
      turn = 1;
    }
  }
}

//flip both cards back over
var flipBack = function() {
  $("#" + card1Id + "").children('h2').text("0");
  $("#" + card2Id + "").children('h2').text("0");
}

//reveal value of card when a it is clicked
//TODO: rewrite this into function - repeat code 
$(".card").on("click", function() {
  if (flipped == 0) {
    $(this).children('h2').text($(this).data('value'));
    card1Val = $(this).data('value');
    card1Id = this.id;
    flipped++;
  }  else if (flipped == 1) {
    $(this).children('h2').text($(this).data('value'));
    card2Val = $(this).data('value');
    card2Id = this.id;
    checkMatch();
    flipped = 0;
  }
});

console.log(arrOptions);

