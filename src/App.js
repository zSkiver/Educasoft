import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DisciplinasPage from './pages/DisciplinasPage';
import CadastroDisciplinaPage from './pages/CadastroDisciplinaPage';
import DisciplinaFormPage from './pages/AttDisciplinaPage';
import ReativarDisciplinasPage from './pages/ReativarDisciplinasPage';
import ProfessoresPage from './pages/ProfessoresPage';
import CadastroProfessorPage from './pages/CadastroProfessorPage';
import AttProfessorPage from './pages/AttProfessorPage';
import ReativarProfessorPage from './pages/ReativarProfessorPage';
import SalasPage from './pages/SalasPage';
import CadastroSalaPage from './pages/CadastroSalaPage';
import ReativarSalasPage from './pages/ReativarSalasPage';
import AttSalasPage from './pages/AttSalaPage';
import TurmasPage from './pages/TurmasPage';
import CadastroTurmaPage from './pages/CadastroTurmaPage';
import AttTurmaPage from './pages/AttTurmaPage';
import ReativarTurmaPage from './pages/ReativarTurmaPage';
import AlunosPage from './pages/AlunosPage';
import CadastroAlunoPage from './pages/CadastroAlunoPage';
import AttAlunoPage from './pages/AttAlunoPage';
import ReativarAlunosPage from './pages/ReativarAlunosPage';
import CadastroAssociacaoTurmaPage from './pages/CadastroAssociacaoTurmaPage';
import AssociacaoPage from './pages/AssociacaoPage';
import ReativarAssociacaoTurmaPage from './pages/ReativarAssociacaoTurmaPage';
import AttAssociacaoPage from './pages/AttAssociacaoPage';


import './App.css';

const HomePage = () => (
  <div>
    <h2>Página Inicial</h2>
    <p>Selecione uma opção no menu acima.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <nav className="mb-4 p-4 bg-gray-100 rounded">
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-blue-600 hover:underline">Início</Link></li>
              <li><Link to="/alunos" className="text-blue-600 hover:underline">Alunos</Link></li>
              <li><Link to="/professores" className="text-blue-600 hover:underline">Professores</Link></li>
              <li><Link to="/disciplinas" className="text-blue-600 hover:underline">Disciplinas</Link></li>
              <li><Link to="/salas" className="text-blue-600 hover:underline">Salas</Link></li>
              <li><Link to="/turmas" className="text-blue-600 hover:underline">Turmas</Link></li>
              <li><Link to="/turmas/associacao" className="text-blue-600 hover:underline">Associar Alunos</Link></li>


            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Disciplinas */}
            <Route path="/disciplinas" element={<DisciplinasPage />} />
            <Route path="/disciplinas/nova" element={<CadastroDisciplinaPage />} />
            <Route path="/disciplinas/editar/:id" element={<DisciplinaFormPage />} />
            <Route path="/disciplinas/reativar" element={<ReativarDisciplinasPage />} />

            {/* Professores */}
            <Route path="/professores" element={<ProfessoresPage />} />
            <Route path="/professores/nova" element={<CadastroProfessorPage />} />
            <Route path="/professores/editar/:id" element={<AttProfessorPage />} />
            <Route path="/professores/reativar" element={<ReativarProfessorPage />} />

            {/* Salas */}
            <Route path="/salas" element={<SalasPage />} />
            <Route path="/salas/nova" element={<CadastroSalaPage />} />
            <Route path="/salas/reativar" element={<ReativarSalasPage />} />
            <Route path="/salas/editar/:id" element={<AttSalasPage/>} />

            {/* Turmas */}
            <Route path="/turmas" element={<TurmasPage />} />
            <Route path="/turmas/nova" element={<CadastroTurmaPage />} />
            <Route path="/turmas/reativar" element={<ReativarTurmaPage />} />
            <Route path="/turmas/editar/:id" element={<AttTurmaPage />} />
            <Route path="/turmas/associacao" element={<AssociacaoPage/>} />
            

            {/* Alunos */}
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/alunos/novo" element={<CadastroAlunoPage />} />
            <Route path="/alunos/editar/:id" element={<AttAlunoPage />} />
            <Route path="/alunos/reativar" element={<ReativarAlunosPage />} />

            {/* associar */}
            <Route path="/turmas/novaAssociacao/:id" element={<CadastroAssociacaoTurmaPage/>} />
            <Route path="/turmas/associacoes/reativar" element={<ReativarAssociacaoTurmaPage />} />
            <Route path="/turmas/associacoes/editar/:idTurma/:matricula" element={<AttAssociacaoPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
