
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreateWizard from './pages/CreateWizard';
import Exams from './pages/Exams';
import Progress from './pages/Progress';
import LearningSession from './pages/LearningSession';
import EditorPage from './pages/EditorPage';
import ReviewPage from './pages/ReviewPage';
import GroupsPage from './pages/GroupsPage';
import AchievementsPage from './pages/AchievementsPage';
import { Exam } from './types';

const App = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  
  // Data State
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Geldrechnen',
      subject: 'Mathematik',
      date: '2025-11-25',
      status: 'passed',
      content: ''
    },
    {
      id: '2',
      title: 'Brüche',
      subject: 'Mathematik',
      date: '2025-12-29',
      status: 'upcoming',
      content: ''
    },
    {
      id: '3',
      title: 'einzahl mehrzahl',
      subject: 'Deutsch',
      date: '2025-12-30',
      status: 'ready',
      content: ':::SECTION: plan:::\n* Phase 1: Basics\n:::SECTION: flashcards:::\nQ: Haus | A: Häuser'
    }
  ]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'session') {
      setActiveExam(null);
    }
  };

  const handleOpenExam = (exam: Exam) => {
    setActiveExam(exam);
    if (exam.status === 'ready') {
      setCurrentPage('session');
    } else {
      // Just go to exams list for now if not ready, or handle otherwise
      setCurrentPage('pruefungen');
    }
  };

  const handleCreateComplete = (newExam: Exam) => {
    setExams(prev => [...prev, newExam]);
    setCurrentPage('home'); // Go back to dashboard
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onNavigate={handleNavigate} exams={exams} onOpenExam={handleOpenExam} />;
      case 'create':
        return <CreateWizard onBack={() => setCurrentPage('home')} onComplete={handleCreateComplete} />;
      case 'pruefungen':
        return <Exams exams={exams} onOpenExam={handleOpenExam} />;
      case 'fortschritt':
        return <Progress />;
      case 'session':
        return activeExam ? <LearningSession exam={activeExam} onBack={() => setCurrentPage('home')} /> : <Dashboard onNavigate={handleNavigate} exams={exams} onOpenExam={handleOpenExam} />;
      case 'wissen':
        return <EditorPage />;
      case 'review':
        return <ReviewPage />;
      case 'lerngruppen':
        return <GroupsPage />;
      case 'erfolge':
        return <AchievementsPage />;
      default:
        // Default to Dashboard or construction placeholders
        if (currentPage === 'bibliothek') return <div className="p-8 text-center text-slate-400">Bibliothek is under construction.</div>;
        return <Dashboard onNavigate={handleNavigate} exams={exams} onOpenExam={handleOpenExam} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-4 h-screen overflow-hidden">
        <div className="h-full overflow-y-auto rounded-3xl bg-white shadow-sm border border-slate-100 relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
