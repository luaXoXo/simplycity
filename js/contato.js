/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = document.querySelector("#cep");
const campoTelefone = document.querySelector("#telefone");
const campoEndereco = document.querySelector("#endereco");
const campoBairro = document.querySelector("#bairro");
const campoCidade = document.querySelector("#cidade");
const campoEstado = document.querySelector("#estado");
const botaoBuscar = document.querySelector("#buscar");
const mensagemStatus = document.querySelector("#status");


$(campoTelefone).mask("(00) 0000-0000");
$(campoCep).mask("00000-000");



botaoBuscar.addEventListener("click", async function () {
    if (campoCep.value.length !== 9) {
        mensagemStatus.innerHTML = "Digite um CEP valido";
        mensagemStatus.style.color = "purple";

        return;

    }

    let cepDigitado = campoCep.value;


    /* AJAX Asyncronous JavaScript And XML
Técnica de comunicação assincrona (transmissão, recebimento) de dados MUITO USADA entre diferentes tipos de sistemas (site, aplicativo, jogo, software) e tecnologias (PHP, ASP, Java etc). */

    // Etapa 1: preparamos o endereco junto com o CEP digitado 
    let endereco = `https://viacep.com.br/ws/${cepDigitado}/json/`;


    // Etapa 2: acessamos o ViaCEP com o endereço ajustado
    const resposta = await fetch(endereco);

    //etapa 3: extrair os dados que o ViaCEP prrocessou
    const dados = await resposta.json(endereco)
    console.log(dados);

    //etapa 4: lidando com os dados (em casos de erro ou sucesso)
    if ("erro" in dados) {
        mensagemStatus.innerHTML = "CEP INEXISTENTE";
        mensagemStatus.style.color = "red";

    } else {
        mensagemStatus.innerHTML = "CEP encontrado!";
        mensagemStatus.style.color = "blue";

        //selecionando os campos que estao escondidos
        const campos = document.querySelectorAll(".campos-restantes");

        //loop for acessar cada campo e remoever a classe 
        for (let i = 0; i < campos.length; i++) {
            campos[i].classList.remove("campos-restantes");
        }

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;    
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;

    }


}); 