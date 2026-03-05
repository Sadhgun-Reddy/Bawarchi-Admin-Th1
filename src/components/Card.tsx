import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`glass-panel bg-surface border border-theme rounded-theme p-4 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
