import React from 'react';
import { ReviewApplication } from './types';

interface KitchenSpecsProps {
    application: ReviewApplication;
    isDark: boolean;
}

export const KitchenSpecs: React.FC<KitchenSpecsProps> = ({ application, isDark }) => {
    return (
        <div className={`p-6 w-full ${isDark ? 'glass-card' : 'tech-card'} mb-6`}>
            <h2 className={`text-lg font-bold mb-4 uppercase tracking-wider
        ${isDark ? 'text-[#8B5CF6]' : 'text-black border-b-2 border-dashed border-black pb-2'}
      `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Kitchen Specifications
            </h2>

            <div className={!isDark ? 'py-2' : ''}>
                <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Operating Address</p>
                <p className={`text-base flex items-start gap-2 ${isDark ? 'text-white' : 'text-black font-medium'}`}>
                    <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5">location_on</span>
                    {application.address}
                </p>
            </div>
        </div>
    );
};
