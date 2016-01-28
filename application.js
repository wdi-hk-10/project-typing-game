$(document).ready(function() {

  var gamePage = $('.gamePage');
  var startButton = $('.start');
  var timeNode = $('#seconds');
  var life = 4;
  var score = 0;
  var lettersArray = [];
  var startInterval;
  var difficulty = 1;
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
      $('.playAgain').hide();
      $('.announceScore').show();
      endGame();
    }
  };

  var createScoreList = function(){
    var newPlayer = $('.playerName').val();
    var newRow = '<li class="row"><div class="name col-xs-4 col-xs-offset-2">' + newPlayer + '</div> <div class="scr col-xs-4">' + score + '</div> </li>';
    $('.announceScore').hide();
    $('.gameOver').hide();
    $('.top').show();
    $('.topFive').append(newRow);
    $('.playAgain').show();
  };

// falling letters = generate random alphabets, make it fall from the game div, falls faster as time passes
  var fallingStart = function() {
    var num = [];
    for (var i = 1; i <= difficulty; i++){
      num.push(Math.floor(Math.random()*26)+97);
    };

    //var convertToLetter = num.map(function(n){
    //  return String.fromCharCode(n);
    //}).join('');

    var droppingPosition = Math.floor(Math.random()*($('.gamePage').width()-40));

    // loop through each character to generate a <span>character</span> and add them all to a new variable

    var newHTML = '';
    for (var i = 0; i < num.length; i++){
      newHTML = newHTML + '<span>' + String.fromCharCode(num[i]) + '</span>';
    }

    var $fallingLetter = $('<div class="fallingLetters">'+newHTML+'</div>').appendTo(gamePage);

    lettersArray.push(  {
      elem: $fallingLetter,
      num: num,
      matchPosition: 0
    });

    $fallingLetter.css({
      'left': droppingPosition +'px',
      'fontSize':'30px',
      'border':'solid 2px',
      'borderRadius':'50px',
      'padding': '0px 10px 0px 10px'
    });
    console.log($fallingLetter[0].innerHTML);
    $fallingLetter.animate({
        top: '550px'
      },{
        duration: 3000,
        complete: function () {
          $(this).remove();
          //lettersArray[0].elem.stop().remove();
          lettersArray.shift();
          reduceLife();
          }
        }
    );

    difficulty = Math.round(score/5)+1;

  };

  var bindKeyup = function () {
    $(document).on('keyup', function (e) {
      var target = lettersArray[0];
      if (lettersArray.length > 0 && (e.keyCode + 32) == target.num[0]) {
        target.elem.find('span').eq(target.matchPosition).css(
          'color','#DC5B21');
        target.matchPosition++;
        target.num.shift();
        if (target.num.length === 0){
          target.elem.stop().remove();
          lettersArray.shift();
          score++;
        };

        //  lettersArray[0].
          // get the elem, find all the spans without a class called correct
        //}
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
    difficulty = 1;
    $('#kill').text("0");
    $('#seconds').text('20');
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
    $('.reset').on('click', reset);
    $('.playAgain').on('click', resetGlobalVariables);
    $('.enter').on('click', createScoreList);
    $('.start').on('click', startGameCountdown);
  };

  init();

});
