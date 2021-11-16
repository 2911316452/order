<?php
include_once "./databaseSystem.php";

$id = $_POST["id"];
$zan = $_POST["zan"];

$objupdate = array(
    "id" => $id,
    "zan" => $zan
);

if ($ds->update($objupdate, "message")) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}