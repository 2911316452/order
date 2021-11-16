<?php
include_once "./databaseSystem.php";
$value = $ds->selectAll("message",  0, 100);
if ($value !== NULL) {
    echo json_encode($value);
} else {
    echo json_encode(false);
}