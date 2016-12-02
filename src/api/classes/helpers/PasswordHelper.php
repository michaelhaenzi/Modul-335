<?php
/**
* Created by PhpStorm.
* User: Michael Haenzi
* Date: 29.11.2016
* Time: 11:08
*/

class PasswordHelper {
    public static function getSaltedPassword($user) {
        $options = [
            'cost' => 7,
            'salt' => uniqid(mt_rand(), true)
        ];

        return password_hash($user["password"] . PEPPER, PASSWORD_BCRYPT, $options);
    }

//    public function getRegisterCode() {
//        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//        $charactersLength = strlen($characters);
//        $randomString = '';
//        for ($i = 0; $i < 10; $i++) {
//            $randomString .= $characters[rand(0, $charactersLength - 1)];
//        }
//        return $randomString;
//    }
}