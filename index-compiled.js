'use strict';

var contains = function contains(arr, obj) {
    return arr.some(function (el) {
        return el === obj;
    });
};

var i18n = {
    ru: require('./i18n/ru.json'),
    en: require('./i18n/en.json'),
    lv: require('./i18n/lv.json')
};

var rankNames = ['ones', 'thousands', 'millions', 'billions', 'trillions'];

var addHundreds = function addHundreds(bufResult, number, dictionary) {
    var hundredsDigit = Math.floor(number % 1000 / 100);

    if (hundredsDigit !== 0) {
        bufResult.push(dictionary.hundreds[hundredsDigit]);
    }
};

var addTeens = function addTeens(bufResult, number, dictionary) {
    bufResult.push(dictionary.teens[number % 10]);
};

var addTens = function addTens(bufResult, number, dictionary) {
    var tenDigit = Math.floor(number % 100 / 10);

    if (tenDigit !== 0) {
        bufResult.push(dictionary.tens[tenDigit]);
    }
};

var addOnes = function addOnes(bufResult, number, dictionary, rankName) {
    var oneDigit = Math.floor(number % 10);

    if (oneDigit !== 0) {
        if (dictionary.sexOfRank) {
            bufResult.push(dictionary.ones[dictionary.sexOfRank[rankName]][oneDigit]);
        } else {
            bufResult.push(dictionary.ones[oneDigit]);
        }
    }
};

var isTeens = function isTeens(dictionary, number) {
    return dictionary.teens && number % 100 > 9 && number % 100 < 20;
};

var getPlurals = function getPlurals(number) {
    if (number % 10 === 1 && number % 100 !== 11) {
        return 'one';
    } else if (contains([2, 3, 4], number % 10) && !contains([12, 13, 14], number % 100)) {
        return 'few';
    } else if (number % 10 === 0 || contains([5, 6, 7, 8, 9], number % 10) || contains([11, 12, 13, 14], number % 100)) {
        return 'many';
    }
    return 'other';
};

var rankToWords = function rankToWords(number, rank, dictionary) {
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
    if (rankName !== 'ones') {
        if (dictionary[rankName][plurals]) {
            bufResult.push(dictionary[rankName][plurals]);
        } else {
            bufResult.push(dictionary[rankName].other);
        }
    }
    return bufResult.join(' ');
};

var toWords = function toWords(number, locale) {
    var dictionary = i18n[locale].numbers;
    var result = [];
    var rank = 0;
    var whole = Math.floor(number);

    while (whole > 0) {
        result.unshift(rankToWords(whole, rank, dictionary));
        rank = rank + 1;
        whole = Math.floor(whole / 1000);
    }
    return result.join(' ');
};

module.exports = toWords;
