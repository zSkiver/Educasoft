
const Disciplina = require('../models/disciplina');

exports.getAll = async (req, res) => {
  try {
    const data = await Disciplina.findAll({ where: { ativo: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar disciplinas ativas", error: error.message });
  }
};

exports.getAllWithInativos = async (req, res) => {
  const data = await Disciplina.findAll(); // sem filtro
  res.json(data);
};

// Adicione isso no controller:
exports.getInactive = async (req, res) => {
  try {
    const data = await Disciplina.findAll({ where: { ativo: false } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar disciplinas inativas", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Disciplina.findByPk(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Disciplina não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar disciplina por ID", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, codigo, periodo } = req.body;
    if (!nome || !codigo || !periodo) {
      return res.status(400).json({ message: "O campo nome é obrigatório" });
    }
    const novaDisciplina = await Disciplina.create({ nome, codigo, periodo });
    res.status(201).json(novaDisciplina);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar disciplina", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, codigo, periodo } = req.body;

    if (!nome || !codigo || !periodo) {
      return res.status(400).json({ message: "Todos os campos (nome, código e período) são obrigatórios" });
    }

    const [updated] = await Disciplina.update(
      { nome, codigo, periodo },
      { where: { idDisciplina: id } }
    );

    if (updated) {
      res.json({ message: "Disciplina atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Disciplina não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar disciplina", error: error.message });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Disciplina.update({ ativo: false }, { where: { idDisciplina: id } });
    if (updated) {
      res.json({ message: "Disciplina desativada com sucesso" });
    } else {
      res.status(404).json({ message: "Disciplina não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao desativar disciplina", error: error.message });
  }
};

exports.reactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Disciplina.update({ ativo: true }, { where: { idDisciplina: id } });
    if (updated) {
      res.json({ message: "Disciplina reativada com sucesso" });
    } else {
      res.status(404).json({ message: "Disciplina não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao reativar disciplina", error: error.message });
  }
};
