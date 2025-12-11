import React from 'react';
import { Users, Plus, Search } from 'lucide-react';

const GroupsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-fuchsia-600">Lerngruppen</h2>
          <p className="text-slate-500 mt-1">Lerne gemeinsam mit anderen</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 flex items-center gap-2">
            <Search size={18} /> Gruppe beitreten
          </button>
          <button className="px-4 py-2 bg-fuchsia-500 text-white font-medium rounded-xl hover:bg-fuchsia-600 flex items-center gap-2 shadow-lg shadow-fuchsia-200">
            <Plus size={18} /> Neue Gruppe
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Gruppen durchsuchen..." 
            className="w-full max-w-lg bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-100"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <Users size={64} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Noch keine Gruppen</h3>
        <p className="text-slate-500 mb-6">Erstelle eine Gruppe oder tritt einer bei</p>
        
        <button className="px-6 py-3 bg-fuchsia-500 text-white font-bold rounded-xl hover:bg-fuchsia-600 transition-colors shadow-lg shadow-fuchsia-200">
          Erste Gruppe erstellen
        </button>
      </div>
    </div>
  );
};

export default GroupsPage;