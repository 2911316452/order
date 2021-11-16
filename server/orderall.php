<?php
include_once "./databaseSystem.php";
$value = $ds->selectAll("orders",$_POST["start"],20);
if ($value !== NULL) {
    echo json_encode($value);
} else {
    echo json_encode(false);
}
