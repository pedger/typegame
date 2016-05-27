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
      controllerAs: 'ti',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function timerController($scope, $element, $rootScope, timerService) {
      var ti = this;

    
      $scope.$on('gameStart', function(){
        ti.timer = timerService.countDown();
      });

      $scope.$watch(function(){
          return timerService.getTimeLeft();
        }, function(newValue){
          $scope.counter = newValue;
          if ($scope.counter == 0) $rootScope.$broadcast("timeUp");
      });

      
    }
  }

})();
