$(document).ready(function() {
  var gamePage = $('.gamePage');

// start game = press start button, timer starts
  var startGameCountdown = function() {
    var startButton = $('.start').hide();
    fallingStart();

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

  var num = Math.floor(Math.random()*(26))+65;
  var convertToLetter = String.fromCharCode(num);
  var droppingPosition = Math.floor(Math.random()*$('.gamePage').width());

  var fallingStart = function() {
    var $fallingLetter = $('<div class="fallingLetters">'+convertToLetter+'</div>').appendTo(gamePage);
    $fallingLetter.css({
      'left': droppingPosition +'px',
      'fontSize':'35px'
    });
    $fallingLetter.animate({
        top: '560px'
      },{
        duration: 3000
      }
    );
  };


// life reduction = life div removed when player presses wrong key or letter falls to ground

//end game = end game when time is over, show separate div
  var endGame = function() {
    $('.gamePage').hide();
    $('.announceScore').show();
    $('.playAgain').hide();
  };

});