import React from 'react';
import { motion } from 'framer-motion';

interface ReviewOfferActionProps {
    offerId: string;
    onReviewOffer: (offerId: string) => void;
    isDark: boolean;
}

export const ReviewOfferAction: React.FC<ReviewOfferActionProps> = ({
    offerId, onReviewOffer, isDark
}) => {
    return (
        <motion.button
            onClick={() => onReviewOffer(offerId)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                px-4 py-2 flex items-center justify-center gap-2 font-space font-bold tracking-widest text-[11px] uppercase transition-all outline-none
                ${isDark
                    ? 'bg-[#7f0df2]/20 text-[#7f0df2] border border-[#7f0df2]/50 hover:bg-[#7f0df2]/30 shadow-[0_0_15px_rgba(127,13,242,0.4)] hover:shadow-[0_0_20px_rgba(127,13,242,0.6)] rounded-sm'
                    : 'bg-[#8c2bee] text-white hover:bg-[#7a22d9] border border-transparent sharp-corners shadow-sm'
                }
            `}
        >
            Review Offer
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </motion.button>
    );
};
