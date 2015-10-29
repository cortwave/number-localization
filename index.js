var ru = require('./i18n/ru.json');
var lv = require('./i18n/lv.json');
var en = require('./i18n/en.json');

function contains (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
};

var i18n = {
    ru: ru,
    en: en,
    lv: lv
};

function loadLang(locale) {
    var lang = require('./i18n/' + locale + '.json');
    i18n[locale] = lang;
};

var rankNames = ["ones", "thousands", "millions", "billions", "trillions"];

var toWords = function (number, locale) {
    loadLang(locale);
    var dictionary = i18n[locale].numbers;
    var result = [];
    var rank = 0;
    var fractional = '';
    var whole = number;
    if (number.indexOf('.') != -1) {
        fractional = number.substring(number.indexOf('.'), number.length);
        whole = number.substring(0, number.indexOf('.'));
    } else if (number.indexOf(',') != -1) {
        fractional = number.substring(number.indexOf(','), number.length);
        whole = number.substring(0, number.indexOf(','));
    }
    while (whole > 0) {
        result.unshift(rankToWords(whole, rank, dictionary));
        rank++;
        whole = Math.floor(whole / 1000);
    }
    if (fractional !== '' && fractional !== '.' && fractional !== ',') {
        return result.join(" ").concat(' ').concat(fractional);
    }
    return result.join(" ");
};

function rankToWords(number, rank, dictionary) {
    var bufResult = [];
    var plurals = getPlurals(number);
    var rankName = rankNames[rank];
    addHundreds(bufResult, number, dictionary);
    if (isTeens(dictionary, number)) {
        addTeens(bufResult, number, dictionary);
    } else {
        addTens(bufResult, number, dictionary);
        addOnes(bufResult, number, dictionary, rankName);
    }
    if (rankName != "ones") {
        if (dictionary[rankName][plurals]) {
            bufResult.push(dictionary[rankName][plurals]);
        } else {
            bufResult.push(dictionary[rankName].other);
        }
    }
    return bufResult.join(" ");
};

function addHundreds (bufResult, number, dictionary) {
    var hundredsDigit = Math.floor(number % 1000 / 100);
    if (hundredsDigit != 0) {
        bufResult.push(dictionary.hundreds[hundredsDigit]);
    }
};

function addTeens(bufResult, number, dictionary) {
    bufResult.push(dictionary.teens[number % 10]);
};

function addTens(bufResult, number, dictionary) {
    var tenDigit = Math.floor(number % 100 / 10);
    if (tenDigit != 0) {
        bufResult.push(dictionary.tens[tenDigit]);
    }
};

function addOnes(bufResult, number, dictionary, rankName) {
    var oneDigit = Math.floor(number % 10);
    if (oneDigit != 0) {
        if (dictionary.sexOfRank != undefined) {
            bufResult.push(dictionary.ones[dictionary.sexOfRank[rankName]][oneDigit]);
        } else {
            bufResult.push(dictionary.ones[oneDigit]);
        }
    }
};

function isTeens(dictionary, number) {
    return dictionary.teens && number % 100 > 9 && number % 100 < 20;
};

function getPlurals(number) {
    if (number % 10 == 1 && number % 100 != 11) {
        return "one";
    } else if (contains([2, 3, 4], number % 10) && !contains([12, 13, 14], number % 100)) {
        return "few";
    } else if (number % 10 == 0 || contains([5, 6, 7, 8, 9], number % 10) || contains([11, 12, 13, 14], number % 100)) {
        return "many";
    } else {
        return "other";
    }
};


module.exports = toWords;
