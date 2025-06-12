import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const ReativarTurmaPage = () => {
  const [turmasInativas, setTurmasInativas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/turmas/inativos').then(res => setTurmasInativas(res.data));
  }, []);

  const handleReactivate = async (id) => {
    await apiClient.patch(`/turmas/${id}/reativar`);
    setTurmasInativas(prev => prev.filter(t => t.idTurma !== id));
  };

  const columns = [
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Dia', accessor: 'dia_semana' },
    { Header: 'Semestre', accessor: 'semestre_ano' },
    { Header: 'Início', accessor: 'horario' },
    { Header: 'Término', accessor: 'horario_termino' },
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Turmas</h1>
      <button className="btn btn-cancel" onClick={() => navigate('/turmas')}>❌ Cancelar</button>
      <DataTable columns={columns} data={turmasInativas} onReactivate={(row) => handleReactivate(row.idTurma)} />
    </div>
  );
};

export default ReativarTurmaPage;
