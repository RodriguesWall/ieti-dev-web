async function createUser(name, email, password) {
    try {
      // Envia o POST para o MockAPI
      const response = await fetch('https://SEU_ENDPOINT.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password 
        })
      });
  
      // Lê a resposta
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Erro ao cadastrar usuário: ${data.message || response.statusText}`);
      }
  
      console.log('Usuário criado com sucesso:', data);
    } catch (error) {
      console.error('Erro:', error);
    }
  }