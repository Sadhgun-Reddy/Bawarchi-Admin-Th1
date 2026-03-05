import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`bg-primary hover:bg-primary-hover text-text-inverse px-4 py-2 rounded-theme-sm transition-colors duration-200 shadow-glow hover:shadow-glow-lg dark:shadow-glow dark:hover:shadow-glow-lg ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
