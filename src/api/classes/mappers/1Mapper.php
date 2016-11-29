<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 09:30
 */
abstract class Mapper
{
    protected $db;
    protected $container;
    public function __construct(PDO $db, Interop\Container\ContainerInterface $container)
    {
        $this->db = $db;
        $this->container=$container;
    }
}