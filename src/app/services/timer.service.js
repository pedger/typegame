(function() {
  'use strict';

  angular
      .module('typegame')
      .service('timerService', timerService);

  /** @ngInject */
  function timerService($timeout) {

    var period =10;
    var initCounter = 5 *1000;
    var counter = initCounter;
    var timer;

    function countDown(){
      timer = $timeout(function() {
            counter = counter-period;
            if (counter > 0) countDown();
            else stopTimer();

          }, period);
    }

    function getTimeLeft() {
        return counter;
    }

    function reset(){
      //console.log('timer reset');
      $timeout.cancel(timer);
      counter = initCounter;
    }

    function stopTimer(){
      $timeout.cancel(timer);
    }

    this.initCounter    = initCounter;
    
    this.countDown      = countDown;
    this.getTimeLeft    = getTimeLeft;
    this.reset          = reset;
    this.stopTimer      = stopTimer;

  }

})();