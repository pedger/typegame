(function() {
  'use strict';

  angular
    .module('typegame')
    .directive('copyWord', copyWord);

  /** @ngInject */
  function copyWord() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/copyword/copyword.html',
      scope: {
          word: '=',
          idx: '@'
      },
      controller: CopyWord,
      controllerAs: 'cw',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function CopyWord($scope, $element, $log) {
      var cw = this;


      setTimeout(function() {
        if($element[0].offsetTop !== bef){
          console.log(cw.word.w);
          cw.word.first_of_line = 1;
          bef = $element[0].offsetTop;
        }

      }, 1000);
    }
  }

})();

var bef = 0;