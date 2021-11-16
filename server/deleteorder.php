<?php
include_once "./databaseSystem.php";
$orderid = isset($_POST["orderid"]) ? $_POST["orderid"] : "";
$objselect = array(
    "orderid" => $orderid
);

$value = $ds->delete($objselect, "orders");
if ($value !== 0) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}