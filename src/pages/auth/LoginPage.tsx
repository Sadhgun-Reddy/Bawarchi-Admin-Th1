import React, { useState, useContext } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ThemeContext } from '../../components/ThemeProvider';

export interface LoginFormProps {
    onLoginSuccess?: (token: string) => void;
}

export const LoginPage: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const { theme } = useContext(ThemeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Temporary test token call
        if (onLoginSuccess) {
            onLoginSuccess('dummy_token_123');
        }
    };

    const isDark = theme === 'dark';

    return (
        <div
            className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-300 relative ${isDark ? 'bg-[#050505]' : 'bg-[#E2E8F0]'
                }`}
        >
            {/* Background Grid Pattern specifically for Mission Control */}
            {isDark && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />
            )}

            {/* Main Login Card Wrapper */}
            <div
                className={`w-full max-w-md p-8 relative z-10 space-y-8 ${isDark
                        ? 'backdrop-blur-[12px] bg-white/5 border border-transparent glow-border text-white'
                        : 'rounded-none border-[1px] border-black bg-white text-black font-mono'
                    }`}
            >
                <div className="text-center space-y-2">
                    <h1 className={`text-2xl font-bold tracking-wider uppercase ${isDark ? 'text-text-primary' : ''}`}>
                        {isDark ? 'Mission Control' : 'System Console'}
                    </h1>
                    <p className={`text-sm tracking-widest uppercase ${isDark ? 'text-text-secondary' : 'text-text-muted'}`}>
                        Admin Authorization Protocol
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email / Username Field */}
                    <div className="space-y-2 relative">
                        <label className={`block text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Operator ID
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`w-full pl-10 pr-3 py-3 outline-none transition-all duration-200 block text-sm ${isDark
                                        ? 'bg-black/40 border border-white/10 text-white focus:border-[#8b5cf6] focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                                        : 'bg-transparent border border-black focus:border-[2px] rounded-none'
                                    }`}
                                placeholder="admin@system.local"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2 relative">
                        <label className={`block text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Access Key
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`w-full flex-1 pl-10 pr-10 py-3 block text-sm outline-none transition-all duration-200 ${isDark
                                        ? 'bg-black/40 border border-white/10 text-white focus:border-[#8b5cf6] focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                                        : 'bg-transparent border border-black focus:border-[2px] rounded-none'
                                    }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className={`h-4 w-4 rounded-sm cursor-pointer ${isDark
                                    ? 'border-gray-500 bg-black/40 text-[#8b5cf6] focus:ring-[#8b5cf6] focus:ring-offset-black'
                                    : 'border-black text-black rounded-none shadow-none focus:ring-black'
                                }`}
                        />
                        <label htmlFor="remember" className={`ml-2 block text-xs tracking-wide uppercase cursor-pointer select-none ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
                            Remember device
                        </label>
                    </div>

                    {/* Submit Action */}
                    <button
                        type="submit"
                        className={`w-full py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 mt-4 flex items-center justify-center ${isDark
                                ? 'bg-[#8b5cf6] text-white hover:bg-[#a78bfa] shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:shadow-[0_0_25px_rgba(139,92,246,0.9)] border-none rounded-sm'
                                : 'bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none'
                            }`}
                    >
                        {isDark ? 'INITIALIZE SECURE LOGIN' : 'AUTHENTICATE'}
                    </button>
                </form>

                <div className="text-center pt-4 border-t border-opacity-20 border-gray-400">
                    <a
                        href="#"
                        className={`text-xs uppercase tracking-wider hover:underline transition-all ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black font-semibold'
                            }`}
                    >
                        System Override / Recovery
                    </a>
                </div>
            </div>
        </div>
    );
};
