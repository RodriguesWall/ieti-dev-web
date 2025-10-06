function loadComponent(id, file) {
  fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      });
  }

// Carrega a navbar de um arquivo externo
loadComponent("navbar", "componentes/navbar.html");
loadComponent("footer", "componentes/footer.html");