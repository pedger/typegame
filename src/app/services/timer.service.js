(function() {
  'use strict';

  angular
      .module('typegame')
      .service('timerService', timerService);

  /** @ngInject */
  function timerService($timeout) {
    
    var period = 1000;
    var time = 0;
    var timer;
    
    function startTimer(){
      timer = $timeout(function() {
          console.log(timer);
          }, period);  
    }
    
    function stopTimer(){
      $timeout.cancel(timer);
    }

    function getTime() {
      return this.timer;
    }

    this.startTimer      = startTimer;
    this.stopTimer      = stopTimer;
    this.getTime         = getTime;
  }

})();