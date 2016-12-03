<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 03.12.2016
 * Time: 19:30
 */
class ChatListEntity implements JsonSerializable
{
    private $id;
    private $partner;
    private $message;

    public function __construct(stdClass $chat)
    {
        $this->id = $chat->id;

        $this->partner = new stdClass();
        $this->partner->id = $chat->partner->getId();
        $this->partner->firstname = $chat->partner->getFirstname();
        $this->partner->lastname = $chat->partner->getLastname();
        $this->partner->filePath = $chat->partner->getFilePath();

        $this->message = new stdClass();
        $this->message->id = $chat->lastMessage["id"];
        $this->message->text = $chat->lastMessage["text"];
        $this->message->date = $chat->lastMessage["date"];
        $this->message->userId = $chat->lastMessage["user_id"];
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return stdClass
     */
    public function getPartner()
    {
        return $this->partner;
    }

    /**
     * @return stdClass
     */
    public function getMessage()
    {
        return $this->message;
    }

    function jsonSerialize()
    {
        return get_object_vars($this);
    }
}