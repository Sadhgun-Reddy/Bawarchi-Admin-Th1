import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModerationHeaderProps {
    onRefresh: () => void;
    isDark: boolean;
    title?: string;
    description?: string;
    onExportCSV?: () => void;
}

export const ModerationHeader: React.FC<ModerationHeaderProps> = ({
    onRefresh,
    isDark,
    title = "Menu Moderation",
    description = "High-throughput queue for reviewing catering menu submissions.",
    onExportCSV
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Breadcrumbs */}
            <div className={`text-sm font-medium flex items-center gap-2
        ${isDark ? 'text-gray-400' : 'text-gray-500'}
      `}>
                <button onClick={() => navigate('/admin/dashboard')} className="hover:underline">Admin</button>
                <span className="opacity-50">/</span>
                <button onClick={() => navigate('/admin/caterers')} className="hover:underline">Caterers</button>
                <span className="opacity-50">/</span>
                <span className={isDark ? 'text-[#d006f9]' : 'text-[#8c2bee]'}>Content Moderation</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-3xl font-bold tracking-tight flex items-center gap-3
            ${isDark ? 'text-white text-shadow-[0_0_15px_#d006f9]' : 'text-black'}
          `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        {title}
                        {isDark && (
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5e00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5e00] shadow-[0_0_8px_#ff5e00]"></span>
                            </span>
                        )}
                    </h1>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {description}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onRefresh}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all outline-none
              ${isDark
                                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-sm'
                                : 'bg-white hover:bg-gray-50 border border-slate-200 text-slate-700 sharp-corners'
                            }
            `}
                    >
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        Refresh Queue
                    </button>

                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase transition-all outline-none
              ${isDark
                                ? 'bg-[#d006f9]/20 hover:bg-[#d006f9]/30 text-white border border-[#d006f9] shadow-[0_0_10px_rgba(208,6,249,0.3)] rounded-sm'
                                : 'bg-slate-900 hover:bg-black text-white sharp-corners'
                            }
            `}
                    >
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        History Log
                    </button>
                    {onExportCSV && (
                        <button
                            onClick={onExportCSV}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase transition-all outline-none
                  ${isDark
                                    ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)] rounded-sm'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white sharp-corners'
                                }
                `}
                        >
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            Export CSV
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
