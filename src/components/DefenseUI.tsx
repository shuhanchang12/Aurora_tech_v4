import { Code, FileText, Layout, Play, Pause, Clock, CheckCircle2, AlertCircle, FileJson, FileCode, Search, Menu, ChevronRight, ChevronLeft, Download } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import PptxGenJS from 'pptxgenjs';

export const Badge = ({ children, color = 'blue' }: { children: React.ReactNode, color?: 'blue'|'green'|'amber'|'purple'|'gray' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

export const DefenseTimer = ({ presentationMinutes, qaMinutes }: { presentationMinutes: number, qaMinutes: number }) => {
  return (
    <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <Play className="w-4 h-4 text-emerald-600" />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Presentation</span>
          <span className="text-sm font-semibold text-gray-900">{presentationMinutes} Min</span>
        </div>
      </div>
      <div className="w-px h-8 bg-gray-200" />
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-purple-600" />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Q&A Session</span>
          <span className="text-sm font-semibold text-gray-900">{qaMinutes} Min</span>
        </div>
      </div>
    </div>
  );
};

export const DeliverableViewer = ({ 
  type, 
  title, 
  content, 
  files,
  videoLength 
}: { 
  type: 'slides' | 'document' | 'code' | 'video', 
  title: string, 
  content?: string,
  files?: Array<{name: string, content: string, language?: string, isBinary?: boolean}>,
  videoLength?: string
}) => {
  const [activeFile, setActiveFile] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
        interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    setIsPlaying(false);
                    return 100;
                }
                return p + 0.5;
            });
        }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (type === 'slides' || type === 'document') {
    const handleExportPPTX = () => {
        const pres = new PptxGenJS();
        pres.author = "JHEDA Candidate";
        pres.company = "Albert School";
        pres.title = title.replace(/_/g, ' ').replace('.html', '');
        pres.layout = "LAYOUT_16x9";

        let slideTitle = title.replace(/_/g, ' ').replace('.html', '');

        // Title Slide
        const slide = pres.addSlide();
        slide.background = { color: "0B2447" };
        slide.addText(slideTitle, { x: 1, y: 2, w: 8, h: 1.5, fontSize: 40, align: "center", bold: true, color: "FFFFFF" });
        slide.addText("Master Thesis Defense - AuroraTech Project\nCandidate: JHEDA Track", { x: 1, y: 4, w: 8, h: 1.5, fontSize: 20, align: "center", color: "A5D7E8" });

        // Content Slide
        // Parse HTML content
        if (content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const slideNodes = doc.querySelectorAll('.slide-container');
            
            if (slideNodes.length > 0) {
                slideNodes.forEach((node) => {
                    const headerObj = node.querySelector('.header h1');
                    const titleStr = headerObj ? (headerObj.textContent || '') : 'Overview';
                    
                    const subheaderObj = node.querySelector('h2');
                    const subTitleStr = subheaderObj ? (subheaderObj.textContent || '') : '';

                    const slide = pres.addSlide();
                    
                    // Add header
                    slide.addText(titleStr, { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true, color: "0B2447" });
                    
                    // Add decorative line
                    slide.addShape(pres.ShapeType.line, { x: 0.5, y: 1.3, w: 9, h: 0, line: { color: 'E11D48', width: 2 } });
                    
                    if (subTitleStr) {
                        slide.addText(subTitleStr, { x: 0.5, y: 1.5, w: 9, h: 0.5, fontSize: 24, bold: true, color: "BE123C" });
                    }

                    // Extract content
                    let elements = Array.from(node.children).filter(el => 
                        !el.classList.contains('header') && 
                        el.tagName.toLowerCase() !== 'h2' && 
                        !el.classList.contains('slide-number') &&
                        el.tagName.toLowerCase() !== 'script'
                    );

                    let textObjects = [];
                    elements.forEach(el => {
                        if (el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
                            Array.from(el.querySelectorAll('li')).forEach(li => {
                                textObjects.push({ 
                                    text: li.textContent || '', 
                                    options: { bullet: true, breakLine: true } 
                                });
                            });
                        } else {
                            let clone = el.cloneNode(true) as HTMLElement;
                            clone.querySelectorAll('br').forEach(br => br.replaceWith(' '));
                            let t = clone.textContent || '';
                            let lines = t.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 0);
                            lines.forEach(l => {
                                textObjects.push({ 
                                    text: "» " + l, 
                                    options: { breakLine: true, fontSize: 18, color: '1E293B' } 
                                });
                            });
                        }
                    });

                    if (textObjects.length > 0) {
                        slide.addText(textObjects, { x: 0.5, y: subTitleStr ? 2.2 : 1.5, w: 9, h: 4, valign: "top", fontSize: 20, color: "333333" });
                    }
                });

                pres.writeFile({ fileName: title.replace('.html', '.pptx') });
                return;
            }
        }

        // Fallback Content Slide (if no valid HTML slides found)
        const slide2 = pres.addSlide();
        slide2.addText("Agenda & Overview", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 32, bold: true, color: "0B2447", border: { type: "none", pt: 1 } });
        
        let contentItems = [];
        if (title.includes('Governance')) {
            contentItems = ["• Data Governance Policy Framework", "• GDPR Compliance & Risk Strategy", "• Data Quality Standards", "• Security Metrics & Audit Logs"];
        } else if (title.includes('Infrastructure')) {
            contentItems = ["• Overall Data Architecture Design", "• Data Modeling & Schemas", "• Infrastructure as Code (Docker, Terraform)", "• Monitoring & Scalability (Prometheus)"];
        } else if (title.includes('Pipeline')) {
            contentItems = ["• Real-time Data Pipeline Architecture", "• ELT / ETL Flows (Airflow, dbt)", "• Automation & Orchestration", "• Quality Control (Great Expectations)"];
        } else if (title.includes('Solution') || title.includes('AI')) {
            contentItems = ["• AI Solution Business Specifications", "• Model Development & Serving API (FastAPI)", "• CI/CD Pipeline (GitHub Actions)", "• Drift monitoring & Automated Retraining"];
        } else {
            contentItems = ["• Key strategic metrics and requirements", "• Technical architecture breakdown", "• Implementation phases & status", "• Business value and ROI"];
        }

        slide2.addText(
          contentItems.map(t => ({ text: t })), 
          { x: 0.5, y: 2, w: 9, h: 3, fontSize: 24, color: "333333", bullet: true }
        );

        pres.writeFile({ fileName: title.replace('.html', '.pptx') });
    };

    if (content && content.includes('<html')) {
        return (
          <div className="w-full bg-slate-200 rounded-xl overflow-hidden border border-slate-300 shadow-xl flex flex-col h-[600px]">
            <div className="px-4 py-3 bg-slate-100 flex items-center justify-between border-b border-slate-300 shadow-sm z-10">
              <div className="flex items-center space-x-2">
                {type === 'slides' ? <Layout className="w-4 h-4 text-blue-600" /> : <FileText className="w-4 h-4 text-blue-600" />}
                <span className="text-sm font-medium text-slate-700">{title}</span>
              </div>
              <div className="flex items-center space-x-4">
                 {type === 'slides' && (
                     <button onClick={handleExportPPTX} className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-sm transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        <span>Export .pptx</span>
                     </button>
                 )}
                 <span className="text-xs text-slate-500">Interactive {type === 'slides' ? 'Presentation' : 'Document'} Viewer</span>
              </div>
            </div>
            <div className="flex-1 w-full bg-white relative">
               <iframe srcDoc={content} className="w-full h-full border-none" sandbox="allow-scripts allow-same-origin bg-white" title={title} />
            </div>
          </div>
        );
    }

    // fallback for slides without HTML content. (We shouldn't hit this if we pass content properly)
    const totalSlides = title.includes('Executive') || title.includes('Solution') ? 15 : 20;

    const handlePrev = () => setCurrentSlide(s => Math.max(1, s - 1));
    const handleNext = () => setCurrentSlide(s => Math.min(totalSlides, s + 1));

    const getSlideContent = (slide: number) => {
       if (slide === 1) return { heading: title.replace(/_/g, ' ').replace('.pptx', ''), content: "Master Thesis Defense\nAuroraTech Project\nCandidate: JHEDA Track" };
       if (slide === totalSlides) return { heading: "Q&A Session", content: "Thank you for your attention.\nReady for questions." };
       
       let section = "";
       if (title.includes('Governance')) section = "Data Governance Policy";
       else if (title.includes('Infrastructure')) section = "Data Architecture & IaC";
       else if (title.includes('Pipeline')) section = "Real-Time Data Pipelines";
       else if (title.includes('Solution')) section = "AI Solutions & MLOps";
       else section = "Project Overview";

       return { heading: `${section} - Part ${slide - 1}`, content: "• Key strategic metrics and requirements\n• Technical architecture breakdown\n• Implementation phases & status\n• Business value and ROI" };
    }

    const slideData = getSlideContent(currentSlide);

    return (
      <div className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[600px]">
        <div className="px-4 py-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Layout className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-200">{title}</span>
          </div>
          <span className="text-xs text-slate-500">Presentation Mode</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-800 relative">
          <div className="w-full max-w-4xl aspect-[16/9] bg-white rounded flex flex-col p-12 shadow-2xl items-center justify-center text-center transition-all animate-in fade-in zoom-in-95 duration-300" key={currentSlide}>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{slideData.heading}</h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full mb-8" />
            <div className="text-xl text-gray-600 whitespace-pre-wrap leading-loose">
               {slideData.content}
            </div>
          </div>
          <div className="absolute bottom-6 flex space-x-4 items-center bg-slate-900/80 px-6 py-3 rounded-full backdrop-blur-sm border border-slate-700">
             <button onClick={handlePrev} disabled={currentSlide === 1} className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors">
                <ChevronLeft className="w-6 h-6" />
             </button>
             <span className="text-sm font-mono text-slate-400 w-16 text-center">
                {currentSlide} / {totalSlides}
             </span>
             <button onClick={handleNext} disabled={currentSlide === totalSlides} className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors">
                <ChevronRight className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'code' && files && files.length > 0) {
    return (
      <div className="w-full bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700 shadow-xl flex h-[600px]">
        {/* Repo Sidebar */}
        <div className="w-64 bg-[#161b22] border-r border-slate-700 flex flex-col">
          <div className="px-4 py-3 border-b border-slate-700 flex items-center space-x-2 text-slate-300">
             <Layout className="w-4 h-4" />
             <span className="text-sm font-semibold truncate">Aurora_tech_v4</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {files.map((file, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveFile(idx)}
                className={`w-full text-left px-4 py-1.5 text-sm flex items-center space-x-2 transition-colors ${activeFile === idx ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                {file.name.includes('.md') ? <FileText className="w-4 h-4" /> : 
                 file.name.includes('.json') ? <FileJson className="w-4 h-4" /> :
                 file.name.includes('.py') ? <FileCode className="w-4 h-4" /> :
                 <Code className="w-4 h-4" />}
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Code Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-[#161b22] border-b border-slate-700 flex flex-col">
            <span className="text-sm text-slate-300">{files[activeFile].name}</span>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 custom-scrollbar">
            {files[activeFile].isBinary ? (
                <div className="text-slate-500 italic">Binary file content cannot be displayed.</div>
            ) : (
                <pre className="text-sm font-mono text-slate-300">
                  <code>{files[activeFile].content}</code>
                </pre>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'video') {
    const togglePlay = () => {
        if (progress >= 100) setProgress(0);
        setIsPlaying(!isPlaying);
    };

    return (
      <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[600px] justify-center items-center relative group">
        <div className="absolute inset-x-0 top-0 p-4 flex justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
           <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">{title}</span>
        </div>

        {isPlaying || progress > 0 ? (
           <div className="flex flex-col items-center justify-center w-full h-full relative" onClick={togglePlay}>
              <div className="absolute inset-0 overflow-hidden flex flex-col justify-end opacity-90 transition-all cursor-pointer">
                <div className="w-full h-px bg-blue-500/20 absolute top-1/4 animate-pulse"></div>
                <div className="w-full h-px bg-blue-500/10 absolute top-2/4 animate-pulse delay-75"></div>
                
                {/* Floating elements to simulate data/movement */}
                <div className="flex justify-around items-end h-full px-12 pb-24 opacity-60">
                  <div className={`w-16 bg-blue-500 ${isPlaying ? 'animate-[pulse_1.5s_infinite]' : ''}`} style={{ height: `${20 + (progress % 40)}%` }}></div>
                  <div className={`w-16 bg-emerald-500 ${isPlaying ? 'animate-[pulse_2s_infinite]' : ''}`} style={{ height: `${10 + (progress % 60)}%` }}></div>
                  <div className={`w-16 bg-purple-500 ${isPlaying ? 'animate-[pulse_1.2s_infinite]' : ''}`} style={{ height: `${30 + (progress % 30)}%` }}></div>
                  <div className={`w-16 bg-amber-500 ${isPlaying ? 'animate-[pulse_1.8s_infinite]' : ''}`} style={{ height: `${40 + (progress % 40)}%` }}></div>
                  <div className={`w-16 bg-pink-500 ${isPlaying ? 'animate-[pulse_1.4s_infinite]' : ''}`} style={{ height: `${15 + (progress % 50)}%` }}></div>
                </div>
              </div>
              <div className="z-10 flex flex-col items-center">
                 <div className="mb-4 text-emerald-400 font-mono bg-black/60 px-4 py-2 rounded border border-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    System Active: {Math.floor(progress)}%
                 </div>
                 {content && (
                     <a href={content.trim()} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-mono bg-slate-900 p-2 rounded break-all w-80 text-center z-30 relative underline">
                         {content.trim()}
                     </a>
                 )}
              </div>
           </div>
        ) : (
           <div className="flex flex-col items-center cursor-pointer p-8 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all z-20" onClick={togglePlay}>
             <Play className="w-16 h-16 text-white ml-2" />
           </div>
        )}

         <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent z-20">
            <div className="flex items-center justify-between gap-4">
                <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setProgress((x / rect.width) * 100);
                }}>
                   <div className="h-full bg-blue-600 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(37,99,235,0.8)]" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-gray-400 text-xs font-mono w-16 text-right">{videoLength || '03:45'}</span>
            </div>
         </div>
      </div>
    );
  }

  return null;
}
