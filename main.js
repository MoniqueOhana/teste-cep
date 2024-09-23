const formCep = document.querySelector("#form-cep");



formCep.addEventListener("submit", (e) => {
    e.preventDefault();
})

let cepinputValue = document.querySelector("#cep-input").value;
const responseContainer = document.querySelector("#response-container");

    const cepInput = document.querySelector("#cep-input");
    const cepInputDiv = document.querySelector("#cep-input-div");

 const regexSemHifen = /^[0-9]{8}$/;
 const regexComHifen = /^[0-9]{5}[-][0-9]{3}$/;

if (regexSemHifen.test(cepinputValue) || regexComHifen.test(cepinputValue)) {
    if (regexComHifen.test(cepinputValue)) {
        cepinputValue = cepinputValue.replace("-","");
    }
    const URL = `https://viacep.com.br/ws/${cepinputValue}/json`;

    fetch(URL)
    .then((response) => {
    return response.json();
    })

    .then ((data) => {
        if (!data.erro) {

            const listaExibicao = {
                cep: "CEP",
                logradouro: "Logradouro",
                complemento: "Complemento",
                localidade: "Cidade",
                bairro: "Bairro",
                estado: "Unidade Federativa",
                ddd: "DDD",
            };
            responseContainer.innerHTML = '';

            for (let prop in data) {
                if (!data[prop] == "" && listaExibicao[prop]) {
                    responseContainer.innerHTML += `
                    <div class="div-${prop}">
                    <h4 class="h5 title" id="${prop}-title">${listaExibicao[prop]}</h4>
                    <p id="${prop}-content" class="text-light">${data[prop]}</p>
                    </div>` 
                }
            }

            
        } else {
            cepInput.classList.add("is-invalid");
            cepInputDiv.classList.add("is-invalid");
        }
    })

} else {
    cepinputValue.classList.add("is-invalid")
    cepInputDiv.classList.add("is-invalid")
}
