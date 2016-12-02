<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 14:06
 */

class UserEntity implements JsonSerializable
{
    private $id;
    private $firstname;
    private $lastname;
    private $phonenumber;
    private $email;
    private $file_path;
    private $status;
    private $password;
    private $register;
    private $setting_id;

    public function __construct(array $data)
    {
        if (isset($data['id'])) {
            $this->id = $data['id'];
        }
        $this->firstname = $data['firstname'];
        $this->lastname = $data['lastname'];
        $this->phonenumber = $data['phonenumber'];
        $this->email = $data['email'];
        $this->file_path = $data['file_path'];
        $this->status = $data['status'];
        $this->password = $data['password'];
        $this->register = $data['register'];;
        $this->setting_id = $data['setting_id'];
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
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @return mixed
     */
    public function getPhonenumber()
    {
        return $this->phonenumber;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return mixed
     */
    public function getFilePath()
    {
        return $this->file_path;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return mixed
     */
    public function getRegister()
    {
        return $this->register;
    }

    /**
     * @return mixed
     */
    public function getSettingId()
    {
        return $this->setting_id;
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
