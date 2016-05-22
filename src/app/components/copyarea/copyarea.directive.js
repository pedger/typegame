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
          /*copy: '='*/
      },
      controller: CopyAreaController,
      controllerAs: 'ca',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function CopyAreaController($scope, $element, $log, $timeout, $window, wordsService) {
      var ca = this;
      var i = 0;
      var bef = 0;
      var w = angular.element($window);
      var resizeTime;
      ca.copy = wordsService.getWords();
      //console.log(ca.copy);

      ca.findFirstLines = function(){
        $timeout.cancel(resizeTime);
        i = 0;

        $timeout(function() {

          angular.forEach($element.children(), function(el){

            if(el.offsetTop !== bef){
              //console.log(ca.copy[i].w, bef);
              wordsService.setFirstLineFlag(i,1);
              bef = el.offsetTop;
            }else{
              wordsService.setFirstLineFlag(i,0);
            }

            i++;
          });

        }, 100);

      }

      ca.findFirstLines();

      w.bind('resize', function(){
        $timeout.cancel(resizeTime);
        resizeTime = $timeout(function() {
          ca.findFirstLines();
        }, 200);
      });

    }
  }

})();
