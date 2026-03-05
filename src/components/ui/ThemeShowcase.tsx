import React from 'react';
import { Card } from '../Card';
import { Button } from './Button';

export const ThemeShowcase: React.FC = () => {
    return (
        <div className="space-y-8 p-8 max-w-2xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-text-primary">Theme Showcase</h1>
                <p className="text-text-secondary">Project 1 Theme Configuration</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2">Typography (JetBrains Mono)</h2>
                <div className="space-y-2">
                    <p className="text-text-primary">Primary Text: Quick zephyrs blow, vexing daft Jim.</p>
                    <p className="text-text-secondary">Secondary Text: Quick zephyrs blow, vexing daft Jim.</p>
                    <p className="text-text-muted">Muted Text: Quick zephyrs blow, vexing daft Jim.</p>
                    <p className="text-text-inverse bg-text-primary p-2 w-fit">Inverse Text: Quick zephyrs blow, vexing daft Jim.</p>
                    <p className="text-accent">Accent Text: Quick zephyrs blow, vexing daft Jim.</p>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2">Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-surface border-theme">
                        <h3 className="text-lg font-medium text-text-primary mb-2">Surface Card</h3>
                        <p className="text-text-secondary mb-4">
                            This card uses bg-surface and border-theme.
                        </p>
                        <Button>Neon Glow Button</Button>
                    </Card>

                    <Card className="glass-panel">
                        <h3 className="text-lg font-medium text-text-primary mb-2">Glass Panel Card</h3>
                        <p className="text-text-secondary mb-4">
                            This card uses the utility class glass-panel.
                        </p>
                        <button className="bg-surface-raised border border-border px-4 py-2 text-text-primary hover:bg-surface-overlay transition-colors">
                            Secondary Action
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
