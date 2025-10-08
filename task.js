async function list_task(status) {
    const user_id = localStorage.getItem("user");
    let URL = "https://68e40e2c8e116898997ade08.mockapi.io/tasks?user_id="+user_id;

    if(status){
        URL = URL+"&status="+status;
    } 

    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        if(response.ok){
            const tabela = document.getElementById("userTable");
            tabela.style.display = "table";

            const userTableBody = document.getElementById("userTableBody");
            userTableBody.innerHTML = ``;

            for (tarefa of data){
                const linha = document.createElement("tr");
               
                linha.innerHTML = `
                    <td>${tarefa.id}</td>
                    <td>${tarefa.name}</td>
                    <td>${tarefa.data}</td>
                    <td>${tarefa.description}</td>
                    
                    <td>
                        ${
                            tarefa.status == "Concluido" ? tarefa.status : '<button onclick="concluirTask(${tarefa.id})" type="button" class="btn btn-dark">Concluir</button>'
                        }
                        
                    </td>

                    <td><button onclick="excluirTask(${tarefa.id})" type="button" class="btn btn-danger">Excluir</button></td>
                `;

                userTableBody.appendChild(linha);
            }
        }

    } catch (error) {
        alert("Erro ao buscar tarefas: " + error.message);
    }

}

async function concluirTask(taskId) {
     Swal.fire({
        title: "Voce tem certeza?",
        showCancelButton: true,
        confirmButtonText: "Sim, Quero Concluir!",
        cancelButtonText: `Cancelar`
    }).then(async (result) => {
         const URL = "https://68e40e2c8e116898997ade08.mockapi.io/tasks/"+taskId;
            const response = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Concluido"
                })
            })

            if (response.ok) {
                window.location.reload();
            }else{
                showError("Error ao Atualizar Tarefa")
            }
    })
}

async function excluirTask(taskId) {
    Swal.fire({
        title: "Voce tem certeza?",
        showCancelButton: true,
        confirmButtonText: "Sim, Quero Excluir!",
        cancelButtonText: `Cancelar`
    }).then(async (result) => {
        if (result.isConfirmed) {
            const URL = "https://68e40e2c8e116898997ade08.mockapi.io/tasks/"+taskId;
            const response = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                window.location.reload();
            }else{
                showError("Error ao Excluir Tarefa")
            }
        }
    });
}

list_task();

async function saveTask(dados) {
    try {

            const response = await fetch("https://68e40e2c8e116898997ade08.mockapi.io/tasks", {
            method: "POST", // metodo POST, porque estamos enviando dados
            headers:{
                "Content-Type": "application/json" // informando que estamos enviando JSON
            },
            body: JSON.stringify(dados) // convertendo para JSON
        })

        const data = await response.json();

        if(response.ok){
            window.location.reload();
        }else{
            showError(`Error ao fazer cadastrar da tarefa:`)
        }

    } catch (error) {
        showError(`Error ao fazer cadastrar da tarefa:` + error.message)
    }
}

async function modalTask(){

    const userId = localStorage.getItem("user");
    Swal.fire({
        title: "Adicionar Tarefa",
        html: `
            <input id="task-name" class="swal2-input" type="text" placeholder="Tarefa..."></input>
            <input id="task-date" class="swal2-input" type="date" placeholder="Quanto?"></input>
            <input id="task-description" class="swal2-input" type="text" placeholder="Descricao"></input>
        `,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar Tarefa",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            const tarefa = document.getElementById("task-name").value;
            const data = document.getElementById("task-date").value;
            const description = document.getElementById("task-description").value;

            if(!tarefa || !data || !description){
                Swal.showValidationMessage("Preencha todos os campos")
            }

            return {
                tarefa, data, description
            }
        }

    }).then(result => {
        if(result.isConfirmed){
            const dados = {
                user_id: userId,
                name: result.value.tarefa,
                data: result.value.data,
                description: result.value.description,
                status: "Pendente"
            }
            saveTask(dados)
        }
    })
}

function showError(error) {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 3000
    });
}