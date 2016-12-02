<?php
/**
 * Created by PhpStorm.
 * User: Anwender
 * Date: 29.11.2016
 * Time: 16:30
 */

function getJWTToken () {
    $payload = [
        "user" => "user",
        "ip" => "127.0.0.1"
    ];
    $secret = EnvironmentHelper::getSecret();
    $token = JWT::encode($payload, $secret, "HS256");
    return "Bearer $token";
}