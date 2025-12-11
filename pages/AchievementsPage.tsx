
import React from 'react';
import { 
  Trophy, 
  Target, 
  Award, 
  Users, 
  Star, 
  Zap, 
  Lock, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Flame
} from 'lucide-react';

const AchievementsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-fuchsia-600 flex items-center gap-3">
          <Trophy size={32} /> Erfolge & Belohnungen
        </h2>
        <p className="text-slate-500 mt-2">Erreiche Ziele, sammle Badges und klettere die Rangliste hoch!</p>
      </div>

      {/* Top Stats Cards (Mini Version) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Level */}
        <div className="bg-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:border-fuchsia-300 transition-all">
          <Trophy size={20} className="mb-1 text-fuchsia-500" />
          <div className="text-2xl font-bold leading-none mb-1 text-slate-900">1</div>
          <div className="text-xs font-bold text-fuchsia-700 opacity-80 uppercase tracking-wide">Level</div>
        </div>

        {/* Gesamt XP */}
        <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:border-violet-300 transition-all">
          <Target size={20} className="mb-1 text-violet-500" />
          <div className="text-2xl font-bold leading-none mb-1 text-slate-900">0</div>
          <div className="text-xs font-bold text-violet-700 opacity-80 uppercase tracking-wide">Gesamt XP</div>
        </div>

        {/* Badges */}
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:border-sky-300 transition-all">
          <Award size={20} className="mb-1 text-sky-500" />
          <div className="text-2xl font-bold leading-none mb-1 text-slate-900">0</div>
          <div className="text-xs font-bold text-sky-700 opacity-80 uppercase tracking-wide">Badges</div>
        </div>

        {/* Streak */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:border-orange-300 transition-all">
          <Users size={20} className="mb-1 text-orange-500" />
          <div className="text-2xl font-bold leading-none mb-1 text-slate-900">0</div>
          <div className="text-xs font-bold text-orange-700 opacity-80 uppercase tracking-wide">Tage Streak</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Level Progress Card - Matches "Level" (Fuchsia) */}
          <div className="bg-fuchsia-50/60 rounded-3xl p-8 border-2 border-dashed border-fuchsia-300 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-fuchsia-500 shadow-md border border-fuchsia-100">
                   <Star size={32} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Level 1</h3>
                  <p className="text-slate-600 font-medium">Anfänger</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-white border border-fuchsia-200 text-fuchsia-700 text-xs font-bold rounded-lg uppercase tracking-wider shadow-sm">
                0 XP
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2 font-medium text-slate-700">
                <span>Fortschritt zu Level 2</span>
                <span className="text-fuchsia-700 font-bold">0 / 1000 XP</span>
              </div>
              <div className="h-4 bg-white border border-fuchsia-200 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 w-2 rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-fuchsia-100 shadow-sm">
                <Trophy className="text-fuchsia-500 mb-2" size={24} />
                <div className="text-xl font-bold text-slate-800">0</div>
                <div className="text-xs text-slate-500 font-medium">Badges</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-sky-100 shadow-sm">
                <Zap className="text-sky-500 mb-2" size={24} fill="currentColor" />
                <div className="text-xl font-bold text-slate-800">0</div>
                <div className="text-xs text-slate-500 font-medium">Streak</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-emerald-100 shadow-sm">
                <Star className="text-emerald-500 mb-2" size={24} />
                <div className="text-xl font-bold text-slate-800">0</div>
                <div className="text-xs text-slate-500 font-medium">Gemeistert</div>
              </div>
            </div>
          </div>

          {/* Daily Goals - Matches "XP" (Violet) */}
          <div className="bg-violet-50/60 rounded-3xl p-8 border-2 border-dashed border-violet-300 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-violet-100 rounded-full flex items-center justify-center text-violet-500 shadow-sm">
                <Target size={20} />
              </div>
              Tägliche Ziele
            </h3>

            <div className="space-y-4">
              {/* Goal 1 */}
              <div className="flex items-center gap-4 p-4 border border-violet-100 rounded-2xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500">
                  <Zap size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800">3 Sessions</h4>
                    <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">+30 XP</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-2">0 / 3</div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-violet-500 w-0"></div>
                  </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="flex items-center gap-4 p-4 border border-violet-100 rounded-2xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500">
                  <BookOpen size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800">20 Karten</h4>
                    <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">+40 XP</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-2">0 / 20</div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-violet-500 w-0"></div>
                  </div>
                </div>
              </div>

              {/* Goal 3 */}
              <div className="flex items-center gap-4 p-4 border border-violet-100 rounded-2xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500">
                  <Clock size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800">15 Minuten</h4>
                    <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">+50 XP</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-2">0 / 15</div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-violet-500 w-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Collection - Matches "Badges" (Sky) */}
          <div className="bg-sky-50/60 rounded-3xl p-8 border-2 border-dashed border-sky-300 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-sky-100 rounded-xl flex items-center justify-center text-sky-500 shadow-sm">
                  <Award size={20} />
                </div>
                Badge-Sammlung
              </h3>
              <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">0/12</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-white rounded-2xl border border-sky-100 flex flex-col items-center justify-center text-slate-300 gap-2 shadow-sm">
                  <Lock size={24} className="text-sky-200" />
                  <span className="text-[10px] font-medium text-slate-400">Gesperrt</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          
          {/* Weekly Challenge */}
          <div className="bg-gradient-to-b from-fuchsia-400 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-pink-200">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-2">
                <Trophy size={20} />
                <div>
                  <div className="font-bold leading-tight">Wochen-</div>
                  <div className="font-bold leading-tight">Challenge</div>
                </div>
              </div>
              <div className="bg-white/20 px-2 py-1 rounded-lg text-[10px] font-bold">
                7 Tage übrig
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-1">0%</div>
              <div className="text-sm font-medium opacity-80">0 / 100 Minuten</div>
            </div>

            <div className="h-3 bg-black/20 rounded-full mb-8">
               <div className="h-full bg-white w-0 rounded-full"></div>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <Star size={16} fill="currentColor" className="text-yellow-300" />
              <span>Belohnung:</span>
              <span className="ml-auto bg-white text-fuchsia-600 px-2 py-0.5 rounded text-xs font-bold shadow-sm">+500 XP</span>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-fuchsia-500 rounded-xl flex items-center justify-center text-white">
                <Trophy size={20} />
              </div>
              Rangliste
            </h3>
            
            <button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-2 rounded-lg text-sm shadow-md mb-4 flex items-center justify-center gap-2">
              <Trophy size={14}/> Global
            </button>
            
            <div className="space-y-2">
               {/* Empty for now as per screenshot implies just the container */}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AchievementsPage;
