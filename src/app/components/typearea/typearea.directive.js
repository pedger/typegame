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
          creationDate: '='
      },
      controller: TypeAreaController,
      controllerAs: 'ta',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TypeAreaController() {
      var ta = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
