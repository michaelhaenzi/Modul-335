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
    $app->group('/' . VERSION, function () use ($app) {
        $app->get('/users', function (Request $request, Response $response) {
            try {
                $userMapper = new UserMapper($this->db, $this);
                $users = $userMapper->getUsers();
                $response = $response->withJson($users)->withStatus(200);
            } catch (\Slim\Exception\NotFoundException $exception) {
                $this->logger->addInfo($exception);
                $response = $response->withStatus(404);
            } catch (Exception $exception) {
                $this->logger->addError($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });

        $app->get('/user/{id:[0-9]+}', function (Request $request, Response $response, array $args) {
            try {
                $id = $args["id"];
                $userMapper = new UserMapper($this->db, $this);
                $user = $userMapper->getUser($id);
                $response = $response->withJson($user)->withStatus(200);
            } catch (\Slim\Exception\NotFoundException $exception) {
                $this->logger->addInfo($exception);
                $response = $response->withStatus(404);
            } catch (Exception $exception) {
                $this->logger->addError($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });


        $app->get('/contacts', function (Request $request, Response $response) {
            try {
                $userId = $this->jwt->userId;
                $contactMapper = new ContactMapper($this->db, $this);
                $contacts = $contactMapper->getContacts($userId);
                $response = $response->withJson($contacts)->withStatus(200);
            } catch (Exception $exception) {
                $this->logger->addError($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });

        $app->post('/contact', function (Request $request, Response $response) {
            try {
                $userId1 = $this->jwt->userId;
                $userId2 = $request->getParams()["id"];


                $userMapper = new UserMapper($this->db, $this);
                $user1 = $userMapper->getUser($userId1);
                $user2 = $userMapper->getUser($userId2);

                $contactMapper = new ContactMapper($this->db, $this);
                $contactMapper->save($user1, $user2);

                $response = $response->withStatus(200);
            } catch (Exception $exception) {
                $this->logger->addCritical($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });

        $app->get('/chats', function (Request $request, Response $response) {
            try {
                $userId = $this->jwt->userId;
                $chatMapper = new ChatMapper($this->db, $this);
                $chats = $chatMapper->getChats($userId);
                $response = $response->withJson($chats);
            } catch (Exception $exception) {
                $this->logger->addCritical($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });

        $app->get('/chat/{id:[0-9]+}', function (Request $request, Response $response, $args) {
            try {
                $id = $args["id"];
                $chatMapper = new ChatMapper($this->db, $this);
                $messages = $chatMapper->getChat($id);
                $response = $response->withJson($messages);
            } catch (Exception $exception) {
                $this->logger->addCritical($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });

        $app->post('/auth', function (Request $request, Response $response) {
            $ipaddress = $request->getAttribute('ip_address');
            $userId = $this->userId;
            return $response->withJson($userId)->withAddedHeader("Authorization" , getJWTToken($userId, $ipaddress));
        });

        $app->post('/register', function (Request $request, Response $response, array $args) {
            try {
                $setting = new SettingEntity([]);
                $settingMapper = new SettingMapper($this->db, $this);
                $settingId = $settingMapper->save($setting);

                $ipaddress = $request->getAttribute('ip_address');

                $requestBody = $request->getParams();
                $requestBody["password"] = PasswordHelper::getSaltedPassword($requestBody);
                $user = new UserEntity($requestBody);
                $userMapper = new UserMapper($this->db, $this);
                $userId = $userMapper->save($user, $settingId);
                $response = $response->withJson($userId)->withAddedHeader("Authorization" , getJWTToken($userId, $ipaddress));
            } catch (Exception $exception) {
                $this->logger->addCritical($exception);
                $response = $response->withStatus(500);
            } finally {
                return $response;
            }
        });
    });
});