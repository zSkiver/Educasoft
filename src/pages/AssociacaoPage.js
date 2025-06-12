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
    { Header: 'Turmas', accessor: 'turmas' }
  ];

  const filteredData = alunos
    .filter((aluno) => {
      const term = search.toLowerCase();
      return (
        aluno.nome.toLowerCase().includes(term) ||
        aluno.matricula.toString().includes(term)
      );
    })
    .map((aluno) => ({
      ...aluno,
      turmas: aluno.turmas
        .map(t => {
          const horario = formatarHorario(t.horario);
          const termino = formatarHorario(t.horario_termino);
          return `${t.nome} (${t.semestre_ano}) - ${t.dia_semana} das ${horario} às ${termino}`;
        })
        .join(', ')
    }));

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
          onClick={() => navigate('/turmas/associar/1')}>
          ➕ Associar Alunos à Turma
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onEdit={null}
        onDelete={null}
      />
    </div>
  );
};

export default AssociacaoPage;
