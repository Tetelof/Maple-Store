var modal = document.getElementById('id01')
let retornoCEP = false

window.onclick = function(event){
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
        document.getElementById('endereco').value=(conteudo.logradouro)+", "+
        (conteudo.bairro)+", "+
        (conteudo.localidade)+" - "+
        (conteudo.uf)
        retornoCEP = true
    }
    else {        
        alert("CEP não encontrado.")
        retornoCEP = false
    }
}
    
function pesquisacep() {
    var cep = document.getElementById('CEP').value.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if(validacep.test(cep)) {
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        }
        else {
            alert("Formato de CEP inválido.");
        }
    }
}



function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }