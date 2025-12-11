import React from 'react';
import { Upload, Search, CheckCircle2 } from 'lucide-react';

const ReviewPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Prüfungs-Review & Noten-Optimierer</h2>
        <p className="text-slate-500 mt-1">Lade deine korrigierte Prüfung hoch. Die KI hilft dir, versteckte Punkte zu finden und besser zu werden.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800">Prüfung erfassen</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Welche Prüfung?</label>
              <select className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-fuchsia-100 outline-none text-slate-700">
                <option>Prüfung wählen</option>
                <option>Mathe: Geldrechnen</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Erhaltene Note</label>
              <input type="text" placeholder="z.B. 4.5" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-fuchsia-100 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Fotos der Prüfung</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-fuchsia-300 transition-all cursor-pointer">
                <Upload size={24} className="mb-2" />
                <span className="text-xs text-center">Hier ablegen oder klicken</span>
              </div>
            </div>

            <button className="w-full py-3 bg-fuchsia-300 text-white font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
              <Search size={18} /> Note optimieren
            </button>
          </div>
        </div>

        {/* Empty State / Preview Column */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center text-slate-300">
           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
             <Search size={48} className="text-slate-200" />
           </div>
           <p className="text-lg font-medium text-slate-400">Wähle eine Prüfung und starte die Analyse</p>
        </div>

      </div>
    </div>
  );
};

export default ReviewPage;