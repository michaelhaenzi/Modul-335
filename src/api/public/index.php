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

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'], $db['user'], $db['pass'],
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

#region addMiddleware
/**
 * Creator: akrabat
 * https://github.com/akrabat/rka-ip-address-middleware
 * Define IpAdress Picker in app
 */
$app->add(new RKA\Middleware\IpAddress(true));

$app->add(function (Request $request, Response $response, callable $next) {
    $response = $next($request, $response);
    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
        ->withHeader('Access-Control-Allow-Headers', 'http://app.localhost http://localhost:4200 X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', '*')
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Max-Age', '3600');
});

/**
 * Creator: tuupola
 * https://github.com/tuupola/slim-jwt-auth
 * Define JWT Auth in app
 */
$app->add(new \Slim\Middleware\JwtAuthentication([
    "logger" => $container["logger"],
    "relaxed" => ["localhost", "app.localhost", "api.localhost"],
    "secret" => EnvironmentHelper::getSecret(),
    "rules" => [
        new \Slim\Middleware\JwtAuthentication\RequestPathRule([
            "path" => "/",
            "passthrough" => ["/api/". VERSION ."/auth", "/api/". VERSION ."/register"]
        ]),
        new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
            "passthrough" => ["OPTIONS"]
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

/**
 * Creator: tuupola
 * https://github.com/tuupola/slim-basic-auth
 * Define BasicAuth in app
 */
$app->add(new \Slim\Middleware\HttpBasicAuthentication([
    "path" => "/api/". VERSION ."/auth",
    "relaxed" => ["localhost", "app.localhost", "api.localhost"],
    "authenticator" => new AuthenticatorHelper($container),
    "callback" => function (Request $request, Response $response, $args) use ($container) {
        $user = $args["user"];

        $userMapper = new UserMapper($container->db, $container);
        if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
            $userObject = $userMapper->getUserByEmail($user);
        } else {
            $userObject = $userMapper->getUserByPhonenumber($user);
        }
        $container["userId"] = $userObject->getId();
    },
    "error" => function (Request $request, Response $response, $args) {
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