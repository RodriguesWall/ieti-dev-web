function checkAuth() {
    // Busca o usuário salvo no localStorage
    const user = localStorage.getItem("user");
  
    // Se não existir usuário, redireciona para login.html
    if (!user) {
      window.location.href = "login.html"; 
    }
  }
  
  // Executa a verificação assim que o script for carregado
  checkAuth();