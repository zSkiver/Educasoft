import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const AttAlunoPage = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/alunos/${id}`).then((res) => {
      const a = res.data;
      setNome(a.nome);
      setCpf(a.cpf);
    });
  }, [id]);

  const limparCpf = (valor) => valor.replace(/\D/g, '');

  const isValidCpf = (cpfOriginal) => {
    const cpf = limparCpf(cpfOriginal);

    if (!/^\d{11}$/.test(cpf)) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cpfLimpo = limparCpf(cpf);
    if (!isValidCpf(cpf)) {
      alert('CPF inválido. Digite um CPF válido.');
      return;
    }

    try {
      await apiClient.put(`/alunos/${id}`, { nome, cpf: cpfLimpo });
      alert('Aluno atualizado com sucesso!');
      navigate('/alunos');
    } catch (err) {
      console.error('Erro ao atualizar aluno:', err);
      alert('Erro ao atualizar aluno.');
    }
  };

  return (
    <div className="container">
      <h2>✏️ Editar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /><br /><br />

        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          maxLength={14}
          onChange={(e) => setCpf(e.target.value)}
          required
        /><br /><br />

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">Atualizar</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/alunos')}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttAlunoPage;
