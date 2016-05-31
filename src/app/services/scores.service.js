(function() {
  'use strict';

  angular
      .module('typegame')
      .service('scoresService', scoresService);

  /** @ngInject */
  function scoresService() {

    var badges = {
          '10words':false,
          'noErrors':false,
    };

    function issueBadge(achievement) {
      switch(achievement){
        case '5words':
          badges['5words'] = true;
          break;
        case 'noErrors':
          badges['noErrors'] = true;
          break;
        default:
          break;
      }
    }

    function getBadges(){
      return badges;
    }

    function resetScores(){
      badges = {};
    }

    this.issueBadge  = issueBadge;
    this.getBadges   = getBadges;
    this.resetScores = resetScores;

  }

})();