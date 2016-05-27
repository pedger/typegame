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
    function CopyWord($scope, $element) {
      var cw = this;
    }
  }

})();