<?php
/**
* Created by PhpStorm.
* User: Michael Haenzi
* Date: 29.11.2016
* Time: 11:15
*/


class UserMapper extends Mapper {

    public function getUserByEmail($email)
    {
        $sql = "SELECT id, firstname, lastname, email, phonenumber, password
                FROM `user`
                WHERE email = :email";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["email" => $email]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
        } else {
            throw new Exception();
        }
    }

    public function getUserByPhonenumber($phonenumber)
    {
        $sql = "SELECT id, firstname, lastname, email, phonenumber, password
                FROM `user`
                WHERE phonenumber = :phonenumber";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["phonenumber" => $phonenumber]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
        } else {
            throw new Exception();
        }
    }

    public function getUser($ownerId, $id) {
        $sql = "SELECT id, firstname, lastname, phonenumber, email, image_path, status, setting_id
                FROM `user`
                WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["id" => $id]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            $data["password"] = "";
            $user = new UserEntity($data);
            if ($id == $ownerId) {
                return $user;
            } else {
                $user->isContact = $this->areUsersInContact($ownerId, $id);
                $sql = "SELECT u.chat_id
                FROM user_chat u 
                JOIN user_chat c on u.chat_id = c.chat_id 
                WHERE u.user_id = :userId1 AND c.user_id = :userId2;";

                $stmt = $this->db->prepare($sql);
                $result = $stmt->execute(["userId1" => $ownerId, "userId2" => $user->getId()]);
                $data = $stmt->fetch();

                if ($result) {
                    if (empty($data)) {
                        $user->chatId = null;
                    } else {
                        $user->chatId = $data["chat_id"];
                    }
                    return $user;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    }

    public function areUsersInContact ($userId1, $userId2) {
        $sql = "SELECT *
        FROM contact
        WHERE user_id1 = :userId1 AND user_id2 = :userId2";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["userId1" => $userId1, "userId2" => $userId2]);
        $data = $stmt->fetch();

        if ($result) {
            if (empty($data)) {
                return false;
            } else {
                return true;
            }
        } else {
            return null;
        }
    }

    public function getUsers() {
        $sql = "SELECT id, firstname, lastname, phonenumber, email, image_path, status, setting_id
                FROM `user`";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute();
        $data = $stmt->fetchAll();
        if ($result && !is_bool($data)) {
            $array = array();
            foreach ($data as $user) {
                array_push($array, new UserEntity($user));
            }
            return $array;
        } else {
            return null;
        }
    }

    public function save(UserEntity $user, $settingId)
    {
        $sql = "INSERT INTO `user`
            (firstname, lastname, email, phonenumber, password, setting_id) VALUES
            (:firstname, :lastname, :email, :phonenumber, :password, :setting_id)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "email" => $user->getEmail(),
            "phonenumber" => $user->getPhonenumber(),
            "password" => $user->getPassword(),
            "setting_id" => $settingId
        ]);

        if (!$result) {
            throw new Exception("could not save record");
        } else {
            return $this->db->lastInsertId();
        }
    }

    public function  update($userId, $data) {
        $sql = "UPDATE `user`
        SET firstname = :firstname, lastname = :lastname, email = :email,
        phonenumber = :phonenumber, image_path = :image_path, status = :status
        WHERE id = :userId";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "firstname" => $data["firstname"],
            "lastname" => $data["lastname"],
            "email" => $data["email"],
            "phonenumber" => $data["phonenumber"],
            "image_path" => $data["image_path"],
            "status" => $data["status"],
            "userId" => $userId
        ]);

        if (!$result) {
            throw new Exception("could not save record");
        }
    }
}