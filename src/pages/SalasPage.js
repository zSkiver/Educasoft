import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const SalasPage = () => {
  const [salas, setSalas] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const res = await apiClient.get('/salas');
      setSalas(res.data);
    } catch (err) {
      console.error('Erro ao buscar salas', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja desativar esta sala?')) {
      await apiClient.delete(`/salas/${id}`);
      fetchSalas();
    }
  };

  const columns = [
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Local', accessor: 'local' },
    { Header: 'Capacidade', accessor: 'capacidade' },
  ];

  const filteredData = salas.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.nome.toLowerCase().includes(term) ||
      s.local.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container">
      <h1>🏫 Salas</h1>

      <div className="mb-4">
        <label htmlFor="search">🔍 Buscar por nome ou local:</label><br /><br />
        <input
          id="search"
          type="text"
          placeholder="Ex: Sala 101, Bloco A..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div><br />

      <div>
        <button className="btn btn-primary" onClick={() => navigate('/salas/nova')}>
          ➕ Nova Sala
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/salas/reativar')}>
          🔄 Reativar Salas
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onEdit={(row) => navigate(`/salas/editar/${row.idLocal}`)}
        onDelete={(row) => handleDelete(row.idLocal)}
      />
    </div>
  );
};

export default SalasPage;
