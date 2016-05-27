(function() {
  'use strict';

  angular
      .module('typegame')
      .service('timerService', timerService);

  /** @ngInject */
  function timerService($timeout) {
    
    var period = 1000;
    var time = 0;
    var counter = 3;
    var timer;
    
    function countDown(){
      timer = $timeout(function() {
            counter--;
            if (counter > 0) countDown();
            else stopTimer();
          }, period); 
    }
    
    function stopTimer(){
      $timeout.cancel(timer);
    }

    function getTimeLeft() {
      return counter;
    }

    this.countDown      = countDown;
    this.stopTimer      = stopTimer;
    this.getTimeLeft    = getTimeLeft;
  }

})();