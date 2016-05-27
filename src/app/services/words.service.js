(function() {
  'use strict';

  angular
      .module('typegame')
      .service('wordsService', wordsService);

  /** @ngInject */
  function wordsService() {

    var words = [];
    var text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    var splitted_words = text.split(" ");

    splitted_words.map(function(word){
      words.push({w: word, class:'', first_of_line: 0});
    });

    function getWords() {
      return words;
    }

    function setFirstLineFlag(index, bool){
      //first word
      words[0].first_of_line = 1;
      words[index].first_of_line = bool;
    }

    function setClass(index, _class){
      words[index].class = _class;

    }

    this.getWords         = getWords;
    this.setFirstLineFlag = setFirstLineFlag;
    this.setClass         = setClass;
  }

})();