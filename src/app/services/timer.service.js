(function() {
  'use strict';

  angular
      .module('typegame')
      .service('timerService', timerService);

  /** @ngInject */
  function timerService($timeout) {

    var period = 10;
    var time = 0;
    var counter = 10000;
    var timer;

    function countDown(){
      timer = $timeout(function() {
            counter = counter-period;
            if (counter > 0) countDown();
            else stopTimer();
          }, period);
    }

    function stopTimer(){
      $timeout.cancel(timer);
      alert('stopped');
    }

    function getTimeLeft(format) {
      if(format){
        return moment(counter).format("mm:ss.SS");
      }else{
        return counter;
      }
    }

    this.countDown      = countDown;
    this.stopTimer      = stopTimer;
    this.getTimeLeft    = getTimeLeft;
  }

})();