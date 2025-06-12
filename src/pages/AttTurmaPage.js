import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const AttTurmaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [semestreAno, setSemestreAno] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioTermino, setHorarioTermino] = useState('');
  const [idProfessor, setIdProfessor] = useState('');
  const [idDisciplina, setIdDisciplina] = useState('');
  const [idLocal, setIdLocal] = useState('');
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    apiClient.get(`/turmas/${id}`).then(res => {
      const data = res.data;
      setNome(data.nome);
      setDiaSemana(data.dia_semana);
      setSemestreAno(data.semestre_ano);
      setHorarioInicio(data.horario.slice(0, 16));
      setHorarioTermino(data.horario_termino);
      setIdProfessor(data.idProfessor);
      setIdDisciplina(data.idDisciplina);
      setIdLocal(data.idLocal);
    });

    apiClient.get('/professores').then(res => setProfessores(res.data));
    apiClient.get('/disciplinas').then(res => setDisciplinas(res.data));
    apiClient.get('/salas').then(res => setSalas(res.data));
  }, [id]);

  const handleHorarioInicioChange = (e) => {
    const value = e.target.value;
    setHorarioInicio(value);

    const dia = new Date(value);

    const nomeDia = dia.toLocaleDateString('pt-BR', { weekday: 'long' });
    setDiaSemana(nomeDia.charAt(0).toUpperCase() + nomeDia.slice(1));

    const ano = dia.getFullYear();
    const mes = dia.getMonth();
    const semestre = mes < 6 ? '1' : '2';
    setSemestreAno(`${ano}/${semestre}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/turmas/${id}`, {
        nome,
        dia_semana: diaSemana,
        semestre_ano: semestreAno,
        horario: horarioInicio,
        horario_termino: horarioTermino,
        idProfessor,
        idDisciplina,
        idLocal
      });
      alert('Turma atualizada com sucesso!');
      navigate('/turmas');
    } catch {
      alert('Erro ao atualizar turma.');
    }
  };

  return (
    <div className="container">
      <h2>✏️ Editar Turma</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome da Turma:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required /> <br /><br />

        <label>Semestre/Ano:</label>
        <input value={semestreAno} readOnly required /> <br /><br />

        <label>Data e hora de início:</label>
        <input type="datetime-local" value={horarioInicio} onChange={handleHorarioInicioChange} required />

        <label>Hora de término:</label>
        <input type="time" value={horarioTermino} onChange={(e) => setHorarioTermino(e.target.value)} required />

        <label>Dia da Semana Detectado:</label>
        <strong> {diaSemana || 'Selecione a data acima'}</strong> <br /><br />

        <label>Professor:</label>
        <select value={idProfessor} onChange={(e) => setIdProfessor(e.target.value)} required>
          <option value="">Selecione o Professor</option>
          {professores.map(p => (
            <option key={p.idProfessor} value={p.idProfessor}>{p.nome}</option>
          ))}
        </select> <br /><br />

        <label>Disciplina:</label>
        <select value={idDisciplina} onChange={(e) => setIdDisciplina(e.target.value)} required>
          <option value="">Selecione a Disciplina</option>
          {disciplinas.map(d => (
            <option key={d.idDisciplina} value={d.idDisciplina}>{d.nome}</option>
          ))}
        </select> <br /><br />

        <label>Sala:</label>
        <select value={idLocal} onChange={(e) => setIdLocal(e.target.value)} required>
          <option value="">Selecione a Sala</option>
          {salas.map(s => (
            <option key={s.idLocal} value={s.idLocal}>{s.nome} ({s.bloco} {s.local})</option>
          ))}
        </select> <br /><br />

        <button type="submit" className="btn btn-submit">Atualizar</button>
        <button type="button" className="btn btn-cancel" onClick={() => navigate('/turmas')}>❌ Cancelar</button>
      </form>
    </div>
  );
};

export default AttTurmaPage;
