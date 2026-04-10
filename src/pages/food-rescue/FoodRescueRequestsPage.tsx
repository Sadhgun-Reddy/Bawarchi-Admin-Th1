import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';

export const FoodRescueRequestsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const mockRequests = [
        { id: 'REQ-301', ngo: 'Hope Kitchen', food: 'Rice & Curry Packs', headcount: 150, location: 'Downtown Shelter', urgency: 'HIGH', urgencyColor: 'red' },
        { id: 'REQ-302', ngo: 'City Shelter', food: 'Bread Loaves', headcount: 50, location: 'Westside Community', urgency: 'MEDIUM', urgencyColor: 'amber' },
        { id: 'REQ-303', ngo: 'Local Food Bank', food: 'Canned Goods', headcount: 200, location: 'North Hill Center', urgency: 'LOW', urgencyColor: 'slate' },
        { id: 'REQ-304', ngo: 'Tiny Homes', food: 'Fresh Produce', headcount: 35, location: 'East District', urgency: 'HIGH', urgencyColor: 'red' }
    ];

    return (
        <div className={`flex flex-col h-full w-full p-6 lg:p-8 gap-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary'}`}>
                            {isDark ? 'SYS.ACTIVE' : 'Management Module'}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight uppercase">Food Rescue Management</h2>
                </div>
                <button className={`flex items-center gap-2 px-5 py-2.5 rounded shadow-lg transition-all active:scale-95 text-sm font-bold tracking-wide uppercase ${isDark ? 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-[#8a2ce2] hover:bg-[#7a22d2] text-white shadow-[#8a2ce2]/20'}`}>
                    <span className="material-symbols-outlined text-lg">download</span>
                    Export Requests
                </button>
            </div>

            {/* Tabs */}
            <div className={`flex border-b mt-2 ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
                <button className={`px-6 py-3 border-b-2 font-bold text-sm relative flex items-center gap-2 ${isDark ? 'border-primary text-white' : 'border-slate-900 text-slate-900'}`}>
                    Pending Requests
                    <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full text-[10px] font-bold px-1.5 ${isDark ? 'bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/50' : 'bg-[#8a2ce2] text-white'}`}>4</span>
                </button>
                <button className={`px-6 py-3 border-b-2 border-transparent font-medium text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>
                    Active Missions
                </button>
                <button className={`px-6 py-3 border-b-2 border-transparent font-medium text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>
                    History
                </button>
            </div>

            {/* Data Table Panel */}
            <div className={`rounded-xl shadow-sm overflow-hidden border ${isDark ? 'glass-panel border-primary/30' : 'bg-white border-slate-900'}`}>

                {/* Search Bar / Filters */}
                <div className={`p-4 border-b flex flex-wrap gap-4 items-center justify-between ${isDark ? 'bg-[#0a050d] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="relative w-full max-w-sm">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input
                            type="text"
                            className={`w-full pl-10 pr-4 py-2 border rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200 placeholder-slate-600 font-mono' : 'bg-white border-slate-300 text-slate-700 placeholder-slate-400'}`}
                            placeholder={isDark ? "CMD_SEARCH_GLOBAL..." : "Search by ID, NGO or Location..."}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className={`p-2 border rounded transition-colors ${isDark ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-primary hover:border-primary' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}>
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                        </button>
                        <button className={`p-2 border rounded transition-colors ${isDark ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-primary hover:border-primary' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}>
                            <span className="material-symbols-outlined text-lg">sort</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b text-xs uppercase tracking-wider font-bold ${isDark ? 'bg-primary/5 border-primary/20 text-primary/80' : 'bg-slate-100 border-slate-300 text-slate-600'}`}>
                                <th className={`px-6 py-4 w-28 ${!isDark && 'border-r border-slate-200'}`}>Request ID</th>
                                <th className={`px-6 py-4 w-48 ${!isDark && 'border-r border-slate-200'}`}>Requester / NGO</th>
                                <th className={`px-6 py-4 w-48 ${!isDark && 'border-r border-slate-200'}`}>Required Food</th>
                                <th className={`px-6 py-4 w-24 text-center ${!isDark && 'border-r border-slate-200'}`}>Headcount</th>
                                <th className={`px-6 py-4 w-48 ${!isDark && 'border-r border-slate-200'}`}>Location</th>
                                <th className={`px-6 py-4 w-32 text-center ${!isDark && 'border-r border-slate-200'}`}>Urgency</th>
                                <th className="px-6 py-4 w-32 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y text-sm font-medium ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                            {mockRequests.map((req, idx) => (
                                <tr key={req.id} className={`group transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                                    <td className={`px-6 py-4 font-mono ${isDark ? 'text-white' : 'text-slate-900'} ${!isDark && 'border-r border-slate-100'}`}>
                                        {req.id}
                                    </td>
                                    <td className={`px-6 py-4 ${!isDark && 'border-r border-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`size-8 rounded flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500 hidden md:flex'}`}>
                                                <span className="material-symbols-outlined text-sm">{idx % 2 === 0 ? 'home_work' : 'diversity_3'}</span>
                                            </div>
                                            <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#8a2ce2]'}`}>{req.ngo}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'} ${!isDark && 'border-r border-slate-100'}`}>
                                        {req.food}
                                    </td>
                                    <td className={`px-6 py-4 text-center font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'} ${!isDark && 'border-r border-slate-100'}`}>
                                        {req.headcount}
                                    </td>
                                    <td className={`px-6 py-4 ${!isDark && 'border-r border-slate-100'}`}>
                                        <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400 font-mono' : 'text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                            <span>{req.location}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 text-center ${!isDark && 'border-r border-slate-100'}`}>
                                        <span className={getUrgencyClass(req.urgencyColor, isDark)}>
                                            {isDark && req.urgency === 'HIGH' && <span className="mr-1.5 size-1.5 rounded-full bg-[#ff003c] animate-pulse"></span>}
                                            {isDark && req.urgency === 'MEDIUM' && <span className="mr-1.5 size-1.5 rounded-full bg-[#ff6b00]"></span>}
                                            {req.urgency}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className={`font-bold uppercase tracking-wide transition-all ${isDark ? 'inline-flex items-center justify-center rounded border border-primary bg-primary/10 px-4 py-1.5 text-xs text-primary hover:bg-primary hover:text-white group-hover:scale-105' : 'bg-[#8a2ce2] hover:bg-[#7a22d2] text-white text-xs px-4 py-2 rounded shadow-sm active:scale-95 w-full'}`}>
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className={`px-6 py-4 flex items-center justify-between border-t ${isDark ? 'bg-black/20 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        Showing <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>1-4</span> of <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>4</span> pending requests
                    </span>
                    <div className="flex gap-1">
                        <button className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${isDark ? 'bg-slate-900 border-slate-700 text-slate-400 hover:border-primary hover:text-primary' : 'bg-white border-slate-300 text-slate-400 hover:text-[#8a2ce2]'}`}>
                            <span className="material-symbols-outlined text-base">chevron_left</span>
                        </button>
                        <button className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${isDark ? 'bg-slate-900 border-slate-700 text-slate-400 hover:border-primary hover:text-primary' : 'bg-white border-slate-300 text-slate-400 hover:text-[#8a2ce2]'}`}>
                            <span className="material-symbols-outlined text-base">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dark Mode Secondary Info Panels */}
            {isDark && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="rounded-lg border border-slate-800 bg-[#0f0a14] p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
                        <div className="rounded-full bg-[#ff6b00]/10 p-3 text-[#ff6b00]">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">System Alert</p>
                            <p className="text-sm font-bold text-white">Logistics Delay in Sector 7</p>
                        </div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-[#0f0a14] p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <span className="material-symbols-outlined">network_check</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Status</p>
                            <p className="text-sm font-bold text-white">All Systems Operational</p>
                        </div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-[#0f0a14] p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
                        <div className="rounded-full bg-[#00f0ff]/10 p-3 text-[#00f0ff]">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Impact</p>
                            <p className="text-sm font-bold text-white">450 Meals Rescued Today</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper for Urgency colors
function getUrgencyClass(color: string, isDark: boolean) {
    if (isDark) {
        if (color === 'red') return "inline-flex items-center rounded bg-[#ff003c]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#ff003c] ring-1 ring-inset ring-[#ff003c]/30";
        if (color === 'amber') return "inline-flex items-center rounded bg-[#ff6b00]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#ff6b00] ring-1 ring-inset ring-[#ff6b00]/30";
        return "inline-flex items-center rounded bg-[#00f0ff]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#00f0ff] ring-1 ring-inset ring-[#00f0ff]/30";
    }

    // Light mode colors
    if (color === 'red') return "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200";
    if (color === 'amber') return "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200";
    return "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200";
}
