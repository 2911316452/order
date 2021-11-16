<?php

include_once "./databaseSystem.php";

/*
 * 注册页面
 * */

$name = isset($_POST["name"]) ?md5($_POST["name"]): "";
$password = isset($_POST["password"]) ?md5($_POST["password"]): "";

$objinsert = array(
    "name" => $name,
    "password" => $password
);

$objselect = array(
    "name" => ["s", $name]
);

if ($ds->select($objselect, "adms") === NULL) {
    echo $ds->insert($objinsert, "adms");
} else {
    echo json_encode(false);
}

