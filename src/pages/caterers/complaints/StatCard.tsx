import React from 'react';

interface StatBlock {
    title: string;
    value: string | number;
    icon: string;
    trend?: string;
    isPositive?: boolean;
    isCritical?: boolean;
}

interface StatCardProps {
    stat: StatBlock;
    isDark: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, isDark }) => {
    return (
        <div className={`p-4 md:p-6 flex items-start justify-between group transition-all duration-300
      ${isDark
                ? `glass-panel !border-[#8f0df2]/30 ${stat.isCritical ? '!border-[#EF4444]/50 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]' : 'hover:!border-[#8f0df2]'}`
                : `bg-white border border-slate-200 sharp-corners shadow-sm ${stat.isCritical ? 'border-b-4 !border-b-red-500' : 'hover:border-slate-300'}`
            }
    `}>
            <div className="flex flex-col gap-1">
                <span className={`text-xs md:text-sm font-medium uppercase
          ${isDark
                        ? (stat.isCritical ? 'text-[#EF4444]' : 'text-gray-400')
                        : (stat.isCritical ? 'text-red-600 font-bold' : 'text-slate-500')
                    }
        `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    {stat.title}
                </span>
                <div className="flex items-end gap-3 mt-1">
                    <span className={`text-2xl md:text-3xl font-mono font-bold
            ${isDark ? 'text-white' : 'text-slate-900'}
          `}>
                        {stat.value}
                    </span>
                    {stat.trend && (
                        <span className={`text-xs font-mono font-medium flex items-center mb-1
              ${stat.isPositive
                                ? (isDark ? 'text-[#00F5A0]' : 'text-emerald-600')
                                : (isDark ? 'text-[#EF4444]' : 'text-red-500')
                            }
            `}>
                            <span className="material-symbols-outlined text-[14px]">
                                {stat.isPositive ? 'trending_down' : 'trending_up'}
                            </span>
                            {stat.trend}
                        </span>
                    )}
                </div>
            </div>

            <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-opacity duration-300
        ${isDark
                    ? `bg-white/5 text-white/20 group-hover:text-white/40 ${stat.isCritical ? '!text-[#EF4444]/40 group-hover:!text-[#EF4444]/60' : ''}`
                    : `bg-slate-50 text-slate-400 ${stat.isCritical ? '!bg-red-50 !text-red-500' : ''}`
                }
      `}>
                <span className="material-symbols-outlined text-[24px] md:text-[28px]">{stat.icon}</span>
            </div>
        </div>
    );
};
