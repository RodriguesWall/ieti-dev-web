async function list_task() {
    const user_id = localStorage.getItem("user");
    const URL = "https://68e40e2c8e116898997ade08.mockapi.io/tasks?user_id="+user_id;

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
            for (tarefa of data){
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${tarefa.id}</td>
                    <td>${tarefa.name}</td>
                    <td>${tarefa.data}</td>
                    <td>${tarefa.description}</td>
                `;

                userTableBody.appendChild(linha);
            }
        }

    } catch (error) {
        alert("Erro ao buscar tarefas: " + error.message);
    }

}


list_task();