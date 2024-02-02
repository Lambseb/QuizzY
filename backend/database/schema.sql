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
  theme_id INT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_quiz_theme FOREIGN KEY (theme_id) REFERENCES theme(id),
  CONSTRAINT fk_quiz_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE response (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
response VARCHAR(255) NOT NULL,
value BOOLEAN NOT NULL,
quiz_id INT NOT NULL
);

CREATE TABLE quiz_story (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
action ENUM('created', 'done') NOT NULL,
quiz_id INT NOT NULL,
user_id INT NOT NULL,
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
  ('admin_user', 'admin@example.com', 'hashed_admin_password', TRUE);


INSERT INTO quiz (name, validated, theme_id, user_id) VALUES
  ('Qui est Ayoub?', TRUE, 1, 1),
  ('JavaScript ou PHP?', TRUE, 2, 2),
  ('Que veux dire DOM?', TRUE, 3, 2);

INSERT INTO response (response, value, quiz_id) VALUES
  ('qui?', FALSE, 1),
  ('un dev de class S', TRUE, 1),
  ('un fan de K-POP', FALSE, 1),
  ('Digital influenceuse', FALSE, 1),
  ('LOL?', FALSE, 2),
  ('JavaScript', TRUE, 2),
  ('PHP smurf smur', FALSE, 2),
  ('Document Object Model', TRUE, 3),
  ('Drill or Mods', FALSE, 3),
  ('Dawn Of Mar', FALSE, 3);

INSERT INTO quiz_story (action, quiz_id, user_id) VALUES
  ('created', 1, 1),
  ('done', 2, 2),
  ('created', 3, 2);


INSERT INTO messaging (title, body, user_id) VALUES
  ('Welcome Message', 'Thank you for joining!', 1),
  ('New Feature Announcement', 'Exciting new features are now available!', 2),
  ('Important Update', 'Please review the latest changes.', 2),
  ('Reminder', 'Don''t forget to update your profile.', 1),
  ('Event Invitation', 'You are invited to our upcoming event!', 2);