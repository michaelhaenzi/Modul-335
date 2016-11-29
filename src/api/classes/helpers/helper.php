<?php
/**
* Created by PhpStorm.
* User: Michael Haenzi
* Date: 29.11.2016
* Time: 11:08
*/

class Helper {

    public function getSaltedPassword(UserEntity $user) {
        return hash("sha256", $this->getSaltedString() . $user->getPassword());
    }

    public function getRegisterCode() {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 10; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function getSaltedString() {
        return "HU_3rf*FS90nsh%&";
    }
}