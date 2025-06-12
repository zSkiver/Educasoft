const Sala = require('../models/salaModel');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const data = await Sala.findAll({ where: { ativo: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar salas ativas", error: error.message });
  }
};

exports.getInactive = async (req, res) => {
  try {
    const data = await Sala.findAll({ where: { ativo: false } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar salas inativas", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Sala.findByPk(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Sala não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sala por ID", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, local, capacidade } = req.body;
    if (!nome || !local || capacidade === undefined) {
      return res.status(400).json({ message: "Campos nome, local e capacidade são obrigatórios" });
    }
    const novaSala = await Sala.create({ nome, local, capacidade });
    res.status(201).json(novaSala);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar sala", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, local, capacidade } = req.body;
    if (!nome || !local || capacidade === undefined) {
      return res.status(400).json({ message: "Campos nome, local e capacidade são obrigatórios" });
    }
    const [updated] = await Sala.update({ nome, local, capacidade }, { where: { idLocal: id } });
    if (updated) {
      res.json({ message: "Sala atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Sala não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar sala", error: error.message });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Sala.update({ ativo: false }, { where: { idLocal: id } });
    if (updated) {
      res.json({ message: "Sala desativada com sucesso" });
    } else {
      res.status(404).json({ message: "Sala não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao desativar sala", error: error.message });
  }
};

exports.reactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Sala.update({ ativo: true }, { where: { idLocal: id } });
    if (updated) {
      res.json({ message: "Sala reativada com sucesso" });
    } else {
      res.status(404).json({ message: "Sala não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao reativar sala", error: error.message });
  }
};
