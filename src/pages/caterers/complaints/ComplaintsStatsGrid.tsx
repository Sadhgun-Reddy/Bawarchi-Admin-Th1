import React from 'react';
import { StatCard } from './StatCard';

interface ComplaintsStatsGridProps {
    isDark: boolean;
}

const STATS = [
    { title: 'Total Complaints', value: 342, icon: 'assignment_late', trend: '+12%', isPositive: false },
    { title: 'Critical & Open', value: 14, icon: 'warning', trend: '+2', isPositive: false, isCritical: true },
    { title: 'Resolved (Week)', value: 89, icon: 'check_circle', trend: '+18%', isPositive: true },
    { title: 'Avg Resolution', value: '24h', icon: 'timer', trend: '-2h', isPositive: true }
];

export const ComplaintsStatsGrid: React.FC<ComplaintsStatsGridProps> = ({ isDark }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {STATS.map((stat, idx) => (
                <StatCard key={idx} stat={stat} isDark={isDark} />
            ))}
        </div>
    );
};
