var main = require('../main.js');
var fs = require('fs');

function readLines(input, func, locale) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line, locale);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function compareNumbers(data, locale) {
  var num = data.split(":")[0];
  var numInWords = data.split(":")[1];
  var result = main.toWords(num, locale);
  if(result.replace(/ /g, '').replace(/-/g, '').replace(/\r/g, '') !== numInWords.replace(/ /g, '').replace(/-/g, '').replace(/\r/g, '')) {
    console.log(num);
    console.log("expected:" + numInWords + "\n" + "result:  " + result);
  }
}

["ru", "lv", "en"].forEach((locale) => {
  var input = fs.createReadStream(locale + ".txt");
  readLines(input, compareNumbers, locale);
});
