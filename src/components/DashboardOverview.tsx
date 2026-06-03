import React from 'react';
import { Presentation, CheckCircle2 } from 'lucide-react';

const DashboardOverview = ({ setActiveBloc }: { setActiveBloc: (id: number) => void }) => {
    return (
        <div className="max-w-5xl mx-auto w-full p-12 flex flex-col items-center justify-center min-h-full">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                 <Presentation className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center tracking-tight">Albert School Master Thesis Defense</h1>
            <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl">
                Welcome to the unified evaluation dashboard. This portal contains all required deliverables (Presentations, Documents, code repositories, and video demos) strictly adhering to the JHEDA track requirements.
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <button onClick={() => setActiveBloc(1)} className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Bloc 1</span>
                        <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Data Governance</h3>
                    <p className="text-gray-500 flex-1">15 min Presentation • 15 min Q&A</p>
                    <p className="text-sm font-medium text-gray-700 mt-4 border-t pt-4">Contains PDF Policy & Slides</p>
                </button>

                <button onClick={() => setActiveBloc(2)} className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Bloc 2</span>
                        <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Data Architecture</h3>
                    <p className="text-gray-500 flex-1">5 min Presentation • 15 min Q&A</p>
                    <p className="text-sm font-medium text-gray-700 mt-4 border-t pt-4">Contains IaC Repo, Video & Slides</p>
                </button>

                <button onClick={() => setActiveBloc(3)} className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-amber-600 uppercase tracking-widest">Bloc 3</span>
                        <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Pipelines</h3>
                    <p className="text-gray-500 flex-1">5 min Presentation • 15 min Q&A</p>
                    <p className="text-sm font-medium text-gray-700 mt-4 border-t pt-4">Contains DAGs Repo, Video & Slides</p>
                </button>

                <button onClick={() => setActiveBloc(4)} className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-purple-600 uppercase tracking-widest">Bloc 4</span>
                        <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">AI Solutions</h3>
                    <p className="text-gray-500 flex-1">5 min Presentation • 10 min Q&A</p>
                    <p className="text-sm font-medium text-gray-700 mt-4 border-t pt-4">Contains MLOps Repo, Video & Slides</p>
                </button>
            </div>
        </div>
    );
};

export default DashboardOverview;
