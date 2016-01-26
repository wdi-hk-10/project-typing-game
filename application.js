$(document).ready(function() {
  var gamePage = $('.gamePage');
  var life = 4;
  var score = 1;

// start game = press start button, timer starts
  var startGameCountdown = function() {
    var startButton = $('.start').hide();
    var startInterval = setInterval(fallingStart, 1000);

    var countdown = function() {
      var timeNode = $('#seconds');
      timeNode.text(parseInt(timeNode.text()) - 1);
      if (life==0){
        clearInterval(gameTimerIntervalId);
        clearInterval(startInterval);
        $('.gamePage').hide();
        $('.gameOver').show();
        $('.reset').hide();
      } else if (parseInt(timeNode.text())<=0) {
        clearInterval(gameTimerIntervalId);
        clearInterval(startInterval);
        endGame();
      }
    };
    var gameTimerIntervalId = setInterval(countdown,1000);
  };

  $('.start').on('click', startGameCountdown);

// falling letters = generate random alphabets, make it fall from the game div, falls faster as time passes

  var fallingStart = function() {
    var num = Math.floor(Math.random()*(26))+97;
    var convertToLetter = String.fromCharCode(num);
    var droppingPosition = Math.floor(Math.random()*($('.gamePage').width()-20));
    var $fallingLetter = $('<div class="fallingLetters">'+convertToLetter+'</div>').appendTo(gamePage);

    $fallingLetter.css({
      'left': droppingPosition +'px',
      'fontSize':'30px',
      'border':'solid 2px',
      'padding': '0px 10px 0px 10px'
    });
    $fallingLetter.animate({
        top: '550px'
      },{
        duration: 3000,
        complete: function () {
          $(this).remove();
          reduceLife();
        }
      }
    );
    // destroy letters = remove the letters when the correct keys are pressed
    //scoreboard = add a point everytime a letter is removed
    $(document).keyup(function (e) {
      if ((e.keyCode + 32) == num) {
      $fallingLetter.stop().remove();
      $('.scoreboard').text('Score: ' + score);
      $('h1').text('Player score: ' + score);
      score++;
      };
    });

  };

// life reduction = life div removed when player presses wrong key or letter falls to ground
  var reduceLife = function(){
    if (life > 0){
      $('.life:nth-child(' + life + ')').hide();
      life--;
    };
  };

//end game = end game when time is over, show separate div
  var endGame = function() {
    $('.gamePage').hide();
    $('.announceScore').show();
    $('.playAgain').hide();
    $('.reset').hide();
  };

//reset game
  var resetGlobalVariables = function(){
    var gamePage = $('.gamePage');
    var life = 4;
    var score = 1;
  };

  var resetGame = function(){
    resetGlobalVariables();
  }

  $('.reset').on('click', resetGame);

});
