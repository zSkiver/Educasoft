import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const res = await apiClient.get('/alunos');
      setAlunos(res.data);
    } catch (err) {
      console.error('Erro ao buscar alunos', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja desativar este aluno?')) {
      await apiClient.delete(`/alunos/${id}`);
      fetchAlunos();
    }
  };

  const columns = [
    { Header: 'Matrícula', accessor: 'matricula' },
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'CPF', accessor: 'cpf', Cell: ({ value }) => formatCpf(value)},
  ];

  const formatCpf = (cpf) => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '').padStart(11, '0');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

  const filteredData = alunos.filter((a) => {
    const term = search.toLowerCase();
    return (
      a.nome.toLowerCase().includes(term) ||
      String(a.matricula).toLowerCase().includes(term) ||
      a.cpf.includes(term)
    );
  });

  return (
    <div className="container">
      <h1>👨‍🎓 Alunos</h1>

      <div className="mb-4">
        <label htmlFor="search">🔍 Buscar por nome, matrícula ou CPF</label><br /><br />
        <input
          id="search"
          type="text"
          placeholder="Ex: João, 2023001, 123.456.789-00..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div><br />

      <div>
        <button className="btn btn-primary" onClick={() => navigate('/alunos/novo')}>
          ➕ Novo Aluno
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/alunos/reativar')}>
          🔄 Reativar Alunos
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onEdit={(row) => navigate(`/alunos/editar/${row.matricula}`)}
        onDelete={(row) => handleDelete(row.matricula)}
      />
    </div>
  );
};

export default AlunosPage;
