import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { motion } from 'framer-motion';

export interface ActionItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'verification' | 'support' | 'system' | 'billing';
    count?: number;
}

const mockActions: ActionItem[] = [
    { id: '1', title: 'New Vendor Registrations', subtitle: 'Awaiting KYC compliance check', category: 'verification', count: 5 },
    { id: '2', title: 'High-Priority Support Tickets', subtitle: 'Response SLA near breach', category: 'support', count: 2 },
    { id: '3', title: 'System Updates Pending', subtitle: 'Database index optimization', category: 'system' }
];

export const PendingActionsList: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <div className={`p-6 flex flex-col h-full ${isDark ? 'bg-[#050505] border border-white/5 shadow-none rounded-md' : 'bg-white border text-black'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Pending Actions</h2>
                <span className="material-symbols-outlined text-[16px] text-gray-400">more_horiz</span>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1 custom-scrollbar pr-2">
                {mockActions.map((action, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={action.id}
                        className={`p-4 cursor-pointer group transition-all duration-300 ${isDark
                            ? 'bg-[#0a0a0a] border border-white/5 hover:border-primary/50 hover:bg-white/5 rounded-md relative overflow-hidden'
                            : 'bg-gray-50 border border-gray-200 hover:border-black sharp-corners hover:-translate-y-1 hover:-translate-x-1 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000]'
                            }`}
                    >
                        {isDark && (
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary transition-colors shadow-glow" />
                        )}
                        <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>{action.title}</h4>
                            {action.count && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 ${isDark ? 'bg-primary/20 text-primary rounded-sm shadow-[0_0_10px_rgba(139,92,246,0.2)]' : 'bg-black text-white sharp-corners'
                                    }`}>
                                    {action.count}
                                </span>
                            )}
                        </div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{action.subtitle}</p>
                    </motion.div>
                ))}
            </div>
            <button className={`mt-4 py-3 w-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${isDark ? 'text-primary hover:bg-primary/10 rounded-md border border-primary/20 hover:border-primary/50' : 'text-black border border-black hover:bg-gray-100 sharp-corners'}`}>
                View All Actions
            </button>
        </div>
    );
};
