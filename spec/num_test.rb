require 'numbers_and_words'

[:ru, :lv, :en].each do |locale|
  open("#{locale.to_s}.txt", 'a') do |file|
    100.times do
      number = Random.new_seed % 1000000000000
      in_words = I18n.with_locale(locale) {number.to_words}
      file << "#{number}:#{in_words} \n"
    end
    file.close
  end
end
