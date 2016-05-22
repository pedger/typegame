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
      ca.copy = wordsService.getWords();
      //console.log(ca.copy);

      ca.findFirstLines = function(){
        i = 0;

        $timeout(function() {

          angular.forEach($element.children(), function(el){

            //first word
            ca.copy[0].first_of_line = 1;

            if(el.offsetTop !== bef){
              console.log(ca.copy[i].w, bef);
              ca.copy[i].first_of_line = 1;
              bef = el.offsetTop;
            }else{
              ca.copy[i].first_of_line = 0;
            }

            i++;
          });

        }, 0);

      }

      ca.findFirstLines();

      w.bind('resize', function(){
         ca.findFirstLines();
      });

    }
  }

})();
