// let botaoLoginReference = document.querySelector('#botaoLogin');
let inputEmailReference = document.querySelector('#inputEmail');
let inputSenhaReference = document.querySelector('#inputSenha');

botaoLoginReference.addEventListener('click', event => {

    event.preventDefault()

    if(inputEmailReference.value == '' || inputSenhaReference == '') {
        alert('Preencha os seus dados para logar')
        return false
    }

    let credentials = {

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

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then( 
        
        response => {

            if(response.ok) {

                    response.json().then(

                    data => {

                        localStorage.setItem('token', data.jwt)
                        window.location.href = './tarefas.html'
                    }

                )

            } else {

                alert('Usuário ou senha incorreto!')

            }
        }
    )

})

