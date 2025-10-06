async function carregarUsuarios() {
    const status = document.getElementById("status");
    const tabela = document.getElementById("userTable");
    const corpoTabela = document.getElementById("userTableBody");
  
    try {
      // Exemplo com MockAPI — substitua pela sua URL
      const resposta = await fetch("https://66b8b7c07fba54a5b7e55b93.mockapi.io/users");
  
      if (!resposta.ok) {
        throw new Error("Erro ao buscar usuários");
      }
  
      const usuarios = await resposta.json();
  
      // Se não tiver usuários
      if (usuarios.length === 0) {
        status.textContent = "Nenhum usuário encontrado.";
        return;
      }
  
      // Limpa status e mostra tabela
      status.style.display = "none";
      tabela.style.display = "table";
  
      // Monta dinamicamente cada linha da tabela
      usuarios.forEach((usuario) => {
        const linha = document.createElement("tr");
  
        linha.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.name}</td>
          <td>${usuario.email}</td>
        `;
  
        corpoTabela.appendChild(linha);
      });
    } catch (erro) {
      status.textContent = "Erro ao carregar usuários: " + erro.message;
    }
  }
  
  // Executa assim que o HTML carregar
  document.addEventListener("DOMContentLoaded", carregarUsuarios);
  