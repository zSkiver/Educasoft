const { Op } = require('sequelize');
const Professor = require('../models/professor');

exports.getAll = async (req, res) => {
  try {
    const data = await Professor.findAll({ where: { ativo: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar professores ativos", error: error.message });
  }
};

exports.getInactive = async (req, res) => {
  try {
    const data = await Professor.findAll({ where: { ativo: false } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar professores inativos", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Professor.findByPk(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Professor não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar professor por ID", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, email, cpf, titulacao } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ message: "Os campos nome e email são obrigatórios" });
    }

    const existing = await Professor.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const novo = await Professor.create({ nome, email, cpf, titulacao });
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar professor", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, cpf, titulacao } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ message: "Os campos nome e email são obrigatórios" });
    }

    const exists = await Professor.findOne({
      where: {
        email,
        idProfessor: { [Op.ne]: id }
      }
    });

    if (exists) {
      return res.status(400).json({ message: "Email já cadastrado para outro professor" });
    }

    const [updated] = await Professor.update(
      { nome, email, cpf, titulacao },
      { where: { idProfessor: id } }
    );

    if (updated) {
      res.json({ message: "Professor atualizado com sucesso" });
    } else {
      res.status(404).json({ message: "Professor não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar professor", error: error.message });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Professor.update({ ativo: false }, { where: { idProfessor: id } });
    if (updated) {
      res.json({ message: "Professor desativado com sucesso" });
    } else {
      res.status(404).json({ message: "Professor não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao desativar professor", error: error.message });
  }
};

exports.reactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Professor.update({ ativo: true }, { where: { idProfessor: id } });
    if (updated) {
      res.json({ message: "Professor reativado com sucesso" });
    } else {
      res.status(404).json({ message: "Professor não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao reativar professor", error: error.message });
  }
};
