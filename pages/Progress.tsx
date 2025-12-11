import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, BookOpen, Zap, Target, Award, Flame, Trophy, Lock } from 'lucide-react';

const Progress: React.FC = () => {
  // Mock Data matching the visual curve in the screenshot
  const activityData = [
    { name: '05.12', val: 0 },
    { name: '06.12', val: 0 },
    { name: '07.12', val: 0 },
    { name: '08.12', val: 0 },
    { name: '09.12', val: 0 },
    { name: '10.12', val: 5 }, // Spike matching the screenshot
    { name: '11.12', val: 0 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <TrendingUp className="text-fuchsia-500" />
          Dein Fortschritt
        </h2>
        <p className="text-slate-500 mt-2">Verfolge deine Lernreise mit detaillierten Analysen und KI-Insights</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button className="px-5 py-2 bg-fuchsia-500 text-white rounded-lg font-medium text-sm shadow-md shadow-fuchsia-200">Übersicht</button>
        <button className="px-5 py-2 bg-white text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-lg font-medium text-sm transition-all">Analytik</button>
        <button className="px-5 py-2 bg-white text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-lg font-medium text-sm transition-all">KI-Insights</button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Gesamtpunkte" 
          value="0" 
          icon={<Zap size={24} className="text-fuchsia-500" />} 
        />
        <StatCard 
          label="Gemeisterte Karten" 
          value="0" 
          subValue={<div className="w-2 h-2 bg-emerald-400 rounded-full"></div>}
          icon={<Target size={24} className="text-emerald-500" />} 
        />
        <StatCard 
          label="Lernzeit" 
          value="0h" 
          icon={<Clock size={24} className="text-orange-500" />} 
        />
        <StatCard 
          label="Erfolgsquote" 
          value="0%" 
          icon={<BookOpen size={24} className="text-blue-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Charts) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Activity Chart */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 text-lg">Aktivität der letzten 7 Tage</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f1f5f9"/>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}}
                    domain={[0, 8]}
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    cursor={{ stroke: '#ec4899', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#ec4899" 
                    strokeWidth={3} 
                    fill="url(#colorVal)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#ec4899' }}
                    dot={{ r: 4, strokeWidth: 2, fill: 'white', stroke: '#ec4899' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Long-term Development */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[200px] flex flex-col">
            <h3 className="font-bold text-slate-800 mb-4 text-lg">Langzeit-Entwicklung</h3>
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm text-center">
              <div>
                <p>Noch nicht genügend Daten für eine Trendanalyse verfügbar.</p>
                <p className="mt-1">Trage deine Prüfungsergebnisse ein!</p>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subject Progress */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[350px]">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <BookOpen size={18} /> Fortschritt pro Fach
               </h3>
               <div className="h-full pb-10 flex items-end justify-center">
                 {/* Placeholder for empty state chart matching screenshot */}
                 <div className="w-full h-full border-l border-b border-slate-200 relative mb-4">
                    <div className="absolute bottom-0 left-0 w-full h-full border-t border-slate-100 border-dashed" style={{ top: '25%' }}></div>
                    <div className="absolute bottom-0 left-0 w-full h-full border-t border-slate-100 border-dashed" style={{ top: '50%' }}></div>
                    <div className="absolute bottom-0 left-0 w-full h-full border-t border-slate-100 border-dashed" style={{ top: '75%' }}></div>
                    
                    {/* Y-Axis Labels */}
                    <div className="absolute -left-4 top-0 text-xs text-slate-400">4</div>
                    <div className="absolute -left-4 top-[25%] text-xs text-slate-400">3</div>
                    <div className="absolute -left-4 top-[50%] text-xs text-slate-400">2</div>
                    <div className="absolute -left-4 top-[75%] text-xs text-slate-400">1</div>
                    <div className="absolute -left-4 bottom-0 text-xs text-slate-400">0</div>

                    {/* X-Axis Labels */}
                    <div className="absolute -bottom-6 left-[20%] text-sm text-slate-600">Math</div>
                 </div>
               </div>
            </div>

            {/* Distribution */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[350px] flex flex-col">
              <h3 className="font-bold text-slate-800 mb-6">Lernverteilung</h3>
              <div className="flex-1 flex items-center justify-center relative">
                 <div className="w-48 h-48 rounded-full bg-indigo-600 flex items-center justify-center relative overflow-hidden shadow-sm">
                    {/* The screenshot shows a solid purple circle mostly */}
                    <div className="absolute inset-0 bg-violet-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 50% 0%)' }}></div>
                 </div>
                 <div className="absolute left-4 top-1/2 text-xs text-indigo-600 font-bold bg-white px-2 py-1 rounded shadow-sm border border-indigo-50">Math 100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="space-y-6">
          
          {/* Confidence Tracker */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Target size={18} className="text-fuchsia-500" /> Zuversicht-Tracker
            </h3>
            
            <div className="bg-indigo-50 rounded-2xl p-6 text-center mb-6">
              <p className="text-xs font-medium text-slate-500 mb-2">Durchschnittliche Zuversicht</p>
              <div className="text-5xl font-bold text-red-600">0%</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                <div className="text-xl font-bold text-green-600">0</div>
                <div className="text-[10px] text-green-700 leading-tight mt-1">Hoch (80-100%)</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                <div className="text-xl font-bold text-amber-600">0</div>
                <div className="text-[10px] text-amber-700 leading-tight mt-1">Mittel (50-79%)</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
                <div className="text-xl font-bold text-red-600">0</div>
                <div className="text-[10px] text-red-700 leading-tight mt-1">Niedrig (0-49%)</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award size={18} className="text-amber-500" /> Achievements
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
               <AchievementIcon icon="🎯" label="Erster S..." />
               <AchievementIcon icon="📚" label="Fleißig" />
               <AchievementIcon icon="🔥" label="Brennend" />
               <AchievementIcon icon="⚡️" label="Unaufha..." locked />
               <AchievementIcon icon="💎" label="Punktej..." locked />
               <AchievementIcon icon="🏆" label="Meister" locked />
            </div>
            <button className="w-full py-3 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
              🎉 0 von 6 Achievements freigeschaltet!
            </button>
          </div>

          {/* Streak */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Flame size={18} className="text-orange-500" /> Streak
            </h3>
            <div className="py-2">
              <div className="text-6xl font-bold text-orange-500 mb-2">0</div>
              <div className="text-sm font-medium text-slate-600">Tage in Folge</div>
              <p className="text-xs text-slate-400 mt-2 max-w-[200px] mx-auto">Lerne jeden Tag, um deinen Streak zu halten!</p>
            </div>
          </div>

          {/* Level Card */}
          <div className="bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-3xl p-6 text-white shadow-lg shadow-pink-200 relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             
             <div className="flex justify-between items-start mb-8 relative z-10">
               <div>
                 <div className="text-xs font-medium opacity-90 mb-1">Level</div>
                 <div className="text-4xl font-bold">1</div>
               </div>
               <Trophy size={48} className="text-white opacity-90" />
             </div>

             <div className="relative z-10">
               <div className="flex justify-between text-xs font-medium mb-2 opacity-90">
                 <span>Fortschritt</span>
                 <span>0 XP</span>
               </div>
               <div className="h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                 <div className="h-full bg-white w-0 rounded-full"></div>
               </div>
               <div className="text-[10px] mt-2 opacity-80">1000 XP bis Level 2</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, subValue }: { label: string, value: string, icon: React.ReactNode, subValue?: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[140px] relative overflow-hidden">
    <div className="flex justify-between items-start">
      <div className="text-sm text-slate-500 font-medium">{label}</div>
      {subValue}
    </div>
    <div className="flex items-end justify-between mt-auto">
      <div className="text-4xl font-bold text-fuchsia-600">{value}</div>
      <div className="mb-1 p-2 bg-slate-50 rounded-xl">{icon}</div>
    </div>
  </div>
);

const AchievementIcon = ({ icon, label, locked }: { icon: string, label: string, locked?: boolean }) => (
  <div className={`aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all ${locked ? 'bg-slate-50 border-slate-100 text-slate-300' : 'bg-white border-slate-100 text-slate-800 hover:shadow-md hover:border-fuchsia-200 cursor-pointer'}`}>
    <div className={`text-2xl mb-1 ${locked ? 'opacity-50 grayscale' : ''}`}>
      {locked ? <div className="relative"><span className="opacity-20">{icon}</span><Lock size={12} className="absolute -top-1 -right-1 text-slate-400" /></div> : icon}
    </div>
    <div className="text-[10px] font-medium truncate w-full text-center px-1">{label}</div>
  </div>
);

export default Progress;