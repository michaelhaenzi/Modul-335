<?php
/**
* Created by PhpStorm.
* User: Michael Haenzi
* Date: 29.11.2016
* Time: 11:15
*/

class UserMapper extends Mapper {
    public function getUser($id) {
        $sql = "SELECT id, firstname, lastname, phonenumber, email
                FROM `user`
                WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["id" => $id]);
        $data = $result->fetch();
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
        $data = $result->fetch();
        if ($result && !is_bool($data)) {
            return new UserEntity($data);
        } else {
            return null;
        }
    }

    public function save(UserEntity $user)
    {
        $sql = "INSERT INTO `user`
            (firstname, lastname, register, password, saltkey) VALUES
            (:firstname, :lastname, :register, :password, :saltkey)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "email" => $user->getEmail(),
            "phonenumber" => $user->getPhonenumber(),
            "register" => $this->container->helper->getRegisterCode(),
            "password" => $this->container->helper->getSaltedPassword($user),
            "saltkey" => $this->container->helper->getSaltedString()
        ]);
        if (!$result) {
            throw new Exception("could not save record");
        }
    }
}