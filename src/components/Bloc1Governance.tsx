import React, { useState } from 'react';
import { Badge, DefenseTimer, DeliverableViewer } from './DefenseUI';
import { REPO_DATA } from '../lib/repoData';
import { ShieldCheck, Presentation, FileText, PlaySquare } from 'lucide-react';
import Bloc1GovernanceDemo from './demos/Bloc1GovernanceDemo';

const Bloc1Governance = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'document' | 'interactive'>('document');
  const files = REPO_DATA.bloc1;

  return (
    <div className="max-w-6xl mx-auto w-full p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bloc 1: Data Governance</h1>
           </div>
           <p className="text-gray-600 text-lg mt-2 max-w-2xl">
             Design and present a comprehensive data governance policy for a fictional organization.
           </p>
           <div className="flex space-x-2 mt-4">
             <Badge color="blue">Completeness (25%)</Badge>
             <Badge color="purple">Strategic relevance (20%)</Badge>
             <Badge color="gray">Risk & Compliance (15%)</Badge>
             <Badge color="amber">Presentation Quality (15%)</Badge>
           </div>
        </div>
        <DefenseTimer presentationMinutes={15} qaMinutes={15} />
      </div>

      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-lg w-max mb-6">
         <button 
           onClick={() => setActiveTab('document')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'document' ? 'bg-white text-blue-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <FileText className="w-4 h-4" />
           <span>Governance Plan (10 Pages)</span>
         </button>
         <button 
           onClick={() => setActiveTab('slides')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'slides' ? 'bg-white text-blue-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <Presentation className="w-4 h-4" />
           <span>Executive Presentation</span>
         </button>
         <button 
           onClick={() => setActiveTab('interactive')}
           className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'interactive' ? 'bg-white text-blue-700 shadow shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
         >
           <PlaySquare className="w-4 h-4" />
           <span>Interactive Demo</span>
         </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
         {activeTab === 'document' && (
           <DeliverableViewer 
             type="document" 
             title="Data_Governance_Plan.html" 
             content={files.find(f => f.name === 'Data_Governance_Plan.html')?.content || ''} 
             files={files}
           />
         )}
         {activeTab === 'slides' && (
           <DeliverableViewer 
             type="slides" 
             title="Executive_Presentation.html" 
             content={files.find(f => f.name === 'Executive_Presentation.html')?.content || ''}
             files={files}
           />
         )}
         {activeTab === 'interactive' && (
           <Bloc1GovernanceDemo />
         )}
      </div>
    </div>
  );
};

export default Bloc1Governance;

