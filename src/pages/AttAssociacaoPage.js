import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const AttAssociacaoPage = () => {
  const [aluno, setAluno] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [novaTurma, setNovaTurma] = useState('');
  const [turmaAtual, setTurmaAtual] = useState(null);

  const { matricula, idTurma } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar aluno
    apiClient.get(`/alunos/${matricula}`)
      .then(res => setAluno(res.data))
      .catch(err => console.error('Erro ao buscar aluno:', err));

    // Buscar turmas
    apiClient.get('/turmas')
      .then(res => setTurmas(res.data.filter(t => t.idTurma !== parseInt(idTurma))))
      .catch(err => console.error('Erro ao buscar turmas:', err));

    // Buscar turma atual
    apiClient.get(`/turmas/${idTurma}`)
      .then(res => setTurmaAtual(res.data))
      .catch(err => console.error('Erro ao buscar turma atual:', err));
  }, [matricula, idTurma]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!novaTurma) {
      alert("Selecione a nova turma para transferir o aluno.");
      return;
    }

    try {
      await apiClient.patch('/associacoes/atualizar', {
        matricula,
        idTurmaAntiga: parseInt(idTurma),
        idTurmaNova: parseInt(novaTurma)
      });

      alert('Associação atualizada com sucesso!');
      navigate('/associacoes');
    } catch (err) {
      console.error('Erro ao atualizar associação:', err);
      alert('Erro ao atualizar associação.');
    }
  };

  return (
    <div className="container">
      <h2>🔄 Atualizar Associação</h2>

      {aluno && turmaAtual && (
        <div className="aluno-info">
        <h3>👤 Aluno: {aluno.nome}</h3>
        <p><strong>Matrícula:</strong> {aluno.matricula}</p> <br />
        <p><strong>Turma atual:</strong> {turmaAtual.nome} ({turmaAtual.semestre_ano}) - {turmaAtual.dia_semana}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Selecione a nova turma:</label><br /><br />
        <select
          value={novaTurma}
          onChange={(e) => setNovaTurma(e.target.value)}
          required
        >
          <option value="">-- Selecione uma turma --</option>
          {turmas.map(t => (
            <option key={t.idTurma} value={t.idTurma}>
              {t.nome} - {t.semestre_ano} - {t.dia_semana}
            </option>
          ))}
        </select>

        <br /><br />
        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">
            Salvar
          </button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/associacoes')}>
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttAssociacaoPage;
