import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';
import './DisciplinaPage.css';

const ReativarDisciplinasPage = () => {
  const [disciplinasInativas, setDisciplinasInativas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/disciplinas/inativas').then((res) => {
      setDisciplinasInativas(res.data);
    });
  }, []);

  const handleReactivate = async (id) => {
    await apiClient.patch(`/disciplinas/${id}/reativar`);
    setDisciplinasInativas((prev) => prev.filter((d) => d.idDisciplina !== id));
  };

  const columns = [
    { Header: 'Código', accessor: 'codigo' },
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Período', accessor: 'periodo' },
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Disciplinas</h1>

      <div className="mb-4">
        <button className="btn btn-cancel" onClick={() => navigate('/disciplinas')}>
          ❌ Cancelar
        </button>
      </div>

      <DataTable
        columns={columns}
        data={disciplinasInativas}
        onReactivate={(row) => handleReactivate(row.idDisciplina)}
      />
    </div>
  );
};

export default ReativarDisciplinasPage;
