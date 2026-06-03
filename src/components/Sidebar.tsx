import React from 'react';
import { Database, ShieldCheck, Zap, BrainCircuit, LayoutDashboard } from 'lucide-react';

const Sidebar = ({ activeBloc, setActiveBloc }: { activeBloc: number, setActiveBloc: (id: number) => void }) => {
  const navItems = [
    { id: 0, title: 'Overview', icon: LayoutDashboard },
    { id: 1, title: 'Bloc 1: Data Governance', icon: ShieldCheck },
    { id: 2, title: 'Bloc 2: Architecture', icon: Database },
    { id: 3, title: 'Bloc 3: Pipelines', icon: Zap },
    { id: 4, title: 'Bloc 4: AI Solutions', icon: BrainCircuit },
  ];

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight">AuroraTech</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Master Thesis Defense</p>
        <div className="mt-4 px-3 py-2 bg-slate-800 rounded-md text-xs border border-slate-700">
            <p className="text-slate-300 font-medium">Candidate: JHEDA Track</p>
            <p className="text-slate-500 mt-1">Total Duration: 1h 20m</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Evaluation Blocks
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeBloc === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveBloc(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span className="truncate">{item.title}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-800">
            MS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Master Student</span>
            <span className="text-[10px] text-slate-500">Albert School</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
