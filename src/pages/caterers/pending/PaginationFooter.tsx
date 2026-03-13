import React from 'react';
import { PaginationState } from './types';

interface PaginationFooterProps {
    pagination: PaginationState;
    onPageChange: (newPage: number) => void;
    isDark: boolean;
}

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
    pagination,
    onPageChange,
    isDark
}) => {
    const { currentPage, itemsPerPage, totalItems } = pagination;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalItems === 0) return null;

    return (
        <div className={`mt-4 flex flex-col md:flex-row items-center justify-between gap-4 py-4 w-full
            ${isDark ? 'border-t border-white/10' : 'border-t border-gray-300'}
        `}>
            {/* View Range */}
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing <span className={`font-mono font-medium ${isDark ? 'text-white' : 'text-black'}`}>{startIndex}</span>{" "}
                to <span className={`font-mono font-medium ${isDark ? 'text-white' : 'text-black'}`}>{endIndex}</span>{" "}
                of <span className={`font-mono font-medium ${isDark ? 'text-[#a413ec]' : 'text-[#7f0df2]'}`}>{totalItems}</span> applications
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-1.5 flex items-center justify-center transition-colors outline-none
                        ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:hover:bg-white/5 rounded-sm'
                            : 'bg-white border border-gray-300 hover:bg-gray-50 text-black disabled:opacity-50 disabled:hover:bg-white sharp-corners'
                        }
                    `}
                >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        const isCurrent = pageNum === currentPage;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center text-sm font-mono transition-all outline-none
                                    ${isDark
                                        ? isCurrent
                                            ? 'bg-[#a413ec] text-white shadow-[0_0_8px_#a413ec]/40 rounded-sm'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-sm'
                                        : isCurrent
                                            ? 'bg-[#7f0df2] text-white sharp-corners border border-[#7f0df2]'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-black sharp-corners border border-transparent'
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
                    className={`p-1.5 flex items-center justify-center transition-colors outline-none
                        ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:hover:bg-white/5 rounded-sm'
                            : 'bg-white border border-gray-300 hover:bg-gray-50 text-black disabled:opacity-50 disabled:hover:bg-white sharp-corners'
                        }
                    `}
                >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
            </div>
        </div>
    );
};
