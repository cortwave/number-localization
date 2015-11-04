# number-localization
Library for localizing numbers

To install launch:
<br/>
<code>npm install number-localization</code>

Examples of using:
<br/>
<pre>
  <code>toWords = require('number-localization')</code>
  <code>toWords(123456, "ru")</code>
</pre><br/>
result:<br/>
<code> сто двадцать три тысячи четыреста пятьдесят шесть </code>

<pre>
  <code>toWords = require('number-localization')</code>
  <code>toWords(196073226113, "en")</code>
</pre><br/>
result:<br/>
<code> one hundred ninety six billion seventy three million two hundred twenty six thousand one hundred thirteen  </code>


Supported locales: "ru", "en", "lv"
