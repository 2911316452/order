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

$objupdate = array(
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
if ($ds->update($objupdate, "orders")) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}