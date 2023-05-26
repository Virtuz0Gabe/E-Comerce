<?php
    session_start();

    $id = $_POST["idproduto"];
    if(isset($_POST["quantidade"])){
        $quantidade = $_POST["quantidade"];
        $_SESSION["carrinho"][$id]["quantidade"] = $quantidade;
    }

    if(isset($_POST["limpar"])){
        unset($_SESSION["carrinho"][$id]);
    }elseif(empty($_POST)){
        unset($_SESSION["carrinho"]);
    }

    header('Content-Type: application/json');
    echo json_encode("Quantidade alterada com sucesso");