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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS chat (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  phonenumber INT,
  email VARCHAR(30),
  image_path VARCHAR(70),
  status VARCHAR(30),
  password VARCHAR(100),
  saltkey VARCHAR(20),
  setting_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (setting_id) REFERENCES setting(id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS message (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(300),
  date TIMESTAMP,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (chat_id) REFERENCES chat(id),
  FOREIGN KEY (user_id) REFERENCES `user`(id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS contact (
  id INT NOT NULL AUTO_INCREMENT,
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id1) REFERENCES `user`(id),
  FOREIGN KEY (user_id2) REFERENCES `user`(id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS user_chat (
  id INT NOT NULL AUTO_INCREMENT,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (chat_id) REFERENCES chat(id),
  FOREIGN KEY (user_id) REFERENCES `user`(id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

GRANT ALL PRIVILEGES ON * . * TO 'localAdmin'@'localhost'
IDENTIFIED BY 'password_admin' WITH GRANT OPTION;
FLUSH PRIVILEGES;


INSERT INTO `chat` (`id`) VALUES
(1),
(2),
(3);

INSERT INTO `setting` (`id`, `notification`) VALUES
(1, 0),
(2, 0),
(3, 1),
(4, 1);

/* Passwort für alle: password1*/
INSERT INTO `user` (`id`, `firstname`, `lastname`, `phonenumber`, `email`, `image_path`, `status`, `password`, `saltkey`, `setting_id`) VALUES
(1, 'Michael', 'Hänzi', '0785541211', 'michaelhaenzi@gmail.com', 'http://api.localhost/api/v1.0/files/images/default_user.png', 'Ich esse gerne Ente.', '$2y$07$4257693655842c8575431ORpa9x58QP7SVCFJ0V.9C8mObKGWbo2m', NULL, 1),
(2, 'Nicolas', 'Ackermann', '0725544310', 'nicolasackermann@gmail.com', 'http://api.localhost/api/v1.0/files/images/default_user.png', 'MOONTAAG MORRGEN!', '$2y$07$20103919355842c881656uPD3M1FxIkKFDsmujPfBv9ib6xa/zSJu', NULL, 2),
(3, 'Joan', 'Künzler', '0745542375', 'joankuenzler@gmail.com', 'http://api.localhost/api/v1.0/files/images/default_user.png', 'FAM', '$2y$07$5350409705845195a3a03u57UM5Uv6vFrFI7bbAzYlgv0JFbQnj2a', NULL, 3),
(4, 'Lukas', 'Heeb', '0765549877', 'lukasheeb@gmail.com', 'http://api.localhost/api/v1.0/files/images/default_user.png', 'Schiff Strand', '$2y$07$2550136865845196b2adeuJTfHI9nkLoJKEP87P.W7s3otVoa1hT.', NULL, 4);

INSERT INTO `message` (`id`, `text`, `date`, `chat_id`, `user_id`) VALUES
(1, 'Hey wat up niciboiiiiii', '2016-12-03 13:30:56', 1, 1),
(2, 'Passt.', '2016-12-03 13:31:21', 1, 2),
(3, 'Höh?', '2016-12-03 13:31:44', 1, 1),
(4, 'Heey Joan Boii', '2016-12-03 13:30:56', 2, 1),
(5, 'EEEEEEEEEEY HENSII, MA BOI. WAAT AP - FAM 2016', '2016-12-03 13:31:21', 2, 3),
(6, 'Höh?', '2016-12-03 13:31:44', 2, 1),
(7, 'Hey Heeb hemmo husi uf MONTAG MORGEN?', '2016-12-03 13:30:56', 3, 2),
(8, 'Frog de Flo, FAM', '2016-12-03 13:31:21', 3, 4),
(9, 'Danke auf deine positive Resonanz auf meine Aussage.', '2016-12-03 13:31:44', 3, 2);

INSERT INTO `user_chat` (`id`, `chat_id`, `user_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 3),
(5, 3, 2),
(6, 3, 4);

INSERT INTO `contact` (`id`, `user_id1`, `user_id2`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 2, 3),
(4, 2, 4);