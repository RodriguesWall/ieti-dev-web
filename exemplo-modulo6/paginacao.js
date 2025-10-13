let paginaAtual = 1;
const limite = 5;

async function carregarTarefas(pagina = 1) {
  const user_id = localStorage.getItem("user");
  const URL = `https://seuid.mockapi.io/tasks?user_id=${user_id}&page=${pagina}&limit=${limite}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (response.ok) {
      const tabela = document.getElementById("userTableBody");
      tabela.innerHTML = ""; // Limpa antes de renderizar

      data.forEach((tarefa) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${tarefa.id}</td>
          <td>${tarefa.name}</td>
          <td>${tarefa.data}</td>
          <td>${tarefa.description}</td>
        `;
        tabela.appendChild(linha);
      });

      // Atualiza número da página
      paginaAtual = pagina;
      document.getElementById("paginaAtual").textContent = `Página ${paginaAtual}`;
    }

  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

// Botões de navegação
function proximaPagina() {
  paginaAtual++;
  carregarTarefas(paginaAtual);
}

function paginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;
    carregarTarefas(paginaAtual);
  }
}

// Primeira carga
carregarTarefas();
