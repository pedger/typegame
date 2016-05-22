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
    function TypeAreaController($scope, $element, $log, wordsService) {
      var ta = this;
      ta.words = wordsService.getWords();

      //index that follows wich array element (word) has to be checked
      ta.wordCount    = 0;
      $scope.error = 'no-error';

      //watch textared "ng-model"
      $scope.$watch("compareText", function(val){

        var word2check = ta.words[ta.wordCount].w;

        if(!angular.isUndefined(ta.words[ta.wordCount])){

          if(val){
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
              ta.words[ta.wordCount].class = "highlight";
              //word done, go to next word (next array element)
              ta.wordCount++;
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

    }
  }

})();
