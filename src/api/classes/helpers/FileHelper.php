<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 04.12.2016
 * Time: 15:52
 */
class FileHelper
{
    public static function setProfileImage($files)
    {
        $pathToFile = PROTOCOL . "://" . HOST . "/files/images/";
        if (!empty($files['profileImage'])) {
            /** @var Slim\Http\UploadedFile $thumbnail */
            $thumbnail = $files['profileImage'];
            preg_match("/(.*)\\/(.*)/", $thumbnail->getClientMediaType(), $fileMediaType);
            if ($fileMediaType[1] === "image") {
                if ($thumbnail->getError() === UPLOAD_ERR_OK) {
                    $uploadFileName = uniqid() . "." . $fileMediaType[2];
                    $thumbnail->moveTo("../files/images/$uploadFileName");
                    $pathToFile .= $uploadFileName;
                }
            }
        }
        return $pathToFile;
    }
}