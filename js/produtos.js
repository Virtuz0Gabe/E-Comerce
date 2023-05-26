const apres = document.getElementById("apres");

// PARA FORMATAR DENEROS
const formatoDinheiro = {
    style: 'currency',
    currency: 'BRL'
};

function getApresentacoes(){
    fetch('../php/apresentacoes.php')
    .then(res => res.json())
    .then(data => {
        data["result"].forEach(infoApre => {
            criarApre(infoApre)
        });
    });
}

function criarApre(infoApre){
    const div = createAppendElement('div', apres, null, 'grid-item');
    createAppendElement('div', div, null, 'grid-item-img');
    const divInfo = createAppendElement('div', div, null, 'grid-item-info');
    createAppendElement('h3', divInfo, infoApre.dscapresentacao);
    createAppendElement('p', divInfo, infoApre.dsccidade);
    const button = createAppendElement('button', div, 'COMPRAR / INFORMAÇÕES', "btn-red");
    
    button.addEventListener("click", () => criarModal(infoApre))
}

function criarModal(infoApre){
    const modalContainer = createAppendElement("div", document.body, null, "modal-container");
    const head = createAppendElement("div", modalContainer, null, "modal-head");
    const modal = createAppendElement("div", modalContainer, null, "modal");
    createAppendElement("h3", head, infoApre["dscapresentacao"]);
    const btn_close = createAppendElement("img", head, null, "btn_close");
    btn_close.src = "../img/close.png";

    infoApre["produtos"].forEach(prod => {
        const prodconst = createAppendElement("div", modal, null, "prod");

        const ticket = createAppendElement("img", prodconst);
        if(prod.dsctipoproduto == "Estacionamento")
            ticket.src = "../img/estacionamento.png";
        else
            ticket.src = "../img/ingresso.png"; 

        const prod_namedesc = createAppendElement("div", prodconst, null, "proddesc");
        const prod_time = createAppendElement("div", prodconst);

        createAppendElement("p", prod_namedesc, prod.dscproduto);
        createAppendElement("p", prod_namedesc, prod.dsctipoproduto, "tipoprod");
        
        createAppendElement("p", prod_time, prod.dthr_ini_exibicao)
        createAppendElement("p", prod_time, prod.dthr_fim_exibicao)

        createAppendElement("p", prodconst, parseInt(prod.preco).toLocaleString('pt-BR', formatoDinheiro))

        const btn_buy = createAppendElement("button", prodconst, "ADICIONAR AO CARRINHO", "buy btn-red");
        btn_buy.addEventListener("click", () => adicionarCarrinho(prod));
    });

    btn_close.addEventListener("click", () => modalContainer.remove());
}

function adicionarCarrinho(prod){    
    const formData = new URLSearchParams();
    for (const key in prod) {
        formData.append(key, prod[key]);
    }

    fetch("../php/adicionarCarrinho.php", {
        method: "POST",
        body: formData
    })
    .then( () =>{
        notificarCarrinho(prod.dscproduto);
    })
    .catch(error => {
        console.error("Ocorreu um erro na requisição:", error);
    });
}

function notificarCarrinho(dscproduto){
    const notifContainer = createAppendElement("div", document.body, null, "notif-container");
    const notif = createAppendElement("p", notifContainer, `Produto "${dscproduto}" adicionado ao carrinho`, "notif");

    notif.classList.add("show");
    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => {
            notifContainer.remove();
        }, 250);
    }, 1500);
}

function createAppendElement(tag, destino, text, classe){
    const element = document.createElement(tag);

    if(text)
        element.textContent = text;
    if(classe)
        element.classList = classe;
    if(destino)
        destino.appendChild(element);

    return element;
}

fetch('../php/VerificaLogin.php')
    .then(response => response.json())
    .then(data => {
    if (data.loggedIn) {
        document.getElementById("nome_usuario").textContent = data.usuario;
        console.log('Usuário está logado');
        getApresentacoes();
    } else {
        window.location.href = "../index.html";
        console.log('Usuário não está logado');
    }   
    })
    .catch(error => {
      console.error('Erro ao verificar o login:', error);
});