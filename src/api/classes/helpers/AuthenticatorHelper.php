<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 02.12.2016
 * Time: 10:38
 */
class AuthenticatorHelper implements \Slim\Middleware\HttpBasicAuthentication\AuthenticatorInterface
{
    private $container;

    public function __construct(\Interop\Container\ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke(array $arguments)
    {
        try {
            $user = $arguments["user"];
            $password = $arguments["password"];
            $userMapper = new UserMapper($this->container->db, $this->container);
            if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
                $userObject = $userMapper->getUserByEmail($user);
            } else {
                $userObject = $userMapper->getUserByPhonenumber($user);
            }
            return password_verify($password . PEPPER, $userObject->getPassword());
        } catch (\Slim\Exception\NotFoundException $exception) {
            return false;
        } catch (Exception $exception) {
            $this->container->logger->addCritical($exception);
            return false;
        }
    }
}