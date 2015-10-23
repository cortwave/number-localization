Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var numToWord =  {

    rankNames: ["ones", "thousands", "millions", "billions", "trillions"],

    toWords: function(number, locale) {
        var dictionary = this.i18n[locale].numbers;
        var result = [];
        var rank = 0;
        while(number > 0) {
          result.unshift(this.rankToWords(number, rank, dictionary));
          rank++;
          number = Math.floor(number/1000);
        }
        return result.join(" ");
    },

    rankToWords: function(number, rank, dictionary) {
        var bufResult = [];
        var plurals = this.getPlurals(number);
        var rankName = this.rankNames[rank];
        this.addHundreds(bufResult, number, dictionary);
        if(this.isTeens(dictionary, number)) {
            this.addTeens(bufResult, number, dictionary);
        } else {
            this.addTens(bufResult, number, dictionary);
            this.addOnes(bufResult, number, dictionary, rankName);
        }
        if(rankName != "ones") {
            if(dictionary[rankName][plurals]) {
                bufResult.push(dictionary[rankName][plurals]);
            } else {
                bufResult.push(dictionary[rankName].other);
            }
        }
        return bufResult.join(" ");
    },

    addHundreds: function(bufResult, number, dictionary) {
        var hundredsDigit = Math.floor(number % 1000 / 100);
        if(hundredsDigit != 0) {
          bufResult.push(dictionary.hundreds[hundredsDigit]);
        }
    },

    addTeens: function(bufResult, number, dictionary) {
        bufResult.push(dictionary.teens[number%10]);
    },

    addTens: function(bufResult, number, dictionary) {
        var tenDigit = Math.floor(number % 100 /10);
        if(tenDigit != 0) {
            bufResult.push(dictionary.tens[tenDigit]);
        }
    },

    addOnes: function(bufResult, number, dictionary, rankName) {
        var oneDigit = Math.floor(number % 10);
        if(oneDigit != 0) {
            if(dictionary.sexOfRank != undefined) {
                bufResult.push(dictionary.ones[dictionary.sexOfRank[rankName]][oneDigit]);
            } else {
                bufResult.push(dictionary.ones[oneDigit]);
            }
        }
    },

    isTeens: function(dictionary, number) {
        return dictionary.teens && number % 100 > 9 && number % 100 < 20;
    },

    getPlurals: function(number) {
        if(number % 10 == 1 && number % 100 != 11) {
          return "one";
        } else if([2, 3, 4].contains(number % 10) && ![12, 13, 14].contains(number % 100)) {
          return "few";
        } else if(number % 10 == 0 || [5, 6, 7, 8, 9].contains(number % 10) || [11, 12, 13, 14].contains(number % 100)) {
          return "many";
        } else {
          return "other";
        }
    },

    i18n: { ru:
       { numbers:
          { sexOfRank: {
            ones: "male",
            thousands: "female",
            millions: "male",
            billions: "male",
            trillions: "male"
            },
            ones:
             { male:
                [ 'ноль',
                  'один',
                  'два',
                  'три',
                  'четыре',
                  'пять',
                  'шесть',
                  'семь',
                  'восемь',
                  'девять' ],
               female:
                [ 'ноль',
                  'одна',
                  'двe',
                  'три',
                  'четыре',
                  'пять',
                  'шесть',
                  'семь',
                  'восемь',
                  'девять' ],
               neuter:
                [ 'ноль',
                  'одно',
                  'два',
                  'три',
                  'четыре',
                  'пять',
                  'шесть',
                  'семь',
                  'восемь',
                  'девять' ] },
            teens:
             [ 'десять',
               'одиннадцать',
               'двенадцать',
               'тринадцать',
               'четырнадцать',
               'пятнадцать',
               'шестнадцать',
               'семнадцать',
               'восемнадцать',
               'девятнадцать' ],
            tens:
             [ 'ноль',
               'десять',
               'двадцать',
               'тридцать',
               'сорок',
               'пятьдесят',
               'шестьдесят',
               'семьдесят',
               'восемьдесят',
               'девяносто' ],
            hundreds:
             [ 'ноль',
               'сто',
               'двести',
               'триста',
               'четыреста',
               'пятьсот',
               'шестьсот',
               'семьсот',
               'восемьсот',
               'девятьсот' ],
            union_separator: 'и',
            union: 'и',
            micro:
             { one:
                [ '_',
                  'десятая',
                  'сотая',
                  'тысячная',
                  'миллионная',
                  'миллиардная',
                  'триллионная' ],
               few:
                [ '_',
                  'десятых',
                  'сотых',
                  'тысячных',
                  'миллионных',
                  'миллиардных',
                  'триллионных' ],
               many:
                [ '_',
                  'десятых',
                  'сотых',
                  'тысячных',
                  'миллионных',
                  'миллиардных',
                  'триллионных' ] },
            sub_micro: [ '_', 'десяти', 'сто' ],
            integral: { one: 'целая', few: 'целых', many: 'целых' },
            thousands: { one: 'тысяча', few: 'тысячи', many: 'тысяч' },
            millions: { one: 'миллион', few: 'миллиона', many: 'миллионов' },
            billions: { one: 'миллиард', few: 'миллиарда', many: 'миллиардов' },
            trillions: { one: 'триллион', few: 'триллионa', many: 'триллионов' },
            mega:
             [ 'ones',
               'thousands',
               'millions',
               'billions',
               'trillions',
               'quadrillions',
               'quintillion',
               'sextillions',
               'septillions',
               'octillions',
               'nonillions',
               'decillions' ] } },
               en:
         { numbers:
            { ones:
               [ 'zero',
                 'one',
                 'two',
                 'three',
                 'four',
                 'five',
                 'six',
                 'seven',
                 'eight',
                 'nine' ],
              teens:
               [ 'ten',
                 'eleven',
                 'twelve',
                 'thirteen',
                 'fourteen',
                 'fifteen',
                 'sixteen',
                 'seventeen',
                 'eighteen',
                 'nineteen' ],
              tens:
               [ 'zero',
                 'ten',
                 'twenty',
                 'thirty',
                 'forty',
                 'fifty',
                 'sixty',
                 'seventy',
                 'eighty',
                 'ninety' ],
              hundreds: ['zero',
                          'one hundred',
                          'two hundred',
                          'three hundred',
                          'four hundred',
                          'five hundred',
                          'six hundred',
                          'seven hundred',
                          'eight hundred',
                          'nine hundred'],
              mega:
               [ 'ones',
                 'thousand',
                 'million',
                 'billion',
                 'trillion',
                 'quadrillion',
                 'quintillion',
                 'sextillion',
                 'septillion',
                 'octillion',
                 'nonillion',
                 'decillion',
                 'undecillion',
                 'duodecillion',
                 'tredecillion',
                 'quattuordecillion' ],
              ordinal:
               { ones:
                  [ 'zeroth',
                    'first',
                    'second',
                    'third',
                    'fourth',
                    'fifth',
                    'sixth',
                    'seventh',
                    'eighth',
                    'ninth' ],
                 teens:
                  [ 'tenth',
                    'eleventh',
                    'twelfth',
                    'thirteenth',
                    'fourteenth',
                    'fifteenth',
                    'sixteenth',
                    'seventeenth',
                    'eighteenth',
                    'nineteenth' ],
                 tens:
                  [ 'zeroth',
                    'tenth',
                    'twentieth',
                    'thirtieth',
                    'fortieth',
                    'fiftieth',
                    'sixtieth',
                    'seventieth',
                    'eightieth',
                    'ninetieth' ],
                 mega:
                  [ 'zeroth',
                    'thousandth',
                    'millionth',
                    'billionth',
                    'trillionth',
                    'quadrillionth',
                    'quintillionth',
                    'sextillionth',
                    'septillionth',
                    'octillionth',
                    'nonillionth',
                    'decillionth',
                    'undecillionth',
                    'duodecillionth',
                    'tredecillionth',
                    'quattuordecillionth' ] },
              union_separator: 'and',
              micro:
               [ '_',
                 'tenths',
                 'hundredths',
                 'thousandths',
                 'millionths',
                 'billionths',
                 'trillionths',
                 'quadrillionths',
                 'quintillionths',
                 'sextillionths',
                 'septillionths',
                 'octillionths',
                 'nonillionths',
                 'decillionths',
                 'undecillionths',
                 'duodecillionths',
                 'tredecillionths',
                 'quattuordecillionths' ],
              tenths: { one: 'tenth', other: 'tenths' },
              thousands: { one: 'thousand', few:'thousand', many: 'thousand' },
              millions: { one: 'million', few:'million', many: 'million' },
              billions: { one: 'billion', few: 'billion', many: 'billion' },
              trillions: { one: 'trillion', few:'trillion', many: 'trillion' },
              union: 'and' } },
              lv:
         { numbers:
            { ones:
               [ 'nulle',
                 'viens',
                 'divi',
                 'trīs',
                 'četri',
                 'pieci',
                 'seši',
                 'septiņi',
                 'astoņi',
                 'deviņi' ],
              teens:
               [ 'desmit',
                 'vienpadsmit',
                 'divpadsmit',
                 'trīspadsmit',
                 'četrpadsmit',
                 'piecpadsmit',
                 'sešpadsmit',
                 'septiņpadsmit',
                 'astoņpadsmit',
                 'deviņpadsmit' ],
              tens:
               [ 'nulle',
                 'desmit',
                 'divdesmit',
                 'trīsdesmit',
                 'četrdesmit',
                 'piecdesmit',
                 'sešdesmit',
                 'septiņdesmit',
                 'astoņdesmit',
                 'deviņdesmit' ],
              mega:
               [ 'ones',
                 'thousands',
                 'millions',
                 'billions',
                 'trillions',
                 'quadrillions',
                 'quintillion',
                 'sextillions',
                 'septillions',
                 'octillions',
                 'nonillions',
                 'decillions' ],
              hundreds:
               [ 'zero',
                 'simtu',
                 'divi simti',
                 'trīs simti',
                 'četri simti',
                 'pieci simti',
                 'seši simti',
                 'septiņi simti',
                 'astoņi simti',
                 'deviņi simti' ],
              one_hundred: 'simts',
              thousands: { one: 'tūkstots', other: 'tūkstoši' },
              millions: { one: 'miljons', other: 'miljoni' },
              billions: { one: 'miljards', other: 'miljardi' },
              trillions: { one: 'triljons', other: 'triljoni' },
              quadrillions: { one: 'kvadriljons', other: 'kvadriljoni' },
              quintillions: { one: 'kvintiljons', other: 'kvintiljoni' },
              sextillions: { one: 'sekstiljons', other: 'sekstiljoni' },
              septillions: { one: 'septiljons', other: 'septiljoni' },
              octillions: { one: 'oktiljons', other: 'oktiljoni' },
              nonillions: { one: 'noniljons', other: 'noniljoni' },
              decillions: { one: 'deciljons', other: 'deciljoni' } } } }
  };

  module.exports = numToWord;
