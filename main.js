Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var rankNames = ["ones", "thousands", "millions", "billions", "trillions"];

var toWords = (number, locale) => {
    var dictionary = i18n[locale].numbers;
    var result = [];
    var rank = 0;
    while(number > 0) {
      result.unshift(rankToWords(number, rank, dictionary));
      rank++;
      number = Math.floor(number/1000);
    }
    return result.join(" ");
};

var rankToWords = (number, rank, dictionary) => {
    var bufResult = [];
    var plurals = getPlurals(number);
    var rankName = rankNames[rank];
    addHundreds(bufResult, number, dictionary);
    if(isTeens(dictionary, number)) {
        addTeens(bufResult, number, dictionary);
    } else {
        addTens(bufResult, number, dictionary);
        addOnes(bufResult, number, dictionary, rankName);
    }
    if(rankName != "ones") {
        bufResult.push(dictionary[rankName][plurals]);
    }
    return bufResult.join(" ");
}

var addHundreds = (bufResult, number, dictionary) => {
    var hundredsDigit = Math.floor(number % 1000 / 100);
    if(hundredsDigit != 0) {
      bufResult.push(dictionary.hundreds[hundredsDigit]);
    }
};

var addTeens = (bufResult, number, dictionary) => {
    bufResult.push(dictionary.teens[number%10]);
};

var addTens = (bufResult, number, dictionary) => {
    var tenDigit = Math.floor(number % 100 /10);
    if(tenDigit != 0) {
        bufResult.push(dictionary.tens[tenDigit]);
    }
};

var addOnes = (bufResult, number, dictionary, rankName) => {
    var oneDigit = Math.floor(number % 10);
    if(oneDigit != 0) {
        if(dictionary.sexOfRank != undefined) {
            bufResult.push(dictionary.ones[dictionary.sexOfRank[rankName]][oneDigit]);
        } else {
            bufResult.push(dictionary.ones[oneDigit]);
        }
    }
};

var isTeens = (dictionary, number) => {
    return dictionary.teens && number % 100 > 9 && number % 100 < 20;
};

var getPlurals = (number) => {
    if(number % 10 == 1 && number % 100 != 11) {
      return "one";
    } else if([2, 3, 4].contains(number % 10) && ![12, 13, 14].contains(number % 100)) {
      return "few";
    } else if(number % 10 == 0 || [5, 6, 7, 8, 9].contains(number % 10) || [11, 12, 13, 14].contains(number % 100)) {
      return "many";
    } else {
      return "other";
    }
};

var i18n = { ru:
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
                      'two hundreds',
                      'three hundreds',
                      'four hundreds',
                      'five hundreds',
                      'six hundreds',
                      'seven hundreds',
                      'eight hundreds',
                      'nine hundreds'],
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
          thousands: { one: 'thousand', few:'thousands', many: 'thousands' },
          millions: { one: 'million', few:'millions', many: 'millions' },
          billions: { one: 'billion', few: 'billions', many: 'billions' },
          trillions: { one: 'trillion', few:'trillions', many: 'trillions' },
          union: 'and' } } };
