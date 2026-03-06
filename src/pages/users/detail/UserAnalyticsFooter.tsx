import React from 'react';
import { motion } from 'framer-motion';
import { UserAnalytics } from './types';

interface UserAnalyticsFooterProps {
    analytics: UserAnalytics;
    isDark: boolean;
}

export const UserAnalyticsFooter: React.FC<UserAnalyticsFooterProps> = ({ analytics, isDark }) => {

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const kycIsVerified = analytics.kycStatus === 'VERIFIED';

    const cards = [
        { label: 'Avg Response Time', value: analytics.avgResponseTime, icon: 'timer', color: 'border-blue-500' },
        { label: 'Avg Rating', value: `${analytics.avgRating} / 5.0`, icon: 'star', color: 'border-yellow-500' },
        { label: 'Wallet Balance', value: analytics.walletBalance, icon: 'account_balance_wallet', color: 'border-emerald-500' },
        {
            label: 'KYC Status',
            value: analytics.kycStatus,
            icon: kycIsVerified ? 'verified_user' : 'gpp_maybe',
            color: kycIsVerified ? 'border-primary' : 'border-warning',
            isWarning: !kycIsVerified
        },
    ];

    return (
        <motion.div
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    variants={itemVars}
                    className={`flex items-center p-5 relative overflow-hidden transition-all duration-300 group
                        ${isDark
                            ? `glass-panel border-l-4 ${card.color} hover:shadow-glow hover:-translate-y-0.5`
                            : `bg-white sharp-corners border border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 flex-col text-center justify-center gap-3 py-6`
                        }
                    `}
                >
                    {isDark ? (
                        <>
                            <div className="p-3 bg-white/5 rounded-sm mr-4 z-10">
                                <span className={`material-symbols-outlined text-[28px] opacity-50 text-white group-hover:text-primary transition-colors`}>{card.icon}</span>
                            </div>
                            <div className="flex flex-col z-10 w-full">
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">{card.label}</span>
                                <span className={`font-mono text-xl font-bold ${card.isWarning ? 'text-warning' : 'text-white'}`}>{card.value}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[36px] text-slate-400 group-hover:text-black transition-colors">{card.icon}</span>
                            <div className="flex flex-col items-center">
                                <span className="font-mono text-2xl font-bold text-black">{card.value}</span>
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-500 mt-1">{card.label}</span>
                            </div>
                        </>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
};
