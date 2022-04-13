let nomeUsuarioReference = document.querySelector('#nomeUsuario');
let idUsuario;
let emailUsuario;
let tarefasPendentesReference = document.querySelector('.tarefas-pendentes')
let tarefasFinalizadasReference = document.querySelector('.tarefas-terminadas')
let finalizarSessaoReference = document.querySelector('#closeApp')
let criarTarefaReference = document.querySelector('#criaTarefa')
let inputTarefaReference = document.querySelector('#novaTarefa')
let notDoneReference = document.querySelector('.not-done');



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
                //console.log(data)
                let nomeCompleto = data.firstName + ' ' + data.lastName;
                nomeUsuarioReference.innerHTML = nomeCompleto;
                idUsuario = data.id;
                emailUsuario = data.email;
            }
        )
    }
)


function getTasks(){
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(

        response => {

            response.json().then(

                data => {
                    console.log(data)
                    renderTasks(data)
                }
            )
        }
    )
}

getTasks()


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

                            location.reload()
                        }
                    )
        })
});

let configuracaoPutAutorizado = {

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
        
    },
    method: 'PUT',
    body: JSON.stringify({
        completed: true
    })
}

function updateTask(id) {

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, configuracaoPutAutorizado).then(

        response => {

            if(response.ok) {

                getTasks()
                //console.log(response)
            }

        }
     )
}

function renderTasks(tasks) {
    tarefasPendentesReference.innerHTML = ''
    tarefasFinalizadasReference.innerHTML = ''
    for(task of tasks) {
        if(task.completed == false) {
        tarefasPendentesReference.innerHTML += `    
                    <div>
                        <li class="tarefa">
                        <div class="not-done" onclick="updateTask(${task.id})"></div>
                        <div class="descricao">
                            <p class="nome">${task.description}</p>
                            <p class="timestamp">${task.createdAt}</p>
                            </div>
                        </li>
                    </div>`
        } else {
            tarefasFinalizadasReference.innerHTML += `    
            <div>
            <li class="tarefa">
            <div class="done" onclick="updateTask(${task.id})"></div>
            <div class="descricao">
                <p class="nome">${task.description}</p>
                <p class="timestamp">${task.createdAt}</p>
            </div>
            </li>
        </div>`
        }
    } 
            
         
           
            
}