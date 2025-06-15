import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const ReativarTurmaPage = () => {
  const [turmasInativas, setTurmasInativas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/turmas/inativos').then((res) => {
      const turmasFormatadas = res.data.map(turma => ({
        ...turma,
        horario: new Date(turma.horario).toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }),
        horario_termino: turma.horario_termino.slice(0, 5)
      }));
      setTurmasInativas(turmasFormatadas);
    });
  }, []);

  const handleReactivate = async (id) => {
    await apiClient.patch(`/turmas/${id}/reativar`);
    setTurmasInativas(prev => prev.filter(t => t.idTurma !== id));
  };

  const columns = [
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Dia da Semana', accessor: 'dia_semana' },
    { Header: 'Semestre/Ano', accessor: 'semestre_ano' },
    { Header: 'Horário Início', accessor: 'horario' },
    { Header: 'Horário Término', accessor: 'horario_termino' },
    { Header: 'Professor', accessor: 'nomeProfessor' },
    { Header: 'Disciplina', accessor: 'nomeDisciplina' },
    { Header: 'Sala', accessor: 'nomeLocal' },
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Turmas</h1>
      <button className="btn btn-cancel" onClick={() => navigate('/turmas')}>
        ❌ Cancelar
      </button>
      <DataTable
        columns={columns}
        data={turmasInativas}
        onReactivate={(row) => handleReactivate(row.idTurma)}
      />
    </div>
  );
};

export default ReativarTurmaPage;
