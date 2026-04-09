import React from 'react';
import { motion } from 'framer-motion';

interface UserStatsGridProps {
    isDark: boolean;
}

export const UserStatsGrid: React.FC<UserStatsGridProps> = ({ isDark }) => {

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } }
    };

    const cards = [
        { label: 'Total Users', value: '1,204', icon: 'group' },
        { label: 'Active Vendors', value: '42', icon: 'storefront' },
        { label: 'New Today', value: '18', icon: 'person_add', trend: '+12%', trendUp: true },
        { label: 'Pending Approval', value: '7', icon: 'pending_actions', warning: true },
    ];

    return (
        <motion.div
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    variants={itemVars}
                    className={`p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300
                        ${isDark
                            ? 'glass-panel hover:shadow-glow hover:-translate-y-0.5'
                            : 'bg-white sharp-corners border border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                        }
                    `}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className={`text-xs tracking-wider uppercase font-bold z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{card.label}</span>
                        <span className={`material-symbols-outlined text-[20px] z-10 ${isDark ? 'text-primary opacity-80' : 'text-gray-400'}`}>{card.icon}</span>
                    </div>

                    <div className="flex items-end justify-between z-10">
                        <span className={`text-3xl font-display font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>{card.value}</span>

                        {card.trend && (
                            <div className={`flex items-center text-xs font-bold ${isDark ? 'text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'text-green-600'}`}>
                                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                <span>{card.trend}</span>
                            </div>
                        )}
                        {card.warning && (
                            <div className={`flex items-center text-xs font-bold ${isDark ? 'text-warning shadow-[0_0_10px_var(--color-warning)]' : 'text-orange-500'}`}>
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                <span>Review Required</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};
