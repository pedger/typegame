(function() {
  'use strict';

  angular
      .module('typegame')
      .service('timerService', timerService);

  /** @ngInject */
  function timerService($timeout) {

    var period =10;
    var initCounter = 3 *1000;
    var counter = initCounter;
    var time = 0;
    var timer;

    function countDown(){
      timer = $timeout(function() {
            counter = counter-period;
            time = time + period;
            if (counter > 0) countDown();
            else stopTimer();

          }, period);
    }

    function getTime() {
        return time;
    }

    function getTimeLeft() {
        return counter;
    }

    function reset(){
      //console.log('timer reset');
      $timeout.cancel(timer);
      counter = initCounter;
      time = 0;
    }

    function stopTimer(){
      $timeout.cancel(timer);
    }

    this.initCounter    = initCounter;
    this.countDown      = countDown;
    this.getTime        = getTime;
    this.getTimeLeft    = getTimeLeft;
    this.reset          = reset;
    this.stopTimer      = stopTimer;

  }

})();