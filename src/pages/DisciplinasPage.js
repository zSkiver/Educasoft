import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';
import './DisciplinaPage.css';

const DisciplinasPage = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const fetchDisciplinas = async () => {
    try {
      const res = await apiClient.get('/disciplinas');
      setDisciplinas(res.data);
    } catch (err) {
      console.error('Erro ao buscar disciplinas', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja desativar esta disciplina?')) {
      await apiClient.delete(`/disciplinas/${id}`);
      fetchDisciplinas();
    }
  };

  const columns = [
    { Header: 'Código', accessor: 'codigo' },
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Período', accessor: 'periodo' },
  ];

  const filteredData = disciplinas.filter((d) => {
    const term = search.toLowerCase();
    return (
      d.nome.toLowerCase().includes(term) ||
      d.codigo.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container">
      <h1>📘 Disciplinas</h1>

      <div className="mb-4">
        <label htmlFor="search" className="">
          🔍 Buscar por nome ou código </label> <br></br> <br></br>
        <input
          id="search"
          type="text"
          placeholder="Ex: programação, 2025/1, MAT01..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=""
        />
      </div><br></br>

      <div className="">
        <button className="btn btn-primary" onClick={() => navigate('/disciplinas/nova')}>
          ➕ Nova Disciplina
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/disciplinas/reativar')}>
          🔄 Reativar Disciplinas
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onEdit={(row) => navigate(`/disciplinas/editar/${row.idDisciplina}`)}
        onDelete={(row) => handleDelete(row.idDisciplina)}
      />
    </div>
  );
};

export default DisciplinasPage;
