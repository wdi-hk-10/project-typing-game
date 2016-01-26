$(document).ready(function() {
  var gamePage = $('.gamePage');
  var life = 4;

// start game = press start button, timer starts
  var startGameCountdown = function() {
    var startButton = $('.start').hide();
    var startInterval = setInterval(fallingStart, 1500);

    var countdown = function() {
      var timeNode = $('#seconds');
      timeNode.text(parseInt(timeNode.text()) - 1);
      if (life==0){
        clearInterval(gameTimerIntervalId);
        clearInterval(startInterval);
        $('.gamePage').hide();
        $('.gameOver').show();
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
    var num = Math.floor(Math.random()*(26))+65;
    var convertToLetter = String.fromCharCode(num);
    var droppingPosition = Math.floor(Math.random()*$('.gamePage').width());
    var $fallingLetter = $('<div class="fallingLetters">'+convertToLetter+'</div>').appendTo(gamePage);
    $fallingLetter.css({
      'left': droppingPosition +'px',
      'fontSize':'35px',
      'border':'solid 2px',
      'padding': '0px 10px 0px 10px'
    });
    $fallingLetter.animate({
        top: '545px'
      },{
        duration: 3000,
        complete: function () {
          $(this).remove();
          reduceLife();
        }
      }
    );
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
  };

});