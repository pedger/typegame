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
    function TypeAreaController($scope, $element, $log, wordsService, ngAudio, $rootScope, timerService) {
      var ta = this;
      
      $scope.disabled = false;

      ta.gameStart = false;
      ta.gameOver = false;
      
      ta.words = wordsService.getWords();

      ta.sound = ngAudio.load("/assets/sounds/single_type.mp3"); // returns NgAudioObject
      ta.sound.performance = 0.1;

      //index that follows wich array element (word) has to be checked
      ta.wordCount    = 0;
      $scope.error = 'no-error';

      //watch textared "ng-model"
      $scope.$watch("compareText", function(val){

        var word2check = ta.words[ta.wordCount].w;

        if(angular.isDefined(ta.words[ta.wordCount])){

          if(val){
            
            if (!ta.gameStart){
              $rootScope.$broadcast('gameStart');
              ta.gameStart = true;
            }

            
            ta.sound.play();
            //console.log(word2check + " === " + val);

            if((word2check.length === val.length) && (word2check !== val)){
              $scope.error = 'error';
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

            }
          }

        }else{
          //the new word is not defined?
          //...most probably it means we finished the array
          alert("you won!");
        }

      });

      $scope.$on('timeUp', function(){
        console.log("timesup");
        $scope.disabled = true;
        ta.gameOver = true;
        //$rootScope.$broadcast('gameOver');

      });

    }
  }

})();
