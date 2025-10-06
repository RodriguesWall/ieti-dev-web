async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const json_user = {
        "nome": nome,
        "email": email,
        "password": cripto(password)
    }

    try {

        const response = await fetch("https://68e40e2c8e116898997ade08.mockapi.io/users", {
            method: "POST", // metodo POST, porque estamos enviando dados
            headers:{
                "Content-Type": "application/json" // informando que estamos enviando JSON
            },
            body: JSON.stringify(json_user) // convertendo para JSON
        })
        const data = await response.json(); // lendo a resposta

        if(data.id){
            localStorage.setItem("user", data.id); // salvando o user no localStorage
            localStorage.setItem("nome", data.nome);
            localStorage.setItem("curso", data.curso)

            window.location.href = "index.html"; // redirecionando para index
        }else{
            alert("Erro ao cadastrar usuário: " + data.message);
        }

    } catch (error) {
      alert("Erro ao cadastrar usuário: " + error.message);
    }
}

async function  login() {
    const email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    password = cripto(password)
    const URL = "https://68e40e2c8e116898997ade08.mockapi.io/users?email="+email+"&password="+password+"";

    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const data = await response.json();
        if(response.ok){
            const user = data[0];
            console.log(user);
            localStorage.setItem("user", user.id);
            localStorage.setItem("nome", user.nome);
            localStorage.setItem("permissions", user.permissions);
            localStorage.setItem("curso", user.curso)

            window.location.href = "index.html";
        }else{
            alert("Erro ao fazer login: " + response.message);
        }

    } catch (error) {
        alert("Erro ao fazer login: " + error.message);
    }
}


function cripto(password) {
    const newpassword = btoa(password)
    return newpassword
}