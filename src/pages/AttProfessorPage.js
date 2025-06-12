import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const AttProfessorPage = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/professores/${id}`).then((res) => {
      const p = res.data;
      setNome(p.nome);
      setCpf(p.cpf);
      setTitulacao(p.titulacao);
      setEmail(p.email);
    });
  }, [id]);

  const isValidCpf = (cpf) => /^[0-9]{11}$/.test(cpf.replace(/\D/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidCpf(cpf)) {
      alert('CPF inválido. Digite 11 números.');
      return;
    }

    try {
      await apiClient.put(`/professores/${id}`, { nome, cpf, titulacao, email });
      alert('Professor atualizado com sucesso!');
      navigate('/professores');
    } catch (err) {
      console.error('Erro ao atualizar professor:', err);
      alert('Erro ao atualizar.');
    }
  };

  return (
    <div className="container">
      <h2>✏️ Editar Professor</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:  </label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required /> <br></br> <br></br>

        <label>CPF:  </label>
        <input type="text" value={cpf} maxLength={14} onChange={(e) => setCpf(e.target.value)} required /> <br></br> <br></br>

        <label>Titulação:  </label>
        <input type="text" value={titulacao} onChange={(e) => setTitulacao(e.target.value)} required /> <br></br> <br></br>

        <label>Email:  </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br></br> <br></br>

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">Atualizar</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/professores')}>❌ Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AttProfessorPage;
