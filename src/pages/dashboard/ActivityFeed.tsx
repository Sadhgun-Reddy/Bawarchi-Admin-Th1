import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export interface SystemLog {
    id: string;
    timestamp: string;
    level: 'INFO' | 'SUCCESS' | 'WARN' | 'UPDATE' | 'ERROR';
    message: string;
}

const initialLogs: SystemLog[] = [
    { id: '1', timestamp: '10:42:05', level: 'INFO', message: 'User SYS_ADMIN successfully authenticated.' },
    { id: '2', timestamp: '10:44:12', level: 'SUCCESS', message: 'Batch job [inventory_sync] completed.' },
    { id: '3', timestamp: '10:45:01', level: 'WARN', message: 'High latency detected on DB replica 02.' },
];

export const ActivityFeed: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const scrollRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState(initialLogs);

    // Simulate incoming logs
    useEffect(() => {
        const interval = setInterval(() => {
            const newLog: SystemLog = {
                id: Date.now().toString(),
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: Math.random() > 0.8 ? 'UPDATE' : 'INFO',
                message: 'Heartbeat ping acknowledged by Node ' + Math.floor(Math.random() * 10),
            };
            setLogs(prev => [...prev, newLog]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const getLevelColor = (level: SystemLog['level']) => {
        if (isDark) {
            switch (level) {
                case 'INFO': return 'text-gray-400';
                case 'SUCCESS': return 'text-success';
                case 'WARN': return 'text-[#b45309]';
                case 'UPDATE': return 'text-[#1e3a8a]';
                case 'ERROR': return 'text-danger';
                default: return 'text-white';
            }
        } else {
            switch (level) {
                case 'INFO': return 'text-gray-600';
                case 'SUCCESS': return 'text-green-700';
                case 'WARN': return 'text-[#b45309]';
                case 'UPDATE': return 'text-blue-700';
                case 'ERROR': return 'text-red-700';
                default: return 'text-black';
            }
        }
    };

    return (
        <div className={`p-6 flex flex-col h-full font-mono ${isDark ? 'bg-[#050505] border border-white/5 shadow-none rounded-md' : 'bg-white border text-black'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>System Terminal</h2>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 bg-success ${isDark ? '' : 'sharp-corners'}`}></span>
                    </span>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-success' : 'text-green-700'}`}>LIVE</span>
                </div>
            </div>

            <div
                ref={scrollRef}
                className={`flex-1 overflow-y-auto p-4 custom-scrollbar text-[11px] leading-relaxed space-y-2 ${isDark ? 'bg-[#0a0a0a] border border-white/5 rounded-md' : 'bg-gray-50 border border-black sharp-corners'
                    }`}
                style={{ maxHeight: '350px' }}
            >
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                        >
                            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>[{log.timestamp}]</span>
                            <span className={`font-bold w-[60px] flex-shrink-0 ${getLevelColor(log.level)}`}>[{log.level}]</span>
                            <span className={`${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{log.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
