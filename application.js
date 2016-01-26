$(document).ready(function() {

// start game = press start button, timer starts
  var startGameCountdown = function() {
    var startButton = $('.start').hide();

    var countdown = function() {
      var timeNode = $('#seconds');
      timeNode.text(parseInt(timeNode.text()) - 1);
      if (parseInt(timeNode.text()) <=0) {
        clearInterval(gameTimerIntervalId);
        endGame();
      }
    };
    var gameTimerIntervalId = setInterval(countdown,1000);
  };

  $('.start').on('click', startGameCountdown);

// falling letters = generate random alphabets, make it fall from the game div, falls faster as time passes

// life reduction = life div removed when player presses wrong key or letter falls to ground

//end game = end game when time is over, show separate div
  var endGame = function() {
    var newElem = '<div class="announceScore">Player score: ' +
                    '<div class="input">' +
                      '<input class="playerName" value="Please enter name"' +
                    '</div>' +
                  '</div>';
    $('.gamePage').append(newElem);
  };

});