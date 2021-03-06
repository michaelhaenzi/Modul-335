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
        LEFT JOIN setting s 
        ON u.setting_id = s.id 
        WHERE u.id = 1";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["setting_id" => $id]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            return new SettingEntity($data);
        } else {
            return null;
        }
    }

    public function update($userId, $notification) {
        $sql = "SELECT setting_id
        FROM `user`
        WHERE id = :userId";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["userId" => $userId]);
        $data = $stmt->fetch();
        if ($result && !is_bool($data)) {
            $sql = "UPDATE setting
            SET notification = :notification
            WHERE id = :settingId";
            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute(["notification" => $notification, "settingId" => $data["setting_id"]]);
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