import React, { useState, useEffect } from 'react';
import { Workflow, PlayCircle, Loader2, CheckCircle2, Clock, Globe, Truck } from 'lucide-react';
import { cn } from './Bloc1GovernanceDemo';

export default function Bloc3PipelinesDemo() {
    const [running, setRunning] = useState(false);
    const [nodes, setNodes] = useState([
        { id: 'extract', label: 'Frankfurter API', status: 'idle', duration: null as string | null },
        { id: 'simulate', label: 'Logistics Simulation', status: 'idle', duration: null as string | null },
        { id: 'transform', label: 'Ocean-to-Air Logic', status: 'idle', duration: null as string | null },
        { id: 'load', label: 'Postgres DW Load', status: 'idle', duration: null as string | null }
    ]);
    const [logLines, setLogLines] = useState<string[]>([]);
    
    const runPipeline = async () => {
        if (running) return;
        setRunning(true);
        setLogLines([]);
        
        let localNodes = [...nodes].map(n => ({ ...n, status: 'idle', duration: null }));
        setNodes(localNodes);

        const updateNode = (id: string, status: string, duration?: string) => {
            localNodes = localNodes.map(n => n.id === id ? { ...n, status, duration: duration || n.duration } : n);
            setNodes([...localNodes]);
        }

        const appendLog = (msg: string) => {
            setLogLines(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,-1)}] ${msg}`]);
        }

        appendLog("INFO: Triggering manual DAG execution...");
        
        // 1. Extract
        updateNode('extract', 'running');
        appendLog("Connecting to api.frankfurter.dev...");
        await new Promise(r => setTimeout(r, 800));
        updateNode('extract', 'success', '0.8s');
        appendLog("SUCCESS: Fetched EUR/USD = 1.0852");

        // 2. Simulate
        updateNode('simulate', 'running');
        appendLog("Generating stochastic transit models for top vendors...");
        await new Promise(r => setTimeout(r, 600));
        appendLog("WARNING: Severe weather pattern detected in Red Sea.");
        await new Promise(r => setTimeout(r, 600));
        updateNode('simulate', 'success', '1.2s');
        appendLog("SUCCESS: Delays generated. Vendor VND-NV-01 delay = 12 days.");

        // 3. Transform
        updateNode('transform', 'running');
        appendLog("Applying margin threshold calculations...");
        await new Promise(r => setTimeout(r, 1000));
        appendLog("ACTION: Re-routing VND-NV-01 via Air France Cargo.");
        appendLog("UPDATE: Freight cost updated from €5.00 to €45.00.");
        updateNode('transform', 'success', '1.0s');

        // 4. Load
        updateNode('load', 'running');
        appendLog("Connecting to PostgreSQL warehouse...");
        await new Promise(r => setTimeout(r, 500));
        appendLog("SUCCESS: INSERT 0 3 into fact_chromebook_margin_risk completed.");
        updateNode('load', 'success', '0.5s');

        appendLog("INFO: DAG execution finished successfully.");
        setRunning(false);
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Workflow className="text-rose-400" size={20} />
                    <h3 className="text-lg font-bold text-white">Interactive Apache Airflow DAG</h3>
                </div>
                <div className="text-xs text-slate-400">auroratech_pipeline</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-slate-700">
                {/* DAG View */}
                <div className="p-8 bg-slate-800/30 flex flex-col items-center justify-center relative min-h-[300px]">
                     <div className="absolute top-4 left-4">
                         <button 
                            onClick={runPipeline} disabled={running}
                            className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg shadow flex items-center gap-2 transition-colors cursor-pointer"
                        >
                            <PlayCircle size={18} />
                            {running ? 'Pipeline Running...' : 'Trigger DAG'}
                        </button>
                     </div>

                     <div className="flex flex-col items-center gap-6 mt-10">
                        {nodes.map((node, index) => (
                            <div key={node.id} className="relative flex flex-col items-center">
                                {/* Connector Line */}
                                {index !== 0 && (
                                    <div className={cn(
                                        "w-0.5 h-6 -mt-6 mb-2 transition-colors duration-500",
                                        node.status === 'success' ? 'bg-emerald-500' : 'bg-slate-700'
                                    )}></div>
                                )}
                                
                                {/* Node Card */}
                                <div className={cn(
                                    "flex items-center gap-4 w-64 p-3 rounded-xl border bg-slate-800 shadow-md transition-all duration-300",
                                    node.status === 'running' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' :
                                    node.status === 'success' ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' :
                                    'border-slate-700'
                                )}>
                                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-700">
                                        {node.status === 'idle' ? <Clock size={14} className="text-slate-500" /> :
                                         node.status === 'running' ? <Loader2 size={14} className="text-amber-400 animate-spin" /> :
                                         <CheckCircle2 size={14} className="text-emerald-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-slate-200">{node.label}</div>
                                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                                            {node.status === 'running' ? 'processing...' : node.duration ? `took ${node.duration}` : 'queued'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Console View */}
                <div className="p-6 bg-[#0f172a] h-[400px] md:h-auto font-mono text-xs overflow-y-auto flex flex-col border-t md:border-t-0 md:border-l border-slate-700">
                    <div className="text-slate-500 mb-4 border-b border-slate-800 pb-2 flex justify-between">
                        <span>pipeline_logs.out</span>
                        <span>{running ? 'LIVE' : 'IDLE'}</span>
                    </div>
                    <div className="space-y-1.5 flex-1">
                        {logLines.length === 0 ? (
                            <div className="text-slate-600 italic">No logs generated. Trigger pipeline to begin.</div>
                        ) : (
                            logLines.map((line, i) => (
                                <div key={i} className={cn(
                                    "animate-in fade-in slide-in-from-bottom-1 duration-300",
                                    line.includes('WARNING') ? 'text-amber-400' :
                                    line.includes('ACTION') || line.includes('UPDATE') ? 'text-blue-400 font-bold' :
                                    line.includes('SUCCESS') ? 'text-emerald-400' :
                                    'text-slate-300'
                                )}>
                                    {line}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
