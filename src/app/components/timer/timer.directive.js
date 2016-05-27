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
          return timerService.getTimeLeft(0);
        }, function(newValue){
          $scope.counter = moment(newValue).format("mm:ss.SS");
          //console.log($scope.counter);
          if (newValue == 0) $rootScope.$broadcast("timeUp");
      });


    }
  }

})();
