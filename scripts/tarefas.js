let nomeUsuarioReference = document.querySelector('#nomeUsuario');
let idUsuario;
let emailUsuario;
let containerReference = document.querySelector('.tarefas-pendentes')
let finalizarSessaoReference = document.querySelector('#closeApp')
let criarTarefaReference = document.querySelector('#criaTarefa')
let inputTarefaReference = document.querySelector('#novaTarefa')


function logOutUser() {
    localStorage.removeItem('token') 
    window.location.href = './index.html'
}


let requestConfiguration = {

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')

    }

}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfiguration).then(

    response => {

        if(response.ok) {

        } else {
            if(response.status === 401) {
                
                logOutUser()

            } 
        }

        response.json().then(

            data => {
                console.log(data)
                let nomeCompleto = data.firstName + ' ' + data.lastName;
                nomeUsuarioReference.innerHTML = nomeCompleto;
                idUsuario = data.id;
                emailUsuario = data.email;
            }
        )
    }
)

fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(

    response => {

        response.json().then(

            data => {
                console.log(data)
                let tarefas = data
                containerReference.innerHTML = ''
                for(let tarefa of tarefas) {
                    containerReference.innerHTML += `    
                    <div>
                    <li class="tarefa">
                      <div class="not-done"></div>
                      <div class="descricao">
                        <p class="nome">${tarefa.description}</p>
                        <p class="timestamp">${tarefa.createdAt}</p>
                      </div>
                    </li>
                  </div>`
                }
            }
        )
    }
)

finalizarSessaoReference.addEventListener('click',  function logOutUser() {
    localStorage.removeItem('token') 
    window.location.href = './index.html'
})

criarTarefaReference.addEventListener('click', event => {

    event.preventDefault()

    let task = {
        description: inputTarefaReference.value,
        completed: false
    }

    let requestConfigurationPost = {

        headers: {

            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
            
        },
        method: 'POST',
        body: JSON.stringify(task)

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfigurationPost).then (

        response =>  {

                response.json().then(
            
                        task => {
                            console.log("Success:", task);
                        }
                    )
        })
});

