import React from 'react';

interface ApprovalsHeaderProps {
    searchQuery: string;
    onSearch: (query: string) => void;
    onExport: () => void;
    isDark: boolean;
}

export const ApprovalsHeader: React.FC<ApprovalsHeaderProps> = ({
    searchQuery,
    onSearch,
    onExport,
    isDark
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} tracking-tight`} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    Pending Approvals
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Manage the review and onboarding lifecycle of catering partners.
                </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className={`relative flex-1 md:w-64 flex items-center transition-all duration-300 ${isDark ? 'focus-within:glow-border' : ''}`}>
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Search IDs, Business, Owner..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className={`w-full pl-9 pr-4 py-2 text-sm outline-none transition-all duration-300
                            ${isDark
                                ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-sm focus:bg-white/10 focus:border-[#a413ec]'
                                : 'bg-white border border-black text-black placeholder-gray-500 rounded-none focus:ring-1 focus:ring-[#7f0df2]'
                            }`}
                    />
                </div>
                <button
                    onClick={onExport}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200
                        ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm'
                            : 'bg-white hover:bg-gray-50 text-black border border-black rounded-none sharp-corners active:bg-gray-100'
                        }`}
                >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export
                </button>
            </div>
        </div>
    );
};
