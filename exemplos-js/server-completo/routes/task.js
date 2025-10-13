import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Caminho absoluto para o arquivo JSON
const __dirname = process.cwd();
const dbPath = path.join(__dirname, "db", "tasks.json");

// Função auxiliar para ler o JSON
function readTasks() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

// Função auxiliar para escrever no JSON
function writeTasks(tasks) {
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
}

// ROTA: Listar todas as tarefas
router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// ROTA: Buscar tarefa por ID
router.get("/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(task);
});

// ROTA: Criar nova tarefa
router.post("/", (req, res) => {
  const tasks = readTasks();
  const nova = req.body;
  nova.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push(nova);
  writeTasks(tasks);
  res.status(201).json(nova);
});

// ROTA: Atualizar tarefa
router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ erro: "Tarefa não encontrada" });
  
  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
});

// ROTA: Excluir tarefa
router.delete("/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ erro: "Tarefa não encontrada" });

  const removida = tasks.splice(index, 1);
  writeTasks(tasks);
  res.json({ mensagem: "Tarefa removida", removida });
});

export default router;
