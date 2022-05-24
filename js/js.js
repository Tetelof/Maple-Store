var modal = document.getElementById('id01')
let retornoCEP = false

window.onclick = function(envent){
    if(event.target == modal){
        modal.style.display = "none"
    }
}



function save(){
    var login = document.getElementById('login').value
    var nome = document.getElementById('nome').value
    var CPF = document.getElementById('CPF').value
    var CEP = document.getElementById('CEP').value
    var numero = document.getElementById('numero').value
    var complemento = document.getElementById('complemento').value
    var senha = document.getElementById('senha').value

    if(!validaCPF()){
        alert("CPF FUDEO TUDO")
        return false
    }
    if (!retornoCEP){
        alert("CEP FUDEO TUDO")
    }
    salvarLocalStorage(login, nome, CPF, CEP, numero, complemento, senha)


}

function validaCPF(cpf){
    var Soma;
    var Resto;
    Soma = 0;
  if (cpf == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
}



function salvarLocalStorage(login, nome, CPF, CEP, numero, complemento, senha){
    
    let localstorage = JSON.parse(localStorage.getItem("listadedados")||"[]")
    localstorage.push({
        login : login.value,
        nome: nome.value,
        cpf: CPF.value,
        cep: CEP.value,
        numero: numero.value,
        complemento: complemento.value,
        senha: senha.value
    })
    localStorage.setItem("listadedados",JSON.stringify(localstorage))
}



function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('endereco').value=(conteudo.logradouro)+", "+
        (conteudo.bairro)+", "+
        (conteudo.localidade)+" - "+
        (conteudo.uf)
        retornoCEP = true
    } //end if.
    else {
        //CEP não Encontrado.
        
        alert("CEP não encontrado.")
        retornoCEP = false
    }
}
    
function pesquisacep() {
    
    //Nova variável "cep" somente com dígitos.
    var cep = document.getElementById('CEP').value.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            
            alert("Formato de CEP inválido.");
        }
    } //end if.
    
}