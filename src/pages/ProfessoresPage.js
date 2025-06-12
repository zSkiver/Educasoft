import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';
import './ProfessoresPage.css';

const ProfessoresPage = () => {
  const [professores, setProfessores] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    try {
      const res = await apiClient.get('/professores');
      setProfessores(res.data);
    } catch {
      alert('Erro ao buscar professores.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja desativar este professor?')) {
      try {
        await apiClient.delete(`/professores/${id}`);
        fetchProfessores();
      } catch {
        alert('Erro ao desativar o professor.');
      }
    }
  };

  const columns = [
    { Header: 'Código', accessor: 'idProfessor' },
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'CPF', accessor: 'cpf', Cell: ({ value }) => formatCpf(value)},
    { Header: 'Titulação', accessor: 'titulacao' },
    { Header: 'Email', accessor: 'email' },
  ];

  const formatCpf = (cpf) => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '').padStart(11, '0');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

  const filteredData = professores.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.nome.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term) ||
      p.cpf.toString().includes(term)
    );
  });

  return (
    <div className="container">
      <h1>👨‍🏫 Professores</h1>

      <div className="mb-4">
        <label htmlFor="search">🔍 Buscar por código, nome ou email</label>
        <br/><br/> 
        <input
          id="search"
          type="text"
          placeholder="Ex: 101, Ana, joao@email.com"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> <br></br>

      <div>
        <button className="btn btn-primary" onClick={() => navigate('/professores/nova')}>
          ➕ Novo Professor
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/professores/reativar')}>
          🔄 Reativar Professores
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onEdit={(row) => navigate(`/professores/editar/${row.idProfessor}`)}
        onDelete={(row) => handleDelete(row.idProfessor)}
      />
    </div>
  );
};

export default ProfessoresPage;
