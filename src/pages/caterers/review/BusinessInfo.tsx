import React from 'react';
import { ReviewApplication } from './types';

interface BusinessInfoProps {
    application: ReviewApplication;
    isDark: boolean;
}

export const BusinessInfo: React.FC<BusinessInfoProps> = ({ application, isDark }) => {
    return (
        <div className={`p-6 w-full ${isDark ? 'glass-card' : 'tech-card'} mb-6`}>
            <h2 className={`text-lg font-bold mb-4 uppercase tracking-wider
        ${isDark ? 'text-[#8B5CF6]' : 'text-black border-b-2 border-dashed border-black pb-2'}
      `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Business Profile
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8
        ${!isDark ? 'divide-y divide-dashed divide-black/30 md:divide-y-0' : ''}
      `}>
                <div className={!isDark ? 'py-2' : ''}>
                    <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Entity Name</p>
                    <p className={`text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{application.businessName}</p>
                </div>

                <div className={!isDark ? 'py-2' : ''}>
                    <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Owner / Director</p>
                    <p className={`text-base font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        <span className="material-symbols-outlined text-[16px] text-gray-400">person</span>
                        {application.ownerName}
                    </p>
                </div>

                <div className={!isDark ? 'py-2' : ''}>
                    <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Experience</p>
                    <p className={`text-base font-mono ${isDark ? 'text-[#00F5A0]' : 'text-[#7C3AED] font-bold'}`}>
                        {application.experience} <span className="text-gray-400 text-xs">YRS</span>
                    </p>
                </div>

                <div className={!isDark ? 'py-2' : ''}>
                    <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Operational Capacity</p>
                    <p className={`text-base font-mono ${isDark ? 'text-white' : 'text-black font-semibold'}`}>{application.capacity}</p>
                </div>
            </div>
        </div>
    );
};
