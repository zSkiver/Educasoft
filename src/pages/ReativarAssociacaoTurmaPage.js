import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const ReativarAssociacaoTurmaPage = () => {
  const [associacoesInativas, setAssociacoesInativas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/associacoes/inativas').then((res) => {
      setAssociacoesInativas(res.data);
    }).catch((err) => {
      console.error('Erro ao buscar associações inativas:', err);
    });
  }, []);

  const handleReactivate = async (matricula, idTurma) => {
    try {
      await apiClient.patch(`/associacoes/reativar`, {
        matricula,
        idTurma
      });
      setAssociacoesInativas((prev) =>
        prev.filter((a) => !(a.matricula === matricula && a.idTurma === idTurma))
      );
    } catch (err) {
      console.error('Erro ao reativar associação:', err);
      alert('Erro ao reativar a associação.');
    }
  };

  const columns = [
    { Header: 'Matrícula', accessor: 'matricula' },
    { Header: 'Aluno', accessor: 'nome' },
    { Header: 'Turma', accessor: 'nomeTurma' },
    { Header: 'Semestre', accessor: 'semestre_ano' },
    { Header: 'Dia da Semana', accessor: 'dia_semana' }
  ];

  return (
    <div className="container">
      <h1>🔄 Reativar Associação de Alunos às Turmas</h1>
      <div className="mb-4">
        <button className="btn btn-cancel" onClick={() => navigate('/turmas/associacao')}>
          ❌ Cancelar
        </button>
      </div>
      <DataTable
        columns={columns}
        data={associacoesInativas}
        onReactivate={(row) => handleReactivate(row.matricula, row.idTurma)}
      />
    </div>
  );
};

export default ReativarAssociacaoTurmaPage;
