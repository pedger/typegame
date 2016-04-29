(function() {
  'use strict';

  angular
    .module('typegame')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
