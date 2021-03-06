"use strict";

const contains = (arr, obj) => {
    return arr.some(el => {
        return el === obj;
    });
};

const i18n = {
    ru: require('./i18n/ru.json'),
    en: require('./i18n/en.json'),
    lv: require('./i18n/lv.json')
};

const rankNames = ['ones', 'thousands', 'millions', 'billions', 'trillions'];

const addHundreds = (bufResult, number, dictionary) => {
    const hundredsDigit = Math.floor(number % 1000 / 100);

    if (hundredsDigit !== 0) {
        bufResult.push(dictionary.hundreds[hundredsDigit]);
    }
};

const addTeens = (bufResult, number, dictionary) => {
    bufResult.push(dictionary.teens[number % 10]);
};

const addTens = (bufResult, number, dictionary) => {
    const tenDigit = Math.floor(number % 100 / 10);

    if (tenDigit !== 0) {
        bufResult.push(dictionary.tens[tenDigit]);
    }
};

const addOnes = (bufResult, number, dictionary, rankName) => {
    const oneDigit = Math.floor(number % 10);

    if (oneDigit !== 0) {
        if (dictionary.sexOfRank) {
            bufResult.push(dictionary.ones[dictionary.sexOfRank[rankName]][oneDigit]);
        } else {
            bufResult.push(dictionary.ones[oneDigit]);
        }
    }
};

const isTeens = (dictionary, number) => {
    return dictionary.teens && number % 100 > 9 && number % 100 < 20;
};

const getPlurals = number => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return 'one';
    } else if (contains([2, 3, 4], number % 10) && !contains([12, 13, 14], number % 100)) {
        return 'few';
    } else if (number % 10 === 0 ||
        contains([5, 6, 7, 8, 9], number % 10) ||
        contains([11, 12, 13, 14], number % 100)) {
        return 'many';
    }
    return 'other';
};

const rankToWords = (number, rank, dictionary) => {
    const bufResult = [];
    const plurals = getPlurals(number);
    const rankName = rankNames[rank];

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

const toWords = (number, locale) => {
    const dictionary = i18n[locale].numbers;
    const result = [];
    let rank = 0;
    let whole = Math.floor(number);

    while (whole > 0) {
        result.unshift(rankToWords(whole, rank, dictionary));
        rank = rank + 1;
        whole = Math.floor(whole / 1000);
    }
    return result.join(' ');
};

module.exports = toWords;
