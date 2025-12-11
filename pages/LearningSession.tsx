import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Play, Pause, RotateCcw, Brain, Coffee, CheckCircle2, Trophy, Star, Zap, X } from 'lucide-react';
import { Exam } from '../types';
import StudyContentRenderer from '../components/StudyContentRenderer';

interface LearningSessionProps {
  exam: Exam;
  onBack: () => void;
}

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  threshold: number; // sessions required
}

const BADGES: Badge[] = [
  { 
    id: 'starter', 
    name: 'Lern-Starter', 
    icon: <Zap size={24} />, 
    description: 'Erste Session abgeschlossen!', 
    color: 'bg-amber-100 text-amber-600',
    threshold: 1 
  },
  { 
    id: 'focus', 
    name: 'Fokus-Meister', 
    icon: <Brain size={24} />, 
    description: '3 Sessions pure Konzentration.', 
    color: 'bg-blue-100 text-blue-600',
    threshold: 3 
  },
  { 
    id: 'streak', 
    name: 'Unaufhaltsam', 
    icon: <Star size={24} />, 
    description: '5 Sessions – du bist eine Maschine!', 
    color: 'bg-fuchsia-100 text-fuchsia-600',
    threshold: 5 
  }
];

const LearningSession: React.FC<LearningSessionProps> = ({ exam, onBack }) => {
  const FOCUS_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  
  // Gamification State
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [showRewardModal, setShowRewardModal] = useState<Badge | null>(null);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        // Add 1 XP every minute (approx logic for demo)
        if (timeLeft % 60 === 0 && !isBreak) {
             setXp(prev => prev + 5);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      if (!isBreak) {
        // Focus session done
        handleSessionComplete();
        setIsBreak(true);
        setTimeLeft(BREAK_TIME);
      } else {
        // Break session done
        setIsBreak(false);
        setTimeLeft(FOCUS_TIME);
      }
      // Play notification sound (optional)
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const handleSessionComplete = () => {
    const newCount = completedSessions + 1;
    setCompletedSessions(newCount);
    setXp(prev => prev + 100); // Bonus XP for finishing

    // Check for badges
    const newBadge = BADGES.find(b => b.threshold === newCount);
    if (newBadge) {
      setEarnedBadges(prev => [...prev, newBadge]);
      setShowRewardModal(newBadge);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(FOCUS_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const healthTips = [
    "Trink ein Glas Wasser für bessere Konzentration.",
    "Mach kreisende Bewegungen mit deinen Schultern.",
    "Schau für 20 Sekunden in die Ferne (20-20-20 Regel).",
    "Streck dich und atme tief ein.",
    "Steh kurz auf und geh ein paar Schritte."
  ];

  const currentTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
      
      {/* Reward Modal */}
      {showRewardModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center transform scale-110 transition-transform relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-50 to-white -z-10"></div>
             
             <button 
               onClick={() => setShowRewardModal(null)} 
               className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
             >
               <X size={20} />
             </button>

             <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-300 to-amber-500 rounded-full flex items-center justify-center text-white shadow-lg mb-6 animate-bounce">
               <Trophy size={48} />
             </div>
             
             <h3 className="text-2xl font-bold text-slate-800 mb-2">Abzeichen freigeschaltet!</h3>
             <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full font-bold text-sm mb-4">
               {showRewardModal.name}
             </div>
             <p className="text-slate-600 mb-6">{showRewardModal.description}</p>
             
             <button 
               onClick={() => setShowRewardModal(null)}
               className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
             >
               Weiter lernen!
             </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-slate-800 leading-tight">{exam.title}</h2>
            <p className="text-xs text-slate-500">{exam.subject} • {isBreak ? 'Pause' : 'Fokuszeit'}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
           {/* XP Indicator */}
           <div className="hidden md:flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
              <Zap size={14} fill="currentColor" /> {xp} XP
           </div>

           {/* Pomodoro Timer Display */}
           <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-colors duration-500 ${isBreak ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : isActive ? 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              {isBreak ? <Coffee size={18} /> : <Clock size={18} />}
              <span className="font-mono font-bold text-xl">{formatTime(timeLeft)}</span>
              <div className="flex gap-1 ml-2">
                <button onClick={toggleTimer} className="p-1 hover:bg-black/5 rounded">
                  {isActive ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button onClick={resetTimer} className="p-1 hover:bg-black/5 rounded">
                  <RotateCcw size={16} />
                </button>
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50">
           {isBreak ? (
             <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
               <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                 <Coffee size={48} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Zeit für eine Pause!</h3>
               <p className="text-slate-500 max-w-md mb-8">Du hast 25 Minuten fokussiert gelernt. Gönn deinem Gehirn eine kurze Auszeit.</p>
               
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 max-w-sm w-full transform rotate-1 hover:rotate-0 transition-transform">
                 <h4 className="font-bold text-emerald-700 mb-2 flex items-center gap-2">
                   <Brain size={18}/> MindVibe Tipp
                 </h4>
                 <p className="text-slate-600 italic">"{currentTip}"</p>
               </div>

               <button 
                 onClick={() => { setIsBreak(false); setTimeLeft(FOCUS_TIME); }}
                 className="mt-8 text-slate-400 hover:text-slate-600 text-sm font-medium"
               >
                 Pause überspringen
               </button>
             </div>
           ) : (
             <StudyContentRenderer content={exam.content || "Keine Inhalte verfügbar."} />
           )}
        </div>

        {/* Sidebar Info (Desktop) */}
        <div className="hidden md:block w-72 bg-white border-l border-slate-100 p-6 overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-4">Deine Session</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-400 mb-1">Abgeschlossene Pomodoros</div>
              <div className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                {completedSessions} <span className="text-base font-normal">🍅</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
               <div className="text-xs text-slate-400 mb-1">Fokuszeit heute</div>
               <div className="text-xl font-bold text-slate-800">
                 {Math.floor(completedSessions * 25)} Min.
               </div>
            </div>

            {/* Badges List */}
            {earnedBadges.length > 0 && (
              <div className="mt-6">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Gesammelte Badges</h4>
                 <div className="space-y-2">
                    {earnedBadges.map(badge => (
                      <div key={badge.id} className={`flex items-center gap-3 p-3 rounded-xl ${badge.color} bg-opacity-50 border border-current border-opacity-10`}>
                        <div className="shrink-0">{badge.icon}</div>
                        <div>
                          <div className="font-bold text-sm">{badge.name}</div>
                          <div className="text-[10px] opacity-80">Gerade eben</div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>

          <div className="mt-auto pt-8">
            <h4 className="font-bold text-slate-800 text-sm mb-3">Shortcuts</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex justify-between"><span>Timer Start/Stop</span> <kbd className="bg-slate-100 px-1.5 rounded border border-slate-200">Space</kbd></li>
              <li className="flex justify-between"><span>Karte drehen</span> <kbd className="bg-slate-100 px-1.5 rounded border border-slate-200">Klick</kbd></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSession;