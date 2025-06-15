import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const AssociarTurmaPage = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [matriculaSelecionada, setMatriculaSelecionada] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState('');

  useEffect(() => {
    apiClient.get('/alunos').then(res => setAlunos(res.data));
    apiClient.get('/turmas').then(res => setTurmas(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!matriculaSelecionada || !turmaSelecionada) {
      alert('Selecione o aluno e a turma.');
      return;
    }

    try {
      await apiClient.post(`/turmas/${turmaSelecionada}/associar-alunos`, {
        idsAlunos: [matriculaSelecionada]
      });
      alert('Associação realizada com sucesso!');
      navigate('/turmas');
    } catch (err) {
      alert('Erro ao associar aluno.');
    }
  };

  return (
    <div className="container">
      <h2>🔗 Associar Aluno à Turma</h2>
      <form onSubmit={handleSubmit}>
        <label>Selecione um Aluno:</label>
        <select
          value={matriculaSelecionada}
          onChange={(e) => setMatriculaSelecionada(e.target.value)}
          required
        >
          <option value="">-- Selecione --</option>
          {alunos.map((aluno) => (
            <option key={aluno.matricula} value={aluno.matricula}>
              {aluno.nome} - ({aluno.cpf})
            </option>
          ))}
        </select>
        <br /><br />

        <label>Selecione uma Turma:</label>
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
          required
        >
          <option value="">-- Selecione --</option>
          {turmas.map((turma) => {
            const formatarHora = (horaStr) => {
                if (!horaStr) return '??:??';
                const partes = horaStr.split(':');
                if (partes.length >= 2) {
                const [h, m] = partes;
                return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
                }
                return horaStr;
            };

            const inicio = formatarHora(turma.horario);
            const fim = formatarHora(turma.horario_termino);

            return (
                <option key={turma.idTurma} value={turma.idTurma}>
                {turma.nome} - ({turma.semestre_ano}) - ({turma.dia_semana}) - ({inicio} às {fim})
                </option>
            );
            })}
        </select>
        <br /><br />

        <button type="submit" className="btn btn-primary"onClick={() => navigate('/turmas/associacao')}>Associar</button>
        <button type="button" className="btn btn-cancel" onClick={() => navigate('/turmas/associacao')}>Cancelar</button>
      </form>
    </div>
  );
};

export default AssociarTurmaPage;
