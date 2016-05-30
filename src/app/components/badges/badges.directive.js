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
    function badges($scope, ngAudio) {
      var ba = this;
     
      $scope.badges = {
          '10words':false,
          'noErrors':false,

      };

      ba.sound = ngAudio.load("/assets/sounds/coin-get.ogg"); // returns NgAudioObject
      ba.sound.performance = 0.1;
      ba.sound.volume = 0.3;


      $scope.$on("achievement-5words" ,function(){
        ba.sound.play();
        $scope.issueBadge('5words');
      });

      $scope.$on("achievement-noerrors" ,function(){
        $scope.issueBadge('noErrors');
      });

      $scope.$on("gameReset" ,function(){
        $scope.badges = {};
      });

      $scope.issueBadge = function(achievement) {
        
        switch(achievement){
          case '5words':
            $scope.badges['5words'] = true;
            //console.log('ba.badges:', ba.badges);
            break;

          case 'noErrors':
            $scope.badges['noErrors'] = true;
            console.log('ba.badges:', $scope.badges);
            break;

          default:
            break;

        }
        
      }
    }
  }

})();