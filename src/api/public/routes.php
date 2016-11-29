<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 15:03
 */

use Slim\Http\Request as Request;
use Slim\Http\Response as Response;

$app->group('/api', function () use ($app) {
    $app->group('/v1.0', function () use ($app) {
        $app->get('/users', function (Request $request, Response $response) {
        });

        $app->get('/user/:id', function (Request $request, Response $response) {
        });

        $app->delete('/user/:id', function (Request $request, Response $response) {
        });


        $app->get('/contacts', function (Request $request, Response $response) {
        });

        $app->get('/contact/:id', function (Request $request, Response $response) {
        });

        $app->post('/contact/:id', function (Request $request, Response $response) {
        });


        $app->get('/messages', function (Request $request, Response $response) {
        });

        $app->post('/message', function (Request $request, Response $response) {
        });


        $app->post('/auth', function (Request $request, Response $response) {

        });

        $app->post('/register', function (Request $request, Response $response) {
            $payload = [
                "user" => "user",
                "ip" => "127.0.0.1"
            ];
            $secret = EnvironmentHelper::getSecret();
            $token = JWT::encode($payload, $secret, "HS256");
            return $response->withAddedHeader("Authorization" , "Bearer $token");
        });
    });
});