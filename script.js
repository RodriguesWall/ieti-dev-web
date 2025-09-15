   // 1. Seleciona o formulário
    const form = document.getElementById("myForm");

    // 2. Escuta o evento de submit
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // impede que a página recarregue

      // 3. Captura os dados
      const nome = form.nome.value;
      const email = form.email.value;

      // Atualiza o texto do aviso
      aviso.textContent = `Obrigado, ${nome}! Seu formulário foi enviado.`;

      // Exibe o aviso
      aviso.classList.add("show");

      // Esconde automaticamente depois de 3s
      setTimeout(() => {
        aviso.classList.remove("show");
      }, 3000);

      // Limpa o formulário
      form.reset();
    });