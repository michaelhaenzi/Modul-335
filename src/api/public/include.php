<?php
/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 29.11.2016
 * Time: 08:52
 */


require '../vendor/autoload.php';

require_once 'envValues.php';

$routeFiles = (array)glob('../classes/*/*.php');

foreach ($routeFiles as $routeFile) {
    require_once $routeFile;
}