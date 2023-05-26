<?php 
    session_start();

    if(!empty($_POST)){ // Adiciona ao carrinho - Se houver um corpo no body da requisição
        $idproduto = $_POST["idproduto"];
        $preco = $_POST["preco"];
        $dscproduto = $_POST["dscproduto"];
        $dsctipoproduto = $_POST["dsctipoproduto"];
    
        if(isset($_SESSION["carrinho"][$idproduto]))
            $_SESSION["carrinho"][$idproduto]["quantidade"]++;

        else{
            $_SESSION["carrinho"][$idproduto] = [
                "idproduto" => $idproduto,
                "dscproduto" => $dscproduto,
                "dsctipoproduto" => $dsctipoproduto,
                "preco" => $preco,
                "quantidade" => 1,
            ];
    
        }
        
        header('Content-Type: application/json');
        echo json_encode("Produto adicionado ao carrinho!");
    }
    else{
        $compra = [
            "itens" => array(),
            "total" => 0
        ];

        if(isset($_SESSION["carrinho"])){ 
            foreach($_SESSION["carrinho"] as $id => $item){
                $compra["itens"][$id] = $item;
                $compra["total"] += $item["preco"] * $item["quantidade"];   
            }
        }
        header('Content-Type: application/json');
        echo json_encode($compra);
    }