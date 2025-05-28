/*
  # Seed French Words Data

  1. Purpose
    - Populate the french_words table with initial data
    - Add 20 common French words with Polish translations
    - Include pronunciation guides and example sentences
    - Categorize words by type and difficulty level

  2. Data Structure
    - Each word includes:
      - French word
      - Polish translation
      - Pronunciation guide
      - Word category
      - Difficulty level
      - Example sentences in both languages
*/

-- Insert sample French words with Polish translations
INSERT INTO french_words (french, polish, pronunciation, category, difficulty, examples)
VALUES
  (
    'bonjour', 
    'dzień dobry', 
    'bɔ̃ʒuʁ', 
    'noun', 
    'beginner',
    '[
      {"french": "Bonjour, comment allez-vous?", "polish": "Dzień dobry, jak się masz?"},
      {"french": "Je dis bonjour à tout le monde.", "polish": "Mówię dzień dobry wszystkim."}
    ]'::jsonb
  ),
  (
    'merci', 
    'dziękuję', 
    'mɛʁsi', 
    'noun', 
    'beginner',
    '[
      {"french": "Merci beaucoup pour votre aide.", "polish": "Dziękuję bardzo za pomoc."},
      {"french": "Je vous dis merci.", "polish": "Mówię ci dziękuję."}
    ]'::jsonb
  ),
  (
    'au revoir', 
    'do widzenia', 
    'o ʁəvwaʁ', 
    'noun', 
    'beginner',
    '[
      {"french": "Au revoir, à demain!", "polish": "Do widzenia, do jutra!"},
      {"french": "Il est temps de dire au revoir.", "polish": "Czas powiedzieć do widzenia."}
    ]'::jsonb
  ),
  (
    'oui', 
    'tak', 
    'wi', 
    'adverb', 
    'beginner',
    '[
      {"french": "Oui, je comprends.", "polish": "Tak, rozumiem."},
      {"french": "Elle a dit oui à ma proposition.", "polish": "Powiedziała tak na moją propozycję."}
    ]'::jsonb
  ),
  (
    'non', 
    'nie', 
    'nɔ̃', 
    'adverb', 
    'beginner',
    '[
      {"french": "Non, je ne suis pas d''accord.", "polish": "Nie, nie zgadzam się."},
      {"french": "Il a répondu non à ma question.", "polish": "Odpowiedział nie na moje pytanie."}
    ]'::jsonb
  ),
  (
    'maison', 
    'dom', 
    'mɛzɔ̃', 
    'noun', 
    'beginner',
    '[
      {"french": "Ma maison est grande.", "polish": "Mój dom jest duży."},
      {"french": "J''aime rester à la maison.", "polish": "Lubię zostać w domu."}
    ]'::jsonb
  ),
  (
    'chat', 
    'kot', 
    'ʃa', 
    'noun', 
    'beginner',
    '[
      {"french": "Le chat dort sur le canapé.", "polish": "Kot śpi na kanapie."},
      {"french": "J''ai un chat noir.", "polish": "Mam czarnego kota."}
    ]'::jsonb
  ),
  (
    'chien', 
    'pies', 
    'ʃjɛ̃', 
    'noun', 
    'beginner',
    '[
      {"french": "Mon chien aime courir.", "polish": "Mój pies lubi biegać."},
      {"french": "Le chien aboie.", "polish": "Pies szczeka."}
    ]'::jsonb
  ),
  (
    'manger', 
    'jeść', 
    'mɑ̃ʒe', 
    'verb', 
    'beginner',
    '[
      {"french": "J''aime manger des fruits.", "polish": "Lubię jeść owoce."},
      {"french": "Nous mangeons au restaurant.", "polish": "Jemy w restauracji."}
    ]'::jsonb
  ),
  (
    'boire', 
    'pić', 
    'bwaʁ', 
    'verb', 
    'beginner',
    '[
      {"french": "Je bois de l''eau.", "polish": "Piję wodę."},
      {"french": "Il boit du café tous les matins.", "polish": "On pije kawę każdego ranka."}
    ]'::jsonb
  ),
  (
    'dormir', 
    'spać', 
    'dɔʁmiʁ', 
    'verb', 
    'beginner',
    '[
      {"french": "Je dors huit heures par nuit.", "polish": "Śpię osiem godzin na noc."},
      {"french": "L''enfant dort profondément.", "polish": "Dziecko głęboko śpi."}
    ]'::jsonb
  ),
  (
    'parler', 
    'mówić', 
    'paʁle', 
    'verb', 
    'beginner',
    '[
      {"french": "Je parle français.", "polish": "Mówię po francusku."},
      {"french": "Nous parlons de notre voyage.", "polish": "Rozmawiamy o naszej podróży."}
    ]'::jsonb
  ),
  (
    'comprendre', 
    'rozumieć', 
    'kɔ̃pʁɑ̃dʁ', 
    'verb', 
    'intermediate',
    '[
      {"french": "Je ne comprends pas cette phrase.", "polish": "Nie rozumiem tego zdania."},
      {"french": "Elle comprend rapidement.", "polish": "Ona szybko rozumie."}
    ]'::jsonb
  ),
  (
    'aimer', 
    'kochać', 
    'eme', 
    'verb', 
    'beginner',
    '[
      {"french": "J''aime ma famille.", "polish": "Kocham moją rodzinę."},
      {"french": "Nous aimons voyager.", "polish": "Lubimy podróżować."}
    ]'::jsonb
  ),
  (
    'eau', 
    'woda', 
    'o', 
    'noun', 
    'beginner',
    '[
      {"french": "Je bois de l''eau.", "polish": "Piję wodę."},
      {"french": "L''eau de cette rivière est claire.", "polish": "Woda w tej rzece jest czysta."}
    ]'::jsonb
  ),
  (
    'pain', 
    'chleb', 
    'pɛ̃', 
    'noun', 
    'beginner',
    '[
      {"french": "J''achète du pain frais.", "polish": "Kupuję świeży chleb."},
      {"french": "Le pain français est délicieux.", "polish": "Francuski chleb jest pyszny."}
    ]'::jsonb
  ),
  (
    'livre', 
    'książka', 
    'livʁ', 
    'noun', 
    'beginner',
    '[
      {"french": "Je lis un livre intéressant.", "polish": "Czytam interesującą książkę."},
      {"french": "Elle a écrit un livre.", "polish": "Ona napisała książkę."}
    ]'::jsonb
  ),
  (
    'voiture', 
    'samochód', 
    'vwatyʁ', 
    'noun', 
    'beginner',
    '[
      {"french": "Ma voiture est rouge.", "polish": "Mój samochód jest czerwony."},
      {"french": "Nous voyageons en voiture.", "polish": "Podróżujemy samochodem."}
    ]'::jsonb
  ),
  (
    'travail', 
    'praca', 
    'tʁavaj', 
    'noun', 
    'beginner',
    '[
      {"french": "J''aime mon travail.", "polish": "Lubię swoją pracę."},
      {"french": "Le travail est important.", "polish": "Praca jest ważna."}
    ]'::jsonb
  ),
  (
    'étudier', 
    'uczyć się', 
    'etydje', 
    'verb', 
    'beginner',
    '[
      {"french": "J''étudie le français.", "polish": "Uczę się francuskiego."},
      {"french": "Elle étudie à l''université.", "polish": "Ona studiuje na uniwersytecie."}
    ]'::jsonb
  );
