<?php
include_once "./databaseSystem.php";
$orderid = isset($_POST["orderid"]) ? $_POST["orderid"] : "";
$objselect = array(
    "orderid" => ["s", $orderid]
);

$value = $ds->select($objselect, "orders");
if ($value !== NULL) {
    echo json_encode($value);
} else {
    echo json_encode(false);
}