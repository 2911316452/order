<?php
include_once "./databaseSystem.php";
/*
 *登陆页面
**/

$name = isset($_POST["name"]) ? md5($_POST["name"]) : "";
$password = isset($_POST["password"]) ? md5($_POST["password"]) : "";
$objselect = array(
    "name" => ["s", $name],
    "password" => ["s", $password]
);

if ($ds->select($objselect, "adms") !== NULL) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}
