<?php 
session_start();

$response = array(
    "loggedIn" => false,
    "usuario" => ''
);

if (isset($_SESSION["usuario"])){
    $response["loggedIn"] = true;
    $usuario  = $_SESSION["usuario"];
    $response["usuario"] = $usuario;
}

header('Content-Type: application/json');
echo json_encode($response);


?> 