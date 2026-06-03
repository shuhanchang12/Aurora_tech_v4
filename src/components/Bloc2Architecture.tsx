import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { Database, Presentation, FileCode, PlaySquare } from 'lucide-react';
import Bloc2ArchitectureDemo from './demos/Bloc2ArchitectureDemo';

const Bloc2Architecture = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'iac' | 'demo' | 'interactive'>('iac');
  const files = REPO_DATA.bloc2;

  const videoText = files.find(f => f.name === 'Demo_Video.txt')?.content || '';

  return (
    <div className="max-w-6xl mx-auto w-full p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
               <Database className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bloc 2: Data Architecture</h1>
           </div>
           <p className="text-gray-600 text-lg mt-2 max-w-2xl">
             Design, deploy, and document a complete data infrastructure.
           </p>
           <div className="flex space-x-2 mt-4 flex-wrap gap-y-2">
             <Badge color="green">Architecture Relevance (25%)</Badge>
             <Badge color="blue">IaC Quality (20%)</Badge>
             <Badge color="amber">Data Model (15%)</Badge>
             <Badge color="purple">Deployment (15%)</Badge>
             <Badge color="gray">Observability (10%)</Badge>
             <Badge color="gray">Docs (10%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={5} qaMinutes={15} />
      </div>

      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-lg w-max mb-6">
         <button 
           onClick={() => setActiveTab('slides')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'slides' ? 'bg-white text-emerald-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <Presentation className="w-4 h-4" />
           <span>Infrastructure Plan (Slides)</span>
         </button>
         <button 
           onClick={() => setActiveTab('iac')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'iac' ? 'bg-white text-emerald-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <FileCode className="w-4 h-4" />
           <span>IaC Repository (GitHub)</span>
         </button>
         <button 
           onClick={() => setActiveTab('demo')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'demo' ? 'bg-white text-emerald-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Demo Video (3-5 min)</span>
         </button>
         <button 
           onClick={() => setActiveTab('interactive')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'interactive' ? 'bg-white text-emerald-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Interactive Demo</span>
         </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
         {activeTab === 'slides' && (
           <DeliverableViewer 
             type="slides" 
             title="Infrastructure_Plan.html" 
             content={files.find(f => f.name === 'Infrastructure_Plan.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'iac' && (
           <DeliverableViewer type="code" title="auroratech-iac-repo" files={files} />
         )}
         {activeTab === 'demo' && (
           <DeliverableViewer type="video" title="Architecture_Deployment_Demo.mp4" content={videoText} videoLength="4 min 12 sec" />
         )}
         {activeTab === 'interactive' && (
           <Bloc2ArchitectureDemo />
         )}
      </div>
    </div>
  );
};

export default Bloc2Architecture;
