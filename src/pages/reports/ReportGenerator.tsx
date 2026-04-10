import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExportFormat } from './ReportsPage';
export interface ReportConfig { category: string; timeRange: string; format: ExportFormat; includeArchived: boolean; }

interface ReportGeneratorProps {
    onGenerate: (config: ReportConfig) => void;
    isDark: boolean;
}

const CATEGORIES = ['Orders', 'Customers', 'Revenue', 'Inventory', 'System Logs'];
const FORMATS: ExportFormat[] = ['CSV', 'XLS', 'PDF', 'JSON'];

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onGenerate, isDark }) => {
    const [config, setConfig] = useState<ReportConfig>({
        category: CATEGORIES[0],
        timeRange: 'last7days',
        format: FORMATS[0],
        includeArchived: false
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        onGenerate(config);

        // Match the delay simulated in the parent component
        setTimeout(() => setIsGenerating(false), 800);
    };

    return (
        <motion.div
            className={`p-6 flex flex-col gap-6 ${isDark ? 'glass-panel hover:shadow-glow hover:-translate-y-0.5' : 'bg-white sharp-corners border border-black'} transition-all`}
        >
            <div className="flex items-center gap-2 mb-2">
                <span className={`material-symbols-outlined ${isDark ? 'text-primary' : 'text-black'}`}>analytics</span>
                <h2 className={`font-display font-medium ${isDark ? 'text-white' : 'text-black'}`}>Generate Report</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-text-secondary' : 'text-text-muted'}`}>Data Domain</label>
                    <div className="relative">
                        <select
                            value={config.category}
                            onChange={(e) => setConfig({ ...config, category: e.target.value })}
                            className={`w-full appearance-none p-3 outline-none transition-colors ${isDark
                                    ? 'bg-black/40 border border-white/10 text-white focus:border-primary rounded-sm'
                                    : 'bg-transparent border border-gray-300 text-black sharp-corners focus:border-black'
                                }`}
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat} className="text-black">{cat}</option>)}
                        </select>
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none ${isDark ? 'text-gray-400' : 'text-black'}`}>
                            arrow_drop_down
                        </span>
                    </div>
                </div>

                {/* Time Range */}
                <div className="flex flex-col gap-2">
                    <label className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-text-secondary' : 'text-text-muted'}`}>Time Period</label>
                    <select
                        value={config.timeRange}
                        onChange={(e) => setConfig({ ...config, timeRange: e.target.value })}
                        className={`w-full p-3 outline-none transition-colors ${isDark
                                ? 'bg-black/40 border border-white/10 text-white focus:border-primary rounded-sm'
                                : 'bg-transparent border border-gray-300 text-black sharp-corners focus:border-black'
                            }`}
                    >
                        <option value="today" className="text-black">Today</option>
                        <option value="last7days" className="text-black">Last 7 Days</option>
                        <option value="mtd" className="text-black">Month to Date (MTD)</option>
                        <option value="ytd" className="text-black">Year to Date (YTD)</option>
                        <option value="custom" className="text-black">Custom Range</option>
                    </select>
                </div>

                {/* Format Toggle */}
                <div className="flex flex-col gap-2">
                    <label className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-text-secondary' : 'text-text-muted'}`}>Export Format</label>
                    <div className="grid grid-cols-2 gap-2">
                        {FORMATS.map(fmt => {
                            const selected = config.format === fmt;
                            return (
                                <button
                                    key={fmt}
                                    type="button"
                                    onClick={() => setConfig({ ...config, format: fmt })}
                                    className={`relative px-4 py-2 text-sm font-mono tracking-wider transition-all
                                        ${isDark
                                            ? selected ? 'bg-primary/20 text-primary border border-primary shadow-[0_0_10px_var(--color-primary)]' : 'bg-black/20 text-gray-400 border border-white/5 hover:bg-white/5 hover:text-white'
                                            : selected ? 'bg-primary/5 text-primary border border-black font-bold' : 'bg-transparent text-gray-600 border border-gray-200 hover:border-black'
                                        }
                                        ${!isDark && 'sharp-corners'}
                                        ${isDark && 'rounded-sm'}
                                    `}
                                >
                                    {fmt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Optional Flags */}
                <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={config.includeArchived}
                            onChange={(e) => setConfig({ ...config, includeArchived: e.target.checked })}
                        />
                        <div className={`w-10 h-5 rounded-full peer-focus:outline-none transition-colors
                            ${isDark ? 'bg-white/10 peer-checked:bg-primary' : 'bg-gray-300 peer-checked:bg-primary'}
                        `}></div>
                        <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform peer-checked:translate-x-5`}></div>
                    </div>
                    <span className={`text-sm select-none ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 font-medium group-hover:text-black'}`}>Include Archived Data</span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isGenerating}
                    className={`mt-4 w-full py-3 font-bold transition-all flex items-center justify-center gap-2 ${isDark
                            ? 'bg-primary text-white rounded-sm hover:shadow-[0_0_15px_var(--color-primary)] shadow-glow disabled:opacity-50'
                            : 'bg-black text-white sharp-corners hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
                        }`}
                >
                    {isGenerating ? (
                        <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                            GENERATING...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            GENERATE EXPORT
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};
