import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  Copy, 
  Check, 
  Wand2, 
  Send,
  UploadCloud,
  FileText
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamAIEdit } from '../services/geminiService';
import { EditorMode } from '../types';

const EditorPage = () => {
  const [content, setContent] = useState<string>("");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);

  const handleAiSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userMsg = aiPrompt;
    setAiPrompt("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    try {
      let aiResponse = "";
      setMessages(prev => [...prev, { role: 'ai', text: '' }]);
      
      await streamAIEdit("Context: Learning Hub", userMsg, (chunk) => {
        aiResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = aiResponse;
          return newMsgs;
        });
      });
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Entschuldigung, ich konnte das nicht verarbeiten." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BrainIcon className="text-blue-600 w-8 h-8" />
          <h2 className="text-3xl font-bold text-slate-800">Rayans Wissens-Hub</h2>
        </div>
        <p className="text-slate-500">Deine zentrale Anlaufstelle für alle Lernmaterialien.</p>
      </div>

      <div className="flex-1 flex flex-col gap-6 min-h-0">
        
        {/* Input Area */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
            <Sparkles className="text-fuchsia-500" size={20} />
            <h3>KI-Assistent & Zusammenfassungen</h3>
          </div>
          
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-fuchsia-300 transition-all cursor-pointer group">
            <UploadCloud size={32} className="mb-3 group-hover:scale-110 transition-transform text-slate-300 group-hover:text-fuchsia-500" />
            <p className="font-medium">PDF oder Text hochladen für Zusammenfassung</p>
          </div>

          <form onSubmit={handleAiSubmit} className="relative mt-4">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Frage etwas zu deinen Quellen..."
              className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-5 pr-14 shadow-sm focus:ring-2 focus:ring-fuchsia-100 focus:border-fuchsia-300 focus:outline-none transition-all"
              disabled={isThinking}
            />
            <button 
              type="submit"
              disabled={!aiPrompt.trim() || isThinking}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-fuchsia-200 text-fuchsia-700 rounded-lg hover:bg-fuchsia-300 disabled:opacity-50 disabled:bg-slate-100 disabled:text-slate-400 transition-colors"
            >
              {isThinking ? <Wand2 size={18} className="animate-spin"/> : <Send size={18} />}
            </button>
          </form>
        </div>

        {/* Content / Chat Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 overflow-y-auto border-dashed border-2 flex flex-col items-center justify-center text-center">
           {messages.length === 0 ? (
             <div className="max-w-md">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                 <FileText size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">Dein Wissens-Hub ist noch leer</h3>
               <p className="text-slate-500 mb-6">Füge deine erste Quelle hinzu, um mit der KI zu arbeiten.</p>
               <button className="px-6 py-2 bg-slate-50 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors">
                 Erste Quelle hinzufügen
               </button>
             </div>
           ) : (
             <div className="w-full space-y-6 text-left self-start">
               {messages.map((msg, idx) => (
                 <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-blue-100 text-blue-600'}`}>
                     {msg.role === 'user' ? 'S' : <Bot size={16}/>}
                   </div>
                   <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-fuchsia-50 text-slate-800 rounded-tr-none' : 'bg-slate-50 text-slate-700 rounded-tl-none'}`}>
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
                 </div>
               ))}
               {isThinking && (
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Bot size={16}/>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
               )}
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

function BrainIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  )
}

export default EditorPage;