<?php 
session_start();

$email = $_POST["email"];
$cpf = preg_replace('/[^0-9]/', '', $_POST["cpf"]);

$erros = array(
    'email' => array(
        'status' => false,
        'mensagem' => ''
    ),
    'cpf' => array(
        'status' => false,
        'mensagem' => ''
    ),
    'login' => array(
        'status' => false, 
        'mensagem' => ''
    )
);

// VALIDAÇÃO DE CAMPOS
// EMAIL
if (empty($email)){
    $erros['email']['status'] = true;
    $erros['email']['mensagem'] = "O campo E-Mail precisa ser preenchido";
}elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $erros['email']['status'] = true;
    $erros['email']['mensagem'] = "O Campo E-Mail precisa ser preenchido com um E-mail válido";
}
// CPF
if (empty($cpf)){
    $erros['cpf']['status'] = true;
    $erros['cpf']['mensagem'] = "É nescessário preencher o CPF";
}elseif(strlen($cpf) != 11 ){
    $erros['cpf']['status'] = true;
    $erros['cpf']['mensagem'] = "O CPF deve conter 11 digitos numéricos";
}

$qnt_erros = 0;
foreach ($erros as $erro => $detalhes){
    if($detalhes["status"] == true){
        $qnt_erros += 1;
    }
}

if($qnt_erros == 0){
    $body = [
        "email" => $email,
        "cpf" => $cpf
    ];
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://ah.we.imply.com/gabevini/login",
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => json_encode($body),
        CURLOPT_RETURNTRANSFER => 1
    ]);
    $res = json_decode(curl_exec($ch));

    header('Content-Type: application/json');
    
    if ($res->error == null){
        $_SESSION["usuario"] = ($res->result[0]->nome);
        echo json_encode($res);
    }else{
        $erros["login"]["status"] = true;
        $erros["login"]["mensagem"] = "Usuário Não encontrado";
        echo json_encode($erros);
    }

    curl_close($ch);
}else{
    echo json_encode($erros);
}