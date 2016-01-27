$(document).ready(function() {
  var gamePage = $('.gamePage');
  var startButton = $('.start');
  var timeNode = $('#seconds');
  var life = 4;
  var score = 0;
  var lettersArray = [];
  var startInterval;
  var gameTimerIntervalId;

// start game = press start button, timer starts
  var startGameCountdown = function() {
    startButton.hide();
    gameTimerIntervalId = setInterval(countdown,1000);
    startInterval = setInterval(fallingStart, 1000);
    bindKeyup();
  };

  var countdown = function() {
    timeNode.text(parseInt(timeNode.text()) - 1);
    if (parseInt(timeNode.text())<=0) {
      clearInterval(startInterval);
      clearInterval(gameTimerIntervalId);
      $('.announceScore').show();
      endGame();
    }
  };

  var createScoreList = function(){
    var newPlayer = $('.playerName').val();
    var newRow = '<li class="row"><div class="name col-xs-4 col-xs-offset-2">' + newPlayer + '</div> <div class="scr col-xs-4">' + score + '</div> </li>';
    $('.announceScore').hide();
    $('.top').show();
    $('.topFive').append(newRow);
  };

// falling letters = generate random alphabets, make it fall from the game div, falls faster as time passes
  var fallingStart = function() {
    var num = Math.floor(Math.random()*(26))+97;
    var convertToLetter = String.fromCharCode(num);
    var droppingPosition = Math.floor(Math.random()*($('.gamePage').width()-20));
    var $fallingLetter = $('<div class="fallingLetters">'+convertToLetter+'</div>').appendTo(gamePage);

    lettersArray.push(  {
      elem: $fallingLetter,
      num: num
    });

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
          lettersArray[0].elem.stop().remove();
          lettersArray.shift();
          reduceLife();
        }
      }
    );
    // destroy letters = remove the letters when the correct keys are pressed
    //scoreboard = add a point everytime a letter is removed
  };

  var bindKeyup = function () {
    $(document).on('keyup', function (e) {
      if (lettersArray.length>0 && (e.keyCode + 32) == lettersArray[0].num) {
        lettersArray[0].elem.stop().remove();
        lettersArray.shift();
        score++;
        $('#kill').text(score);
        $('#pScore').text('Player score: ' + score);
      };
    });
  };

  var unbindKeyup = function () {
    $(document).off('keyup');
  };

// life reduction = life div removed when player presses wrong key or letter falls to ground
  var reduceLife = function(){
    if (life > 0){
      $('.life:nth-child(' + life + ')').hide();
      life--;
    }

    if (life === 0) {
      clearInterval(gameTimerIntervalId);
      clearInterval(startInterval);
      $('.gameOver').show();
      endGame();
      $('.fallingLetters').stop().remove();
    };
  };

//end game = end game when time is over, show separate div
  var endGame = function() {
    lettersArray = [];
    $('.gamePage').hide();
    $('.reset').hide();
  };

//reset game
  var resetGlobalVariables = function(){
    $('.gamePage').show();
    $('.start').show();
    $('.gameOver').hide();
    $('.reset').show();
    $('.announceScore').hide();
    $('.top').hide();
    $('.playerName').val('');
    life = 4;
    $('.life').show();
    score = 0;
    $('.scoreboard').text("Score: 0");
    $('#seconds').text('15');
    unbindKeyup();
    lettersArray = [];
  };

  var reset = function(){
    clearInterval(startInterval);
    clearInterval(gameTimerIntervalId);
    resetGlobalVariables();
    $('.fallingLetters').stop().remove();
  };

// start everthing
  var init = function () {
    $('.reset').off().on('click', reset);
    $('.gameAgain').off().on('click', resetGlobalVariables);
    $('.playAgain').off().on('click', resetGlobalVariables);
    $('.enter').off().on('click', createScoreList);
    $('.start').off().on('click', startGameCountdown);
  }

  init();
});
