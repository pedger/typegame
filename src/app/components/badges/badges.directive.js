(function() {
  'use strict';

  angular
    .module('typegame')
    .directive('badges', badges);

  /** @ngInject */
  function badges() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/badges/badges.html',
      scope: {
          
      },
      controller: badges,
      controllerAs: 'ba',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function badges($scope, scoresService) {
      var ba = this;

      $scope.$watch(function(){
          return scoresService.getBadges();
        }, function(newValue){
          $scope.badges = newValue;
      });


    }
  }

})();