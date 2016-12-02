<?php
use Slim\Http\Request as Request;
use Slim\Http\Response as Response;


require 'include.php';


#region Config
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['db']['host'] = EnvironmentHelper::getDBvalues()["host"];
$config['db']['user'] = EnvironmentHelper::getDBvalues()["user"];
$config['db']['pass'] = EnvironmentHelper::getDBvalues()["pass"];
$config['db']['dbname'] = EnvironmentHelper::getDBvalues()["dbname"];
#endregion

$app = new \Slim\App(["settings" => $config]);

#region setupContainer
$container = $app->getContainer();
$container['logger'] = function ($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['helper'] = function () {
    $helper = new Helper();
    return $helper;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'], $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

#region addMiddleware
$app->add(new RKA\Middleware\IpAddress(true));
$app->add(function (Request $request, Response $response, callable $next) {
    /** @var $response Response */
    $response = $next($request, $response);
    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://app.localhost')
        ->withHeader('Access-Control-Allow-Headers', 'http://app.localhost, X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Max-Age', '3600');
});
$app->add(new \Slim\Middleware\JwtAuthentication([
    "logger" => $container["logger"],
    "relaxed" => ["localhost", "app.localhost", "api.localhost"],
    "secret" => EnvironmentHelper::getSecret(),
    "rules" => [
        new \Slim\Middleware\JwtAuthentication\RequestPathRule([
            "path" => "/",
            "passthrough" => ["/api/". VERSION ."/auth", "/api/". VERSION ."/register"]
        ])
    ],
    "callback" => function (Request $request, Response $response, $args) use ($container) {
        $container["jwt"] = $args["decoded"];
    },
    "error" => function (Request $request, Response $response, $args) {
        $data["status"] = "error";
        $data["message"] = $args["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

$app->add(new \Slim\Middleware\HttpBasicAuthentication([
    "path" => "/api/". VERSION ."/auth",
    "relaxed" => ["localhost", "app.localhost", "api.localhost"],
    "authenticator" => new AuthenticatorHelper($container),
    "callback" => function (Request $request, Response $response, $args) {
        $container["basicAuth"] = $args;
    },
    "error" => function (Request $request, Response $response, $args) {
        $data = [];
        $data["status"] = "error";
        $data["message"] = $args["message"];
        return $response->withoutHeader("WWW-Authenticate")->write(json_encode($data, JSON_UNESCAPED_SLASHES));
    }
]));
#endregion

#region Routes
require 'routes.php';
#endregion

$app->run();