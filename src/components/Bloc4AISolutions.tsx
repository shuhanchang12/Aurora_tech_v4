import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { BrainCircuit, Presentation, FileCode, PlaySquare } from 'lucide-react';
import Bloc4AIDemo from './demos/Bloc4AIDemo';

const Bloc4AISolutions = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'mlops' | 'demo' | 'interactive'>('mlops');
  const files = REPO_DATA.bloc4;
  const videoText = files.find(f => f.name === 'Demo_Video.txt')?.content || '';

  return (
    <div className="max-w-6xl mx-auto w-full p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
               <BrainCircuit className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bloc 4: AI Solutions</h1>
           </div>
           <p className="text-gray-600 text-lg mt-2 max-w-2xl">
             Industrialize an end-to-end AI solution: design, deployment, CI/CD, and production monitoring.
           </p>
           <div className="flex space-x-2 mt-4 flex-wrap gap-y-2">
             <Badge color="purple">ML Model Quality (25%)</Badge>
             <Badge color="blue">CI/CD Pipeline (20%)</Badge>
             <Badge color="green">Serving API (15%)</Badge>
             <Badge color="amber">Business Spec (15%)</Badge>
             <Badge color="gray">Auto-Retraining (10%)</Badge>
             <Badge color="gray">Monitoring (10%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={5} qaMinutes={10} />
      </div>

      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-lg w-max mb-6">
         <button 
           onClick={() => setActiveTab('slides')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'slides' ? 'bg-white text-purple-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <Presentation className="w-4 h-4" />
           <span>Executive AI Presentation (20 Slides)</span>
         </button>
         <button 
           onClick={() => setActiveTab('mlops')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'mlops' ? 'bg-white text-purple-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <FileCode className="w-4 h-4" />
           <span>MLOps Repository (GitHub)</span>
         </button>
         <button 
           onClick={() => setActiveTab('demo')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'demo' ? 'bg-white text-purple-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Production Demo (5 min)</span>
         </button>
         <button 
           onClick={() => setActiveTab('interactive')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'interactive' ? 'bg-white text-purple-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Interactive Demo</span>
         </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
         {activeTab === 'slides' && (
           <DeliverableViewer 
             type="slides" 
             title="AI_Solution_Presentation.html" 
             content={files.find(f => f.name === 'AI_Solution_Presentation.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'mlops' && (
           <DeliverableViewer type="code" title="auroratech-mlops-repo" files={files} />
         )}
         {activeTab === 'demo' && (
           <DeliverableViewer type="video" title="End_to_End_AI_Deployment.mp4" content={videoText} videoLength="4 min 58 sec" />
         )}
         {activeTab === 'interactive' && (
           <Bloc4AIDemo />
         )}
      </div>
    </div>
  );
};

export default Bloc4AISolutions;
