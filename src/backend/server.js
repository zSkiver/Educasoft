const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
const disciplinaRoutes = require("./routes/disciplinas");
const professorRoutes = require("./routes/professores");
const salaRoutes = require("./routes/salas");
const turmaRoutes = require("./routes/turmas");
const alunoRoutes = require("./routes/alunos");
const associacaoRoutes = require("./routes/associacoes");

app.use("/api/disciplinas", disciplinaRoutes);
app.use("/api/professores", professorRoutes);
app.use("/api/salas", salaRoutes);
app.use("/api/turmas", turmaRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/associacoes", associacaoRoutes);

// Associações
const Turma = require("./models/turmaModel");
const Professor = require("./models/professor");
const Disciplina = require("./models/disciplina");
const Sala = require("./models/salaModel");

Turma.belongsTo(Professor, { foreignKey: "idProfessor" });
Turma.belongsTo(Disciplina, { foreignKey: "idDisciplina" });

Professor.hasMany(Turma, { foreignKey: "idProfessor" });
Disciplina.hasMany(Turma, { foreignKey: "idDisciplina" });
Sala.hasMany(Turma, { foreignKey: "idLocal" });

app.get("/", (req, res) => {
  res.send("API EducaSoft está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
