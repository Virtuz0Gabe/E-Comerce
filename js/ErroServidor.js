var fundo_erro = document.createElement("div");
fundo_erro.id = 'fundo_erro';

fundo_erro.style.display = "flex";
fundo_erro.style.alignItems = "center";
fundo_erro.style.justifyContent = "center";

fundo_erro.style.position = "absolute";
fundo_erro.style.top = 0;
fundo_erro.style.left = 0;

fundo_erro.style.width = "100%";
fundo_erro.style.height = "100%";

fundo_erro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

var mensagem_erro = document.createElement("p");
mensagem_erro.id = "mensagem_erro";
mensagem_erro.textContent = "Erro ao tentar conectar com o servidor";
mensagem_erro.style.borderRadius = "10px";
mensagem_erro.style.padding = "25px";
mensagem_erro.style.background = "#FFF";

fundo_erro.appendChild(mensagem_erro);
document.body.appendChild(fundo_erro);