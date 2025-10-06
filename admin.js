async function list_user() {
    const URL = "https://68e40e2c8e116898997ade08.mockapi.io/users";

    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();

        if(response.ok){
            const userTableBody = document.getElementById("userTableBody");
            for (user of data){
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.permissions ? user.permissions : "Client"}</td>
                `;

                userTableBody.appendChild(linha);
            }
        }

    } catch (error) {
        alert("Erro ao buscar usuários: " + error.message);
    }

}


list_user();