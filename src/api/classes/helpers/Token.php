<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 16:30
 */


/**
 * Creator: tuuopla
 * https://github.com/tuupola/slim-jwt-auth
 * Encoding JWT Token with userId and ipaddress
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

function prepareResponseWithToken ($userId, $ipaddress) {
    $response = new stdClass();
    $response->userId = $userId;
    $response->Authorization = getJWTToken($userId, $ipaddress);
    return $response;
}