(function() {
  'use strict';

  angular
    .module('typegame')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, wordsService) {
    var vm = this;

    vm.awesomeThings, vm.words = [];
    vm.classAnimation = '';
    vm.creationDate = 1461923663095;
    vm.showToastr = showToastr;

    vm.words = wordsService.getWords();


    activate();

    function activate() {
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Here we can show HTML <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><u>with links</u></a>');
      vm.classAnimation = '';
    }
    showToastr();

  }
})();
