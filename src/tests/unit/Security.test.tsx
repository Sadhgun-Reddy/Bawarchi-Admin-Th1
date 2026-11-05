import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../../pages/auth/LoginPage';
import App from '../../App';
import { ThemeProvider } from '../../components/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

describe('Security: Sensitive Data Exposure', () => {
  beforeEach(() => { Object.defineProperty(window, "matchMedia", { writable: true, value: vi.fn().mockImplementation(query => ({ matches: false, media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) });
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('LoginPage does NOT log sensitive credentials to console', () => {
    render(
      <ThemeProvider>
        <LoginPage onLoginSuccess={() => {}} />
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText('admin@system.local');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const loginButton = screen.getByRole('button', { name: /INITIALIZE SECURE LOGIN|AUTHENTICATE/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('INITIALIZING SECURE LOGIN'));
    expect(console.log).not.toHaveBeenCalledWith(expect.objectContaining({
      email: 'test@example.com',
      password: 'password123'
    }));
  });

  it('App does NOT log sensitive token to console', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText('admin@system.local');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const loginButton = screen.getByRole('button', { name: /INITIALIZE SECURE LOGIN|AUTHENTICATE/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('token'));
  });
});
