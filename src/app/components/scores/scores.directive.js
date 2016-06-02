(function() {
  'use strict';

  angular
    .module('typegame')
    .directive('scores', scores);

  /** @ngInject */
  function scores() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/scores/scores.html',
      scope: {
          'scores':'&',
          'lastScores':'&'
      },
      controller: scoresController,
      controllerAs: 'sc',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function scoresController($scope, $log, scoresService, ngAudio) {
      var sc = this;

      sc.sound = ngAudio.load("/assets/sounds/coin-get.ogg"); // returns NgAudioObject
      sc.sound.performance = 0.1;
      sc.sound.volume = 0.3; 
      
      
      $scope.lastScores = angular.fromJson(localStorage.getItem("scores"));
      if ($scope.lastScores == null) {
        $scope.lastScores = [];
      }

      $scope.$watch(function(){
          return scoresService.getBadges();
        }, function(newValue){
          $scope.badges = newValue;
          //sc.sound.play();

      });

      $scope.$watch(function(){
          return scoresService.getScores();
        }, function(newValue){
          $scope.scores = newValue;
      });

      $scope.$on('finalScores', function(){
        var date = new Date();
        $scope.scores.date = date.getTime();
        $scope.scores.badges = $scope.badges;

        $scope.lastScores.push($scope.scores);
        
        localStorage.setItem("scores", angular.toJson($scope.lastScores));
        $scope.lastScores = angular.fromJson(localStorage.getItem("scores"));
      });

      $scope.resetLocalStorageScores = function(){
        localStorage.removeItem("scores");
        $scope.lastScores = [];
      };

    }
  }

})();