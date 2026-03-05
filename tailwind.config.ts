import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', "monospace"],
            },
            colors: {
                primary: "var(--color-primary)",
                "primary-hover": "var(--color-primary-hover)",
                surface: "var(--color-surface)",
                "surface-raised": "var(--color-surface-raised)",
                "surface-overlay": "var(--color-surface-overlay)",
                border: "var(--color-border)",
                "border-active": "var(--color-border-active)",
                "text-primary": "var(--color-text-primary)",
                "text-secondary": "var(--color-text-secondary)",
                "text-muted": "var(--color-text-muted)",
                "text-inverse": "var(--color-text-inverse)",
                accent: "var(--color-accent)",
                "accent-subtle": "var(--color-accent-subtle)",
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                danger: "var(--color-danger)",
                info: "var(--color-info)",
            },
            borderRadius: {
                theme: "var(--radius)",
                "theme-sm": "var(--radius-sm)",
                "theme-lg": "var(--radius-lg)",
            },
            boxShadow: {
                glow: "var(--shadow-glow)",
                "glow-lg": "var(--shadow-glow-lg)",
                panel: "var(--shadow-panel)",
            },
            backdropBlur: {
                panel: "var(--blur-panel)",
            },
        },
    },
    plugins: [],
};

export default config;
