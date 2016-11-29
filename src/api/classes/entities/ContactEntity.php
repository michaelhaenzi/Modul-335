<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 14:33
 */


class ContactEntity implements JsonSerializable
{
    private $id;
    private $user_id1;
    private $user_id2;

    public function __construct(array $data)
    {
        if (isset($data['id'])) {
            $this->id = $data['id'];
        }
        $this->user_id1 = $data['user_id1'];
        $this->user_id2 = $data['user_id2'];
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getUserId1()
    {
        return $this->user_id1;
    }

    /**
     * @return mixed
     */
    public function getUserId2()
    {
        return $this->user_id2;
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    function jsonSerialize()
    {
        return get_object_vars($this);
    }
}