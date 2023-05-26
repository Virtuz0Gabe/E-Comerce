const input = document.getElementById('cpf')
const form = document.querySelector("form");

input.addEventListener('keypress', () => {
    let num_input = input.value.length

    if (num_input === 3 || num_input === 7){
        input.value += '.'
    }else if (num_input === 11){
        input.value += '-'
    }
})

function criaErro(msgErro,campo){
    let CampoExistente = document.getElementById(campo);
    let erro = document.createElement("p");
    erro.id = "Erro" +  campo;
    erro.classList = "msgErro";
    erro.innerText = msgErro;
    CampoExistente.insertAdjacentElement("afterend", erro);
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('../php/login.php', {
        method: 'POST',
        body: new FormData(form), 
    });
    if(response.ok){
        const data = await response.json();
        if (data.error === null){
            window.location.href = "../html/produtos.html";
        }else{
            for(let campo in data) {
                if (data[campo].status == false && (document.getElementById("Erro" + campo))) {
                    const ErroHTML = document.getElementById("Erro" + campo);
                    ErroHTML.remove();
                }
                if (data[campo].status == true && (!document.getElementById("Erro" + campo))) {
                    console.log(data[campo].mensagem);
                    criaErro(data[campo].mensagem, campo);
                }
            }  
        }
    }else{
        console.log('Erro: O servidor não está ativo!');
        var script_erro = document.createElement("script");
        script_erro.src = "../js/ErroServidor.js";
        document.body.appendChild(script_erro);
    }
});