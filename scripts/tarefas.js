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
                    //console.log(data)
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

let configuracaoDeleteAutorizado = {

    headers: {

        'Authorization': localStorage.getItem('token')
        
    },
    method: 'DELETE',
}

function deleteTask(id) {

    if(confirm("Deseja apagar essa tarefa?")){
        fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, configuracaoDeleteAutorizado).then(

            response => {

                if(response.ok) {

                    getTasks()
                    //console.log(response)
                }

            }
        )
    }
    

}

function renderTasks(tasks) {

    tarefasPendentesReference.innerHTML = ''
    tarefasFinalizadasReference.innerHTML = ''

    for(task of tasks) {

        let dataF = Date.parse(task.createdAt)
        let dataCerta = new Date(dataF)
        let dataFormatada = dataCerta.toLocaleDateString('pt-BR', 
        {day:'2-digit', month:'2-digit', year: 'numeric'})

        if(task.completed == false) {
        tarefasPendentesReference.innerHTML += `    
                    <div>
                        <li class="tarefa">
                            <div class="not-done" onclick="updateTask(${task.id})"></div>
                            <div class="descricao">
                                <p class="nome">${task.description}</p>
                                <p class="timestamp">Criada em: ${dataFormatada}</p>
                            </div>
                                <img onclick="deleteTask(${task.id})" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABfUlEQVRoge2YoU4DQRCG/7mro+Wuvjg8JCXhHRC8BAmmtRCqQEIguIoqPMEhEPAKfQECDgvljuLIDYYmFO56O+zS5ch8ZsU/sztf9tYcoCiK4hNyuVl/d3gAxv6sGmY+6p6s7bk605mAyfATXEoYCVye3W8gywYAWi4ONeCBQdubW8tXZYWB0XbzHR4AWgQemBSaCcx3+AlLJkWmAn8W0SPu7wz5twb5TOe4bTxX5W9ABXxTeYGaTfNo9II0fUW0uIC42fiWJckYABBH9dy8qFeC1Q0kyRhZluH5Y9CvGTODmQvzol4JVgLMPLXmZWV5Xiah8m9ABXyjAr5RAd+ogG9UwDcq4BsV8I0K+MZKgIim1rysLM/LJFgJxFEdQUCIonpuRkQgKs6LeiVY/ZWIm43CPwqzMpPcFOkNpNYnlpNIimUCjBtR/U9gvpaUiwQ4C3sAHkUDSfYHPaFGPUmPSKB7unobvIUrIJzD7eeUgvmCQl7vHLbvHO6rKP+ed2yBftABMd1OAAAAAElFTkSuQmCC" />
                                </li>
                    </div>`
        } else {

            let dataF = Date.parse(task.createdAt)
            let dataCerta = new Date(dataF)
            let dataFormatada = dataCerta.toLocaleDateString('pt-BR', 
            {day:'2-digit', month:'2-digit', year: 'numeric'})

            tarefasFinalizadasReference.innerHTML += `    
            <div>
            <li class="tarefa">
                <div class="done" onclick="updateTask(${task.id})"></div>
                <div class="descricao">
                    <p class="nome">${task.description}</p>
                    <p class="timestamp">Criada em: ${dataFormatada}</p>
                </div>
                <img onclick="deleteTask(${task.id})" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABfUlEQVRoge2YoU4DQRCG/7mro+Wuvjg8JCXhHRC8BAmmtRCqQEIguIoqPMEhEPAKfQECDgvljuLIDYYmFO56O+zS5ch8ZsU/sztf9tYcoCiK4hNyuVl/d3gAxv6sGmY+6p6s7bk605mAyfATXEoYCVye3W8gywYAWi4ONeCBQdubW8tXZYWB0XbzHR4AWgQemBSaCcx3+AlLJkWmAn8W0SPu7wz5twb5TOe4bTxX5W9ABXxTeYGaTfNo9II0fUW0uIC42fiWJckYABBH9dy8qFeC1Q0kyRhZluH5Y9CvGTODmQvzol4JVgLMPLXmZWV5Xiah8m9ABXyjAr5RAd+ogG9UwDcq4BsV8I0K+MZKgIim1rysLM/LJFgJxFEdQUCIonpuRkQgKs6LeiVY/ZWIm43CPwqzMpPcFOkNpNYnlpNIimUCjBtR/U9gvpaUiwQ4C3sAHkUDSfYHPaFGPUmPSKB7unobvIUrIJzD7eeUgvmCQl7vHLbvHO6rKP+ed2yBftABMd1OAAAAAElFTkSuQmCC" />
            </li>
        </div>`
        }
    } 
            
         
           
            
}