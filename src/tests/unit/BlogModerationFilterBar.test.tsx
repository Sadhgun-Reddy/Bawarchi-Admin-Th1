import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogModerationFilterBar } from '../../pages/moderation/BlogModerationFilterBar';
import { BlogCategory } from '../../pages/moderation/types';

describe('BlogModerationFilterBar - Task 2.1 Requirements', () => {
  const mockProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    categoryFilter: null as BlogCategory | null,
    onCategoryChange: vi.fn(),
    dateRange: { start: null, end: null },
    onDateRangeChange: vi.fn(),
    pagination: { currentPage: 1, itemsPerPage: 10, totalRecords: 50 },
    isDark: false
  };

  it('should render category dropdown with all 7 BlogCategory options', () => {
    render(<BlogModerationFilterBar {...mockProps} />);
    
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeDefined();
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(8); // 7 categories + "All Categories"
    
    const categories = ['TRENDS', 'SAFETY', 'RECIPES', 'DIETARY', 'GUIDE', 'BUSINESS', 'SEASONAL'];
    categories.forEach(cat => {
      expect(screen.getByText(cat)).toBeDefined();
    });
  });

  it('should include "All Categories" option to clear filter', () => {
    render(<BlogModerationFilterBar {...mockProps} />);
    expect(screen.getByText('All Categories')).toBeDefined();
  });

  it('should call onCategoryChange with null when "All Categories" is selected', () => {
    const onCategoryChange = vi.fn();
    render(<BlogModerationFilterBar {...mockProps} onCategoryChange={onCategoryChange} />);
    
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: '' } });
    
    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });

  it('should call onCategoryChange with selected category', () => {
    const onCategoryChange = vi.fn();
    render(<BlogModerationFilterBar {...mockProps} onCategoryChange={onCategoryChange} />);
    
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'TRENDS' } });
    
    expect(onCategoryChange).toHaveBeenCalledWith('TRENDS');
  });

  it('should apply glass-panel styling in dark mode', () => {
    const { container } = render(<BlogModerationFilterBar {...mockProps} isDark={true} />);
    const filterBar = container.firstChild as HTMLElement;
    
    expect(filterBar.className).toContain('glass-panel');
    expect(filterBar.className).toContain('bg-black/40');
  });

  it('should apply solid borders styling in light mode', () => {
    const { container } = render(<BlogModerationFilterBar {...mockProps} isDark={false} />);
    const filterBar = container.firstChild as HTMLElement;
    
    expect(filterBar.className).toContain('bg-slate-50');
    expect(filterBar.className).toContain('border-slate-200');
    expect(filterBar.className).toContain('sharp-corners');
  });

  it('should accept categoryFilter prop and display selected value', () => {
    render(<BlogModerationFilterBar {...mockProps} categoryFilter="SAFETY" />);
    
    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;
    expect(dropdown.value).toBe('SAFETY');
  });

  it('should display empty value when categoryFilter is null', () => {
    render(<BlogModerationFilterBar {...mockProps} categoryFilter={null} />);
    
    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;
    expect(dropdown.value).toBe('');
  });
});

describe('BlogModerationFilterBar - Task 2.2 Date Range Picker', () => {
  const mockProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    categoryFilter: null as BlogCategory | null,
    onCategoryChange: vi.fn(),
    dateRange: { start: null, end: null },
    onDateRangeChange: vi.fn(),
    pagination: { currentPage: 1, itemsPerPage: 10, totalRecords: 50 },
    isDark: false
  };

  it('should render start date and end date inputs', () => {
    render(<BlogModerationFilterBar {...mockProps} />);
    
    const dateInputs = screen.getAllByDisplayValue('');
    const dateTypeInputs = dateInputs.filter(input => (input as HTMLInputElement).type === 'date');
    
    expect(dateTypeInputs.length).toBeGreaterThanOrEqual(2);
  });

  it('should display "to" separator between date inputs', () => {
    render(<BlogModerationFilterBar {...mockProps} />);
    expect(screen.getByText('to')).toBeDefined();
  });

  it('should call onDateRangeChange when start date changes', () => {
    const onDateRangeChange = vi.fn();
    render(<BlogModerationFilterBar {...mockProps} onDateRangeChange={onDateRangeChange} />);
    
    const dateInputs = screen.getAllByDisplayValue('');
    const dateTypeInputs = dateInputs.filter(input => (input as HTMLInputElement).type === 'date');
    const startDateInput = dateTypeInputs[0];
    
    fireEvent.change(startDateInput, { target: { value: '2026-03-01' } });
    
    expect(onDateRangeChange).toHaveBeenCalled();
    const callArg = onDateRangeChange.mock.calls[0][0];
    expect(callArg.start).toBeInstanceOf(Date);
    expect(callArg.end).toBeNull();
  });

  it('should call onDateRangeChange when end date changes', () => {
    const onDateRangeChange = vi.fn();
    render(<BlogModerationFilterBar {...mockProps} onDateRangeChange={onDateRangeChange} />);
    
    const dateInputs = screen.getAllByDisplayValue('');
    const dateTypeInputs = dateInputs.filter(input => (input as HTMLInputElement).type === 'date');
    const endDateInput = dateTypeInputs[1];
    
    fireEvent.change(endDateInput, { target: { value: '2026-03-31' } });
    
    expect(onDateRangeChange).toHaveBeenCalled();
    const callArg = onDateRangeChange.mock.calls[0][0];
    expect(callArg.start).toBeNull();
    expect(callArg.end).toBeInstanceOf(Date);
  });

  it('should display selected start date in ISO format', () => {
    const startDate = new Date('2026-03-01T00:00:00Z');
    render(<BlogModerationFilterBar {...mockProps} dateRange={{ start: startDate, end: null }} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0] as HTMLInputElement;
    
    expect(startDateInput.value).toBe('2026-03-01');
  });

  it('should display selected end date in ISO format', () => {
    const endDate = new Date('2026-03-31T00:00:00Z');
    render(<BlogModerationFilterBar {...mockProps} dateRange={{ start: null, end: endDate }} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const endDateInput = dateInputs[1] as HTMLInputElement;
    
    expect(endDateInput.value).toBe('2026-03-31');
  });

  it('should display both start and end dates when both are set', () => {
    const startDate = new Date('2026-03-01T00:00:00Z');
    const endDate = new Date('2026-03-31T00:00:00Z');
    render(<BlogModerationFilterBar {...mockProps} dateRange={{ start: startDate, end: endDate }} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0] as HTMLInputElement;
    const endDateInput = dateInputs[1] as HTMLInputElement;
    
    expect(startDateInput.value).toBe('2026-03-01');
    expect(endDateInput.value).toBe('2026-03-31');
  });

  it('should call onDateRangeChange with null when date input is cleared', () => {
    const onDateRangeChange = vi.fn();
    const startDate = new Date('2026-03-01T00:00:00Z');
    render(<BlogModerationFilterBar {...mockProps} dateRange={{ start: startDate, end: null }} onDateRangeChange={onDateRangeChange} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0];
    
    fireEvent.change(startDateInput, { target: { value: '' } });
    
    expect(onDateRangeChange).toHaveBeenCalled();
    const callArg = onDateRangeChange.mock.calls[0][0];
    expect(callArg.start).toBeNull();
  });

  it('should apply theme-aware styling to date inputs in dark mode', () => {
    render(<BlogModerationFilterBar {...mockProps} isDark={true} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0] as HTMLInputElement;
    
    expect(startDateInput.className).toContain('bg-white/5');
    expect(startDateInput.className).toContain('border-white/10');
    expect(startDateInput.className).toContain('text-white');
  });

  it('should apply theme-aware styling to date inputs in light mode', () => {
    render(<BlogModerationFilterBar {...mockProps} isDark={false} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0] as HTMLInputElement;
    
    expect(startDateInput.className).toContain('bg-white');
    expect(startDateInput.className).toContain('border-slate-300');
    expect(startDateInput.className).toContain('text-slate-900');
  });

  it('should apply focus styling to date inputs', () => {
    render(<BlogModerationFilterBar {...mockProps} isDark={false} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0] as HTMLInputElement;
    
    expect(startDateInput.className).toContain('focus:ring-1');
    expect(startDateInput.className).toContain('focus:ring-[#8c2bee]');
  });

  it('should apply dark mode focus styling to date inputs', () => {
    render(<BlogModerationFilterBar {...mockProps} isDark={true} />);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDateInput = dateInputs[0] as HTMLInputElement;
    
    expect(startDateInput.className).toContain('focus:border-[#d006f9]');
  });
});
