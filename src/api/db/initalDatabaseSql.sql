/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 10:32
 */

DROP DATABASE horizon;

CREATE DATABASE IF NOT EXISTS horizon
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE horizon;

CREATE TABLE IF NOT EXISTS setting (
  id INT NOT NULL AUTO_INCREMENT,
  notification boolean,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS chat (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `user` (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  phonenumber INT,
  email VARCHAR(30),
  image_path VARCHAR(40),
  status VARCHAR(30),
  password VARCHAR(100),
  saltkey VARCHAR(20),
  setting_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (setting_id) REFERENCES setting(id)
);

CREATE TABLE IF NOT EXISTS message (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(300),
  date TIMESTAMP,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (chat_id) REFERENCES chat(id),
  FOREIGN KEY (user_id) REFERENCES `user`(id)
);

CREATE TABLE IF NOT EXISTS contact (
  id INT NOT NULL AUTO_INCREMENT,
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id1) REFERENCES `user`(id),
  FOREIGN KEY (user_id2) REFERENCES `user`(id)
);

CREATE TABLE IF NOT EXISTS user_chat (
  id INT NOT NULL AUTO_INCREMENT,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (chat_id) REFERENCES chat(id),
  FOREIGN KEY (user_id) REFERENCES `user`(id)
);

GRANT ALL PRIVILEGES ON * . * TO 'localAdmin'@'localhost'
IDENTIFIED BY 'password_admin' WITH GRANT OPTION;
FLUSH PRIVILEGES;
