async function createTask(nome, data, descricao, status) {
  try {
    const response = await fetch('https://SEU_ENDPOINT.mockapi.io/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        data: data,
        descricao: descricao,
        status: status
      })
    });

    const dataResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar tarefa: ${dataResponse.message || response.statusText}`);
    }

    console.log('✅ Tarefa criada com sucesso:', dataResponse);
  } catch (error) {
    console.error('❌ Erro ao criar tarefa:', error);
  }
}

async function updateTaskStatus(id, novoStatus) {
  try {
    const response = await fetch(`https://SEU_ENDPOINT.mockapi.io/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: novoStatus
      })
    });

    const dataResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Erro ao atualizar tarefa: ${dataResponse.message || response.statusText}`);
    }

    console.log(`✅ Status da tarefa ${id} atualizado para "${novoStatus}":`, dataResponse);
  } catch (error) {
    console.error('❌ Erro ao atualizar tarefa:', error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`https://SEU_ENDPOINT.mockapi.io/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir tarefa: ${response.statusText}`);
    }

    console.log(`🗑️ Tarefa ${id} excluída com sucesso.`);
  } catch (error) {
    console.error('❌ Erro ao excluir tarefa:', error);
  }
}
