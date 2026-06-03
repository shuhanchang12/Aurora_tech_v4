import React, { useState } from 'react';
import { BrainCircuit, Cpu, Zap, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from './Bloc1GovernanceDemo';

export default function Bloc4AIDemo() {
    const [eurUsd, setEurUsd] = useState(1.08);
    const [delay, setDelay] = useState(2);
    const [cost, setCost] = useState(5);
    
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ risk: number, isHigh: boolean } | null>(null);

    const predict = () => {
        setLoading(true);
        setTimeout(() => {
            // Mock RF algorithm
            // High risk if eur drops low OR cost jumps to 45 (air freight)
            let baseRisk = 5;
            
            if (eurUsd < 1.05) baseRisk += 40;
            if (eurUsd < 1.03) baseRisk += 20;

            if (cost >= 45) baseRisk += 35;
            if (delay > 5) baseRisk += 15;
            
            if (baseRisk > 95) baseRisk = 97 + Math.random() * 2;
            else if (baseRisk < 5) baseRisk = 2 + Math.random() * 3;

            setResult({ risk: baseRisk, isHigh: baseRisk > 60 });
            setLoading(false);
        }, 800);
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="text-emerald-400" size={20} />
                    <h3 className="text-lg font-bold text-white">Live Model Inference</h3>
                </div>
                <div className="text-xs font-mono text-emerald-500 bg-emerald-950 px-2 py-1 rounded">POST /predict-margin-risk</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Inputs */}
                <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-700 bg-slate-800/50">
                    <h4 className="text-sm font-semibold text-slate-400 mb-6 uppercase tracking-wider">Input Feature Vectors</h4>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-slate-200 block">Currency Pair (EUR/USD)</label>
                                <span className="text-emerald-400 font-mono text-sm">{eurUsd.toFixed(3)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.95" max="1.15" step="0.01" 
                                value={eurUsd} 
                                onChange={(e) => setEurUsd(parseFloat(e.target.value))}
                                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>Parity (Weak)</span>
                                <span>Strong</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-slate-200 block">Transit Delay (Days)</label>
                                <span className="text-emerald-400 font-mono text-sm">{delay} Days</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="21" step="1" 
                                value={delay} 
                                onChange={(e) => setDelay(parseInt(e.target.value))}
                                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-200 block mb-3">Transport Mode Penalty</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setCost(5)}
                                    className={cn("py-2 px-3 border rounded-lg text-sm text-center transition-all", cost === 5 ? "bg-slate-700 border-emerald-500 text-white" : "border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300")}
                                >
                                    Sea Freight (€5)
                                </button>
                                 <button
                                    onClick={() => setCost(45)}
                                    className={cn("py-2 px-3 border rounded-lg text-sm text-center transition-all", cost === 45 ? "bg-slate-700 border-rose-500 text-white" : "border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300")}
                                >
                                    Air Cargo (€45)
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={predict}
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
                        >
                            {loading ? <Activity size={20} className="animate-spin" /> : <Zap size={20} />}
                            Calculate Margin Risk
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 p-6 bg-slate-900 relative flex flex-col justify-center min-h-[350px]">
                    { !result && !loading ? (
                        <div className="flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
                            <Cpu size={48} strokeWidth={1} />
                            <p>Awaiting model inference...</p>
                        </div>
                    ) : loading ? (
                        <div className="flex flex-col items-center justify-center text-emerald-500 space-y-4">
                            <Activity size={48} className="animate-spin" strokeWidth={1.5} />
                            <p className="animate-pulse">Random Forest Classifier computing...</p>
                        </div>
                    ) : result ? (
                        <div className="animate-in zoom-in-95 duration-300 w-full max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Model Confidence</h4>
                                <div className={cn(
                                    "text-6xl font-black tabular-nums tracking-tighter",
                                    result.isHigh ? "text-rose-500 shadow-rose-500/20 drop-shadow-lg" : "text-emerald-500 shadow-emerald-500/20 drop-shadow-lg"
                                )}>
                                    {result.risk.toFixed(1)}%
                                </div>
                            </div>

                            <div className={cn(
                                "rounded-xl border p-5 mt-6",
                                result.isHigh ? "bg-rose-950/30 border-rose-900/50" : "bg-emerald-950/30 border-emerald-900/50"
                            )}>
                                <div className="flex items-start gap-3">
                                    {result.isHigh ? <AlertTriangle className="text-rose-500 shrink-0" /> : <ShieldCheck className="text-emerald-500 shrink-0" />}
                                    <div>
                                        <h5 className={cn("font-bold mb-1", result.isHigh ? "text-rose-400" : "text-emerald-400")}>
                                            {result.isHigh ? "! EXECUTIVE WARNING" : "SYSTEM NOMINAL"}
                                        </h5>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {result.isHigh 
                                                ? (cost === 45 
                                                    ? "High freight costs combined with current exchange rates indicate severe margin compression. Triggering Web3 automated stablecoin treasury hedging." 
                                                    : "Extremely weak Euro parity detected. Standard sea shipping delays will push inventory costs into unrecoverable territory. Lock in forward contracts immediately.")
                                                : "Input vectors suggest stable product margins. No strategic intervention required at this time."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null }
                </div>
            </div>
        </div>
    );
}
