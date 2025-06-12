import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import './DisciplinaPage.css';

const CadastroDisciplinaPage = () => {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [periodo, setPeriodo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nome, codigo, periodo };
    try {
      await apiClient.post('/disciplinas', payload);
      alert('Disciplina cadastrada com sucesso!');
      navigate('/disciplinas');
    } catch (err) {
      console.error('Erro ao cadastrar disciplina:', err);
      alert('Erro ao cadastrar. Verifique os campos.');
    }
  };

  return (
    <div className="container">
      <h2>➕ Nova Disciplina</h2> 
      <form onSubmit={handleSubmit} className="form">
        <label>Nome:  </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /> <br></br> <br></br>

        <label>Código:  </label>
        <input
          type="text"
          value={codigo}
          maxLength={10}
          onChange={(e) => setCodigo(e.target.value)}
          required
        /> <br></br> <br></br>

        <label>Período:  </label>
        <input
          type="text"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          required
        /> <br></br> <br></br>

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">Cadastrar</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/disciplinas')}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroDisciplinaPage;
