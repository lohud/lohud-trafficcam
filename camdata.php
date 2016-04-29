<?php
/****************
JSON PROXY FOR NY511 TRAFFIC DATA
BY: JKTEOH
UPDATED: 3/3/15
*****************/

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    date_default_timezone_set('America/New_York');
    header('Content-Type: application/json');

    $initialpost = file_get_contents('newcams4.json');
    echo $initialpost;

?>