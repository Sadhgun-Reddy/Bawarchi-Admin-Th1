import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/ThemeProvider';
import { useParams, Link } from 'react-router-dom';

export const RequestDetailPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const { id } = useParams<{ id: string }>();
    const reqId = id || 'REQ-301';

    return (
        <div className={`flex flex-col h-full w-full transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'} relative`}>
            {/* Header */}
            <div className={`px-8 py-5 flex items-center justify-between shrink-0 border-b ${isDark ? 'border-slate-800 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-20' : 'bg-white border-slate-300'}`}>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1 font-mono">
                        <Link to="/admin/food-rescue/requests" className={`hover:text-primary transition-colors flex items-center gap-1 font-medium`}>
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            BACK TO PENDING
                        </Link>
                        <span>{isDark ? '|' : '/'}</span>
                        {isDark ? (
                            <span className="text-xs font-mono text-slate-500">SYS_TIME: 14:02:55 UTC</span>
                        ) : (
                            <span className="text-slate-800 font-bold">{reqId}</span>
                        )}
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                        <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase">REVIEW REQUEST: <span className={isDark ? "text-[#0df259] font-mono" : ""}>{reqId}</span></h2>
                        <span className={`px-3 py-0.5 text-xs font-bold rounded uppercase tracking-wider flex items-center gap-2 ${isDark ? 'border border-[#ff9100]/30 bg-[#ff9100]/10 text-[#ff9100] shadow-[0_0_10px_rgba(255,145,0,0.4)]' : 'bg-[#f0fdf0] text-green-800 border border-green-200'}`}>
                            {isDark && <span className="w-1.5 h-1.5 rounded-full bg-[#ff9100] animate-pulse"></span>}
                            [ PENDING REVIEW ]
                        </span>
                    </div>
                    {isDark && <p className="text-slate-400 font-mono text-sm mt-1">Submitted via Mobile App • IP: 192.168.4.22 • <span className="text-slate-500">10 mins ago</span></p>}
                </div>
                <div className="flex items-center gap-4">
                    {isDark ? (
                        <>
                            <div className="relative">
                                <span className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer">notifications</span>
                                <span className="absolute top-0 right-0 size-2 bg-[#ff003c] rounded-full animate-pulse"></span>
                            </div>
                            <div className="h-8 w-[1px] bg-slate-700"></div>
                            <button className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full pl-2 pr-4 py-1 transition-all">
                                <div className="bg-primary/20 p-1 rounded-full">
                                    <span className="material-symbols-outlined text-[#0df259] text-sm">security</span>
                                </div>
                                <span className="text-xs font-bold text-white tracking-wider">SECURE ACCESS</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Request Details (2/3) */}
                    <div className="lg:w-2/3 flex flex-col gap-6">

                        {/* Main Detail Card */}
                        <div className={`rounded-sm overflow-hidden border ${isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-900'}`}>
                            <div className={`px-6 py-3 border-b flex justify-between items-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                <h3 className={`font-bold uppercase tracking-wide flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800 text-sm'}`}>
                                    {isDark && <span className="material-symbols-outlined text-[#0df259]">feed</span>}
                                    {isDark ? 'REQUEST DETAILS' : 'Request Information'}
                                </h3>
                                <span className={`text-xs font-mono ${isDark ? 'text-slate-500 border border-slate-800 px-2 py-0.5 rounded' : 'text-slate-500'}`}>ID: 8849-ABX</span>
                            </div>

                            <div className={isDark ? "p-6 grid gap-8" : "p-0"}>
                                {/* Grid Layout for Details */}
                                <div className={isDark ? "flex flex-col gap-8" : "grid grid-cols-1 md:grid-cols-2"}>

                                    {/* Requester Info */}
                                    <div className={isDark ? "flex items-start gap-5" : "p-6 border-b md:border-b-0 md:border-r border-slate-100"}>
                                        {!isDark && <p className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Requester</p>}

                                        <div className={`flex items-center gap-3 ${isDark ? '' : 'mb-4'}`}>
                                            <div className={`${isDark ? 'size-16 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0' : 'w-10 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-slate-500'}`}>
                                                <span className="material-symbols-outlined">{isDark ? 'apartment' : 'storefront'}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className={`font-bold ${isDark ? 'text-white text-xl' : 'text-slate-900'}`}>{isDark ? 'Hope Shelter Foundation' : 'Community Kitchen #402'}</h4>
                                                    {isDark && <span className="material-symbols-outlined text-blue-400 text-sm" title="Verified NGO">verified</span>}
                                                </div>
                                                <div className={`flex flex-wrap gap-4 text-sm ${isDark ? 'text-slate-400 mb-3' : 'text-slate-500'}`}>
                                                    <div className="flex items-center gap-1">
                                                        {isDark && <span className="material-symbols-outlined text-xs">category</span>}
                                                        <span>{isDark ? 'Registered NGO' : 'Verified Partner'}</span>
                                                    </div>
                                                    {isDark && (
                                                        <>
                                                            <div className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-xs">call</span>
                                                                <span className="font-mono">+91 98765 43210</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-xs">mail</span>
                                                                <span>contact@hopeshelter.org</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                {isDark && (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800/50 border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer transition-colors group">
                                                        <span className="material-symbols-outlined text-red-400 text-sm group-hover:text-red-300">picture_as_pdf</span>
                                                        <span>View NGO_Reg_Cert_2023.pdf</span>
                                                        <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {!isDark && (
                                            <>
                                                <p className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider mt-6">Contact Person</p>
                                                <p className="font-medium text-slate-800">Sarah Jenkins (ID: SJ-99)</p>
                                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">call</span>
                                                    +1 (555) 123-4567
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    {/* Request Specs */}
                                    <div className={isDark ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "p-6"}>
                                        {!isDark && <p className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Request Specs</p>}

                                        {isDark ? (
                                            <>
                                                <div className="bg-[#121212] border border-slate-800 rounded-lg p-4 flex flex-col gap-1 relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                                        <span className="material-symbols-outlined text-4xl">restaurant</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 font-mono uppercase">Requirement</p>
                                                    <p className="text-lg font-medium text-white">Standard Veg Meals</p>
                                                    <div className="mt-2 flex gap-1">
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">No Onion</span>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">No Garlic</span>
                                                    </div>
                                                </div>
                                                <div className="bg-[#121212] border border-slate-800 rounded-lg p-4 flex flex-col gap-1 relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                                        <span className="material-symbols-outlined text-4xl">groups</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 font-mono uppercase">Headcount</p>
                                                    <p className="text-3xl font-bold text-[#0df259] font-mono">50</p>
                                                    <p className="text-xs text-slate-400">Estimated servings</p>
                                                </div>
                                                <div className="bg-[#ff003c]/10 border border-[#ff003c]/30 rounded-lg p-4 flex flex-col gap-1 relative overflow-hidden group shadow-[0_0_10px_rgba(255,0,60,0.3)]">
                                                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-30 transition-opacity">
                                                        <span className="material-symbols-outlined text-[#ff003c] text-4xl">timer</span>
                                                    </div>
                                                    <p className="text-xs text-[#ff003c] font-mono uppercase font-bold">Urgency: CRITICAL</p>
                                                    <p className="text-lg font-bold text-white">Today, 20:00</p>
                                                    <p className="text-xs text-red-300/80">~ 5 hours remaining</p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col gap-3 mt-2">
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                                    <span className="text-slate-600 text-sm">Quantity</span>
                                                    <span className="font-bold text-slate-900">50 Servings</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                                    <span className="text-slate-600 text-sm">Dietary</span>
                                                    <span className="font-bold text-slate-900">Vegetarian, Hot Meals</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                                    <span className="text-slate-600 text-sm">Time Window</span>
                                                    <span className="font-bold text-slate-900">14:00 - 16:00 Today</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-2">
                                                    <span className="text-slate-600 text-sm">Logistics</span>
                                                    <span className="font-bold text-slate-900">Van Required</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className={isDark ? "" : "border-t border-slate-100 p-6 bg-slate-50/50"}>
                                    {isDark && <p className="text-xs text-slate-500 font-mono uppercase mb-3">Delivery Logistics</p>}
                                    <div className={isDark ? "rounded-lg border border-slate-700 overflow-hidden flex flex-col md:flex-row bg-[#121212]" : "flex items-start gap-4"}>

                                        {/* Map Placeholder */}
                                        <div className={isDark ? "w-full md:w-1/3 h-32 bg-slate-800 relative group cursor-pointer" : "mt-1 text-slate-400"}>
                                            {isDark ? (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-black/70 backdrop-blur-sm p-2 rounded-full border border-[#0df259]/50 text-[#0df259] animate-pulse">
                                                        <span className="material-symbols-outlined">location_on</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="material-symbols-outlined">location_on</span>
                                            )}
                                        </div>

                                        <div className={isDark ? "p-4 flex-1 flex flex-col justify-center" : "flex-1"}>
                                            {!isDark && <p className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Delivery Address</p>}

                                            <div className={isDark ? "flex items-start gap-3" : ""}>
                                                {isDark && <span className="material-symbols-outlined text-slate-500 mt-1">pin_drop</span>}
                                                <div>
                                                    <p className={`font-bold ${isDark ? 'text-white text-base' : 'text-slate-900 text-lg'}`}>{isDark ? 'Sector 4, Community Center Hall' : '123 Civic Center Blvd'}</p>
                                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                                        {isDark ? 'Near City Park, New Delhi, 110001' : 'Metro City, ST 90210 • '}
                                                        {!isDark && <span className="text-slate-500 text-sm">Loading Dock B</span>}
                                                    </p>
                                                    {isDark && (
                                                        <div className="mt-2 flex items-center gap-2 text-xs text-[#0df259]">
                                                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                                                            <span>Large Van Access Available</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {!isDark && (
                                            <button className="text-[#13ec13] hover:text-green-600 text-sm font-bold flex items-center gap-1">
                                                VIEW MAP <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents Section (Light Mode only based on references) */}
                        {!isDark && (
                            <div className="bg-white border border-slate-900 rounded-sm overflow-hidden">
                                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                                    <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wide">Attachments</h3>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-red-50 text-red-600 border border-red-100 rounded flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                <span className="material-symbols-outlined">picture_as_pdf</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 group-hover:underline">Food_Safety_Cert_2023.pdf</p>
                                                <p className="text-xs text-slate-500">1.2 MB • Uploaded 2 hours ago</p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-800">visibility</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AI Analysis (Dark Mode only) */}
                        {isDark && (
                            <div className="glass-card rounded-xl p-4 border-l-4 border-l-[#0df259] flex items-center justify-between bg-black/40">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0df259]/10 p-2 rounded-full">
                                        <span className="material-symbols-outlined text-[#0df259]">psychology</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">System Confidence Score</p>
                                        <p className="text-xs text-slate-400">Based on past requests from this NGO</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-mono font-bold text-[#0df259]">98.5%</p>
                                    <p className="text-[10px] text-[#0df259]/70 uppercase tracking-wider">High Trust</p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Verification Console (1/3) */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        <div className={`rounded-sm shadow-sm sticky top-0 flex flex-col h-full ${isDark ? 'glass-card border-t-2 border-t-[#0df259] rounded-xl' : 'bg-white border border-slate-900'}`}>

                            <div className={`px-6 py-4 flex items-center gap-2 border-b ${isDark ? 'border-white/10 bg-white/5' : 'bg-slate-900 text-white'}`}>
                                <span className={`material-symbols-outlined ${isDark ? 'text-slate-400' : 'text-[#13ec13]'}`}>{isDark ? 'fact_check' : 'verified_user'}</span>
                                <h3 className="font-bold uppercase tracking-wider">Admin Verification</h3>
                            </div>

                            <div className="p-6 flex flex-col gap-6 flex-1">
                                {/* Checklist */}
                                <div className="space-y-4">
                                    {!isDark && <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Pre-Approval Checks</p>}

                                    <label className={`flex items-start gap-3 cursor-pointer group rounded transition-colors ${isDark ? 'p-3 bg-slate-900/50 border border-slate-800 hover:border-slate-600' : ''}`}>
                                        <input type="checkbox" defaultChecked className={isDark ? "mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-[#0df259] focus:ring-[#0df259]/50 focus:ring-offset-0 transition-all accent-[#0df259]" : "mt-1 w-5 h-5 rounded border-2 border-slate-300 text-[#13ec13] focus:ring-[#13ec13] focus:ring-offset-0 cursor-pointer transition-colors accent-[#13ec13]"} />
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-medium ${isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                {isDark ? 'NGO Certificate Valid' : 'Verify 501(c)(3) Status'}
                                            </span>
                                            {isDark && <span className="text-xs text-slate-500 mt-1">Verified against national registry database.</span>}
                                        </div>
                                    </label>

                                    <label className={`flex items-start gap-3 cursor-pointer group rounded transition-colors ${isDark ? 'p-3 bg-slate-900/50 border border-slate-800 hover:border-slate-600' : ''}`}>
                                        <input type="checkbox" defaultChecked className={isDark ? "mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-[#0df259] focus:ring-[#0df259]/50 focus:ring-offset-0 transition-all accent-[#0df259]" : "mt-1 w-5 h-5 rounded border-2 border-slate-300 text-[#13ec13] focus:ring-[#13ec13] focus:ring-offset-0 cursor-pointer transition-colors accent-[#13ec13]"} />
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-medium ${isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                {isDark ? 'Headcount Confirmed' : 'Check Delivery Radius (Within 10km)'}
                                            </span>
                                            {isDark && <span className="text-xs text-slate-500 mt-1">Phone call verification completed.</span>}
                                        </div>
                                    </label>

                                    <label className={`flex items-start gap-3 cursor-pointer group rounded transition-colors ${isDark ? 'p-3 bg-slate-900/50 border border-slate-800 hover:border-slate-600' : ''}`}>
                                        <input type="checkbox" className={isDark ? "mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-[#0df259] focus:ring-[#0df259]/50 focus:ring-offset-0 transition-all accent-[#0df259]" : "mt-1 w-5 h-5 rounded border-2 border-slate-300 text-[#13ec13] focus:ring-[#13ec13] focus:ring-offset-0 cursor-pointer transition-colors accent-[#13ec13]"} />
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-medium ${isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                {isDark ? 'Location Accessible' : 'Confirm Volunteer Availability'}
                                            </span>
                                            {isDark && <span className="text-xs text-slate-500 mt-1">Route map checked for logistics vehicle.</span>}
                                        </div>
                                    </label>

                                    {!isDark && (
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-2 border-slate-300 text-[#13ec13] focus:ring-[#13ec13] focus:ring-offset-0 cursor-pointer transition-colors accent-[#13ec13]" />
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Safety Certificate Valid</span>
                                        </label>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <p className={`text-xs uppercase font-bold tracking-wider mb-2 ${isDark ? 'text-slate-400 font-mono' : 'text-slate-400'}`}>{isDark ? 'Admin Remarks / Terminal' : 'Internal Notes'}</p>
                                    <textarea
                                        className={`w-full text-sm rounded outline-none resize-none transition-all ${isDark ? 'bg-black border border-slate-700 p-3 font-mono text-[#0df259] placeholder-slate-700 focus:border-[#0df259] focus:ring-1 focus:ring-[#0df259] min-h-[100px]' : 'bg-slate-50 border border-slate-300 p-3 focus:border-[#13ec13] focus:ring-1 focus:ring-[#13ec13] min-h-[120px] font-mono'}`}
                                        placeholder={isDark ? "> Enter routing instructions or rejection reason..." : "Add notes about this request verification..."}
                                    ></textarea>
                                </div>

                                {/* Actions */}
                                <div className={`mt-auto pt-4 flex flex-col gap-3 ${isDark ? 'border-t border-dashed border-slate-800' : 'border-t border-slate-100'}`}>
                                    <button className={`w-full py-3 font-bold rounded shadow-sm flex items-center justify-center gap-2 transition-all group ${isDark ? 'bg-[#0df259] hover:bg-green-400 text-black shadow-[0_0_15px_rgba(13,242,89,0.4)] hover:shadow-[0_0_25px_rgba(13,242,89,0.6)]' : 'bg-[#13ec13] hover:bg-green-400 text-slate-900 active:scale-[0.98]'}`}>
                                        <span className={`material-symbols-outlined ${isDark ? 'group-hover:scale-110 transition-transform' : ''}`}>check_circle</span>
                                        APPROVE FOR MATCHING
                                    </button>
                                    <button className={`w-full py-3 font-bold rounded shadow-sm flex items-center justify-center gap-2 transition-all group ${isDark ? 'bg-transparent border border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c] hover:text-white' : 'bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300'}`}>
                                        <span className={`material-symbols-outlined ${isDark ? 'group-hover:rotate-90 transition-transform' : ''}`}>cancel</span>
                                        REJECT REQUEST
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Helper Info (Light Mode only) */}
                        {!isDark && (
                            <div className="bg-blue-50 border border-blue-100 rounded p-4 flex gap-3">
                                <span className="material-symbols-outlined text-blue-600 shrink-0">info</span>
                                <div className="text-sm text-blue-800">
                                    <p className="font-bold mb-1">Matching Algorithm</p>
                                    <p>Once approved, the system will automatically match this request with available donors within a 15km radius based on "Vegetarian" criteria.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
