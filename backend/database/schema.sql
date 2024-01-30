-- Active: 1701507911414@@127.0.0.1@3306@quizzy_db
DROP DATABASE IF EXISTS quizzy_db;  
CREATE DATABASE quizzy_db;
USE quizzy_db;
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_admin  BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE theme (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE
    messaging (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR (255) NOT NULL,
  body VARCHAR (255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  is_read BOOLEAN NOT NULL DEFAULT 0,
  user_id INT NOT NULL,
  CONSTRAINT fk_message_user FOREIGN KEY (user_id) REFERENCES user(id)
    );

INSERT INTO user (username, email, password, is_admin) VALUES 
  ('john_doe', 'john@example.com', 'hashed_password_1', FALSE),
  ('alice_smith', 'alice@example.com', 'hashed_password_2', FALSE),
  ('admin_user', 'admin@example.com', 'hashed_admin_password', TRUE),
  ('test_user', 'test@example.com', 'hashed_test_password', FALSE),
  ('jane_doe', 'jane@example.com', 'hashed_password_3', FALSE),
  ('bob_smith', 'bob@example.com', 'hashed_password_4', FALSE),
  ('mary_jones', 'mary@example.com', 'hashed_password_5', FALSE),
  ('super_user', 'super@example.com', 'hashed_super_password', TRUE),
  ('developer', 'developer@example.com', 'hashed_dev_password', FALSE),
  ('power_user', 'power@example.com', 'hashed_power_password', FALSE);
INSERT INTO theme (name) VALUES 
  ('Science Fiction'),
  ('Fantasy'),
  ('Adventure'),
  ('Mystery'),
  ('Romance'),
  ('Thriller'),
  ('Historical'),
  ('Comedy'),
  ('Action'),
  ('Horror');

  INSERT INTO messaging (title, body, user_id) VALUES 
  ('Welcome Message', 'Thank you for joining!', 1),
  ('New Feature Announcement', 'Exciting new features are now available!', 2),
  ('Important Update', 'Please review the latest changes.', 3),
  ('Reminder', 'Dont forget to update your profile.', 4);

