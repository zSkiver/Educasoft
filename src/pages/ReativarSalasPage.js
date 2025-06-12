import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const ReativarSalasPage = () => {
  const [salasInativas, setSalasInativas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/salas/inativos').then((res) => {
      setSalasInativas(res.data);
    });
  }, []);

  const handleReactivate = async (id) => {
    await apiClient.patch(`/salas/${id}/reativar`);
    setSalasInativas((prev) => prev.filter((s) => s.idLocal !== id));
  };

  const columns = [
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Bloco', accessor: 'local' },
    { Header: 'Capacidade', accessor: 'capacidade' },
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Salas</h1>
      <div className="mb-4">
        <button className="btn btn-cancel" onClick={() => navigate('/salas')}>❌ Cancelar</button>
      </div>
      <DataTable
        columns={columns}
        data={salasInativas}
        onReactivate={(row) => handleReactivate(row.idLocal)}
      />
    </div>
  );
};

export default ReativarSalasPage;
