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

var toWords = (number) => {
    var result = "";
    var rank = 0;
    while(number > 0) {
      result = rankToWords(number, rank) + result;
      rank++;
      number = Math.floor(number/1000);
    }
    return result;
};

var rankToWords = (number, rank) => {
    var bufNumber = number % 1000;
    var bufResult = "";
    var plurals = getPlurals(bufNumber);
    var hundredsDigit = Math.floor(bufNumber/100);
    var rankName = rankNames[rank];
    if(hundredsDigit != 0) {
      bufResult += i18n.ru.numbers.hundreds[hundredsDigit] + " ";
    }
    bufNumber = bufNumber % 100;
    if(bufNumber > 9 && bufNumber < 20) {
      bufResult += i18n.ru.numbers.teens[bufNumber%10] + " ";
    } else {
      var tenDigit = Math.floor(bufNumber/10);
      if(tenDigit != 0) {
        bufResult += i18n.ru.numbers.tens[tenDigit] + " ";
      }
      var oneDigit = Math.floor(bufNumber % 10);
      if(oneDigit != 0) {
        bufResult += i18n.ru.numbers.ones[sexOfRank[rankName]][oneDigit] + " ";
      }
    }
    if(rankName != "ones") {
      bufResult += i18n.ru.numbers[rankName][plurals] + " ";
    }
    return bufResult;
}

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

var sexOfRank = {
  ones: "male",
  thousands: "female",
  millions: "male",
  billions: "male",
  trillions: "male"
};

var i18n = { ru:
   { numbers:
      { ones:
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
        quadrillions:
         { one: 'квадриллион',
           few: 'квадриллиона',
           many: 'квадриллионов' },
        quintillions:
         { one: 'квинтиллион',
           few: 'квинтиллиона',
           many: 'квинтиллионов' },
        sextillions:
         { one: 'секстиллион',
           few: 'секстиллиона',
           many: 'секстиллионов' },
        septillions: { one: 'септиллион', few: 'секстиллиона', many: 'секстиллионов' },
        octillions: { one: 'октиллион', few: 'октиллиона', many: 'октиллионов' },
        nonillions: { one: 'нониллион', few: 'нониллиона', many: 'нониллионов' },
        decillions: { one: 'дециллион', few: 'дециллиона', many: 'дециллионов' },
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
           'decillions' ] } } };
