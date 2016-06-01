(function() {
  'use strict';

  angular
      .module('typegame')
      .service('scoresService', scoresService);

  /** @ngInject */
  function scoresService($log) {
    var defaultScores = {
      username:'',
      gameStart: false,
      wordCount : 0,
      timeElapsed: 0,
      wpm: 0,
      errors: 0,
      correctWords : [],
      wrongWords: []
    };
    var scores = defaultScores;

    var badges = {
      'firstkill':false,
      'noErrors':false,
      '+40WPM': false
    };

    //function: calculateScores
    function calculateScores(username, gameStart, wordCount, timeElapsed, correctWord, wrongWord){
      //$log.info("calculating Scores");
      scores.username = username;
      scores.gameStart = gameStart;
      scores.wordCount = wordCount;
      scores.timeElapsed = timeElapsed;
      scores.wpm = wordCount / (timeElapsed / 60000)
      if (correctWord) scores.correctWords.push(correctWord);
      if (wrongWord) {
        scores.wrongWords.push(wrongWord);
        scores.errors++;
      }
      //$log.log('scores: ', scores);
      calculateBadges();
    }

    //Control badges object
    function calculateBadges() {
      if (scores.wordCount == 1)
        badges['firstkill'] = true;
      if (!scores.gameStart && scores.errors == 0)
          badges['noErrors'] = true;
      if (scores.wpm > 40 && !scores.gameStart)
          badges['+40WPM'] = true;
    }

    function getScores(){
      return scores;
    }

    function getBadges(){
      return badges;
    }

    function resetScores(){
      badges = {};
      scores = {
        gameStart: false,
        wordCount : 0,
        timeElapsed: 0,
        wpm: 0,
        errors: 0,
        correctWords : [],
        wrongWords: []
      };
    }

    //Export Block
    this.calculateScores  = calculateScores;
    this.calculateBadges  = calculateBadges;
    this.getScores        = getScores;
    this.getBadges        = getBadges;
    this.resetScores      = resetScores;
    
  }

})();