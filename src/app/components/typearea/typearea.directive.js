(function() {
  'use strict';

  angular
    .module('typegame')
    .directive('typeArea', typeArea);

  /** @ngInject */
  function typeArea() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/typearea/typearea.html',
      scope: {
          /*words: '='*/
      },
      controller: TypeAreaController,
      controllerAs: 'ta',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function TypeAreaController($scope, $rootScope, $element, $log, toastr, wordsService, timerService, scoresService) {
      var ta = this;
      
      ta.gameStart = false;
      ta.gameOver = false;
      
      ta.words = wordsService.getWords();

      //index that follows wich array element (word) has to be checked
      ta.wordCount = 0;
      ta.numErrors = 0;
      $scope.error = 'no-error';
      
      wordsService.setClass(ta.wordCount,'mark');
      
      //watch textared "ng-model"
      $scope.$watch("compareText", function(val){

        var word2check = ta.words[ta.wordCount].w;

        if(angular.isDefined(ta.words[ta.wordCount])){

          if(val){
            
            if (!ta.gameStart){
              $rootScope.$broadcast('gameStart');
              ta.gameStart = true;
            }
            if((word2check.length === val.length) && (word2check !== val)){
              $scope.error = 'error';
              ta.numErrors ++;
            }else if (val.length > 0){
              if ((val.substr(0, val.length) === word2check.substr(0, val.length)) && (word2check.length === val.length) && (word2check === val)) {
                $scope.error = 'no-error';
              }else if(val.substr(0, val.length) === word2check.substr(0, val.length)){
                $scope.error = 'not-yet-error';
              }else{
                $scope.error = 'error';
                
              }
            }

            if(word2check + " " === val){

              //if it matches, change class
              wordsService.setClass(ta.wordCount,'highlight');
              //word done, go to next word (next array element)
              ta.wordCount++;
              wordsService.setClass(ta.wordCount,'mark');
              //empty text area
              $scope.compareText = '';
              scoresService.calculateScores(ta.gameStart, ta.wordCount, timerService.getTime(), val, null ); 
            }
            else {
              //$log.log(">"+val[val.length-1]+"<");
              if (val.length > 1 && val[val.length-1] == " ") scoresService.calculateScores(ta.gameStart, ta.wordCount, timerService.getTime(), null, val ); 
            }

            
          }

        }else{
          //the new word is not defined?
          //...most probably it means we finished the array
          alert("you won!");
        }

      });

      //Listen to timeUp event and ends the game, blocking text area and displaying "Game Over!"
      $scope.$on('timeUp', function(){
        ta.gameStart = false;
        ta.gameOver = true;
        scoresService.calculateScores(ta.gameStart, ta.wordCount, timerService.getTime()); 
        toastr.info("Game Over - Time's up ");

        //$rootScope.$broadcast('gameOver');

      });
      
      //set all variables to default value and reset timer
      $scope.restartGame = function(){
        ta.gameOver   = false;
        ta.gameStart  = false;
        ta.wordCount  = 0;
        $scope.error = 'no-error';
        $scope.compareText = '';
        $scope.numErrors = 0;

        wordsService.removeClasses();
        wordsService.setClass(0,'mark');
        
        scoresService.resetScores();
        
        $rootScope.$broadcast('gameReset');
        
      }     
    }

    
  }

})();
