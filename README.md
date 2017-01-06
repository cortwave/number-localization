# Number localization

[![Build Status](https://travis-ci.org/cortwave/number-localization.svg?branch=master)](https://travis-ci.org/cortwave/number-localization)

Library for localizing numbers

To install launch:
<br/>
<code>npm install number-localization</code>

Examples of using:
<br/>
<pre>
  <code>toWords = require('number-localization')</code>
  <code>toWords(123456, "ru")</code>
  <code> >> сто двадцать три тысячи четыреста пятьдесят шесть </code>
</pre>
<pre>
  <code>toWords = require('number-localization')</code>
  <code>toWords(196073226113, "en")</code>
  <code> >> one hundred ninety six billion seventy three million two hundred twenty six thousand one hundred thirteen  </code>
</pre>

Supported locales: "ru", "en", "lv"
