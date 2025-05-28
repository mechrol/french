/*
  # Create French Words Database Schema

  1. New Tables
    - `french_words` - Main table for storing French vocabulary
      - `id` (uuid, primary key)
      - `french` (text, the French word)
      - `polish` (text, Polish translation)
      - `pronunciation` (text, pronunciation guide)
      - `category` (text, word category like noun, verb, etc.)
      - `difficulty` (text, difficulty level)
      - `examples` (jsonb, example sentences)
      - `created_at` (timestamp)
    - `saved_words` - Junction table for users' saved words
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `word_id` (uuid, foreign key to french_words)
      - `created_at` (timestamp)
    - `favorite_words` - Junction table for users' favorite words
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `word_id` (uuid, foreign key to french_words)
      - `created_at` (timestamp)
    - `user_stats` - Table for tracking user learning statistics
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `words_learned` (integer)
      - `lessons_completed` (integer)
      - `quizzes_taken` (integer)
      - `days_streak` (integer)
      - `last_activity` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and manage their own data
*/

-- Create french_words table
CREATE TABLE IF NOT EXISTS french_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  french text NOT NULL,
  polish text NOT NULL,
  pronunciation text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  examples jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create saved_words table
CREATE TABLE IF NOT EXISTS saved_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  word_id uuid REFERENCES french_words NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, word_id)
);

-- Create favorite_words table
CREATE TABLE IF NOT EXISTS favorite_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  word_id uuid REFERENCES french_words NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, word_id)
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  words_learned integer DEFAULT 0,
  lessons_completed integer DEFAULT 0,
  quizzes_taken integer DEFAULT 0,
  days_streak integer DEFAULT 0,
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE french_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for french_words
CREATE POLICY "Anyone can read french_words"
  ON french_words
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create policies for saved_words
CREATE POLICY "Users can manage their saved words"
  ON saved_words
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for favorite_words
CREATE POLICY "Users can manage their favorite words"
  ON favorite_words
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for user_stats
CREATE POLICY "Users can read their own stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON user_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_french_words_french ON french_words (french);
CREATE INDEX IF NOT EXISTS idx_french_words_category ON french_words (category);
CREATE INDEX IF NOT EXISTS idx_french_words_difficulty ON french_words (difficulty);
CREATE INDEX IF NOT EXISTS idx_saved_words_user_id ON saved_words (user_id);
CREATE INDEX IF NOT EXISTS idx_favorite_words_user_id ON favorite_words (user_id);
