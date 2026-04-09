import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import fc from 'fast-check';
import React from 'react';
import { BlogCategory, DateRange } from '../../pages/moderation/types';
import { BlogModerationFilterBar } from '../../pages/moderation/BlogModerationFilterBar';

/**
 * Property 3: Filter Change Event Emission
 * 
 * **Validates: Requirements 5.4, 5.5, 5.6**
 * 
 * For any filter control (search, category, date range), when the filter value changes, 
 * the component should emit the corresponding change event with the new value.
 */

// Arbitraries for filter values
const searchQueryArbitrary = fc.oneof(
  fc.constant(''),
  fc.string({ minLength: 1, maxLength: 50 })
);

const blogCategoryArbitrary = fc.constantFrom<BlogCategory>(
  'TRENDS', 'SAFETY', 'RECIPES', 'DIETARY', 'GUIDE', 'BUSINESS', 'SEASONAL'
);

const categoryFilterArbitrary = fc.option(blogCategoryArbitrary, { nil: null });

const dateArbitrary = fc.option(
  fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') }).filter(d => !isNaN(d.getTime())),
  { nil: null }
);

const dateRangeArbitrary = fc.record({
  start: dateArbitrary,
  end: dateArbitrary
}).filter(range => {
  // Ensure start is before or equal to end if both are present
  if (range.start && range.end) {
    return range.start <= range.end;
  }
  return true;
});

const paginationArbitrary = fc.record({
  currentPage: fc.integer({ min: 1, max: 10 }),
  itemsPerPage: fc.integer({ min: 5, max: 50 }),
  totalRecords: fc.integer({ min: 0, max: 500 })
});

const themeArbitrary = fc.boolean();

describe('Property 3: Filter Change Event Emission', () => {
  afterEach(() => {
    cleanup();
  });

  it('should emit search query change event when search input changes', () => {
    fc.assert(
      fc.property(
        searchQueryArbitrary,
        searchQueryArbitrary,
        categoryFilterArbitrary,
        dateRangeArbitrary,
        paginationArbitrary,
        themeArbitrary,
        (initialQuery, newQuery, categoryFilter, dateRange, pagination, isDark) => {
          // Skip if values are the same (no change to test)
          if (initialQuery === newQuery) return true;

          const onSearchChange = vi.fn();
          const onCategoryChange = vi.fn();
          const onDateRangeChange = vi.fn();

          const { container, unmount } = render(
            <BlogModerationFilterBar
              searchQuery={initialQuery}
              onSearchChange={onSearchChange}
              categoryFilter={categoryFilter}
              onCategoryChange={onCategoryChange}
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
              pagination={pagination}
              isDark={isDark}
            />
          );

          // Find the search input within this specific container
          const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
          expect(searchInput).toBeTruthy();
          
          // Simulate input change using fireEvent
          fireEvent.change(searchInput, { target: { value: newQuery } });

          // Verify the callback was called with the new query
          expect(onSearchChange).toHaveBeenCalledWith(newQuery);
          expect(onSearchChange).toHaveBeenCalledTimes(1);

          // Verify other callbacks were not called
          expect(onCategoryChange).not.toHaveBeenCalled();
          expect(onDateRangeChange).not.toHaveBeenCalled();

          unmount();
          cleanup();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should emit category change event when category dropdown changes', () => {
    fc.assert(
      fc.property(
        searchQueryArbitrary,
        categoryFilterArbitrary,
        blogCategoryArbitrary,
        dateRangeArbitrary,
        paginationArbitrary,
        themeArbitrary,
        (searchQuery, initialCategory, newCategory, dateRange, pagination, isDark) => {
          const onSearchChange = vi.fn();
          const onCategoryChange = vi.fn();
          const onDateRangeChange = vi.fn();

          const { container, unmount } = render(
            <BlogModerationFilterBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              categoryFilter={initialCategory}
              onCategoryChange={onCategoryChange}
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
              pagination={pagination}
              isDark={isDark}
            />
          );

          // Find the category dropdown
          const categorySelect = container.querySelector('select') as HTMLSelectElement;
          expect(categorySelect).toBeTruthy();
          
          // Simulate category change using fireEvent
          fireEvent.change(categorySelect, { target: { value: newCategory } });

          // Verify the callback was called with the new category
          expect(onCategoryChange).toHaveBeenCalledWith(newCategory);
          expect(onCategoryChange).toHaveBeenCalledTimes(1);

          // Verify other callbacks were not called
          expect(onSearchChange).not.toHaveBeenCalled();
          expect(onDateRangeChange).not.toHaveBeenCalled();

          unmount();
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should emit date range change event when start date changes', () => {
    fc.assert(
      fc.property(
        searchQueryArbitrary,
        categoryFilterArbitrary,
        dateRangeArbitrary,
        dateArbitrary,
        paginationArbitrary,
        themeArbitrary,
        (searchQuery, categoryFilter, initialDateRange, newStartDate, pagination, isDark) => {
          // Skip if the start date is the same (no change to test)
          const initialStartStr = initialDateRange.start && !isNaN(initialDateRange.start.getTime()) 
            ? initialDateRange.start.toISOString().split('T')[0] 
            : '';
          const newStartStr = newStartDate && !isNaN(newStartDate.getTime())
            ? newStartDate.toISOString().split('T')[0] 
            : '';
          if (initialStartStr === newStartStr) return true;

          const onSearchChange = vi.fn();
          const onCategoryChange = vi.fn();
          const onDateRangeChange = vi.fn();

          const { container, unmount } = render(
            <BlogModerationFilterBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              categoryFilter={categoryFilter}
              onCategoryChange={onCategoryChange}
              dateRange={initialDateRange}
              onDateRangeChange={onDateRangeChange}
              pagination={pagination}
              isDark={isDark}
            />
          );

          // Find the start date input (first date input in this container)
          const dateInputs = container.querySelectorAll('input[type="date"]');
          const startDateInput = dateInputs[0] as HTMLInputElement;
          expect(startDateInput).toBeTruthy();
          
          // Simulate start date change using fireEvent
          const newDateValue = newStartDate ? newStartDate.toISOString().split('T')[0] : '';
          fireEvent.change(startDateInput, { target: { value: newDateValue } });

          // Verify the callback was called with updated date range
          expect(onDateRangeChange).toHaveBeenCalledTimes(1);
          const calledArg = onDateRangeChange.mock.calls[0][0];
          
          // Verify the start date was updated
          if (newStartDate) {
            expect(calledArg.start).toBeInstanceOf(Date);
            expect(calledArg.start?.toISOString().split('T')[0]).toBe(newDateValue);
          } else {
            expect(calledArg.start).toBeNull();
          }
          
          // Verify end date remained unchanged
          expect(calledArg.end).toEqual(initialDateRange.end);

          // Verify other callbacks were not called
          expect(onSearchChange).not.toHaveBeenCalled();
          expect(onCategoryChange).not.toHaveBeenCalled();

          unmount();
          cleanup();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should emit date range change event when end date changes', () => {
    fc.assert(
      fc.property(
        searchQueryArbitrary,
        categoryFilterArbitrary,
        dateRangeArbitrary,
        dateArbitrary,
        paginationArbitrary,
        themeArbitrary,
        (searchQuery, categoryFilter, initialDateRange, newEndDate, pagination, isDark) => {
          // Skip if the end date is the same (no change to test)
          const initialEndStr = initialDateRange.end && !isNaN(initialDateRange.end.getTime())
            ? initialDateRange.end.toISOString().split('T')[0] 
            : '';
          const newEndStr = newEndDate && !isNaN(newEndDate.getTime())
            ? newEndDate.toISOString().split('T')[0] 
            : '';
          if (initialEndStr === newEndStr) return true;

          const onSearchChange = vi.fn();
          const onCategoryChange = vi.fn();
          const onDateRangeChange = vi.fn();

          const { container, unmount } = render(
            <BlogModerationFilterBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              categoryFilter={categoryFilter}
              onCategoryChange={onCategoryChange}
              dateRange={initialDateRange}
              onDateRangeChange={onDateRangeChange}
              pagination={pagination}
              isDark={isDark}
            />
          );

          // Find the end date input (second date input in this container)
          const dateInputs = container.querySelectorAll('input[type="date"]');
          const endDateInput = dateInputs[1] as HTMLInputElement;
          expect(endDateInput).toBeTruthy();
          
          // Simulate end date change using fireEvent
          const newDateValue = newEndDate ? newEndDate.toISOString().split('T')[0] : '';
          fireEvent.change(endDateInput, { target: { value: newDateValue } });

          // Verify the callback was called with updated date range
          expect(onDateRangeChange).toHaveBeenCalledTimes(1);
          const calledArg = onDateRangeChange.mock.calls[0][0];
          
          // Verify the end date was updated
          if (newEndDate) {
            expect(calledArg.end).toBeInstanceOf(Date);
            expect(calledArg.end?.toISOString().split('T')[0]).toBe(newDateValue);
          } else {
            expect(calledArg.end).toBeNull();
          }
          
          // Verify start date remained unchanged
          expect(calledArg.start).toEqual(initialDateRange.start);

          // Verify other callbacks were not called
          expect(onSearchChange).not.toHaveBeenCalled();
          expect(onCategoryChange).not.toHaveBeenCalled();

          unmount();
          cleanup();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should emit correct event types for all filter controls independently', () => {
    fc.assert(
      fc.property(
        searchQueryArbitrary,
        categoryFilterArbitrary,
        dateRangeArbitrary,
        paginationArbitrary,
        themeArbitrary,
        (searchQuery, categoryFilter, dateRange, pagination, isDark) => {
          const onSearchChange = vi.fn();
          const onCategoryChange = vi.fn();
          const onDateRangeChange = vi.fn();

          const { unmount } = render(
            <BlogModerationFilterBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              categoryFilter={categoryFilter}
              onCategoryChange={onCategoryChange}
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
              pagination={pagination}
              isDark={isDark}
            />
          );

          // Verify all callbacks are functions
          expect(typeof onSearchChange).toBe('function');
          expect(typeof onCategoryChange).toBe('function');
          expect(typeof onDateRangeChange).toBe('function');

          // Verify no callbacks were called during render
          expect(onSearchChange).not.toHaveBeenCalled();
          expect(onCategoryChange).not.toHaveBeenCalled();
          expect(onDateRangeChange).not.toHaveBeenCalled();

          unmount();
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should clear category filter when "All Categories" is selected', () => {
    fc.assert(
      fc.property(
        searchQueryArbitrary,
        blogCategoryArbitrary,
        dateRangeArbitrary,
        paginationArbitrary,
        themeArbitrary,
        (searchQuery, initialCategory, dateRange, pagination, isDark) => {
          const onSearchChange = vi.fn();
          const onCategoryChange = vi.fn();
          const onDateRangeChange = vi.fn();

          const { container, unmount } = render(
            <BlogModerationFilterBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              categoryFilter={initialCategory}
              onCategoryChange={onCategoryChange}
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
              pagination={pagination}
              isDark={isDark}
            />
          );

          // Find the category dropdown
          const categorySelect = container.querySelector('select') as HTMLSelectElement;
          expect(categorySelect).toBeTruthy();
          
          // Select "All Categories" (empty value) using fireEvent
          fireEvent.change(categorySelect, { target: { value: '' } });

          // Verify the callback was called with null (cleared filter)
          expect(onCategoryChange).toHaveBeenCalledWith(null);
          expect(onCategoryChange).toHaveBeenCalledTimes(1);

          unmount();
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});
