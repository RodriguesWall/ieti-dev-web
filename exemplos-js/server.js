// Importa o Express
import express from "express";

// Cria o app
const app = express();

// Porta onde o servidor vai rodar
const PORT = 3000;

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Mock simples (simula dados vindos de um banco)
const tarefas = [
  { id: 1, nome: "Estudar Node.js", status: "pendente" },
  { id: 2, nome: "Fazer login no sistema", status: "concluido" },
  { id: 3, nome: "Publicar projeto na Vercel", status: "pendente" },
];

// Rota raiz (teste)
app.get("/", (req, res) => {
  res.send("Servidor Node rodando 🚀");
});

// Rota que retorna o mock JSON
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Rota dinâmica: buscar tarefa por ID
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa) {
    res.json(tarefa);
  } else {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});

// Inicia o servidor
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
