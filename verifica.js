function check() {
    const user = localStorage.getItem("user");

    //validar se o user esta logado
    if(!user){
        //se ele nao existir redireciona para login
        window.location.href = "login.html";
    }
}

check();