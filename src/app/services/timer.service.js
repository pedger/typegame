(function() {
  'use strict';

  angular
      .module('typegame')
      .service('timerService', timerService);

  /** @ngInject */
  function timerService($timeout) {

    var period =10;
    var initCounter = 60 *1000;
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

    function endCountDown(){
      // if we user counter = 0, countDown() turns it into 59:59:990
      counter = period;

    }

    this.initCounter    = initCounter;
    this.countDown      = countDown;
    this.getTime        = getTime;
    this.getTimeLeft    = getTimeLeft;
    this.reset          = reset;
    this.stopTimer      = stopTimer;
    this.endCountDown   = endCountDown;

  }

})();