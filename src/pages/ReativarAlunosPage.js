import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const ReativarAlunosPage = () => {
  const [alunosInativos, setAlunosInativos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/alunos/inativos').then((res) => {
      setAlunosInativos(res.data);
    });
  }, []);

  const handleReactivate = async (id) => {
    await apiClient.patch(`/alunos/${id}/reativar`);
    setAlunosInativos((prev) => prev.filter((a) => a.matricula !== id));
  };

  const columns = [
    { Header: 'Matrícula', accessor: 'matricula' },
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'CPF', accessor: 'cpf' },
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Alunos</h1>
      <div className="mb-4">
        <button className="btn btn-cancel" onClick={() => navigate('/alunos')}>❌ Cancelar</button>
      </div>
      <DataTable
        columns={columns}
        data={alunosInativos}
        onReactivate={(row) => handleReactivate(row.matricula)}
      />
    </div>
  );
};

export default ReativarAlunosPage;
