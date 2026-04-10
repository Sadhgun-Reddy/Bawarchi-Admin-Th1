import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';

export const PlatformSettingsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <div className={`flex flex-col h-full w-full p-6 lg:p-8 gap-8 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-300 dark:border-white/10">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight uppercase mb-1">SYSTEM SETTINGS</h2>
                    <p className={`font-mono text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>CONFIGURATION MODULE // PLATFORM_CORE</p>
                </div>
                <div className="flex gap-3">
                    <button className={`flex items-center justify-center px-6 py-2.5 rounded text-sm font-medium transition-all ${isDark ? 'text-slate-400 hover:text-white border border-white/20 hover:border-white/50' : 'text-slate-600 border border-slate-300 hover:bg-slate-50'}`}>
                        Discard Changes
                    </button>
                    <button className={`flex items-center justify-center px-6 py-2.5 rounded text-sm font-bold tracking-wide transition-all ${isDark ? 'bg-[#00ff9d] hover:bg-[#00ff9d]/90 text-black shadow-[0_0_15px_#00ff9d40]' : 'bg-black hover:bg-gray-800 text-white'}`}>
                        <span className="material-symbols-outlined text-[18px] mr-2">save</span>
                        Save Configuration
                    </button>
                </div>
            </div>

            <div className="flex border-b border-slate-300 dark:border-white/10 mb-2 overflow-x-auto">
                <button className={`px-6 py-3 border-b-2 font-medium text-sm flex items-center gap-2 relative ${isDark ? 'border-primary text-white' : 'border-black text-black'}`}>
                    <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                    General / Platform
                </button>
                <button className={`px-6 py-3 border-b-2 border-transparent font-medium text-sm transition-all flex items-center gap-2 ${isDark ? 'text-slate-500 hover:text-slate-300 hover:border-white/20' : 'text-slate-500 hover:text-slate-700'}`}>
                    <span className="material-symbols-outlined text-[18px]">security</span>
                    Security
                </button>
                <button className={`px-6 py-3 border-b-2 border-transparent font-medium text-sm transition-all flex items-center gap-2 ${isDark ? 'text-slate-500 hover:text-slate-300 hover:border-white/20' : 'text-slate-500 hover:text-slate-700'}`}>
                    <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                    Notifications
                </button>
                <button className={`px-6 py-3 border-b-2 border-transparent font-medium text-sm transition-all flex items-center gap-2 ${isDark ? 'text-slate-500 hover:text-slate-300 hover:border-white/20' : 'text-slate-500 hover:text-slate-700'}`}>
                    <span className="material-symbols-outlined text-[18px]">api</span>
                    API Keys
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                {/* Left Column: Platform Identity */}
                <div className={`rounded-xl p-6 relative overflow-hidden ${isDark ? 'glass-panel' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                        <div className={`p-2 rounded ${isDark ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                            <span className="material-symbols-outlined">dns</span>
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wide">Platform Identity</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="group/input">
                            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-primary' : 'text-slate-500'}`}>Platform Name</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-500 material-symbols-outlined text-[20px]">language</span>
                                <input type="text" defaultValue="CaterConnect India" className={`w-full rounded px-4 py-3 pl-11 font-mono outline-none transition-all ${isDark ? 'bg-[#0a0a0a] border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder-slate-700' : 'bg-slate-50 border border-slate-300 text-slate-900 focus:border-black focus:ring-1 focus:ring-black placeholder-slate-400'}`} />
                            </div>
                        </div>
                        <div className="group/input">
                            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-primary' : 'text-slate-500'}`}>Support Email Address</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-500 material-symbols-outlined text-[20px]">alternate_email</span>
                                <input type="email" defaultValue="admin@caterconnect.in" className={`w-full rounded px-4 py-3 pl-11 font-mono outline-none transition-all ${isDark ? 'bg-[#0a0a0a] border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder-slate-700' : 'bg-slate-50 border border-slate-300 text-slate-900 focus:border-black focus:ring-1 focus:ring-black placeholder-slate-400'}`} />
                            </div>
                        </div>
                        <div className="group/input">
                            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-primary' : 'text-slate-500'}`}>Default Commission Rate (%)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-500 material-symbols-outlined text-[20px]">percent</span>
                                <input type="number" defaultValue="10.0" className={`w-full rounded px-4 py-3 pl-11 font-mono outline-none transition-all ${isDark ? 'bg-[#0a0a0a] border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder-slate-700' : 'bg-slate-50 border border-slate-300 text-slate-900 focus:border-black focus:ring-1 focus:ring-black placeholder-slate-400'}`} />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2 font-mono ml-1">* Applies to all new vendor registrations by default.</p>
                        </div>
                        <div className="group/input pt-2">
                            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-primary' : 'text-slate-500'}`}>System Timezone</label>
                            <div className="relative">
                                <select className={`w-full rounded px-4 py-3 font-mono outline-none transition-all appearance-none cursor-pointer ${isDark ? 'bg-[#0a0a0a] border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary' : 'bg-slate-50 border border-slate-300 text-slate-900 focus:border-black focus:ring-1 focus:ring-black'}`}>
                                    <option>Asia/Kolkata (IST)</option>
                                    <option>UTC</option>
                                    <option>America/New_York (EST)</option>
                                </select>
                                <span className="absolute right-4 top-3.5 text-slate-500 material-symbols-outlined text-[20px] pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: System Toggles */}
                <div className={`rounded-xl p-6 relative overflow-hidden ${isDark ? 'glass-panel' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                        <div className={`p-2 rounded ${isDark ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                            <span className="material-symbols-outlined">toggle_on</span>
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wide">System Controls</h3>
                    </div>
                    <div className="space-y-6">
                        {/* Toggle Item 1 */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isDark ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-500 material-symbols-outlined">build</div>
                                <div>
                                    <h4 className="text-sm font-medium">Maintenance Mode</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">Disables frontend access for users.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isDark ? 'bg-slate-800 peer-checked:bg-primary' : 'bg-slate-300 peer-checked:bg-black'}`}></div>
                            </label>
                        </div>

                        {/* Toggle Item 2 */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isDark ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-500 material-symbols-outlined">volunteer_activism</div>
                                <div>
                                    <h4 className="text-sm font-medium">Auto-Approve Food Donations</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">Bypasses manual verification step.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isDark ? 'bg-slate-800 peer-checked:bg-primary' : 'bg-slate-300 peer-checked:bg-black'}`}></div>
                            </label>
                        </div>

                        {/* Toggle Item 3 (Active) */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isDark ? 'border-primary/40 bg-primary/5 shadow-[0_0_10px_rgba(139,92,246,0.1)]' : 'border-black bg-slate-50'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`${isDark ? 'text-primary' : 'text-black'} material-symbols-outlined`}>gavel</div>
                                <div>
                                    <h4 className="text-sm font-bold">Enable Public Moderation Queue</h4>
                                    <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-primary/70' : 'text-slate-500'}`}>Community flagging system active.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isDark ? 'bg-slate-800 peer-checked:bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]' : 'bg-slate-300 peer-checked:bg-black'}`}></div>
                            </label>
                        </div>

                        {/* Toggle Item 4 */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isDark ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-500 material-symbols-outlined">cloud_sync</div>
                                <div>
                                    <h4 className="text-sm font-medium">Real-time Order Sync</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">Websocket connections for kitchens.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isDark ? 'bg-slate-800 peer-checked:bg-primary' : 'bg-slate-300 peer-checked:bg-black'}`}></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
