import React from 'react';
import { OfferSubmission } from './types';
import { ReviewOfferAction } from './ReviewOfferAction';
import { motion } from 'framer-motion';

interface OffersDataTableProps {
    data: OfferSubmission[];
    isDark: boolean;
    onReviewOffer: (offerId: string) => void;
}

export const OffersDataTable: React.FC<OffersDataTableProps> = ({
    data, isDark, onReviewOffer
}) => {
    const getDiscountBadgeStyles = (type: OfferSubmission['discount']['type']) => {
        if (isDark) {
            switch (type) {
                case 'PERCENTAGE':
                    return 'bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.3)]';
                case 'FIXED_PRICE':
                    return 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.3)]';
                case 'FREE_ITEM':
                    return 'bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.3)]';
                case 'BUNDLE':
                    return 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
            }
        } else {
            // Light Mode
            switch (type) {
                case 'PERCENTAGE':
                    return 'bg-green-50 text-green-700 border border-green-200 sharp-corners font-bold';
                case 'FIXED_PRICE':
                    return 'bg-blue-50 text-blue-700 border border-blue-200 sharp-corners font-bold';
                case 'FREE_ITEM':
                    return 'bg-purple-50 text-purple-700 border border-purple-200 sharp-corners font-bold';
                case 'BUNDLE':
                    return 'bg-amber-50 text-amber-700 border border-amber-200 sharp-corners font-bold';
            }
        }
    };

    if (data.length === 0) {
        return (
            <div className={`w-full py-16 flex flex-col items-center justify-center ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inbox</span>
                <p className="font-space tracking-widest text-sm uppercase">No offers found</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`text-xs font-space tracking-widest uppercase border-b ${isDark ? 'border-white/10 text-gray-500' : 'border-slate-300 text-slate-500'}`}>
                        <th className="py-4 pl-0 pr-4 font-normal">Offer Detail</th>
                        <th className="px-4 py-4 font-normal">Caterer</th>
                        <th className="px-4 py-4 font-normal">Discount Value</th>
                        <th className="px-4 py-4 font-normal">Validity</th>
                        <th className="px-4 py-4 font-normal">Submitted</th>
                        <th className="py-4 pl-4 pr-0 font-normal text-right">Action</th>
                    </tr>
                </thead>
                <tbody className={`${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    {data.map((offer, index) => (
                        <motion.tr
                            key={offer.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group border-b transition-colors ${isDark
                                    ? 'border-white/5 hover:bg-white/5'
                                    : 'border-slate-100 hover:bg-slate-50'
                                }`}
                        >
                            {/* Offer Details */}
                            <td className="py-4 pl-0 pr-4 align-middle">
                                <div className="flex flex-col">
                                    <span className={`font-space font-medium tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {offer.title}
                                    </span>
                                    <span className={`text-[11px] font-mono mt-0.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                        {offer.id}
                                    </span>
                                </div>
                            </td>

                            {/* Caterer */}
                            <td className="px-4 py-4 align-middle">
                                <div className="flex items-center gap-3">
                                    <div className={`flex-shrink-0 flex items-center justify-center overflow-hidden
                                        ${isDark
                                            ? 'w-8 h-8 rounded-full bg-[#1A1A1A] border border-white/10'
                                            : 'w-8 h-8 sharp-corners bg-slate-200 border border-slate-300 text-slate-500'
                                        }`}
                                    >
                                        {offer.caterer.logoUrl ? (
                                            <img src={offer.caterer.logoUrl} alt={offer.caterer.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined text-[16px]">storefront</span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium">{offer.caterer.name}</span>
                                </div>
                            </td>

                            {/* Discount Value */}
                            <td className="px-4 py-4 align-middle">
                                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-mono tracking-wide ${getDiscountBadgeStyles(offer.discount.type)} ${isDark ? 'rounded-md' : ''
                                    }`}>
                                    {offer.discount.value}
                                </span>
                            </td>

                            {/* Validity */}
                            <td className="px-4 py-4 align-middle">
                                <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    {offer.validity}
                                </div>
                            </td>

                            {/* Submitted */}
                            <td className="px-4 py-4 align-middle">
                                <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                    {offer.submittedAt}
                                </div>
                            </td>

                            {/* Action */}
                            <td className="py-4 pl-4 pr-0 align-middle text-right">
                                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ReviewOfferAction
                                        offerId={offer.id}
                                        onReviewOffer={onReviewOffer}
                                        isDark={isDark}
                                    />
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
