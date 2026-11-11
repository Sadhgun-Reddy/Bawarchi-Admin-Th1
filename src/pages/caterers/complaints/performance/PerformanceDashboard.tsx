import React from 'react';
import { Card } from '../../../../components/Card';
import { useMockData } from '../../../../context/MockDataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface PerformanceDashboardProps {
    isDark: boolean;
}



export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ isDark }) => {
    const { performanceData = {} } = useMockData();
    const { resolutionData = [], resolutionTimeData = [], topCaterers = [] } = performanceData;
    const textColor = isDark ? 'text-gray-300' : 'text-slate-600';
    const gridColor = isDark ? '#333' : '#e2e8f0';

    return (
        <div className="flex flex-col gap-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`p-6 ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'}`}>
                    <h3 className={`text-sm font-bold tracking-wider uppercase mb-6 ${textColor}`}>
                        Resolution Volume
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={resolutionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1a1a1a' : '#fff',
                                        border: `1px solid ${gridColor}`,
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Resolved" />
                                <Bar dataKey="escalated" fill="#ef4444" radius={[4, 4, 0, 0]} name="Escalated" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className={`p-6 ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'}`}>
                    <h3 className={`text-sm font-bold tracking-wider uppercase mb-6 ${textColor}`}>
                        Avg Resolution Time (Hours)
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={resolutionTimeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1a1a1a' : '#fff',
                                        border: `1px solid ${gridColor}`,
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line type="monotone" dataKey="avgTime" stroke="#8f0df2" strokeWidth={3} dot={{ r: 4, fill: '#8f0df2', strokeWidth: 2, stroke: isDark ? '#000' : '#fff' }} name="Avg Time" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card className={`p-6 ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'}`}>
                 <h3 className={`text-sm font-bold tracking-wider uppercase mb-4 ${textColor}`}>
                        Top Caterers by Complaints
                    </h3>

                 <div className="space-y-4">
                    {topCaterers.map((caterer: any, idx: number) => (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                            <span className={isDark ? 'text-gray-200' : 'text-slate-800'}>{caterer.name}</span>
                            <div className="flex items-center gap-4">
                                <span className={`text-sm font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{caterer.count} Complaints</span>
                                <span className={`text-xs font-bold ${
                                    caterer.trend.startsWith('+') ? 'text-red-400' :
                                    caterer.trend.startsWith('-') ? 'text-green-400' :
                                    'text-gray-400'
                                }`}>{caterer.trend}</span>
                            </div>
                        </div>
                    ))}
                 </div>
            </Card>
        </div>
    );
};
