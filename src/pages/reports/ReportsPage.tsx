import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { ReportGenerator } from './ReportGenerator';
import { RecentExportsHistory } from './RecentExportsHistory';

export type ExportFormat = 'CSV' | 'XLS' | 'PDF' | 'JSON';
export type ExportStatus = 'READY' | 'PROCESSING' | 'FAILED';

export interface ExportRecord {
    id: string; // e.g., "REP-884"
    name: string;
    category: string;
    generatedAt: string; // ISO format
    format: ExportFormat;
    status: ExportStatus;
    size?: string; // e.g., "2.4MB"
}

export const ReportsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // Mock initial state
    const [exports, setExports] = useState<ExportRecord[]>([
        { id: 'REP-1024', name: 'Q3 Financial Summary', category: 'Revenue', generatedAt: new Date(Date.now() - 3600000).toISOString(), format: 'PDF', status: 'READY', size: '1.2MB' },
        { id: 'REP-1023', name: 'Weekly Order Volume', category: 'Orders', generatedAt: new Date(Date.now() - 86400000).toISOString(), format: 'CSV', status: 'READY', size: '450KB' },
        { id: 'REP-1022', name: 'Inventory Deficit Alert', category: 'Inventory', generatedAt: new Date(Date.now() - 172800000).toISOString(), format: 'XLS', status: 'FAILED' }
    ]);

    const handleGenerate = (config: any) => {
        const newRecord: ExportRecord = {
            id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
            name: `Generated ${config.category} Report`,
            category: config.category,
            generatedAt: new Date().toISOString(),
            format: config.format,
            status: 'PROCESSING'
        };

        setExports(prev => [newRecord, ...prev]);

        // Simulate processing step
        setTimeout(() => {
            setExports(prev => prev.map(record =>
                record.id === newRecord.id ? { ...record, status: Math.random() > 0.1 ? 'READY' : 'FAILED', size: '890KB' } : record
            ));
        }, 3000);
    };

    return (
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full">
            {/* ReportsHeader */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDark ? 'text-white' : 'text-black'}`}>
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight">Reports & Exports</h1>
                    <p className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-muted'} mt-1`}>
                        Generate, download, and manage system data extractions.
                    </p>
                </div>
                <button className={`px-4 py-2 font-bold transition-all flex items-center justify-center gap-2 group ${isDark
                    ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white shadow-glow'
                    : 'bg-black text-white sharp-corners hover:bg-gray-800'
                    }`}>
                    <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                    Schedule Automated
                </button>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <ReportGenerator onGenerate={handleGenerate} isDark={isDark} />
                <div className="lg:col-span-2 relative">
                    <RecentExportsHistory records={exports} isDark={isDark} />
                </div>
            </div>
        </div>
    );
};
