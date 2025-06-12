const Aluno = require('../models/aluno');

exports.getAll = async (req, res) => {
  try {
    const data = await Aluno.findAll({ where: { ativo: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alunos ativos", error: error.message });
  }
};

exports.getAllWithInativos = async (req, res) => {
  const data = await Aluno.findAll();
  res.json(data);
};

exports.getInactive = async (req, res) => {
  try {
    const data = await Aluno.findAll({ where: { ativo: false } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alunos inativos", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Aluno.findByPk(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar aluno por ID", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, cpf } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ message: "Todos os campos (nome e CPF) são obrigatórios" });
    }

    const novoAluno = await Aluno.create({ nome, cpf });
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar aluno", error: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const [updated] = await Aluno.update(
      { nome, cpf },
      { where: { matricula: id } }
    );

    if (updated) {
      res.json({ message: "Aluno atualizado com sucesso" });
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar aluno", error: error.message });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Aluno.update({ ativo: false }, { where: { matricula: id } });
    if (updated) {
      res.json({ message: "Aluno desativado com sucesso" });
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao desativar aluno", error: error.message });
  }
};

exports.reactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Aluno.update({ ativo: true }, { where: { matricula: id } });
    if (updated) {
      res.json({ message: "Aluno reativado com sucesso" });
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao reativar aluno", error: error.message });
  }
};

