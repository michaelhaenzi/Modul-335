/*  File purposes: DATABASE INITIAL COMMAND
    Created by: MICHAEL HAENZI
    Date: 29.11.2016
 */

/*DROP DATABASE horizon;*/

CREATE DATABASE IF NOT EXISTS horizon
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE horizon;

CREATE TABLE IF NOT EXISTS setting (
  id INT NOT NULL,
  notification boolean,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `protocol` (
  id INT NOT NULL,
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
  setting_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (setting_id) REFERENCES setting(id)
);

CREATE TABLE IF NOT EXISTS message (
  id INT NOT NULL,
  text VARCHAR(300),
  date TIMESTAMP,
  user_id INT NOT NULL,
  protocol_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES `user`(id),
  FOREIGN KEY (protocol_id) REFERENCES `protocol`(id)
);

CREATE TABLE IF NOT EXISTS `group` (
  id INT NOT NULL,
  name VARCHAR(30),
  description VARCHAR(150),
  image_path  VARCHAR(40),
  protocol_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (protocol_id) REFERENCES `protocol`(id)
);

CREATE TABLE IF NOT EXISTS user_group (
  id INT NOT NULL,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES `user`(id),
  FOREIGN KEY (group_id) REFERENCES `group`(id)
);

CREATE TABLE IF NOT EXISTS user_user (
  id INT NOT NULL,
  protocol_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (protocol_id) REFERENCES `protocol`(id)
);

CREATE TABLE IF NOT EXISTS user_user_rel (
  id INT NOT NULL,
  user_id INT NOT NULL,
  user_user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES `user`(id),
  FOREIGN KEY (user_user_id) REFERENCES user_user(id)
);