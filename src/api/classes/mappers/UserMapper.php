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
        $sql = "SELECT id, firstname, lastname, email, phonenumber, user_password AS password
                FROM user
                WHERE email = :email";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["email" => $email]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
        } else {
            throw new NotFoundException();
        }
    }

    public function getUserByPhonenumber($phonenumber)
    {
        $sql = "SELECT id, firstname, lastname, email, phonenumber, user_password AS password
                FROM user
                WHERE phonenumber = :phonenumber";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["phonenumber" => $phonenumber]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
        } else {
            throw new \Slim\Exception\NotFoundException();
        }
    }

    public function getUser($id) {
        $sql = "SELECT id, firstname, lastname, phonenumber, email
                FROM `user`
                WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["id" => $id]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
        } else {
            return null;
        }
    }

    public function  getUsers() {
        $sql = "SELECT id, firstname, lastname, phonenumber, email, image_path, status
                FROM `user`";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute();
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
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
        }
    }
}