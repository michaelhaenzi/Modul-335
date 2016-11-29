<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 11:08
 */
abstract class EnvironmentHelper
{
    private static $_localhostUrl = "api.localhost";
    /**
     * @return int
     */
    private static function getEnvironmentName()
    {
        switch ($_SERVER["HTTP_HOST"]) {
            case self::$_localhostUrl:
                return Environment::LOCALHOST;
                break;
            default:
                return Environment::__default;
                break;
        }
    }
    //Requires db file
    public static function getDBvalues()
    {
        switch (self::getEnvironmentName()) {
            case Environment::LOCALHOST:
                return array("host" => "localhost",
                    "user" => "localAdmin",
                    "pass" => "password_admin",
                    "dbname" => "horizon");
                break;
            default:
                throw new Exception("Environment undefined!" . $_SERVER["HTTP_HOST"]);
                break;
        }
    }
    public static function getSecret()
    {
        return constant("SECRET");
    }
}
abstract class  Environment
{
    const __default = self::UNDEFINED;
    const LOCALHOST = 1;
    const UNDEFINED = 0;
}
