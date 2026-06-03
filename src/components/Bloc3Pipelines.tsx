import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { Zap, Presentation, FileCode, PlaySquare } from 'lucide-react';
import Bloc3PipelinesDemo from './demos/Bloc3PipelinesDemo';

const Bloc3Pipelines = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'code' | 'demo' | 'interactive'>('code');
  const files = REPO_DATA.bloc3;
  const videoText = files.find(f => f.name === 'Demo_Video.txt')?.content || '';

  return (
    <div className="max-w-6xl mx-auto w-full p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
               <Zap className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bloc 3: Real-Time Pipelines</h1>
           </div>
           <p className="text-gray-600 text-lg mt-2 max-w-2xl">
             Design, develop, automate, and monitor a complete ETL/ELT data pipeline handling real-time streams.
           </p>
           <div className="flex space-x-2 mt-4 flex-wrap gap-y-2">
             <Badge color="blue">Code Quality (25%)</Badge>
             <Badge color="amber">Architecture (20%)</Badge>
             <Badge color="green">Data Quality Control (20%)</Badge>
             <Badge color="purple">Automation (15%)</Badge>
             <Badge color="gray">Observability (10%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={5} qaMinutes={15} />
      </div>

      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-lg w-max mb-6">
         <button 
           onClick={() => setActiveTab('slides')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'slides' ? 'bg-white text-amber-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <Presentation className="w-4 h-4" />
           <span>Pipeline Plan (Slides)</span>
         </button>
         <button 
           onClick={() => setActiveTab('code')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-white text-amber-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <FileCode className="w-4 h-4" />
           <span>Pipeline Repository (GitHub)</span>
         </button>
         <button 
           onClick={() => setActiveTab('demo')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'demo' ? 'bg-white text-amber-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Pipeline Run Video (3-5 min)</span>
         </button>
         <button 
           onClick={() => setActiveTab('interactive')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'interactive' ? 'bg-white text-amber-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Interactive Demo</span>
         </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
         {activeTab === 'slides' && (
           <DeliverableViewer 
             type="slides" 
             title="Pipeline_Plan.html" 
             content={files.find(f => f.name === 'Pipeline_Plan.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'code' && (
           <DeliverableViewer type="code" title="auroratech-pipelines-repo" files={files} />
         )}
         {activeTab === 'demo' && (
           <DeliverableViewer type="video" title="Realtime_Ingestion_Demo.mp4" content={videoText} videoLength="3 min 45 sec" />
         )}
         {activeTab === 'interactive' && (
           <Bloc3PipelinesDemo />
         )}
      </div>
    </div>
  );
};

export default Bloc3Pipelines;
