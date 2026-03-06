import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { motion } from 'framer-motion';
import { GrowthChartContainer } from './GrowthChartContainer';
import { ActivityFeed } from './ActivityFeed';
import { PendingActionsList } from './PendingActionsList';

export const Dashboard: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                        Mission Control
                    </h1>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Real-time system monitoring and operations center.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${isDark
                        ? 'bg-transparent border border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 sharp-corners'
                        }`}>
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        Refresh Data
                    </button>

                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all ${isDark
                        ? 'bg-primary/10 border border-primary text-primary hover:bg-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] rounded-md'
                        : 'bg-black text-white hover:bg-gray-800 sharp-corners'
                        }`}>
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        New Incident
                    </button>
                </div>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                {/* Card 1: Total Orders */}
                <div className={`p-5 rounded-md flex flex-col justify-between ${isDark ? 'bg-[#050505] border border-white/5 shadow-none' : 'bg-white border text-black'
                    }`}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            TOTAL ORDERS (24H)
                        </h3>
                        <span className={`material-symbols-outlined text-[28px] ${isDark ? 'text-gray-700/50' : 'text-gray-300'}`}>trending_up</span>
                    </div>
                    <div>
                        <div className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>1,248</div>
                        <div className="mt-2 text-[11px] font-bold text-success flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">trending_up</span>
                            +12.5%
                        </div>
                    </div>
                </div>

                {/* Card 2: Active Alerts */}
                <div className={`p-5 rounded-md flex flex-col justify-between ${isDark ? 'bg-[#050505] border border-white/5 shadow-none' : 'bg-white border text-black'
                    }`}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            ACTIVE ALERTS
                        </h3>
                        <span className="material-symbols-outlined text-[28px] text-[#b45309]">warning</span>
                    </div>
                    <div>
                        <div className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>3</div>
                        <div className="mt-2 text-[11px] font-bold text-[#b45309]">
                            Needs Attention
                        </div>
                    </div>
                </div>

                {/* Card 3: Food Rescued */}
                <div className={`p-5 rounded-md flex flex-col justify-between ${isDark ? 'bg-[#050505] border border-white/5 shadow-none' : 'bg-white border text-black'
                    }`}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            FOOD RESCUED
                        </h3>
                        <span className={`material-symbols-outlined text-[28px] ${isDark ? 'text-blue-900/50' : 'text-blue-300'}`}>volunteer_activism</span>
                    </div>
                    <div>
                        <div className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>850 kg</div>
                        <div className="mt-2 text-[11px] font-bold text-info">
                            Target Met
                        </div>
                    </div>
                </div>

                {/* Card 4: System Load */}
                <div className={`p-5 rounded-md flex flex-col justify-between ${isDark ? 'bg-[#050505] border border-white/5 shadow-none' : 'bg-white border text-black'
                    }`}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            SYSTEM LOAD
                        </h3>
                        <span className={`material-symbols-outlined text-[28px] ${isDark ? 'text-primary/30' : 'text-purple-200'}`}>dns</span>
                    </div>
                    <div>
                        <div className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>42%</div>
                        <div className={`mt-3 h-1 w-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full`}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '42%' }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-full ${isDark ? 'bg-primary' : 'bg-black'}`}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Left Column (Chart & Pending Actions) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <GrowthChartContainer />
                    <div className="h-[400px]">
                        <PendingActionsList />
                    </div>
                </div>

                {/* Right Column (Live Terminal) */}
                <div className="lg:col-span-1 h-full min-h-[600px]">
                    <ActivityFeed />
                </div>
            </div>

        </div>
    );
};
