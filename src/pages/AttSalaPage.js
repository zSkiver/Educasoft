import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const AttSalasPage = () => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/salas/${id}`).then((res) => {
      const sala = res.data;
      setNome(sala.nome);
      setLocal(sala.local);
      setCapacidade(sala.capacidade);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !local || !capacidade) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await apiClient.put(`/salas/${id}`, {
        nome,
        local,
        capacidade: parseInt(capacidade),
      });
      alert('Sala atualizada com sucesso!');
      navigate('/salas');
    } catch (err) {
      console.error('Erro ao atualizar sala:', err);
      alert('Erro ao atualizar sala.');
    }
  };

  return (
    <div className="container">
      <h2>✏️ Editar Sala</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /> <br /><br />

        <label>Bloco:</label>
        <input
          type="text"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        /> <br /><br />

        <label>Capacidade:</label>
        <input
          type="number"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          required
          min={1}
        /> <br /><br />

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">Atualizar</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/salas')}>❌ Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AttSalasPage;
