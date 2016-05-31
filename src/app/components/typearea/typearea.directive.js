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
    function TypeAreaController($scope, $element, $log, wordsService, $rootScope, timerService, toastr, scoresService) {
      var ta = this;
      
      ta.gameStart = false;
      ta.gameOver = false;
      
      ta.words = wordsService.getWords();

      //index that follows wich array element (word) has to be checked
      ta.wordCount    = 0;
      $scope.error = 'no-error';
      ta.numErrors = 0;
      
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
              ta.calculateAchievement();  
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
        ta.gameOver = true;
        ta.calculateAchievement();
        toastr.info("Game Over - Time's up ");
        toastr.success("Total words: "+ ta.wordCount + "<br/>Total Time: " + timerService.initCounter/1000 + " seconds", "Score", {
          timeOut: 10000,
          closeButton: true,
          tapToDismiss: true
        });

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
        
        $rootScope.$broadcast('gameReset');
        scoresService.resetScores();
      }

      ta.calculateAchievement = function(){
        console.log("achievement");
        if (ta.wordCount == 5) {
          console.log("achievement 5 words");
          scoresService.issueBadge('5words');
          //$rootScope.$broadcast("achievement-5words");
        }
        if (ta.gameOver && ta.numErrors == 0) {
          console.log("achievement NO ERRORS");
          scoresService.issueBadge("noErrors");          
        }


      }
    }

    
  }

})();
