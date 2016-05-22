(function() {
  'use strict';

  angular
    .module('typegame')
    .directive('copyArea', copyArea);

  /** @ngInject */
  function copyArea() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/copyarea/copyarea.html',
      scope: {
          copy: '='
      },
      controller: CopyAreaController,
      controllerAs: 'ca',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function CopyAreaController($scope, $element, $log) {
      var ca = this;
      //console.log(ca.copy);

    }
  }

})();
