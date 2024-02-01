-- Active: 1701507911414@@127.0.0.1@3306@quizzy_db
DROP DATABASE IF EXISTS quizzy_db;  
CREATE DATABASE quizzy_db;
USE quizzy_db;



CREATE TABLE theme (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_admin  BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE quiz (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL UNIQUE,
  validated BOOLEAN NOT NULL DEFAULT FALSE,
  theme_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_quiz_theme FOREIGN KEY (theme_id) REFERENCES theme(id),
  CONSTRAINT fk_quiz_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE response (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
response VARCHAR(255) NOT NULL,
value BOOLEAN NOT NULL,
quiz_id INT NOT NULL,
CONSTRAINT fk_response_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE quiz_story (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
action ENUM('created', 'done') NOT NULL,
quiz_id INT NOT NULL,
user_id INT NOT NULL,
CONSTRAINT fk_quiz_story_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id),
CONSTRAINT fk_quiz_story_user FOREIGN KEY (user_id) REFERENCES user(id)
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





INSERT INTO theme (name) VALUES
  ('Science Fiction'),
  ('Fantasy'),
  ('Adventure'),
  ('Mystery'),
  ('Romance');

INSERT INTO user (username, email, password, is_admin) VALUES
  ('john_doe', 'john@example.com', 'hashed_password_1', FALSE),
  ('alice_smith', 'alice@example.com', 'hashed_password_2', FALSE),
  ('admin_user', 'admin@example.com', 'hashed_admin_password', TRUE),
  ('test_user', 'test@example.com', 'hashed_test_password', FALSE),
  ('jane_doe', 'jane@example.com', 'hashed_password_3', FALSE);

INSERT INTO quiz (name, validated, theme_id, user_id) VALUES
  ('Quiz 1', TRUE, 1, 1),
  ('Quiz 2', FALSE, 2, 2),
  ('Quiz 3', TRUE, 3, 3),
  ('Quiz 4', FALSE, 1, 4),
  ('Quiz 5', TRUE, 2, 5);

INSERT INTO response (response, value, quiz_id) VALUES
  ('Option A', TRUE, 1),
  ('Option B', FALSE, 1),
  ('Option C', TRUE, 2),
  ('Option D', FALSE, 2),
  ('Option A', TRUE, 3);

INSERT INTO quiz_story (action, quiz_id, user_id) VALUES
  ('created', 1, 1),
  ('done', 2, 2),
  ('created', 3, 3),
  ('done', 4, 4),
  ('created', 5, 5);

INSERT INTO messaging (title, body, user_id) VALUES
  ('Welcome Message', 'Thank you for joining!', 1),
  ('New Feature Announcement', 'Exciting new features are now available!', 2),
  ('Important Update', 'Please review the latest changes.', 3),
  ('Reminder', 'Don''t forget to update your profile.', 4),
  ('Event Invitation', 'You are invited to our upcoming event!', 5);