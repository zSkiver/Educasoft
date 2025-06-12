import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const CadastroSalaPage = () => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !local || !capacidade) {
      alert('Preencha todos os campos.');
      return;
    }

    if (isNaN(capacidade) || parseInt(capacidade) <= 0) {
      alert('A capacidade deve ser um número inteiro maior que zero.');
      return;
    }

    const payload = {
      nome,
      local,
      capacidade: parseInt(capacidade),
    };

    try {
      await apiClient.post('/salas', payload);
      alert('Sala cadastrada com sucesso!');
      navigate('/salas');
    } catch (err) {
      console.error('Erro ao cadastrar sala:', err);
      alert(`Erro ao cadastrar: ${err?.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="container">
      <h2>➕ Nova Sala</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Nome da Sala:</label>
        <input
          type="text"
          value={nome}
          placeholder="Ex: Sala 3"
          onChange={(e) => setNome(e.target.value)}
          required
        /><br /><br />

        <label>Local:</label>
        <input
          type="text"
          value={local}
          placeholder="Ex: Bloco II"
          onChange={(e) => setLocal(e.target.value)}
          required
        /><br /><br />

        <label>Capacidade:</label>
        <input
          type="number"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          min="1"
          required
        /><br /><br />

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">Cadastrar</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/salas')}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroSalaPage;
