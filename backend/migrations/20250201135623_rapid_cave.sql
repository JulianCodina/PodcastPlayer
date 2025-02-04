/*
  # Create user profiles and audios tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `created_at` (timestamp)
    - `audios`
      - `id` (int8, primary key, unique)
      - `title` (text)
      - `URLmp3` (text)
      - `URLimg` (text)
    - `profiles_audios`
      - `pid` (int8, foreign key references profiles)
      - `aid` (int8, foreign key references audios)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create audios table
CREATE TABLE IF NOT EXISTS audios (
  id int8 PRIMARY KEY,
  title text NOT NULL,
  URLmp3 text NOT NULL,
  URLimg text NOT NULL
);

-- Create profiles_audios table
CREATE TABLE IF NOT EXISTS profiles_audios (
  pid int8 REFERENCES profiles(id),
  aid int8 REFERENCES audios(id),
  PRIMARY KEY (pid, aid)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();