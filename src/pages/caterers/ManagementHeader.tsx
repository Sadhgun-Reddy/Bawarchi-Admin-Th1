import React from 'react';

interface ManagementHeaderProps {
    isDark: boolean;
    searchQuery: string;
    onSearch: (query: string) => void;
}

export const ManagementHeader: React.FC<ManagementHeaderProps> = ({ isDark, searchQuery, onSearch }) => {

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <div className={`flex items-center gap-2 text-xs font-mono font-bold mb-1 tracking-widest ${isDark ? 'text-emerald-400' : 'text-green-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-green-500'}`} />
                    ONLINE // ACTIVE ROSTER
                </div>
                <h1 className={`font-display text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    Caterer Management
                </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search caterers..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 text-sm outline-none transition-all
                            ${isDark
                                ? 'bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
                                : 'bg-white border text-gray-900 border-gray-300 placeholder-gray-400 sharp-corners focus:border-black focus:ring-1 focus:ring-black hover:border-gray-400 shadow-sm'
                            }
                        `}
                    />
                </div>

                <button className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 active:scale-95 group
                    ${isDark
                        ? 'bg-transparent text-gray-300 border border-white/20 hover:bg-white/10 hover:text-white rounded-sm'
                        : 'bg-white text-gray-700 border border-gray-300 sharp-corners hover:border-black hover:bg-gray-50'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">filter_list</span>
                    <span className="hidden sm:inline">Filter</span>
                </button>

                <button className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 active:scale-95 group
                    ${isDark
                        ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white shadow-[0_0_10px_rgba(192,6,249,0.2)] hover:shadow-[0_0_15px_rgba(192,6,249,0.5)] rounded-sm'
                        : 'bg-[#7d11d4] text-white sharp-corners hover:bg-[#630baf] border border-transparent hover:shadow-[2px_2px_0px_rgba(0,0,0,0.1)]'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span className="hidden sm:inline">Export Data</span>
                </button>
            </div>
        </div>
    );
};
