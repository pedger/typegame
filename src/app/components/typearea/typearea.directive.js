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
    function TypeAreaController() {
      var ta = this;
      ta.originText = "original text experiment";
      var words;

      words = ta.originText.replace(/\w+/g, "<span>$&</span>");
      words = words.split(" ");
      words[0] = words[0].replace("<span>", "<span class='highlight'>");
      ta.compareText = '';
      for (var i=0; i < words.length; i++){
        ta.compareText += words[i] + " ";
      }
      ta.words = words.toString();


      // "vm.creationDate" is available by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
