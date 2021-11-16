<?php
include_once "./databaseSystem.php";
$name = isset($_POST["name"]) ? $_POST["name"] : "";
$objselect = array(
    "name" => $name
);

$value = $ds->delete($objselect, "customer");
if ($value !== 0) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}