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
  id INT NOT NULL,
  notification boolean,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `user` (
  id INT NOT NULL,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  phonenumber INT,
  email VARCHAR(30),
  image_path VARCHAR(40),
  status VARCHAR(30),
  password VARCHAR(40),
  register VARCHAR(20),
  saltkey VARCHAR(20),
  setting_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (setting_id) REFERENCES setting(id)
);

CREATE TABLE IF NOT EXISTS message (
  id INT NOT NULL,
  text VARCHAR(300),
  date TIMESTAMP,
  sender INT NOT NULL,
  reciever INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES `user`(id),
  FOREIGN KEY (reciever) REFERENCES `user`(id)
);

CREATE TABLE IF NOT EXISTS contact (
  id INT NOT NULL,
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id1) REFERENCES `user`(id),
  FOREIGN KEY (user_id2) REFERENCES `user`(id)
);

GRANT ALL PRIVILEGES ON * . * TO 'localAdmin'@'localhost'
IDENTIFIED BY 'password_admin' WITH GRANT OPTION;
FLUSH PRIVILEGES;
