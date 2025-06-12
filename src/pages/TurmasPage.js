import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const TurmasPage = () => {
  const [turmas, setTurmas] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/turmas').then((res) => {
      const turmasFormatadas = res.data.map(turma => ({
        ...turma,
        horario: new Date(turma.horario).toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }),
        horario_termino: turma.horario_termino.slice(0, 5)
      }));
      setTurmas(turmasFormatadas);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja desativar esta turma?')) {
      await apiClient.delete(`/turmas/${id}`);
      setTurmas((prev) => prev.filter((t) => t.idTurma !== id));
    }
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


  const filteredTurmas = turmas.filter((t) =>
    t.nome.toLowerCase().includes(search.toLowerCase()) ||
    t.dia_semana.toLowerCase().includes(search.toLowerCase()) ||
    t.semestre_ano.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📚 Turmas</h1>

      <div className="mb-3">
        <label htmlFor="search">🔍 Buscar por </label><br /><br />
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div> <br /><br />

      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => navigate('/turmas/nova')}>
          ➕ Nova Turma
        </button> 
        <button className="btn btn-secondary" onClick={() => navigate('/turmas/reativar')}>
          🔄 Reativar Turma
        </button>
      </div> 

      <DataTable
        columns={columns}
        data={filteredTurmas}
        onEdit={(row) => navigate(`/turmas/editar/${row.idTurma}`)}
        onDelete={(row) => handleDelete(row.idTurma)}
      />
    </div>
  );
};

export default TurmasPage;
