<?php
include_once "./databaseSystem.php";

$orderid = $_POST["orderid"];
$orderdate = $_POST["orderdate"];
$linename = $_POST["linename"];
$ywdb = $_POST["ywdb"];
$number = $_POST["number"];
$unitprice = $_POST["unitprice"];
$price = $_POST["price"];
$contact = $_POST["contact"];
$phone = $_POST["phone"];

$objinsert = array(
    "orderid" => $orderid,
    "orderdate" => $orderdate,
    "linename" => $linename,
    "ywdb" => $ywdb,
    "number" => $number,
    "unitprice" => $unitprice,
    "price" => $price,
    "contact" => $contact,
    "phone" => $phone
);

$objselect = array(
    "orderid" => ["s", $orderid]
);

if ($ds->select($objselect, "orders") === NULL) {
    echo $ds->insert($objinsert, "orders");
} else {
    echo json_encode(false);
}