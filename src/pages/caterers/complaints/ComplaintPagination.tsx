import React from 'react';

interface ComplaintPaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    isDark: boolean;
}

export const ComplaintPagination: React.FC<ComplaintPaginationProps> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
    isDark
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalItems === 0) return null;

    return (
        <div className={`mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 w-full
      ${isDark ? 'border-t border-white/10' : 'border-t border-slate-300'}
    `}>
            <div className={`text-sm font-mono ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Displaying <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{startIndex}</span>
                –<span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{endIndex}</span>{" "}
                of <span className={`font-bold ${isDark ? 'text-[#8f0df2]' : 'text-[#8a2ce2]'}`}>{totalItems}</span> total
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-1 flex items-center justify-center transition-colors outline-none
            ${isDark
                            ? 'hover:bg-white/10 text-white disabled:opacity-50 disabled:hover:bg-transparent rounded-sm'
                            : 'border border-slate-300 hover:bg-slate-100 text-slate-700 disabled:opacity-50 disabled:hover:bg-transparent sharp-corners'
                        }
          `}
                >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        const isCurrent = pageNum === currentPage;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-7 h-7 flex items-center justify-center text-xs font-mono transition-all outline-none
                  ${isDark
                                        ? (isCurrent ? 'bg-[#8f0df2] text-white shadow-[0_0_8px_#8f0df2]/50 rounded-sm' : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-sm')
                                        : (isCurrent ? 'bg-[#8a2ce2] text-white sharp-corners border border-[#8a2ce2]' : 'text-slate-600 hover:bg-slate-100 sharp-corners border border-transparent')
                                    }
                `}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-1 flex items-center justify-center transition-colors outline-none
            ${isDark
                            ? 'hover:bg-white/10 text-white disabled:opacity-50 disabled:hover:bg-transparent rounded-sm'
                            : 'border border-slate-300 hover:bg-slate-100 text-slate-700 disabled:opacity-50 disabled:hover:bg-transparent sharp-corners'
                        }
          `}
                >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
            </div>
        </div>
    );
};
