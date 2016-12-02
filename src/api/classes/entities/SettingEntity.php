<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 14:06
 */

class SettingEntity implements JsonSerializable
{
    private $id;
    private $notification;

    public function __construct(array $data)
    {
        if (isset($data['id'])) {
            $this->id = $data['id'];
        }

        if (isset($data['notification'])) {
            $this->notification = $data['notification'];
        } else {
            $this->notification = 0;
        }
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
    public function getNotification()
    {
        return $this->notification;
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
