<?php
include_once "./databaseSystem.php";

$name = $_POST["name"];
$phone = $_POST["phone"];
$address = $_POST["address"];

$objinsert = array(
    "name" => $name,
    "phone" => $phone,
    "address" => $address
);
$objselect = array(
    "name" => ["s", $name]
);

if ($ds->select($objselect, "customer") === NULL) {
    echo $ds->insert($objinsert, "customer");
} else {
    echo json_encode(false);
}