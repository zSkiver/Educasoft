import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import DataTable from '../components/DataTable';

const AssociacaoPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssociacoes();
  }, []);

  const fetchAssociacoes = async () => {
    try {
      const res = await apiClient.get('/associacoes');
      setAlunos(res.data);
    } catch (err) {
      console.error('Erro ao buscar associações de alunos', err);
    }
  };

  const handleDesativar = async (matricula, idTurma) => {
  if (!idTurma) return alert("Turma não identificada.");

  if (window.confirm("Deseja realmente desativar esta associação?")) {
    try {
      await apiClient.patch('/associacoes/desativar', {
        matricula,
        idTurma,
      });
      alert("Associação desativada com sucesso!");
      fetchAssociacoes(); 
    } catch (err) {
      console.error("Erro ao desativar associação:", err);
      alert("Erro ao desativar associação.");
    }
  }
};

  const formatarHorario = (hora) => {
  if (!hora) return '--:--';

  if (hora.includes('T')) {
    const partes = hora.split('T')[1].split(':');
    return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}`;
  }

  const partes = hora.split(':');
  if (partes.length >= 2) {
    return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}`;
  }

  return '--:--';
};

  const columns = [
  { Header: 'Matrícula', accessor: 'matricula' },
  { Header: 'Aluno', accessor: 'nome' },
  { Header: 'Turma', accessor: 'nomeTurma' },
  { Header: 'Semestre', accessor: 'semestre_ano' },
  { Header: 'Dia', accessor: 'dia_semana' },
  { Header: 'Horário Início', accessor: 'horario' },
  { Header: 'Horário Término', accessor: 'horario_termino' },
  { Header: 'Disciplina', accessor: 'disciplina' },
  { Header: 'Professor', accessor: 'professor' },
  { Header: 'Sala', accessor: 'sala' },
];

  const filteredData = alunos
  .filter(aluno => aluno.turmas && aluno.turmas.length > 0)
  .filter((aluno) => {
    const term = search.toLowerCase();
    return (
      aluno.nome.toLowerCase().includes(term) ||
      aluno.matricula.toString().includes(term)
    );
  })
  .flatMap(aluno =>
    aluno.turmas.map(turma => ({
      matricula: aluno.matricula,
      nome: aluno.nome,
      nomeTurma: turma.nome,
      semestre_ano: turma.semestre_ano,
      dia_semana: turma.dia_semana,
      horario: formatarHorario(turma.horario),
      horario_termino: formatarHorario(turma.horario_termino),
      disciplina: turma.disciplina?.nome || 'Sem disciplina',
      professor: turma.professor?.nome || 'Sem professor',
      sala: turma.sala?.nome || 'Sem sala',
      idTurma: turma.idTurma
    }))
  );

  return (
    <div className="container">
      <h1>📋 Associações Aluno x Turma</h1>

      <div className="mb-4">
        <label htmlFor="search">🔍 Buscar por nome ou matrícula:</label><br /><br />
        <input
          id="search"
          type="text"
          placeholder="Ex: João, 123..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div><br />
      <div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/turmas/novaAssociacao/1')}>
          ➕ Associar Alunos à Turma
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/turmas/associacoes/reativar')}>
          🔄 Reativar associação
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onEdit={(row) =>
          navigate(`/turmas/associacoes/editar/${row.idTurma}/${row.matricula}`)
        }
        onDelete={(row) =>
          handleDesativar(row.matricula, row.idTurma)
        }
      />
    </div>
  );
};

export default AssociacaoPage;
