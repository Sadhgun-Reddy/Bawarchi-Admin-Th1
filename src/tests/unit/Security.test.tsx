import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../../pages/auth/LoginPage';
import App from '../../App';
import { ThemeProvider } from '../../components/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

describe('Security: Sensitive Data Exposure', () => {
  beforeEach(() => {
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

  it('LoginPage prevents submission and displays error on invalid email', () => {
    render(
      <ThemeProvider>
        <LoginPage onLoginSuccess={() => {}} />
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText('admin@system.local');
    const passwordInput = screen.getByPlaceholderText('••••••••');

    // The button has type="submit", which triggers the form submission
    // However, the test environment doesn't natively enforce HTML5 validations (like type="email") during `fireEvent.click(button)`.
    // Instead we test our custom JS validation
    const form = screen.getByTestId('login-form')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('LoginPage prevents submission and displays error on short password', () => {
    render(
      <ThemeProvider>
        <LoginPage onLoginSuccess={() => {}} />
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText('admin@system.local');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const form = screen.getByTestId('login-form')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.submit(form);

    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });
});
