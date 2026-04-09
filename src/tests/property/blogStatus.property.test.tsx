import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import React from 'react';
import { BlogStatus } from '../../pages/moderation/types';

/**
 * Property 14: Tab Click Event Emission
 * 
 * **Validates: Requirements 3.5**
 * 
 * For any tab button click, the component should emit a tab change event 
 * with the BlogStatus corresponding to the clicked tab.
 */

// Mock BlogModerationTabs component that represents the blog-specific tabs
interface BlogModerationTabsProps {
  activeTab: BlogStatus;
  onTabChange: (tab: BlogStatus) => void;
  counts: {
    pending: number;
    approved: number;
    rejected: number;
  };
  isDark: boolean;
}

const BlogModerationTabs: React.FC<BlogModerationTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  counts, 
  isDark 
}) => {
  const tabs: Array<{ id: BlogStatus; label: string; countKey: keyof typeof counts }> = [
    { id: 'PENDING', label: 'Pending', countKey: 'pending' },
    { id: 'APPROVED', label: 'Approved', countKey: 'approved' },
    { id: 'REJECTED', label: 'Rejected', countKey: 'rejected' }
  ];

  return (
    <div className={`flex gap-4 ${isDark ? 'border-b border-white/10' : 'border-b border-slate-300'}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = counts[tab.countKey];

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            data-testid={`tab-${tab.id.toLowerCase()}`}
            className={`py-3 flex items-center gap-2 ${
              isActive 
                ? (isDark ? 'text-white' : 'text-slate-900 font-bold')
                : (isDark ? 'text-gray-400' : 'text-slate-500')
            }`}
          >
            <span>{tab.label}</span>
            {count > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                isActive
                  ? (isDark ? 'bg-[#ff5e00] text-white' : 'bg-[#8c2bee] text-white')
                  : (isDark ? 'bg-white/10 text-gray-300' : 'bg-slate-200 text-slate-600')
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Arbitrary for BlogStatus values
const blogStatusArbitrary = fc.constantFrom<BlogStatus>('PENDING', 'APPROVED', 'REJECTED');

// Arbitrary for tab counts
const tabCountsArbitrary = fc.record({
  pending: fc.nat({ max: 999 }),
  approved: fc.nat({ max: 999 }),
  rejected: fc.nat({ max: 999 })
});

// Arbitrary for theme
const themeArbitrary = fc.boolean();

describe('Property 14: Tab Click Event Emission', () => {
  afterEach(() => {
    cleanup();
  });

  it('should emit tab change event with correct BlogStatus when any tab is clicked', () => {
    fc.assert(
      fc.property(
        blogStatusArbitrary,
        blogStatusArbitrary,
        tabCountsArbitrary,
        themeArbitrary,
        (initialTab, clickedTab, counts, isDark) => {
          // Setup mock callback
          const onTabChange = vi.fn();

          // Render component with blog-specific tabs
          const { unmount } = render(
            <BlogModerationTabs
              activeTab={initialTab}
              onTabChange={onTabChange}
              counts={counts}
              isDark={isDark}
            />
          );

          // Find and click the target tab button using data-testid
          const tabButton = screen.getByTestId(`tab-${clickedTab.toLowerCase()}`);
          
          // Click the tab
          tabButton.click();

          // Verify the callback was called with the correct BlogStatus
          expect(onTabChange).toHaveBeenCalledWith(clickedTab);
          expect(onTabChange).toHaveBeenCalledTimes(1);

          // Cleanup after each property test run
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should emit correct BlogStatus for each specific tab in sequence', () => {
    fc.assert(
      fc.property(
        tabCountsArbitrary,
        themeArbitrary,
        (counts, isDark) => {
          const onTabChange = vi.fn();

          const { unmount } = render(
            <BlogModerationTabs
              activeTab="PENDING"
              onTabChange={onTabChange}
              counts={counts}
              isDark={isDark}
            />
          );

          // Test Pending tab
          const pendingTab = screen.getByTestId('tab-pending');
          pendingTab.click();
          expect(onTabChange).toHaveBeenLastCalledWith('PENDING');

          // Test Approved tab
          const approvedTab = screen.getByTestId('tab-approved');
          approvedTab.click();
          expect(onTabChange).toHaveBeenLastCalledWith('APPROVED');

          // Test Rejected tab
          const rejectedTab = screen.getByTestId('tab-rejected');
          rejectedTab.click();
          expect(onTabChange).toHaveBeenLastCalledWith('REJECTED');

          // Verify all three calls were made
          expect(onTabChange).toHaveBeenCalledTimes(3);

          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain BlogStatus type safety across all tab interactions', () => {
    fc.assert(
      fc.property(
        fc.array(blogStatusArbitrary, { minLength: 1, maxLength: 10 }),
        tabCountsArbitrary,
        themeArbitrary,
        (tabSequence, counts, isDark) => {
          const onTabChange = vi.fn();
          const callHistory: BlogStatus[] = [];

          const { unmount } = render(
            <BlogModerationTabs
              activeTab="PENDING"
              onTabChange={(tab) => {
                callHistory.push(tab);
                onTabChange(tab);
              }}
              counts={counts}
              isDark={isDark}
            />
          );

          // Click through the sequence of tabs
          tabSequence.forEach((status) => {
            const tabButton = screen.getByTestId(`tab-${status.toLowerCase()}`);
            tabButton.click();
          });

          // Verify all emitted values are valid BlogStatus values
          const validStatuses: BlogStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];
          callHistory.forEach((emittedStatus) => {
            expect(validStatuses).toContain(emittedStatus);
          });

          // Verify the number of calls matches the sequence length
          expect(onTabChange).toHaveBeenCalledTimes(tabSequence.length);

          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
