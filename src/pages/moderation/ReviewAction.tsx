import React from 'react';

interface ReviewActionProps {
    postId: string;
    onReviewPost: (postId: string) => void;
    isDark: boolean;
}

export const ReviewAction: React.FC<ReviewActionProps> = ({ postId, onReviewPost, isDark }) => {
    return (
        <button
            onClick={() => onReviewPost(postId)}
            className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 outline-none w-fit
                ${isDark
                    ? 'px-4 py-2 bg-[#d006f9]/20 text-[#d006f9] border border-[#d006f9] hover:bg-[#d006f9] hover:text-white hover:shadow-[0_0_15px_rgba(208,6,249,0.6)] rounded-sm active:scale-95'
                    : 'px-4 py-1.5 bg-[#8c2bee] hover:bg-[#7220c4] active:translate-y-[1px] text-white sharp-corners shadow-sm group'
                }
            `}
        >
            Review Post
            {!isDark && <span className="material-symbols-outlined text-[14px] ml-1 opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>}
        </button>
    );
};
