<?php
    $ch1 = curl_init();

    curl_setopt_array($ch1, [
        CURLOPT_URL => "https://ah.we.imply.com/gabevini/apresentacoes",
        CURLOPT_RETURNTRANSFER => 1
    ]);

    $res = json_decode(curl_exec($ch1));
    curl_close($ch1);

    if ($res->error == null){
        $ch2 = curl_init();

        curl_setopt_array($ch2, [
            CURLOPT_URL => "https://ah.we.imply.com/gabevini/produtos",
            CURLOPT_POST => 1,
            CURLOPT_RETURNTRANSFER => 1    
        ]);

        foreach($res->result as &$show){
            curl_setopt($ch2, CURLOPT_POSTFIELDS, json_encode([
                "idapresentacao" => $show->idapresentacao
            ]));

            $prods = json_decode(curl_exec($ch2));

            if($prods->error == null)
                $show->produtos = $prods->result;
        }

        curl_close($ch2);

        header('Content-Type: application/json');
        echo json_encode($res);
    }