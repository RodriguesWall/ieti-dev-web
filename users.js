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

            window.location.href = "index.html"; // redirecionando para index
        }else{
            showError(`Error ao fazer cadastrar do usuário:` + data.message)
        }

    } catch (error) {
       showError(`Error ao fazer cadastrar do usuário:` + error.message)
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
           
            localStorage.setItem("user", user.id);
            localStorage.setItem("nome", user.nome);
            localStorage.setItem("permissions", user.permissions);

            window.location.href = "index.html";
        }else{
            showError(`Error ao fazer Login`)
        }
    } catch (error) {
          showError(`Error ao fazer Login: ${error}`)
    }
}

function showError(error) {
    // const modalOverlay = document.getElementById("modalOverlay")
    // modalOverlay.style.display = "flex";

    // setTimeout(() => {
    //     modalOverlay.style.display = "none";
    // }, "3000");
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 3000
    });
}

function cripto(password) {
    const newpassword = btoa(password)
    return newpassword
}