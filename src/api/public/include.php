<?php
require '../vendor/autoload.php';

require_once 'envValues.php';

$routeFiles = (array)glob('../classes/*/*.php');

foreach ($routeFiles as $routeFile) {
    require_once $routeFile;
}