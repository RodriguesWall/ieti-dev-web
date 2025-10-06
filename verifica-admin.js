function check() {
    const user = localStorage.getItem("user");
    const permissions = localStorage.getItem("permissions");

    //validar se o user esta logado
    if(!user){
        //se ele nao existir redireciona para login
        localStorage.clear();
        window.location.href = "login.html";
    }

    //validar se o user logado e um admin
    if(permissions !== "admin"){
        //se ele nao existir redireciona para login
        localStorage.clear();
        window.location.href = "login.html";
    }
}

check();