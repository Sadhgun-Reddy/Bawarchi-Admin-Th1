import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/ThemeProvider';

export const MatchingBoardPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <div className={`flex flex-col h-full w-full p-6 lg:p-8 gap-6 transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'} relative`}>
            {/* Header */}
            <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-white/10' : 'border-slate-300'}`}>
                <div className="flex items-center gap-4">
                    <h2 className={`text-xl font-bold tracking-tight uppercase ${isDark ? 'text-white' : ''}`}>
                        {isDark && <span className="text-primary mr-2">///</span>}
                        Food Rescue Management
                    </h2>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? 'font-mono bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20 uppercase'}`}>
                        {isDark ? 'SYS.ACTIVE' : 'LIVE CONSOLE'}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all ${isDark ? 'bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 border border-[#333] text-gray-300 rounded hover:border-primary/50' : 'bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 rounded-sm shadow-sm'}`}>
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        View Match History
                    </button>
                    {!isDark && (
                        <>
                            <div className="h-6 w-px bg-slate-300 mx-2"></div>
                            <button className="p-2 text-slate-500 hover:text-primary transition-colors relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${isDark ? 'border-white/10' : 'border-slate-300'}`}>
                <div className="flex gap-8">
                    <button className={`relative py-3 text-sm font-bold flex items-center gap-2 border-b-2 ${isDark ? 'text-white border-primary' : 'text-slate-900 border-slate-900'}`}>
                        {isDark && <span className="material-symbols-outlined text-primary text-[18px]">hub</span>}
                        Matching Board
                    </button>
                    <button className={`relative py-3 text-sm font-medium transition-colors border-b-2 border-transparent flex items-center gap-2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-slate-500 hover:text-slate-700'}`}>
                        {isDark && <span className="material-symbols-outlined text-[18px]">verified</span>}
                        {isDark ? 'Pending Verification' : 'Match History'}
                        {isDark && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400 text-[10px]">2</span>}
                    </button>
                    <button className={`relative py-3 text-sm font-medium transition-colors border-b-2 border-transparent flex items-center gap-2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-slate-500 hover:text-slate-700'}`}>
                        {isDark && <span className="material-symbols-outlined text-[18px]">local_shipping</span>}
                        {isDark ? 'Live Deliveries' : 'Pending Reviews'}
                        <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${isDark ? 'bg-gray-800 text-gray-400 rounded-full' : 'bg-slate-200 text-slate-600 rounded-sm'}`}>
                            {isDark ? '8' : '12'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full pb-20">
                {/* LEFT PANE: AVAILABLE FOOD */}
                <div className={`flex flex-col h-full overflow-hidden ${isDark ? 'gap-4' : 'bg-white border border-slate-300 rounded-sm shadow-sm'}`}>
                    <div className={`flex items-center justify-between ${isDark ? 'mb-2' : 'bg-slate-50 px-4 py-3 border-b border-slate-200'}`}>
                        <div className="flex items-center gap-2">
                            {isDark ? (
                                <h3 className="text-sm font-mono text-primary font-bold tracking-widest uppercase flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">inventory_2</span>
                                    Available Food (3)
                                </h3>
                            ) : (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <h3 className="font-bold text-slate-700 text-sm tracking-wide">AVAILABLE FOOD (3)</h3>
                                </>
                            )}
                        </div>
                        {isDark ? (
                            <>
                                <span className="h-px flex-1 bg-[#333] ml-4 mr-2"></span>
                                <div className="text-[10px] text-gray-500 font-mono">LIVE_FEED</div>
                            </>
                        ) : (
                            <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                            </button>
                        )}
                    </div>

                    <div className={`flex-1 overflow-y-auto space-y-3 ${isDark ? '' : 'p-4 bg-[#f8fafc]'}`}>
                        {/* Selected Card */}
                        <div className={`group relative transition-all ${isDark ? 'bg-[#0a0a0a] border border-primary shadow-[0_0_10px_rgba(127,19,236,0.3)] rounded-lg p-4' : 'cursor-pointer bg-white border-2 border-primary rounded-sm p-4 hover:shadow-md'}`}>
                            <div className={`absolute top-0 right-0 ${isDark ? 'p-2' : 'bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-sm'}`}>
                                {isDark ? (
                                    <span className="flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                                        <span className="size-1.5 rounded-full bg-white animate-pulse"></span> Selected
                                    </span>
                                ) : 'SELECTED'}
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <span className={`font-mono text-xs font-bold ${isDark ? 'text-[#9d4dff] mb-0.5' : 'text-primary bg-primary/10 px-1.5 py-0.5 rounded-sm border border-primary/20'}`}>
                                    {isDark ? 'ID: ' : ''}DON-701
                                </span>
                                {!isDark && <span className="text-xs text-slate-500 font-mono">14:00 Today</span>}
                            </div>
                            <h4 className={`font-bold leading-tight ${isDark ? 'text-white text-lg mb-2' : 'text-slate-900 text-lg mb-1'}`}>
                                {isDark ? 'Wedding Banquet Leftovers' : 'Paneer Curry (20kg)'}
                            </h4>

                            <div className={`flex items-center gap-4 text-sm mb-3 ${isDark ? 'text-gray-400 grid grid-cols-2 mt-1' : 'text-slate-600'}`}>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'scale' : 'location_on'}</span>
                                    <span>{isDark ? '50kg' : 'Sector 4, Community Ctr'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'schedule' : 'timer'}</span>
                                    <span className={!isDark ? "text-red-600 font-bold" : ""}>{isDark ? '23:00 Today' : 'Expires in 2h'}</span>
                                </div>
                                {isDark && (
                                    <div className="flex items-center gap-1 col-span-2 mt-1">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        <span className="truncate">Grand Hotel, Downtown</span>
                                    </div>
                                )}
                            </div>

                            {!isDark && (
                                <div className="flex items-center gap-2 border-t border-slate-100 pt-3 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-slate-300"></div>
                                    <span className="text-xs font-bold text-slate-700">Taste of India</span>
                                </div>
                            )}
                        </div>

                        {/* Normal Card */}
                        <div className={`group relative transition-all ${isDark ? 'bg-[#0a0a0a]/50 border border-[#333] hover:border-gray-600 rounded-lg p-4' : 'cursor-pointer bg-white border border-slate-200 rounded-sm p-4 hover:border-slate-400 opacity-60 hover:opacity-100'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`font-mono text-xs font-bold ${isDark ? 'text-gray-500 mb-0.5' : 'text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm border border-slate-200'}`}>
                                    {isDark ? 'ID: ' : ''}DON-702
                                </span>
                                {!isDark && <span className="text-xs text-slate-400 font-mono">13:45 Today</span>}
                            </div>
                            <h4 className={`font-bold leading-tight ${isDark ? 'text-gray-200 text-base mb-2' : 'text-slate-700 text-lg mb-1'}`}>
                                {isDark ? 'Artisan Bakery Surplus' : 'Mixed Rice & Dal (15kg)'}
                            </h4>

                            <div className={`flex items-center gap-4 text-sm mb-3 ${isDark ? 'text-gray-500 grid grid-cols-2 mt-1' : 'text-slate-500'}`}>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'scale' : 'location_on'}</span>
                                    <span>{isDark ? '12kg' : 'Sector 2, Tech Park'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'schedule' : 'timer'}</span>
                                    <span>{isDark ? '08:00 Tmrw' : 'Expires in 4h'}</span>
                                </div>
                            </div>

                            {!isDark && (
                                <div className="flex items-center gap-2 border-t border-slate-100 pt-3 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-slate-300"></div>
                                    <span className="text-xs font-bold text-slate-500">Green Leaf Cafe</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT PANE: NGO REQUESTS */}
                <div className={`flex flex-col h-full overflow-hidden ${isDark ? 'gap-4' : 'bg-white border border-slate-300 rounded-sm shadow-sm'}`}>
                    <div className={`flex items-center justify-between ${isDark ? 'mb-2' : 'bg-slate-50 px-4 py-3 border-b border-slate-200'}`}>
                        <div className="flex items-center gap-2">
                            {isDark ? (
                                <h3 className="text-sm font-mono text-white font-bold tracking-widest uppercase flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-gray-400">volunteer_activism</span>
                                    Active NGO Requests (5)
                                </h3>
                            ) : (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <h3 className="font-bold text-slate-700 text-sm tracking-wide">ACTIVE NGO REQUESTS (5)</h3>
                                </>
                            )}
                        </div>
                        {isDark ? (
                            <>
                                <span className="h-px flex-1 bg-[#333] ml-4 mr-2"></span>
                                <div className="text-[10px] text-gray-500 font-mono">LIVE_FEED</div>
                            </>
                        ) : (
                            <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[18px]">sort</span>
                            </button>
                        )}
                    </div>

                    <div className={`flex-1 overflow-y-auto space-y-3 ${isDark ? '' : 'p-4 bg-[#f8fafc]'}`}>
                        {/* Selected Request */}
                        <div className={`group relative transition-all ${isDark ? 'bg-[#0a0a0a] border border-primary shadow-[0_0_10px_rgba(127,19,236,0.3)] rounded-lg p-4' : 'cursor-pointer bg-white border-2 border-primary rounded-sm p-4 hover:shadow-md'}`}>
                            <div className={`absolute top-0 right-0 ${isDark ? 'p-2' : 'bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-sm'}`}>
                                {isDark ? (
                                    <span className="flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                                        <span className="size-1.5 rounded-full bg-white animate-pulse"></span> Targeted
                                    </span>
                                ) : 'SELECTED'}
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <span className={`font-mono text-xs font-bold ${isDark ? 'text-[#9d4dff] mb-0.5' : 'text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm border border-blue-100'}`}>
                                    {isDark ? 'ID: ' : ''}REQ-301
                                </span>
                                {!isDark && <span className="text-xs text-slate-500 font-mono">High Priority</span>}
                            </div>
                            <h4 className={`font-bold leading-tight ${isDark ? 'text-white text-lg mb-2' : 'text-slate-900 text-lg mb-1'}`}>
                                {isDark ? 'Hope Shelter' : 'Needs: 15-25kg Meals'}
                            </h4>

                            {isDark && (
                                <div className="bg-[#1a1a1a] rounded p-2 border border-white/5 mb-3">
                                    <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Needs</p>
                                    <p className="text-sm text-gray-200">Prepared Meals (Hot/Cold), 40-60 servings for dinner service.</p>
                                </div>
                            )}

                            <div className={`flex items-center gap-4 text-sm mb-3 ${isDark ? 'justify-between mt-1 text-xs text-gray-400 font-mono' : 'text-slate-600'}`}>
                                <div className={`flex items-center gap-1 ${isDark ? 'text-[#00ff9d]' : ''}`}>
                                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'near_me' : 'pin_drop'}</span>
                                    <span>{isDark ? '2.5km away' : 'Sector 5, Slum Area B'}</span>
                                </div>
                                {isDark && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">timer</span>
                                        Expires: 2h
                                    </div>
                                )}
                            </div>

                            {!isDark && (
                                <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1.5 rounded-sm border border-emerald-100 inline-block mb-3">
                                    Match Score: 98%
                                </div>
                            )}
                        </div>

                        {/* Normal Request */}
                        <div className={`group relative transition-all ${isDark ? 'bg-[#0a0a0a]/50 border border-[#333] hover:border-gray-600 rounded-lg p-4' : 'cursor-pointer bg-white border border-slate-200 rounded-sm p-4 hover:border-slate-400 opacity-60 hover:opacity-100'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`font-mono text-xs font-bold ${isDark ? 'text-gray-500 mb-0.5' : 'text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm border border-blue-100'}`}>
                                    {isDark ? 'ID: ' : ''}REQ-302
                                </span>
                                {!isDark && <span className="text-xs text-slate-400 font-mono">Medium Priority</span>}
                            </div>
                            <h4 className={`font-bold leading-tight ${isDark ? 'text-gray-200 text-base mb-2' : 'text-slate-700 text-lg mb-1'}`}>
                                {isDark ? 'Community Kitchen' : 'Needs: 10kg Vegetables'}
                            </h4>

                            {isDark && (
                                <div className="bg-black/30 rounded p-2 border border-white/5 mb-3">
                                    <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Needs</p>
                                    <p className="text-sm text-gray-400">Raw Ingredients: Vegetables, Rice, Oil.</p>
                                </div>
                            )}

                            <div className={`flex items-center gap-4 text-sm mb-3 ${isDark ? 'justify-between mt-1 text-xs text-gray-500 font-mono' : 'text-slate-500'}`}>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'near_me' : 'pin_drop'}</span>
                                    <span>{isDark ? '5.2km away' : 'Sector 1, Orphanage'}</span>
                                </div>
                                {isDark && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">timer</span>
                                        Expires: 12h
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className={`absolute left-1/2 -translate-x-1/2 z-50 w-auto ${isDark ? 'bottom-8 max-w-2xl' : 'bottom-6 min-w-[500px]'}`}>
                <div className={`flex items-center gap-6 ${isDark ? 'bg-[#1a1a1a] border border-primary/50 rounded-xl shadow-[0_0_10px_rgba(127,19,236,0.5)] p-4 backdrop-blur-md' : 'bg-slate-900 rounded-sm shadow-2xl p-2 pl-6 pr-2 justify-between border border-slate-700'}`}>
                    <div className="flex flex-col">
                        <div className={`flex items-center gap-2 text-xs font-mono mb-0.5 ${isDark ? 'text-gray-400' : 'text-slate-400 uppercase tracking-wider'}`}>
                            <span>{isDark ? 'MATCHING:' : 'Proposed Action'}</span>
                            {isDark && (
                                <>
                                    <span className="text-primary font-bold">DON-701</span>
                                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                                    <span className="text-primary font-bold">REQ-301</span>
                                </>
                            )}
                        </div>
                        <div className={`flex items-center gap-2 ${isDark ? '' : 'text-white text-sm font-bold font-mono'}`}>
                            {isDark ? (
                                <>
                                    <span className="size-2 rounded-full bg-[#00ff9d] animate-pulse"></span>
                                    <span className="text-white text-sm font-bold">Optimal Match: 98% Compatibility</span>
                                </>
                            ) : (
                                <>
                                    <span>Match <span className="text-primary font-bold bg-white/10 px-1 rounded-sm">DON-701</span></span>
                                    <span className="material-symbols-outlined text-[14px] text-slate-400">arrow_forward</span>
                                    <span><span className="text-blue-400 font-bold bg-white/10 px-1 rounded-sm">REQ-301</span></span>
                                </>
                            )}
                        </div>
                    </div>
                    {isDark ? (
                        <>
                            <div className="h-8 w-px bg-white/10"></div>
                            <button className="bg-[#00ff9d] hover:bg-emerald-400 text-black font-bold py-2 px-6 rounded-lg transition-all shadow-[0_0_10px_rgba(0,255,157,0.4)] flex items-center gap-2">
                                <span className="material-symbols-outlined">bolt</span>
                                CONFIRM MATCH
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button className="text-slate-400 hover:text-white text-sm font-medium px-3 py-2 transition-colors">Cancel</button>
                            <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-bold px-6 py-2.5 rounded-sm shadow-lg flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                CONFIRM MATCH
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
