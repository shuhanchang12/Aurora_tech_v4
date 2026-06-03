import React from 'react';
import InteractiveDemoPlayer from '../InteractiveDemoPlayer';
import { Presentation, Maximize, MousePointerClick, Filter } from 'lucide-react';

export default function Bloc4VisualizationDemo() {
    const steps: any[] = [
        {
            type: 'browser',
            action: "View Summary",
            subtitle: "Navigating Executive Summary",
            output: (
                <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-lg p-6 max-w-sm text-sm font-mono text-emerald-400">
                    <p>{'>'} Loading Dashboard /summary...</p>
                    <p>{'>'} Fetching live FX rates and Warehouse KPIs...</p>
                    <p>{'>'} Rendering Recharts line series...</p>
                </div>
            )
        },
        {
            type: 'browser',
            action: "Change Year Filter",
            subtitle: "Applying Global Filters",
            output: (
                <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-lg p-6 max-w-sm text-sm font-mono text-emerald-400">
                    <p>{'>'} Action: Update Filter -{'>'} FY=2025</p>
                    <p>{'>'} Querying PostgreSQL Data Warehouse...</p>
                    <p>{'>'} Re-rendering KPI Cards [-2.4% -{'>'} +1.1%]...</p>
                </div>
            )
        },
        {
            type: 'browser',
            action: "View Details",
            subtitle: "Drill Down: Logistics Details",
            output: (
                <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-lg p-6 max-w-sm text-sm font-mono text-emerald-400">
                    <p>{'>'} Navigating -{'>'} /detail</p>
                    <p>{'>'} Hovering Bar: month='April', shippingCost=45 EUR</p>
                    <p>{'>'} Tooltip displayed successfully.</p>
                </div>
            )
        },
        {
            type: 'browser',
            action: "Show Forecasts",
            subtitle: "Forecasting Insights",
            output: (
                <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-lg p-6 max-w-sm text-sm font-mono text-emerald-400">
                    <p>{'>'} Navigating -{'>'} /forecast</p>
                    <p>{'>'} Loading predictive model outcomes...</p>
                    <p>{'>'} Rendering confidence intervals (lowerBound/upperBound).</p>
                </div>
            )
        }
    ];

    return (
        <InteractiveDemoPlayer 
            title="Loom Simulation: Interactive Dashboard Walkthrough" 
            steps={steps} 
            accentColor="emerald" 
        />
    );
}
