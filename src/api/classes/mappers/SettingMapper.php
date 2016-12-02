<?php

/**
 * Created by PhpStorm.
 * User: Michael Haenzi
 * Date: 02.12.2016
 * Time: 09:39
 */
class SettingMapper extends Mapper {
    public function getSetting($id) {
        $sql = "SELECT s.id, s.notification
                FROM `user` u
                INNER JOIN  setting s
                ON u.setting_id = s.id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["id" => $id]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new SettingEntity($data);
        } else {
            return null;
        }
    }


    public function save(SettingEntity $setting)
    {
        $sql = "INSERT INTO setting
            (notification) VALUES
            (:notification)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["notification" => $setting->getNotification()]);

        $lastInsertedId = $this->db->lastInsertId();

        if (!$result) {
            throw new Exception("could not save record");
        } else {
            return $lastInsertedId;
        }
    }
}