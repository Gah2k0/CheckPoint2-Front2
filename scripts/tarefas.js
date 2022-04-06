let nomeUsuarioReference = document.querySelector('#nomeUsuario');
let idUsuario;
let emailUsuario;
let containerReference = document.querySelector('.tarefas-pendentes')

let requestConfiguration = {

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')

    }

}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfiguration).then(

    response => {

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





// completed: false
// createdAt: "2022-03-30T20:34:05.693Z"
// description: "Aprender Javascript"
// id: 5241
// userId: 51

// for(let tarefa of tarefas) {
//     containerReference.innerHTML = `    
//     <div>
//     <li class="tarefa">
//       <div class="not-done"></div>
//       <div class="descricao">
//         <p class="nome">Nova tarefa</p>
//         <p class="timestamp">Criada em: 15/07/21</p>
//       </div>
//     </li>
//     <li class="tarefa">
//       <div class="not-done"></div>
//       <div class="descricao">
//         <p class="nome">Nova tarefa</p>
//         <p class="timestamp">Criada em: 15/07/21</p>
//       </div>
//     </li>
//     <li class="tarefa">
//       <div class="not-done"></div>
//       <div class="descricao">
//         <p class="nome">Nova tarefa</p>
//         <p class="timestamp">Criada em: 15/07/21</p>
//       </div>
//     </li>

//   </div>`
// }
