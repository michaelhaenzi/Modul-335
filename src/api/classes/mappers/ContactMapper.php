<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 03.12.2016
 * Time: 15:39
 */
class ContactMapper extends Mapper
{
    public function getContacts($id)
    {
        $sql = "SELECT * FROM contact WHERE user_id1 = :user_id1 OR user_id2 = :user_id2";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["user_id1" => $id, "user_id2" => $id]);
        $contactIds = $stmt->fetchAll();
        $array = array();
        if ($result && !is_bool($contactIds)) {
            foreach ($contactIds as $contactId) {
                if ($contactId["user_id1"] == $id) {
                   array_push($array, $contactId["user_id2"]);
                } else {
                    array_push($array, $contactId["user_id1"]);
                }
            }
            $array = array_unique($array);
        } else {
            return null;
        }

        $userMapper = new UserMapper($this->db, $this->container);
        $data = array();
        foreach ($array as $temp_id) {
            $user = $userMapper->getUser($id, $temp_id);
            array_push($data, $user);
        }
        return $data;
    }


    public function save(UserEntity $user1, UserEntity $user2)
    {
        $sql = "INSERT INTO `contact`
            (user_id1, user_id2) VALUES
            (:user_id1, :user_id2)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["user_id1" => $user1->getId(), "user_id2" => $user2->getId()]);

        if (!$result) {
            throw new Exception("could not save record");
        }
    }
}