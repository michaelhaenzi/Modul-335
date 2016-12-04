<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 04.12.2016
 * Time: 17:01
 */
class MessageMapper extends Mapper
{
    public function save($userId, $data) {
        if (!isset($data["chatId"])) {
            $sql = "INSERT INTO chat () VALUES ();";
            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute();
            if (!$result) {
                throw new Exception("could not save record");
            } else {
                $data["chatId"] = $this->db->lastInsertId();
            }

            $sql = "INSERT INTO user_chat
            (chat_id, user_id) VALUES
            (:chatId, :userId), (:chatId, :partnerId);";

            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute(["chatId" => $data["chatId"], "userId" => $userId, "partnerId" => $data["partnerId"]]);
            if (!$result) {
                throw new Exception("could not save record");
            }
        }

        $sql = "INSERT INTO message
        (text, chat_id, user_id) VALUES
        (:text, :chatId, :userId)";

        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["text" => $data["text"], "userId" => $userId, "chatId" => $data["chatId"]]);
        if (!$result) {
            throw new Exception("could not save record");
        } else {
            return $data["chatId"];
        }
    }
}