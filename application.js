$(document).ready(function() {

  var gamePage = $('.gamePage');
  var startButton = $('.start');
  var life = 4;
  var score = 0;
  var lettersArray = [];
  var startInterval;
  var difficulty = 1;
  var scoreArray = [
    {name: 'Jinny', score: 20},
    {name: 'KitKat', score: 15},
    {name: 'Jay', score: 13},
    {name: 'Pikachu', score: 5},
    {name: 'Lor', score: 2}
  ];
  var mySound = new buzz.sound("./sounds/keyboard.mp3");
  var mySoundWrong = new buzz.sound("./sounds/wrong.mp3");

// start game = press start button, timer starts
  var startGameCountdown = function() {
    startButton.hide();
    startInterval = setInterval(fallingStart, 1200);
    bindKeyup();
  };

  var orderPlayer = function(){
    var scoreComparator = function(a,b){
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      } else {
      return 0;
      }
    };

    var newPlayer = $('.playerName').val();

    scoreArray.push({name: newPlayer, score: score});
    scoreArray.sort(scoreComparator);
    scoreArray.pop();
  };

  var createScoreList = function(){
    orderPlayer();

    $('.topFive').children().remove()
    for (var i=0; i<scoreArray.length; i++){
      var row = '<li class "row">' +
                  '<div class="name col-xs-4 col-xs-offset-2">' + scoreArray[i].name+'</div>' +
                  '<div class="scr col-xs-4">' + scoreArray[i].score + '</div>' +
                  '</li>';

      $('.topFive').append(row);
    };

    $('.announceScore').hide();
    $('.top').show();
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

    var droppingPosition = Math.floor(Math.random()*($('.gamePage').width()-60));

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

    var speed = 2500;

    if (difficulty > 4){
      speed = 4500;
    } else if (difficulty > 3){
      speed = 3900;
    } else if (difficulty > 2){
      speed = 3000;
    } else {
      speed = 2500;
    }

    $fallingLetter.css({
      'left': droppingPosition +'px',
      'fontSize':'40px',
      'letter-spacing':'2px',
      'border':'solid 2px',
      'borderRadius':'50px',
      'padding': '0px 10px 0px 10px'
    });
    $fallingLetter.animate({
        top: '550px'
      },{
        duration: speed,
        easing: "linear",
        complete: function () {
          //lettersArray[0].elem.stop().remove();
          $(this).remove();
          lettersArray.shift();
          reduceLife();
          mySoundWrong.stop().play();
          }
        }
    );

    if (difficulty<5){
      difficulty = Math.floor(score/10)+1;
    } else {
      difficulty = 5
    };

    $('#level').text(difficulty);

  };

  var bindKeyup = function () {
    $(document).on('keyup', function (e) {
      var target = lettersArray[0];
      if (lettersArray.length > 0 && (e.keyCode + 32) == target.num[0]) {
        mySound.stop().play();
        target.elem.find('span').eq(target.matchPosition).css(
          'color','#DC5B21');
        target.matchPosition++;
        target.num.shift();
        if (target.num.length === 0){
          $(target.elem).stop().fadeOut(100, function () {
            $(this).remove();
          })
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
      clearInterval(startInterval);
      $('.announceScore').show();
      $('.playAgain').hide();
      $('#pScore').text('Player score: ' + score);
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
    $('#level').text('1');
    unbindKeyup();
    lettersArray = [];
  };

  var reset = function(){
    clearInterval(startInterval);
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
