import React from 'react';

interface ModerationPaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    isDark: boolean;
}

export const ModerationPagination: React.FC<ModerationPaginationProps> = ({
    currentPage,
    itemsPerPage,
    totalRecords,
    onPageChange,
    isDark
}) => {
    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    if (totalRecords === 0) return null;

    return (
        <div className={`mt-4 flex items-center justify-between py-4 w-full
      ${isDark ? 'border-t border-white/10' : 'border-t border-slate-300'}
    `}>
            <div className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                Page <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentPage}</span> of {totalPages}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 flex items-center gap-1 text-xs font-mono font-bold uppercase transition-all outline-none
            ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 rounded-sm'
                            : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:hover:bg-white sharp-corners'
                        }
          `}
                >
                    <span className="material-symbols-outlined text-[16px]">navigate_before</span>
                    Prev
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 flex items-center gap-1 text-xs font-mono font-bold uppercase transition-all outline-none
            ${isDark
                            ? 'bg-[#d006f9]/20 hover:bg-[#d006f9]/40 text-[#d006f9] border border-[#d006f9]/50 disabled:opacity-30 disabled:hover:bg-[#d006f9]/20 rounded-sm'
                            : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:hover:bg-white sharp-corners'
                        }
          `}
                >
                    Next
                    <span className="material-symbols-outlined text-[16px]">navigate_next</span>
                </button>
            </div>
        </div>
    );
};
