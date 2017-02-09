var wordErrorList = [];
var wordList = [];
var errMap = {};

function fnSetWordList (list) {
  let temp = [];
  wordList = temp.concat(list);
}

function fnGetErrorList () {
  return wordErrorList;
}

export default {
  setWordList: fnSetWordList,
  getErrorList: fnGetErrorList
};
