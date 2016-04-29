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
          words: '='
      },
      controller: TypeAreaController,
      controllerAs: 'ta',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TypeAreaController($scope, $element, $log) {
      var ta = this;

      //index that follows wich array element (word) has to be checked
      ta.wordCount    = 0;

      //watch textared "ng-model"
      $scope.$watch("compareText", function(val){
        if(!angular.isUndefined(ta.words[ta.wordCount])){
          if(ta.words[ta.wordCount].w === val){

            //if it matches, change class
            ta.words[ta.wordCount].class = "highlight";
            //word done, go to next word (next array element)
            ta.wordCount++;
            //empty text area
            $scope.compareText = '';

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
