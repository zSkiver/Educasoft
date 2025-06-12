import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const CadastroProfessorPage = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cpfLimpo = limparCpf(cpf);
    if (!isValidCpf(cpf)) {
      alert('CPF inválido. Digite um CPF válido.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('E-mail inválido. Digite um e-mail no formato nome@dominio.com.');
      return;
    }

    try {
      await apiClient.post('/professores', {
        nome,
        cpf: cpfLimpo,
        titulacao,
        email,
      });
      alert('Professor cadastrado com sucesso!');
      navigate('/professores');
    } catch (err) {
      console.error('Erro ao cadastrar professor:', err);
      alert(`Erro ao cadastrar: ${err?.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="container">
      <h2>➕ Novo Professor</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          placeholder="Nome Completo"
          onChange={(e) => setNome(e.target.value)}
          required
        /><br /><br />

        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          maxLength={14}
          placeholder="123.456.789-00"
          onChange={(e) => setCpf(e.target.value)}
          required
        /><br /><br />

        <label>Titulação:</label>
        <input
          type="text"
          value={titulacao}
          onChange={(e) => setTitulacao(e.target.value)}
          required
        /><br /><br />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="exemplo@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">Cadastrar</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/professores')}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroProfessorPage;
