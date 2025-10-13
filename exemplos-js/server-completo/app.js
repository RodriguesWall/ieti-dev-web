import express from "express";
import taskRouter from "./routes/task.js";
import cors from "cors"; 

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());
app.use(cors());

// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor Node.js com Mock JSON rodando 🚀");
});

// Rotas de tarefas
app.use("/tarefas", taskRouter);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});
