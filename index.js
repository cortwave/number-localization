var ru = require('./i18n/ru.json');
var lv = require('./i18n/lv.json');
var en = require('./i18n/en.json');

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var NumberL10n = {

    rankNames: ["ones", "thousands", "millions", "billions", "trillions"],

    toWords: function (number, locale) {
        var dictionary = this.i18n[locale].numbers;
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
            result.unshift(this.rankToWords(whole, rank, dictionary));
            rank++;
            whole = Math.floor(whole / 1000);
        }
        if (fractional !== '' && fractional !== '.' && fractional !== ',') {
            return result.join(" ").concat(' ').concat(fractional);
        }
        return result.join(" ");
    },

    rankToWords: function (number, rank, dictionary) {
        var bufResult = [];
        var plurals = this.getPlurals(number);
        var rankName = this.rankNames[rank];
        this.addHundreds(bufResult, number, dictionary);
        if (this.isTeens(dictionary, number)) {
            this.addTeens(bufResult, number, dictionary);
        } else {
            this.addTens(bufResult, number, dictionary);
            this.addOnes(bufResult, number, dictionary, rankName);
        }
        if (rankName != "ones") {
            if (dictionary[rankName][plurals]) {
                bufResult.push(dictionary[rankName][plurals]);
            } else {
                bufResult.push(dictionary[rankName].other);
            }
        }
        return bufResult.join(" ");
    },

    addHundreds: function (bufResult, number, dictionary) {
        var hundredsDigit = Math.floor(number % 1000 / 100);
        if (hundredsDigit != 0) {
            bufResult.push(dictionary.hundreds[hundredsDigit]);
        }
    },

    addTeens: function (bufResult, number, dictionary) {
        bufResult.push(dictionary.teens[number % 10]);
    },

    addTens: function (bufResult, number, dictionary) {
        var tenDigit = Math.floor(number % 100 / 10);
        if (tenDigit != 0) {
            bufResult.push(dictionary.tens[tenDigit]);
        }
    },

    addOnes: function (bufResult, number, dictionary, rankName) {
        var oneDigit = Math.floor(number % 10);
        if (oneDigit != 0) {
            if (dictionary.sexOfRank != undefined) {
                bufResult.push(dictionary.ones[dictionary.sexOfRank[rankName]][oneDigit]);
            } else {
                bufResult.push(dictionary.ones[oneDigit]);
            }
        }
    },

    isTeens: function (dictionary, number) {
        return dictionary.teens && number % 100 > 9 && number % 100 < 20;
    },

    getPlurals: function (number) {
        if (number % 10 == 1 && number % 100 != 11) {
            return "one";
        } else if ([2, 3, 4].contains(number % 10) && ![12, 13, 14].contains(number % 100)) {
            return "few";
        } else if (number % 10 == 0 || [5, 6, 7, 8, 9].contains(number % 10) || [11, 12, 13, 14].contains(number % 100)) {
            return "many";
        } else {
            return "other";
        }
    },

    i18n: {
        ru: ru,
        en: en,
        lv: lv
    }
};

module.exports = NumberL10n;
