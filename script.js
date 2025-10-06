async function loadComponent(id, file) {
  await fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
        custom();
      });

}

// Carrega a navbar de um arquivo externo
loadComponent("navbar", "componentes/navbar.html");
loadComponent("footer", "componentes/footer.html");

function custom() {
  // customizacao da navbar
  const menu = document.getElementById("menu-geral");
  const userLogged = localStorage.getItem("user");
  // estrutura de menu do usuario logado
  if(userLogged){
    let menuLogado = `
      <li class="nav-item"><a class="nav-link" href="index.html">Início</a></li>
      <li class="nav-item"><a class="nav-link" onclick="logout()">Logout</a></li>
    `;

    const permissions = localStorage.getItem("permissions")
    if(permissions === "admin"){
      menuLogado += `
        <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
      `
    }

    menu.innerHTML = menuLogado;
  }
}

function logout() {
  alert("Logout realizado com sucesso!");
  localStorage.clear(); // Limpa o localStorage
  window.location.href = "login.html";
}


function welcome() {
  const welcome = document.getElementById("welcome");
  const nome = localStorage.getItem("nome");
  if(nome){
    welcome.innerHTML = "Bem-vindo, " + nome + "!";
  } 
}

welcome();