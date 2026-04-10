import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../components/ThemeProvider';
import { BlogPostSubmission } from '../types';

export const BlogReviewPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [remarks, setRemarks] = useState('');
    const [checklist, setChecklist] = useState({
        plagiarism: true,
        highRes: true,
        formatting: false,
        categoryCorrect: false
    });

    const MOCK_POST: BlogPostSubmission = {
        id: postId || 'BLG-882',
        title: '5 Secrets to a Perfect Biryani',
        excerpt: 'Biryani is not just a dish; it is an emotion...',
        caterer: { name: 'Royal Bawarchi', initials: 'RB', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyqO-MQx5aXR_Kl0Rnhl0Ugo1Samc3eov0dn4UfvUfSB1uHjxPocHcAharGd-om8wi45t2bycHrDLX0F4VmlCaBkJWmQBBOiPIA5tpqzFHvT-FKOmAZvYhwBb6OQ5MytghEDQMqi03ReILqym5lCMa5Q9HVpXeyafGFilWNXGB7MInRe-dzLH86s6gItNNxceLouMxYI_qjJTUBFBcQr3t1VEp7r2X0WwumE1mCJWvyQwGjbIs1E70nM8FA0IgIPHPZobk2LfFqQ' },
        category: 'RECIPES',
        submittedDate: '2023-10-24T14:30:00Z',
        status: 'PENDING'
    };

    const handleAction = (action: string) => {
        console.log(`Action: ${action} for post ${MOCK_POST.id}`);
        navigate('/admin/moderation/blog');
    };

    if (isDark) {
        return (
            <div className="relative min-h-full w-full p-6 lg:p-8 transition-colors duration-300 bg-[#050505]">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full gap-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <button onClick={() => navigate('/admin/moderation/blog')} className="hover:text-[#0df20d] transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                Queue
                            </button>
                            <span>/</span>
                            <span className="text-slate-300">{MOCK_POST.id}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3 font-display">
                                REVIEW POST: <span className="font-mono font-normal text-white/70">{MOCK_POST.id}</span>
                            </h2>
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#ff9f1c]/10 border border-[#ff9f1c]/30 rounded-full shadow-[0_0_15px_rgba(255,159,28,0.15)]">
                                <span className="w-2 h-2 rounded-full bg-[#ff9f1c] animate-pulse"></span>
                                <span className="text-xs font-bold text-[#ff9f1c] tracking-wider" style={{ textShadow: '0 0 10px rgba(255, 159, 28, 0.5)' }}>PENDING REVIEW</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col lg:flex-row gap-6">
                        {/* Preview */}
                        <div className="flex-[2] bg-[#111111]/70 backdrop-blur-[10px] border border-white/5 rounded-xl overflow-hidden flex flex-col relative group">
                            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                                    Live Preview Mode
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 bg-[#0a0a0a] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#050505] [&::-webkit-scrollbar-thumb]:bg-[#333] [&::-webkit-scrollbar-thumb]:rounded">
                                <div className="max-w-3xl mx-auto font-display">
                                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-[#0df20d] border border-[#0df20d]/30 rounded bg-[#0df20d]/5 uppercase">
                                        Main Course
                                    </span>
                                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{MOCK_POST.title}</h1>

                                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                                <img src={MOCK_POST.caterer.logoUrl} alt="Author" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{MOCK_POST.caterer.name}</p>
                                                <p className="text-xs text-slate-400">Posted on Oct 24, 2023 • 5 min read</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full aspect-video bg-[#111111] rounded-lg mb-8 border border-white/10 flex items-center justify-center relative overflow-hidden group/img">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs text-white/70 font-mono backdrop-blur-sm border border-white/10">
                                            IMG_RES: 1920x1080
                                        </div>
                                    </div>

                                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-sans leading-relaxed">
                                        <p className="mb-6">{MOCK_POST.excerpt}</p>
                                        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. The Rice Matters</h3>
                                        <p className="mb-6">Always choose aged Basmati rice. The grains are longer, and they don't stick together. Soak the rice for at least 30 minutes before cooking to ensure the grains expand fully.</p>
                                        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Marination is Key</h3>
                                        <p className="mb-6">The secret to tender, flavorful meat lies in the marination. Use yogurt as a tenderizer along with ginger-garlic paste, fried onions (birista), and whole spices. Let it sit overnight for the best results.</p>
                                        <div className="p-4 border-l-4 border-[#0df20d] bg-[#0df20d]/5 italic my-8">
                                            "Patience is the most important ingredient in a Biryani." - Chef's Note
                                        </div>
                                        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. The Dum Technique</h3>
                                        <p className="mb-6">'Dum' implies cooking under pressure. Seal your pot with dough or a heavy lid to trap the steam. This slow-cooking process allows the flavors of the meat to infuse into the rice perfectly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex-1 min-w-[320px] lg:max-w-[400px] flex flex-col gap-4 font-display">
                            {/* Checklist */}
                            <div className="bg-[#111111]/70 backdrop-blur-[10px] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">fact_check</span> Quality Assurance
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { key: 'plagiarism', label: 'No Plagiarism Detected' },
                                        { key: 'highRes', label: 'High-Res Images (>1080p)' },
                                        { key: 'formatting', label: 'Formatting Guidelines Met' },
                                        { key: 'categoryCorrect', label: 'Category Tags Correct' }
                                    ].map(item => (
                                        <label key={item.key} className="flex items-center gap-3 group cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={(checklist as any)[item.key]}
                                                onChange={(e) => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))}
                                                className="form-checkbox rounded border-slate-600 bg-black/50 text-[#0df20d] focus:ring-[#0df20d] focus:ring-offset-black transition-all"
                                            />
                                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Remarks */}
                            <div className="bg-[#111111]/70 backdrop-blur-[10px] border border-white/5 rounded-xl p-5 flex-1 flex flex-col focus-within:shadow-[0_0_15px_rgba(13,242,13,0.2)] focus-within:border-[#0df20d] transition-all duration-300">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">terminal</span> Admin Remarks
                                    </h3>
                                    <span className="text-[10px] text-slate-600 font-mono">MD-SYNTAX: ON</span>
                                </div>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full flex-1 bg-black/30 border border-white/10 rounded-lg p-3 text-sm font-mono text-[#0df20d] placeholder-slate-700 focus:outline-none focus:border-[#0df20d]/50 focus:bg-black/50 resize-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#333] [&::-webkit-scrollbar-thumb]:rounded transition-colors"
                                    placeholder="> Enter feedback for the author..."
                                />
                                <div className="flex justify-end mt-2">
                                    <span className="text-[10px] text-slate-600">{remarks.length}/500 chars</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bg-[#111111]/70 backdrop-blur-[10px] border border-white/5 rounded-xl p-5 flex flex-col gap-3">
                                <button onClick={() => handleAction('APPROVE')} className="w-full py-3 px-4 bg-[#0df20d] text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#3aff3a] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(13,242,13,0.3)] hover:shadow-[0_0_30px_rgba(13,242,13,0.5)]">
                                    <span className="material-symbols-outlined font-bold">check_circle</span> APPROVE POST
                                </button>
                                <button onClick={() => handleAction('CHANGES')} className="w-full py-3 px-4 bg-transparent border border-[#ff9f1c] text-[#ff9f1c] font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#ff9f1c]/10 active:scale-[0.98] transition-all">
                                    <span className="material-symbols-outlined">edit_note</span> REQUEST CHANGES
                                </button>
                                <button onClick={() => handleAction('REJECT')} className="w-full py-3 px-4 bg-transparent border border-[#ff4040] text-[#ff4040] font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#ff4040]/10 active:scale-[0.98] transition-all opacity-70 hover:opacity-100">
                                    <span className="material-symbols-outlined">cancel</span> REJECT POST
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Light Mode (Screen 10 interpretation)
    return (
        <div className="relative min-h-full w-full p-6 lg:p-8 transition-colors duration-300 bg-[#f1f5f9] font-display">
            <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6 h-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-300">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Review Post: {MOCK_POST.id}</h2>
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs font-mono font-bold uppercase rounded-sm">
                                [Pending Review]
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 font-mono">Submitted: {MOCK_POST.submittedDate}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/admin/moderation/blog')} className="px-3 py-1.5 text-xs font-mono font-bold uppercase border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 rounded-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-6 items-start">
                    {/* Content Preview */}
                    <div className="flex-[2] bg-white border border-[#1e293b] shadow-sm w-full h-full flex flex-col">
                        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
                            <span className="text-xs font-mono font-bold text-slate-500 uppercase">Preview Mode: Desktop</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#e2e8f0] [&::-webkit-scrollbar-thumb]:bg-[#94a3b8] hover:[&::-webkit-scrollbar-thumb]:bg-[#64748b]">
                            <span className="inline-block px-3 py-1 bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold uppercase tracking-wider mb-4 rounded-sm">
                                Techniques
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{MOCK_POST.title}</h1>

                            <div className="flex items-center gap-4 mb-8 text-sm text-slate-500 border-y border-slate-100 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">person</span>
                                    <span className="font-medium text-slate-900">{MOCK_POST.caterer.name}</span>
                                </div>
                                <span className="text-slate-300">|</span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                    <span>15 min read</span>
                                </div>
                                <span className="text-slate-300">|</span>
                                <div className="font-mono text-xs">ID: {MOCK_POST.id}</div>
                            </div>

                            <div className="w-full aspect-video bg-slate-200 mb-8 rounded-sm overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-white text-xs font-mono bg-black/50 px-2 py-1">img_src: cdn/spice_cover.jpg</span>
                                </div>
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                    <div className="bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center w-full h-full"></div>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed">
                                <p className="text-lg font-medium text-slate-800 leading-relaxed mb-6">{MOCK_POST.excerpt}</p>
                                <p className="mb-4">When we talk about "tadka" or tempering, we represent a technique that spans centuries. The heat acts as a catalyst, releasing trapped oils from mustard seeds, cumin, and fenugreek.</p>
                                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Oil Temperature</h3>
                                <p className="mb-4">Begin by heating your oil to precisely 350°F (175°C). Too cold, and the spices will simply absorb the grease and become soggy.</p>
                                <div className="bg-slate-50 border-l-4 border-[#7c3aed] p-4 my-6 italic text-slate-700">
                                    "The crackle of mustard seeds is the sound of flavor awakening."
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Moderation Controls */}
                    <div className="flex-1 lg:max-w-[380px] flex flex-col gap-4">
                        <div className="bg-white border border-[#1e293b] p-6 shadow-[4px_4px_0px_0px_#1e293b]">
                            <h3 className="font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#7c3aed]">gavel</span> Actions
                            </h3>

                            <div className="space-y-3 mb-5">
                                {[
                                    { key: 'plagiarism', label: 'Content Policy Compliant', sub: 'No hate speech or harassment.' },
                                    { key: 'formatting', label: 'Formatting Check', sub: 'Headers and paragraphs used correctly.' },
                                    { key: 'highRes', label: 'Media Guidelines', sub: 'Images have alt text and proper attribution.' }
                                ].map(item => (
                                    <label key={item.key} className="flex items-start gap-3 p-2 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-sm cursor-pointer transition-colors group">
                                        <input
                                            type="checkbox"
                                            checked={(checklist as any)[item.key]}
                                            onChange={(e) => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))}
                                            className="mt-1 w-4 h-4 rounded-none text-[#7c3aed] border-slate-400 focus:ring-0 focus:ring-offset-0 focus:border-[#7c3aed] focus:outline-2 focus:outline-offset-[-2px] focus:outline-[#7c3aed] cursor-pointer transition-all"
                                        />
                                        <div>
                                            <span className="block text-sm font-bold text-slate-700 group-hover:text-slate-900">{item.label}</span>
                                            <span className="block text-xs text-slate-500">{item.sub}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-2 mb-4">
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Internal Remarks</label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 text-sm text-slate-800 p-3 font-mono focus:border-[#7c3aed] focus:ring-0 focus:outline-2 focus:outline-offset-[-2px] focus:outline-[#7c3aed] rounded-none resize-none"
                                    rows={5}
                                    placeholder="> Enter feedback for author or internal notes..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                                <button onClick={() => handleAction('APPROVE')} className="col-span-2 bg-[#7c3aed] hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-sm uppercase text-sm tracking-wide shadow-[2px_2px_0px_0px_#4c1d95] active:translate-y-[2px] active:shadow-none transition-all flex justify-center items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">check_circle</span> Approve Post
                                </button>
                                <button onClick={() => handleAction('CHANGES')} className="bg-white border border-slate-900 hover:bg-slate-100 text-slate-900 font-bold py-3 px-4 rounded-sm uppercase text-xs tracking-wide active:bg-slate-200 transition-colors flex justify-center items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">edit_note</span> Request Changes
                                </button>
                                <button onClick={() => handleAction('REJECT')} className="bg-white border border-red-600 hover:bg-red-50 text-red-600 font-bold py-3 px-4 rounded-sm uppercase text-xs tracking-wide active:bg-red-100 transition-colors flex justify-center items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">block</span> Reject
                                </button>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="bg-slate-100 border border-slate-300 p-4">
                            <h4 className="text-xs font-bold uppercase text-slate-500 mb-3">System Meta</h4>
                            <div className="space-y-2 font-mono text-xs text-slate-600">
                                <div className="flex justify-between">
                                    <span>Word Count:</span>
                                    <span className="font-bold">1,240</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Readability:</span>
                                    <span className="font-bold text-green-600">Grade 8 (Good)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sentiment:</span>
                                    <span className="font-bold">Positive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
