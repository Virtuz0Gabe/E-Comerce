const itens = document.getElementById("itens");
const valor_total = document.getElementById("valor-total");
const esvaziar = document.getElementById("esvaziar_carrinho");


const formatoDinheiro = {
    style: 'currency',
    currency: 'BRL'
  };


esvaziar.addEventListener("click", () => esvaziar_carrinho());

function getCarrinho(){
    fetch('../php/adicionarCarrinho.php')
    .then(res => res.json())
    .then(data => {
        valor_total.innerText = data.total.toLocaleString('pt-BR', formatoDinheiro);
        const carr_itens = data.itens;

        Object.values(carr_itens).forEach(valor => {
            valor.preco = parseInt(valor.preco).toLocaleString('pt-BR', formatoDinheiro);
        })
        for(const id in carr_itens){
            criarItem(carr_itens[id], id);
        }
    });
}

function criarItem(item, id){
    const div = document.createElement('div');
    div.classList.add('item');
    
    const divInfo = document.createElement('div');
    divInfo.classList.add('item-info');

    const ticket = document.createElement("img");
    ticket.classList.add("ticket");
    if(item.dsctipoproduto == "Estacionamento"){
        ticket.src = "../img/estacionamento.png";
    }else{
        ticket.src = "../img/ingresso.png";
    }

    divInfo.appendChild(ticket);
    
    for (const infoProduto in item) {
        const p = document.createElement('p');
        p.classList = infoProduto;
        if(infoProduto=="quantidade"){
            const select = document.createElement("select");

            for(let i=1; i<21; i++){
                var option = new Option(i, i);
                select.appendChild(option);
            }
            select.value = item.quantidade;
            p.id = id;
            p.appendChild(select);
            p.addEventListener("change", () => alterarQNT(id,select.value))
            
        }else{
            p.innerText = item[infoProduto];
        }
        divInfo.appendChild(p);
    }

    const lixeira = document.createElement("img");
    lixeira.classList = "lixeira";
    lixeira.title = "Remover uma unidade do produto";
    lixeira.src = "../img/lixeira.png";
    div.appendChild(divInfo);
    div.appendChild(lixeira);

    itens.appendChild(div);

    lixeira.addEventListener("click", () => removerItem(id))
}


function alterarQNT(id, quantidade){
    let req = {
        "idproduto": id,
        "quantidade": quantidade
    };

    const formData = new URLSearchParams();
    for (const key in req){
        formData.append(key, req[key]);
    }

    fetch("../php/removerCarrinho.php", {
        method: "POST",
        body: formData
    })
    .then(() => {
        window.location.reload();
    })
    .catch(error => {
        console.error("Ocorreu um erro na requisição:", error);
    });
}

function removerItem(id){
    let req = {
        "idproduto" : id,
        "limpar": true
    };

    const formData = new URLSearchParams();
    for (const key in req) {
        formData.append(key, req[key]);
    }

    fetch("../php/removerCarrinho.php", {
        method: "POST",
        body: formData
    })
    .then(() => {
        window.location.reload();
    })
    .catch(error => {
        console.error("Ocorreu um erro na requisição:", error);
    });    
}

function esvaziar_carrinho(){
    fetch("../php/removerCarrinho.php")
    .then(() => {
        window.location.reload()
    })
    .catch(error => {
        console.error("Ocorreu um erro na requisição:", error);
    })
}


fetch('../php/VerificaLogin.php')
    .then(response => response.json())
    .then(data => {
    if (data.loggedIn) {
        document.getElementById("nome_usuario").textContent = data.usuario;
        console.log('Usuário está logado');
        getCarrinho();
    } else {
        window.location.href = "../index.html";
        console.log('Usuário não está logado');
    }   
    })
    .catch(error => {
      console.error('Erro ao verificar o login:', error);
});