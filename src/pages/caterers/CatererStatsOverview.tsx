import React from 'react';
import { motion } from 'framer-motion';
import { CatererStats } from './types';

interface CatererStatsOverviewProps {
    stats: CatererStats;
    isDark: boolean;
}

export const CatererStatsOverview: React.FC<CatererStatsOverviewProps> = ({ stats, isDark }) => {

    // Only rendered in Dark Mode based on architecture constraints
    if (!isDark) return null;

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const metrics = [
        { label: 'Total Approved', value: stats.totalApproved, icon: 'verified', color: 'text-primary', delay: 0 },
        { label: 'Avg Network Rating', value: `${stats.avgNetworkRating} / 5.0`, icon: 'star', color: 'text-warning', delay: 0.1 },
        { label: 'Total Enquiries', value: stats.totalEnquiriesVolume.toLocaleString(), icon: 'monitoring', color: 'text-blue-500', delay: 0.2 },
        { label: 'Global Profile Views', value: stats.globalProfileViews, icon: 'visibility', color: 'text-emerald-400', delay: 0.3 }
    ];

    return (
        <motion.div
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
            {metrics.map((metric, i) => (
                <motion.div
                    key={i}
                    variants={itemVars}
                    className="glass-panel p-5 flex items-center gap-4 group hover:shadow-glow transition-all duration-300"
                >
                    <div className="p-3 bg-white/5 rounded-sm relative overflow-hidden">
                        <span className={`material-symbols-outlined text-3xl opacity-50 transition-opacity group-hover:opacity-100 ${metric.color}`}>
                            {metric.icon}
                        </span>
                        {/* Subtle background glow behind icon on hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-md transition-opacity bg-current ${metric.color}`} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">{metric.label}</span>
                        <span className="font-mono text-xl font-bold text-white">{metric.value}</span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};
