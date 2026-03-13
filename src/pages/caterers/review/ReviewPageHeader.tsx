import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ReviewPageHeaderProps {
    appId: string;
    isDark: boolean;
}

export const ReviewPageHeader: React.FC<ReviewPageHeaderProps> = ({ appId, isDark }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 w-full mb-6">
            <button
                onClick={() => navigate('/admin/caterers/pending')}
                className={`flex items-center gap-2 text-sm w-fit transition-colors outline-none
          ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
        `}
            >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Pending
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold tracking-tight
            ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'text-black'}
          `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        Review Application: <span className={isDark ? 'text-[#8B5CF6]' : 'text-[#7C3AED]'}>{appId}</span>
                    </h1>
                </div>

                <div className={`px-3 py-1 text-xs font-bold font-mono tracking-wider flex items-center gap-2
          ${isDark
                        ? 'bg-[#FACC15]/10 text-[#FACC15] shadow-[0_0_8px_#FACC15] border border-[#FACC15]/30 rounded-sm'
                        : 'bg-[#FACC15] text-black sharp-corners border border-black'
                    }
        `}>
                    <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                    [PENDING REVIEW]
                </div>
            </div>
        </div>
    );
};
