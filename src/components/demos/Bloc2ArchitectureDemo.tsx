import React, { useState, useEffect } from 'react';
import { Play, Database, Server, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from './Bloc1GovernanceDemo';

export default function Bloc2ArchitectureDemo() {
    const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
    const [logs, setLogs] = useState<string[]>([]);
    
    const writeLog = (message: string, delay: number = 0) => {
        return new Promise(resolve => {
            setTimeout(() => {
                setLogs(prev => [...prev, message]);
                resolve(true);
            }, delay);
        })
    }

    const runDockerCompose = async () => {
        if (step > 0) return;
        setStep(1);
        setLogs([]);
        await writeLog('> docker-compose up -d', 0);
        await writeLog('Pulling postgres:15-alpine...', 500);
        await writeLog('Creating network auroratech_default...', 600);
        await writeLog('Creating auroratech_postgres_dw ... done', 800);
        await writeLog('Container auroratech_postgres_dw started successfully on port 5432.', 200);
        setStep(2);
    };

    const runInitSql = async () => {
        if (step !== 2) return;
        await writeLog('> psql -U admin -f init.sql', 200);
        await writeLog('[OK] CREATE TABLE dim_date', 300);
        await writeLog('[OK] CREATE TABLE dim_chromebook_vendor', 200);
        await writeLog('[OK] CREATE TABLE fact_chromebook_margin_risk', 400);
        await writeLog('[OK] INSERT 0 3 (Vendor records added)', 200);
        setStep(3);
    };

    const queryData = async () => {
        if (step !== 3) return;
        await writeLog('> SELECT vendor_id, vendor_name FROM dim_chromebook_vendor;', 200);
        await writeLog(' vendor_id    | vendor_name', 100);
        await writeLog('--------------+----------------------', 50);
        await writeLog(' VND-NV-01    | NVIDIA Corporation', 50);
        await writeLog(' VND-TSMC-02  | TSMC Foundry Services', 50);
        await writeLog(' VND-AUO-03   | AU Optronics Corp', 50);
        await writeLog('(3 rows)', 50);
    }

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl mb-12">
             <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Server className="text-blue-400" size={20} />
                    <h3 className="text-lg font-bold text-white">Interactive Infrastructure Deployment Simulator</h3>
                </div>
                <div className="text-xs text-slate-400">Docker & PostgreSQL</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative">
                {/* Control Panel */}
                <div className="md:col-span-4 p-6 border-b md:border-b-0 md:border-r border-slate-700 bg-slate-800/50 flex flex-col gap-4 justify-center">
                   <button 
                        onClick={runDockerCompose}
                        disabled={step > 0}
                        className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl border transition-all shadow-sm",
                            step === 0 ? "bg-blue-600 hover:bg-blue-500 border-blue-400 text-white cursor-pointer" : 
                            step > 0 ? "bg-slate-800 border-emerald-500/50 text-emerald-400 opacity-80 cursor-default" :
                            "bg-slate-800 border-slate-700 text-slate-500 opacity-50 cursor-not-allowed"
                        )}
                   >
                       <span className="font-semibold text-sm">1. Deploy Container</span>
                       {step === 0 ? <Play size={16} /> : <CheckCircle2 size={16} className="text-emerald-500" />}
                   </button>

                   <button 
                        onClick={runInitSql}
                        disabled={step !== 2}
                        className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl border transition-all shadow-sm",
                            step === 2 ? "bg-amber-600 hover:bg-amber-500 border-amber-400 text-white cursor-pointer" : 
                            step > 2 ? "bg-slate-800 border-emerald-500/50 text-emerald-400 opacity-80 cursor-default" :
                            "bg-slate-800 border-slate-700 text-slate-500 opacity-50 cursor-not-allowed"
                        )}
                   >
                       <span className="font-semibold text-sm">2. Initialize Schemas</span>
                       {step === 2 ? <Play size={16} /> : step > 2 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Database size={16} />}
                   </button>

                   <button 
                        onClick={queryData}
                        disabled={step !== 3}
                        className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl border transition-all shadow-sm",
                            step === 3 ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white cursor-pointer" : 
                            "bg-slate-800 border-slate-700 text-slate-500 opacity-50 cursor-not-allowed"
                        )}
                   >
                       <span className="font-semibold text-sm">3. Query Dimension Table</span>
                       <Play size={16} />
                   </button>
                </div>

                {/* Terminal Output */}
                <div className="md:col-span-8 p-6 bg-[#0f172a] h-[350px] font-mono text-sm overflow-hidden flex flex-col relative group">
                    <div className="absolute top-2 right-4 text-slate-600 text-xs">bash</div>
                    <div className="flex-1 overflow-y-auto space-y-1 mt-4">
                        {logs.length === 0 ? (
                             <div className="text-slate-600">Waiting for deployment command...</div>
                        ) : (
                            logs.map((log, i) => (
                                <div key={i} className={cn(
                                    "animate-in fade-in duration-100",
                                    log.startsWith('>') ? 'text-amber-300 font-bold mt-3' : 
                                    log.includes('[OK]') ? 'text-emerald-400' :
                                    log.includes('successfully') ? 'text-blue-400 font-semibold' : 'text-slate-300'
                                )}>
                                    {log}
                                </div>
                            ))
                        )}
                        {step === 1 && (
                            <div className="flex items-center gap-2 text-slate-500 mt-2">
                                <Loader2 size={14} className="animate-spin" />
                                <span>deploying...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
