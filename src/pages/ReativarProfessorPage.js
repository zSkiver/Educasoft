import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const ReativarProfessorPage = () => {
  const [professoresInativos, setProfessoresInativos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/professores/inativos').then((res) => {
      setProfessoresInativos(res.data);
    });
  }, []);

  const handleReactivate = async (id) => {
    await apiClient.patch(`/professores/${id}/reativar`);
    setProfessoresInativos((prev) => prev.filter((p) => p.idProfessor !== id));
  };

  const columns = [
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'CPF', accessor: 'cpf' },
    { Header: 'Titulação', accessor: 'titulacao' },
    { Header: 'Email', accessor: 'email' },
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Professores</h1>
      <div className="mb-4">
        <button className="btn btn-cancel" onClick={() => navigate('/professores')}>❌ Cancelar</button>
      </div>
      <DataTable
        columns={columns}
        data={professoresInativos}
        onReactivate={(row) => handleReactivate(row.idProfessor)}
      />
    </div>
  );
};

export default ReativarProfessorPage;
