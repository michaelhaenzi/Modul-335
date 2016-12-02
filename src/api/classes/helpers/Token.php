<?php
/**
 * Created by PhpStorm.
 * User: Anwender
 * Date: 29.11.2016
 * Time: 16:30
 */

function getJWTToken ($userId, $ipaddress) {
    $payload = [
        "userId" => $userId,
        "ip" => $ipaddress
    ];
    $secret = EnvironmentHelper::getSecret();
    $token = JWT::encode($payload, $secret, "HS256");
    return "Bearer $token";
}