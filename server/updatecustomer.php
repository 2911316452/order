<?php
include_once "./databaseSystem.php";

$name = $_POST["name"];
$phone = $_POST["phone"];
$address = $_POST["address"];

$objupdate = array(
    "name" => $name,
    "phone" => $phone,
    "address" => $address
);
if ($ds->update($objupdate, "customer")) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}