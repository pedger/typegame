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
    function TypeAreaController($scope, $element, $log) {
      var ta = this;
      ta.insertedText = '';
      
      ta.originText = $element.attr('words');
      $scope.words = $element.attr('words').split(' ');
      //var words = $scope.words;
  //    $scope.getElementById('0').toggleClass('highlight');

      $scope.highlight = function(event) {
        $log.log(event.target);
        angular.element(event.target).toggleClass('highlight');
      };

      var i=0;
      $scope.typing = function(text) {
        if(text == $scope.words[i]){
            ta.insertedText += text +" ";
            i++;
            ta.compareText = '';
        }
        $log.log(text);

      };
      // var wordsArray = ta.originText.split (" ");
      
      // ta.compareText = '';
      // ta.words = '';
      
      // for (var i=0; i < wordsArray.length; i++){
      //   ta.words += wordsArray[i].replace(/\w+/g, "<span class='highlight'>$&</span> ");
        


      //   ta.compareText += wordsArray[i] + " ";
      // }

      // words = ta.originText.replace(/\w+/g, "<span>$&</span>");
      // words = words.split(" ");
      // words[0] = words[0].replace("<span>", "<span class='highlight'>");

      
      // for (var i=0; i < words.length; i++){
      //   ta.compareText += words[i] + " ";
      // }
      
      // ta.words = words.toString();


      // "vm.creationDate" is available by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
