<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 03.12.2016
 * Time: 17:04
 */
class ChatMapper extends Mapper
{
    public function getChats($id) {
        $sql = "SELECT *
        FROM user_chat
        WHERE user_id = :user_id";

        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["user_id" => $id]);
        $userChats = $stmt->fetchAll();

        $chats = array();
        $chatIds = array();
        if ($result && !is_bool($userChats)) {
            foreach ($userChats as $userChat) {
                $chatIds[] = $userChat["chat_id"];

            }
        } else {
            return null;
        }

        foreach ($chatIds as $chatId) {
            $sql = "SELECT *
            FROM message
            WHERE chat_id = :chatId
            ORDER BY `date` DESC";

            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute(["chatId" => $chatId]);
            $messageResult = $stmt->fetch();

            if ($result && !is_bool($messageResult)) {
                $sql = "SELECT * 
                FROM user_chat
                WHERE chat_id = :chatId AND user_id <> :id";
                $stmt = $this->db->prepare($sql);
                $result = $stmt->execute(["chatId" => $chatId, "id" => $id]);
                $partner = $stmt->fetch();
                if ($result && !is_bool($partner)) {
                    $userMapper = new UserMapper($this->db, $this->container);
                    $chat = new stdClass();

                    $chat->id = $chatId;
                    $chat->partner = $userMapper->getUser($id, $partner["id"]);
                    $chat->lastMessage = $messageResult;
                    $chats[] = new ChatListEntity($chat);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return $chats;
    }

    public function getChat ($id) {
        $sql = "SELECT *
        FROM message
        WHERE chat_id = :chat_id";

        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["chat_id" => $id]);
        $messages = $stmt->fetchAll();
        $array = array();
        if ($result && !is_bool($messages)) {
            foreach ($messages as $message) {
                array_push($array, new MessageEntity($message));
            }
        } else {
            return null;
        }
        return $array;
    }

    public function getUserWithChatId ($userId, $chatId) {
        $sql = "SELECT `user`.firstname, `user`.lastname, `user`.email, `user`.phonenumber, `user`.image_path, `user`.status
        FROM user_chat LEFT JOIN `user` ON `user`.id = user_chat.user_id 
        WHERE chat_id = :chatId AND user_id != :userId";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["chatId" => $chatId, "userId" => $userId]);
        $user = $stmt->fetch();
        $user["chatId"] = $chatId;

        if ($result && !is_bool($user)) {
            return $user;
        } else {
            return null;
        }
    }
}