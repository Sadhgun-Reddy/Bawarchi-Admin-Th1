import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/ThemeProvider';

export const RolesPermissionsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <div className={`flex flex-col h-full w-full p-6 lg:p-8 gap-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-slate-300 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sm font-mono text-slate-500 uppercase">
                    <span>Admin</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className={`font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>System Settings</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">ROLES & PERMISSIONS</h2>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Manage access levels and security protocols.</p>
                    </div>
                    <button className={`flex items-center gap-2 px-5 py-2.5 font-bold text-sm tracking-wide transition-all ${isDark ? 'bg-primary hover:bg-primary-hover text-white rounded-lg shadow-glow' : 'bg-[#ca2ce2] hover:bg-fuchsia-700 text-white rounded-none uppercase'}`}>
                        <span className="material-symbols-outlined text-[20px]">add_moderator</span>
                        CREATE NEW ROLE
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${isDark ? 'border-[#2d2438] gap-0' : 'border-slate-300 gap-8'}`}>
                <button className={`px-6 py-3 text-sm font-bold border-b-2 relative ${isDark ? 'text-white border-primary' : 'text-slate-900 border-black uppercase tracking-wide'}`}>
                    Roles & Permissions
                    {isDark && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_theme('colors.primary')]"></div>}
                </button>
                <button className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 border-transparent ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700 uppercase tracking-wide'}`}>
                    User Groups
                </button>
                <button className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 border-transparent ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700 uppercase tracking-wide'}`}>
                    API Keys
                </button>
            </div>

            {/* Config Card */}
            <div className={`p-6 relative overflow-hidden group ${isDark ? 'glass-panel rounded-xl' : 'bg-white border border-slate-900 shadow-none rounded-none flex items-end gap-6'}`}>
                {isDark && <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>}

                <div className={`flex ${isDark ? 'flex-wrap items-end gap-6' : 'w-full gap-6'}`}>
                    <div className={`flex-1 ${isDark ? 'min-w-[280px]' : 'max-w-md'}`}>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Select Role to Edit</label>
                        <div className="relative">
                            <select className={`w-full px-4 py-3 font-mono appearance-none outline-none transition-all cursor-pointer ${isDark ? 'bg-[#140f19] border border-slate-700 text-white rounded-lg focus:border-primary focus:ring-1 focus:ring-primary' : 'bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-primary rounded-none h-12'}`}>
                                <option>Content Moderator</option>
                                <option>Super Administrator</option>
                                <option>Support Specialist</option>
                                <option>Finance Manager</option>
                            </select>
                            <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className={`flex-1 ${isDark ? 'min-w-[300px] flex-[2]' : 'max-w-xs'}`}>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Role Description / Last Updated</label>
                        <input type="text" readOnly className={`w-full px-4 py-3 outline-none transition-all ${isDark ? 'bg-[#140f19] border border-slate-700 text-white rounded-lg focus:border-primary focus:ring-1 focus:ring-primary' : 'bg-slate-50 border border-slate-300 text-slate-500 font-mono text-sm h-12 rounded-none'}`} value={isDark ? "Can approve menu items, manage user reviews, and flag inappropriate content." : "24 Oct 2023, 14:30 GMT"} />
                    </div>

                    {!isDark && (
                        <>
                            <div className="flex-1"></div>
                            <button className="h-12 px-6 border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-primary hover:border-primary font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                Duplicate Role
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Matrix Table */}
            <div className={`overflow-hidden ${isDark ? 'glass-panel rounded-xl shadow-2xl' : 'bg-white border border-slate-900 shadow-none'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                                <th className={`py-4 px-6 text-xs font-bold uppercase tracking-wider w-1/3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Permission Module</th>
                                {['View', 'Create', 'Edit', 'Delete', 'Approve'].map(col => (
                                    <th key={col} className={`py-4 px-6 text-xs font-bold uppercase tracking-wider text-center w-32 ${isDark ? 'text-slate-400' : 'text-slate-500 border-l border-slate-200'}`}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                            {/* Row 1 */}
                            <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 ${isDark ? 'bg-slate-800 text-white rounded' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>User Management</p>
                                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Manage platform users & accounts</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" disabled className={checkboxDisabledClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                            </tr>
                            {/* Row 2 */}
                            <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50 bg-slate-50/30'}`}>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 ${isDark ? 'bg-slate-800 text-white rounded' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Caterer / Recipe Content</p>
                                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Vendors, menus, categories</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                            </tr>
                            {/* Row 3 */}
                            <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 ${isDark ? 'bg-slate-800 text-white rounded' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-[20px]">forum</span>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Comment Moderation</p>
                                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>User comments and reviews</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" disabled className={checkboxDisabledClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                            </tr>
                            {/* Row 4 */}
                            <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50 bg-slate-50/30'}`}>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 ${isDark ? 'bg-slate-800 text-white rounded' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-[20px]">settings_applications</span>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>System Configuration</p>
                                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Global settings & integrations</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" disabled className={checkboxDisabledClass(isDark)} /></td>
                            </tr>
                            {/* Row 5 */}
                            <tr className={`group transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 ${isDark ? 'bg-slate-800 text-white rounded' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Food Rescue</p>
                                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Surplus food coordination</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" defaultChecked className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                                <td className={`px-6 text-center ${!isDark && 'border-l border-slate-100'}`}><input type="checkbox" className={checkboxClass(isDark)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination Light Theme */}
                {!isDark && (
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-mono">Showing 5 of 12 permission modules</span>
                        <div className="flex gap-2">
                            <button className="h-8 w-8 flex items-center justify-center border border-slate-300 bg-white text-slate-400 hover:text-[#ca2ce2] disabled:opacity-50">
                                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                            </button>
                            <button className="h-8 w-8 flex items-center justify-center border border-slate-300 bg-white text-slate-900 hover:text-[#ca2ce2]">
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Bar */}
            <div className={`mt-auto flex justify-between items-center p-4 z-20 ${isDark ? 'border-t border-slate-800 bg-[#0a060e]/95 backdrop-blur-sm' : 'bg-white border-t-2 border-slate-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'}`}>
                <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isDark ? 'text-slate-400' : 'text-amber-500'}`}>info</span>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Unsaved changes will affect 12 active users assigned to this role.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg' : 'text-slate-500 hover:text-slate-900'}`}>
                        {isDark ? 'RESET TO DEFAULT' : 'Discard Changes'}
                    </button>
                    <button className={`px-8 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${isDark ? 'bg-[#00ff9d] text-black rounded-lg shadow-[0_0_15px_rgba(0,255,157,0.3)] hover:shadow-[0_0_20px_rgba(0,255,157,0.5)]' : 'bg-[#10B981] hover:bg-emerald-600 text-white shadow-none'}`}>
                        {!isDark && <span className="material-symbols-outlined text-[18px]">save</span>}
                        Save Permissions
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper for consistent checkbox styling based on theme
function checkboxClass(isDark: boolean) {
    if (isDark) {
        return "size-5 rounded border-2 border-slate-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer accent-primary";
    }
    return "h-5 w-5 border-2 border-slate-300 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#ca2ce2] rounded-none";
}

function checkboxDisabledClass(isDark: boolean) {
    if (isDark) {
        return "size-5 rounded border-2 border-slate-800 bg-slate-900 cursor-not-allowed opacity-50";
    }
    return "h-5 w-5 text-slate-200 bg-slate-100 border-2 border-slate-200 cursor-not-allowed rounded-none";
}
