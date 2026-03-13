import React from 'react';
import { motion } from 'framer-motion';
import { VerificationState } from './types';

interface VerificationSidebarProps {
    appId: string;
    verificationState: VerificationState;
    onUpdateChecklist: (key: keyof VerificationState['checklist'], value: boolean) => void;
    onUpdateRemarks: (remarks: string) => void;
    onSubmitDecision: (decision: 'APPROVE' | 'REJECT') => void;
    isSubmitting: boolean;
    isDark: boolean;
}

export const VerificationSidebar: React.FC<VerificationSidebarProps> = ({
    appId,
    verificationState,
    onUpdateChecklist,
    onUpdateRemarks,
    onSubmitDecision,
    isSubmitting,
    isDark
}) => {
    const { checklist, remarks } = verificationState;

    const isFullyVerified = Object.values(checklist).every(Boolean);

    const checklistItems: Array<{ key: keyof VerificationState['checklist'], label: string }> = [
        { key: 'fssaiValidated', label: 'FSSAI License Validated' },
        { key: 'addressVerified', label: 'Operating Address Verified' },
        { key: 'hygieneMet', label: 'Hygiene Standards Met' },
        { key: 'photosInspected', label: 'Facility Photos Inspected' }
    ];

    return (
        <div className={`w-full flex flex-col gap-6 sticky top-6
      ${isDark ? 'glass-card p-6' : 'tech-card p-6'}
    `}>
            {/* Header */}
            <h2 className={`text-lg font-bold uppercase tracking-wider flex items-center gap-2
        ${isDark ? 'text-[#8B5CF6] drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]' : 'text-black border-b-2 border-dashed border-black pb-2'}
      `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <span className="material-symbols-outlined">rule</span>
                Verification Audit
            </h2>

            {/* Checklist Group */}
            <div className="flex flex-col gap-4">
                {checklistItems.map((item) => {
                    const isChecked = checklist[item.key];
                    return (
                        <label
                            key={item.key}
                            className={`flex items-start gap-3 cursor-pointer group transition-all duration-200
                ${isDark ? 'hover:bg-white/5 p-2 -mx-2 rounded-sm' : 'hover:bg-gray-50 p-2 -mx-2'}
              `}
                        >
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => onUpdateChecklist(item.key, e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className={`w-5 h-5 transition-all duration-300 flex items-center justify-center
                  ${isDark
                                        ? `border rounded-sm ${isChecked ? 'bg-[#00F5A0] border-[#00F5A0] shadow-[0_0_10px_#00F5A0]' : 'border-gray-500 bg-transparent group-hover:border-[#8B5CF6]'}`
                                        : `border-2 sharp-corners ${isChecked ? 'bg-[#7C3AED] border-[#7C3AED]' : 'bg-white border-black group-hover:border-[#7C3AED]'}`
                                    }
                `}>
                                    {isChecked && (
                                        <span className={`material-symbols-outlined text-[16px] font-bold ${isDark ? 'text-black' : 'text-white'}`}>check</span>
                                    )}
                                </div>
                            </div>
                            <span className={`text-sm font-medium transition-colors select-none
                ${isDark
                                    ? (isChecked ? 'text-white' : 'text-gray-400 group-hover:text-gray-200')
                                    : (isChecked ? 'text-black' : 'text-gray-600')
                                }
              `}>
                                {item.label}
                            </span>
                        </label>
                    )
                })}
            </div>

            {/* Admin Remarks Input */}
            <div className="flex flex-col gap-2 mt-2">
                <label className={`text-xs uppercase font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Admin Remarks</label>
                <textarea
                    rows={4}
                    value={remarks}
                    onChange={(e) => onUpdateRemarks(e.target.value)}
                    placeholder="Enter audit notes here..."
                    className={`w-full p-3 text-sm font-mono resize-y outline-none transition-colors
            ${isDark
                            ? 'bg-black/50 border border-[#8B5CF6]/40 text-white placeholder-gray-600 focus:border-[#8B5CF6] focus:shadow-[0_0_10px_rgba(139,92,246,0.2)] rounded-sm'
                            : 'bg-white border border-black text-black placeholder-gray-400 focus:ring-1 focus:ring-[#7C3AED] sharp-corners'
                        }
          `}
                />
            </div>

            {/* Review Action Group */}
            <div className="flex flex-col gap-3 mt-4">
                <motion.button
                    animate={{
                        opacity: isFullyVerified ? 1 : 0.5,
                        scale: isFullyVerified ? 1 : 0.98,
                    }}
                    disabled={!isFullyVerified || isSubmitting}
                    onClick={() => onSubmitDecision('APPROVE')}
                    className={`w-full py-3.5 flex justify-center items-center gap-2 font-bold uppercase tracking-wider transition-all duration-300 outline-none
            ${isDark
                            ? `bg-[#00F5A0] text-black ${isFullyVerified ? 'shadow-[0_0_15px_#00F5A0] hover:bg-[#00d68f]' : ''} rounded-sm`
                            : `bg-[#22C55E] text-black border-2 border-transparent sharp-corners ${isFullyVerified ? 'hover:brightness-95 hover:border-black' : ''}`
                        }
          `}
                >
                    {isSubmitting ? (
                        <span className="font-mono flex items-center gap-2">
                            <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                            PROCESSING...
                        </span>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[20px]">verified</span>
                            Approve Caterer
                        </>
                    )}
                </motion.button>

                <button
                    disabled={isSubmitting}
                    onClick={() => onSubmitDecision('REJECT')}
                    className={`w-full py-3.5 flex justify-center items-center gap-2 font-bold uppercase tracking-wider transition-all duration-300 outline-none
            ${isDark
                            ? 'bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 hover:shadow-[0_0_10px_#EF4444] rounded-sm'
                            : 'bg-[#EF4444] text-white border-2 border-transparent hover:border-black sharp-corners'
                        }
          `}
                >
                    <span className="material-symbols-outlined text-[20px]">block</span>
                    Reject Application
                </button>
            </div>

            {/* Review Meta Footer */}
            <div className={`mt-4 pt-4 flex flex-col gap-1 text-[11px] font-mono
        ${isDark ? 'border-t border-white/10 text-gray-500' : 'border-t border-dashed border-black/30 text-gray-500'}
      `}>
                <div className="flex justify-between">
                    <span>Target ID:</span>
                    <span className={isDark ? 'text-[#8B5CF6]' : 'text-black'}>{appId}</span>
                </div>
                <div className="flex justify-between mt-1">
                    <span>System Time:</span>
                    <span>{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};
