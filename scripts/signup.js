let controladoresReference = document.querySelectorAll('.controlador');
let inputNomeReference = document.querySelector('#inputNome');
let inputSobrenomeReference = document.querySelector('#inputSobrenome');
let inputEmailReference = document.querySelector('#inputEmail');
let inputSenhaReference = document.querySelector('#inputSenha');
let inputRepitaSenhaReference = document.querySelector('#inputSenhaR');
let smallRepitaSenhaReference = document.querySelector('#repitaSenha');
let botaoCriarContaReference = document.querySelector('#botaoCriarConta');

//console.dir(controladoresReference)

for(let controladorReference of controladoresReference) {

    let inputReference = controladorReference.children[1]

    inputReference.addEventListener('keyup', function(event) {
    
        if(inputReference.checkValidity()) {
    
            controladorReference.classList.remove('erro');
            botaoCriarContaReference.disabled = false;
    
        } 
        else {
    
            controladorReference.classList.add('erro');
            botaoCriarContaReference.disabled = true;
    
        }
    })

    // Validação das senhas estarem iguais
    inputReference.addEventListener('keyup', function(event) {

        if(inputRepitaSenhaReference.value === inputSenhaReference.value) {

            inputRepitaSenhaReference.parentNode.classList.remove('erro');
            botaoCriarContaReference.disabled = false;
    
        } else {
        
            inputRepitaSenhaReference.parentNode.classList.add('erro');
            botaoCriarContaReference.disabled = true;
            smallRepitaSenhaReference.innerHTML = "Sua senha está incorreta"
    
        }
    })


}

botaoCriarContaReference.addEventListener('click', event => {

    event.preventDefault()
    if(inputEmailReference.value == '' || inputSobrenomeReference == '' || inputNomeReference == '' || inputSenhaReference == '') {
        alert("Preencha todos os campos!")
        return false
    }

    let credentials = {

        firstName: inputNomeReference.value,
        lastName: inputSobrenomeReference.value,
        email: inputEmailReference.value,
        password: inputSenhaReference.value

    }

    let requestHeaders = {

        'Content-Type': 'application/json'

    }

    let requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders

    }
   
    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfiguration).then( 
        
        response => {

            response.json().then(

                data => {
                    console.log(credentials)
                    localStorage.setItem('token', data.jwt)
                    alert('Usuário criado com sucesso!')
                    
                }

            )

        }
    )

    inputNomeReference.value = ''
    inputSobrenomeReference.value = ''
    inputEmailReference.value = ''
    inputSenhaReference.value = ''
    inputRepitaSenhaReference.value = ''

})