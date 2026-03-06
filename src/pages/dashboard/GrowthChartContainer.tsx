import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataDaily = [
    { name: 'Mon', current: 4000, previous: 2400 },
    { name: 'Tue', current: 3000, previous: 1398 },
    { name: 'Wed', current: 2000, previous: 9800 },
    { name: 'Thu', current: 2780, previous: 3908 },
    { name: 'Fri', current: 1890, previous: 4800 },
    { name: 'Sat', current: 2390, previous: 3800 },
    { name: 'Sun', current: 3490, previous: 4300 },
];

export const GrowthChartContainer: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    // Smooth curve for dark mode, step for light mode
    const lineType = isDark ? "monotone" : "step";

    return (
        <div className={`p-6 flex flex-col ${isDark ? 'bg-[#050505] border border-white/5 shadow-none rounded-md' : 'bg-white border text-black'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Order Volume Pipeline</h2>
                    <div className="flex items-center gap-2">
                        <span className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>24,892</span>
                        <span className={`text-xs font-bold flex items-center ${isDark ? 'text-success' : 'text-green-700'}`}>
                            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 18.2%
                        </span>
                    </div>
                </div>

                <div className={`flex items-center text-[10px] font-bold tracking-widest uppercase p-1 ${isDark ? 'bg-black/40 rounded-md border border-white/5' : 'bg-gray-100 border border-black sharp-corners'}`}>
                    {['daily', 'weekly', 'monthly'].map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range as any)}
                            className={`px-4 py-1.5 transition-all ${timeRange === range
                                    ? (isDark ? 'bg-primary/20 text-primary rounded-sm shadow-[0_0_10px_rgba(139,92,246,0.15)]' : 'bg-black text-white sharp-corners')
                                    : (isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black')
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dataDaily} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#6B7280' : '#4B5563', fontSize: 10, fontFamily: 'monospace' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#6B7280' : '#4B5563', fontSize: 10, fontFamily: 'monospace' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#050505' : '#fff',
                                border: isDark ? '1px solid rgba(139,92,246,0.5)' : '1px solid #000',
                                borderRadius: isDark ? '4px' : '0px',
                                boxShadow: isDark ? '0 0 15px rgba(139,92,246,0.3)' : 'none',
                                color: isDark ? '#fff' : '#000',
                                fontFamily: 'monospace',
                                fontSize: '12px'
                            }}
                            itemStyle={{ color: isDark ? '#8b5cf6' : '#000' }}
                        />
                        <Line
                            type={lineType}
                            dataKey="previous"
                            stroke={isDark ? '#22c55e' : '#64748b'}
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            dot={false}
                            activeDot={false}
                            isAnimationActive={true}
                            animationDuration={1500}
                        />
                        <Line
                            type={lineType}
                            dataKey="current"
                            stroke={isDark ? '#8b5cf6' : '#000000'}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 4, fill: isDark ? '#8b5cf6' : '#000', stroke: isDark ? '#050505' : '#fff', strokeWidth: 2 }}
                            isAnimationActive={true}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
