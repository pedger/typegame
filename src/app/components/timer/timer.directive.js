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

      $scope.$on('gameReset', function(){
        ti.timer = timerService.reset();
      });      


      //watch timer counter and broadcasts timeUp
      $scope.$watch(function(){
          return timerService.getTimeLeft(0);
        }, function(newValue){
          $scope.counter = newValue;
          if (newValue == 0) $rootScope.$broadcast("timeUp");
      });

      $scope.endCountDown = function(){
        timerService.endCountDown();
      }
    }
  }

})();
