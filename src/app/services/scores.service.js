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
      words: [],
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
    function calculateScores(username, gameStart, wordCount, timeElapsed, typedWords, errors){
      //$log.info("calculating Scores");
      scores.username = username;
      scores.gameStart = gameStart;
      scores.wordCount = wordCount;
      scores.timeElapsed = timeElapsed;
      scores.errors = errors;
      scores.wpm = typedWords.length / (timeElapsed / 60000)
      if (typedWords) {        
        scores.correctWords = [];
        scores.wrongWords = [];
        for (var i=0; i < typedWords.length; i++){
          if (typedWords[i]['correct'] == 0) {
            scores.wrongWords.push(typedWords[i]['word']);  
            
          }               
          else 
            scores.correctWords.push(typedWords[i]['word']);

        }
      }
      // if (correctWord){
      //   scores.correctWords.push(correctWord);
      //   scores.words.push(correctWord);
      // }
      // if (wrongWord) {
      //   scores.wrongWords.push(wrongWord);
      //   scores.words.push(wrongWord);
      //   scores.errors++;
      // }

      //$log.log('correctWords: ', scores.correctWords);
      //$log.log('wrongWords: ', scores.wrongWords);
      //$log.log('typedWords: ', scores.words);
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
      if(scores.wrongWords.length < scores.errors)
        badges['correct'] = true;
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