import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const DisciplinaFormPage = () => {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      apiClient.get(`/disciplinas/${id}`).then((res) => {
        const d = res.data;
        setNome(d.nome);
        setCodigo(d.codigo);
        setPeriodo(d.periodo);
      }).catch((err) => {
        console.error('Erro ao carregar disciplina:', err);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nome, codigo, periodo };

    try {
      if (isEditMode) {
        await apiClient.put(`/disciplinas/${id}`, payload);
        alert('Disciplina atualizada com sucesso!');
      } else {
        await apiClient.post('/disciplinas', payload);
        alert('Disciplina criada com sucesso!');
      }
      navigate('/disciplinas');
    } catch (err) {
      console.error('Erro ao salvar disciplina:', err);
      alert('Ocorreu um erro ao salvar.');
    }
  };

  return (
    <div className="container">
      <h2>{isEditMode ? 'Editar Disciplina' : 'Nova Disciplina'}</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-submit">
            {isEditMode ? 'Atualizar' : 'Cadastrar'}
          </button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/disciplinas')}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisciplinaFormPage;
