import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ComplaintsHeaderProps {
    onToggleFilters: () => void;
    isFiltersOpen: boolean;
    isDark: boolean;
}

export const ComplaintsHeader: React.FC<ComplaintsHeaderProps> = ({
    onToggleFilters,
    isFiltersOpen,
    isDark
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
                <span className={isDark ? 'text-[#8f0df2]' : 'text-[#8a2ce2]'}>Complaints</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-3xl font-bold tracking-tight
            ${isDark ? 'text-white text-glow' : 'text-black'}
          `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        Dispute Resolution
                    </h1>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Monitor, investigate, and resolve caterer-customer issues.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleFilters}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all outline-none
              ${isDark
                                ? `border ${isFiltersOpen ? 'bg-[#8f0df2]/20 border-[#8f0df2] text-white shadow-[0_0_10px_rgba(143,13,242,0.3)]' : 'border-white/20 text-gray-300 hover:bg-white/5'} rounded-sm`
                                : `border sharp-corners ${isFiltersOpen ? 'bg-gray-100 border-[#8a2ce2] text-[#8a2ce2]' : 'bg-white border-slate-200 text-slate-700 hover:bg-gray-50'}`
                            }
            `}
                    >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                        FILTERS
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase transition-all outline-none
              ${isDark
                                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-sm'
                                : 'bg-slate-900 hover:bg-black text-white sharp-corners'
                            }
            `}
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Log
                    </button>
                </div>
            </div>
        </div>
    );
};
