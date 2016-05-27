(function() {
  'use strict';

  angular
    .module('typegame')
    .directive('timer', timer);

  /** @ngInject */
  function timer() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/timer/timer.html',
      scope: {
          /*words: '='*/
      },
      controller: timerController,
      controllerAs: 'tia',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function timerController($scope, $element, $log, timerService) {
      var tia = this;

      
      
      timerService.startTimer();
     // tia.time = timerService.time;    
     // console.log(timerService.getTime());

    }
  }

})();
