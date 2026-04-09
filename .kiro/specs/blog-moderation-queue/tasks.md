# Implementation Plan: Blog Moderation Queue

## Overview

This implementation plan creates a new blog post moderation module for the Command Deck admin panel. The module follows established patterns from Menu and Offers moderation, providing tab-based filtering (Pending, Approved, Rejected), multi-field fuzzy search, category filtering, date range selection, and theme-aware styling for both Dark Mode and Light Mode.

The implementation reuses existing moderation components (ModerationHeader, ModerationTabs, ModerationPagination) and extends ModerationFilterBar with blog-specific filters. New components include BlogModerationTable, BlogModerationRow, and ReviewAction button.

## Tasks

- [x] 1. Add Blog types to moderation types.ts
  - Add BlogStatus type: 'PENDING' | 'APPROVED' | 'REJECTED'
  - Add BlogCategory type with 7 values: TRENDS, SAFETY, RECIPES, DIETARY, GUIDE, BUSINESS, SEASONAL
  - Add BlogPostSubmission interface with id, title, excerpt, caterer, category, submittedDate, status
  - Add BlogModerationState interface for page state management
  - Add DateRange interface for date filter state
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

- [x] 1.1 Write property test for BlogStatus type values
  - **Property 14: Tab Click Event Emission**
  - **Validates: Requirements 3.5**

- [-] 2. Create BlogModerationFilterBar component
  - [x] 2.1 Extend ModerationFilterBar with category dropdown
    - Add categoryFilter prop and onCategoryChange callback
    - Render dropdown with all 7 BlogCategory options
    - Apply theme-aware styling (glass-panel for dark, solid borders for light)
    - _Requirements: 5.2, 5.5, 5.8_
  
  - [ ] 2.2 Add date range picker to filter bar
    - Add dateRange prop and onDateRangeChange callback
    - Render start date and end date inputs
    - Apply theme-aware styling consistent with search input
    - _Requirements: 5.3, 5.6_
  
  - [x] 2.3 Write property test for filter change events
    - **Property 3: Filter Change Event Emission**
    - **Validates: Requirements 5.4, 5.5, 5.6**

- [ ] 3. Create ReviewAction button component
  - Create ReviewAction.tsx in src/pages/moderation/
  - Accept postId, onReviewPost callback, and isDark props
  - Render "Review Post" button with Material Symbol "arrow_forward"
  - Dark Mode: bg-[#d006f9]/20 with border-[#d006f9], hover glow effect
  - Light Mode: bg-[#8c2bee] solid, hover bg-[#7220c4], sharp corners
  - Apply active:scale-95 transform for dark mode, active:translate-y-[1px] for light mode
  - _Requirements: 9.1, 9.2, 9.3, 9.6_

- [ ] 3.1 Write property test for review action event
  - **Property 15: Review Action Event Emission**
  - **Validates: Requirements 9.3**

- [ ] 4. Create BlogModerationTable component
  - [ ] 4.1 Create table structure with 6 columns
    - Create BlogModerationTable.tsx in src/pages/moderation/
    - Define columns: Post ID, Post Title, Caterer Name, Category, Submitted Date, Action
    - Accept data array, activeTab, onReviewPost callback, isDark props
    - Apply theme-aware container styling (glass-panel for dark, solid borders for light)
    - _Requirements: 7.1, 7.9_
  
  - [ ] 4.2 Implement table row rendering with Framer Motion
    - Map over data array to render rows
    - Apply staggered entrance animations using AnimatePresence
    - Implement hover effects (hover:bg-white/5 for dark, hover:bg-slate-50 for light)
    - _Requirements: 7.1, 7.9_
  
  - [ ] 4.3 Implement Post ID and Title cells
    - Render Post ID in monospaced font (font-mono)
    - Render Post Title with excerpt preview
    - Apply theme-aware text colors
    - _Requirements: 7.2, 7.3_
  
  - [ ] 4.4 Implement Caterer cell with logo/initials fallback
    - Render caterer logo image when logoUrl is available (32x32px max)
    - Render circular badge with initials when logoUrl is missing
    - Apply theme-aware badge styling
    - _Requirements: 7.4, 7.5, 19.1, 19.2, 19.3, 19.4, 19.5_
  
  - [ ] 4.5 Write property test for caterer display logic
    - **Property 6: Caterer Display Fallback**
    - **Validates: Requirements 7.4, 7.5, 19.1, 19.4**
  
  - [ ] 4.6 Implement Category badge cell with color mapping
    - Create category badge with appropriate color styling
    - Dark Mode: low-opacity backgrounds with text-glow (e.g., bg-blue-500/10 for TRENDS)
    - Light Mode: solid borders with light backgrounds (e.g., bg-blue-50 border-blue-200 for TRENDS)
    - Map all 7 categories to their respective colors (blue, red, orange, green, purple, yellow, teal)
    - _Requirements: 7.6, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9_
  
  - [ ] 4.7 Implement Submitted Date cell
    - Parse ISO 8601 date string
    - Format as human-readable date with time
    - Apply theme-aware text styling
    - _Requirements: 7.7_
  
  - [ ] 4.8 Implement Action cell with ReviewAction button
    - Render ReviewAction button in each row
    - Pass postId and onReviewPost callback
    - _Requirements: 7.8, 9.1_
  
  - [ ] 4.9 Implement empty state display
    - Show Material Symbol "article" icon when data array is empty
    - Display appropriate message based on context (no posts vs no search results)
    - Apply theme-aware styling
    - _Requirements: 7.1_

- [ ] 4.10 Write property test for action button presence
  - **Property 17: Action Button Presence**
  - **Validates: Requirements 7.8**

- [ ] 5. Create BlogModerationPage orchestrator component
  - [ ] 5.1 Set up page structure and state management
    - Create BlogModerationPage.tsx in src/pages/moderation/
    - Initialize state with activeTab, searchQuery, categoryFilter, dateRange, pagination
    - Import ThemeContext for theme-aware styling
    - Apply page background (bg-[#050505] for dark, bg-[#E2E8F0] for light)
    - Add dark mode ambient overlay with purple/magenta gradient
    - _Requirements: 1.1, 1.2, 1.8, 1.9, 1.10, 15.1, 15.2, 16.1_
  
  - [ ] 5.2 Create mock blog post dataset
    - Define MOCK_BLOG_POSTS array with sample BlogPostSubmission records
    - Include posts with all 3 statuses (PENDING, APPROVED, REJECTED)
    - Include posts with all 7 categories
    - Include posts with and without caterer logos
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [ ] 5.3 Implement event handlers
    - handleTabChange: Update activeTab, clear search, reset to page 1
    - handleSearchChange: Update searchQuery, reset to page 1
    - handleCategoryChange: Update categoryFilter, reset to page 1
    - handleDateRangeChange: Update dateRange, reset to page 1
    - handlePageChange: Update currentPage
    - handleReviewPost: Log postId and initiate navigation (console.log for now)
    - handleExportCSV: Generate and download CSV file
    - _Requirements: 10.4, 10.5, 13.3, 14.3_
  
  - [ ] 5.4 Write property test for page reset on filter change
    - **Property 5: Page Reset on Filter Change**
    - **Validates: Requirements 10.4, 10.5, 13.3, 14.3**
  
  - [ ] 5.5 Implement filter pipeline with React.useMemo
    - Apply tab filter first (filter by status)
    - Apply category filter second (if categoryFilter is not null)
    - Apply date range filter third (if dateRange has values)
    - Apply search filter last (fuzzy match across id, title, caterer.name)
    - Memoize filtered dataset computation
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 10.1, 10.2, 10.3, 13.1, 13.4, 14.1, 14.4, 14.5, 18.1_
  
  - [ ] 5.6 Write property test for tab filtering
    - **Property 1: Tab Filtering by Status**
    - **Validates: Requirements 10.1, 10.2, 10.3**
  
  - [ ] 5.7 Write property test for multi-field fuzzy search
    - **Property 2: Multi-Field Fuzzy Search**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**
  
  - [ ] 5.8 Write property test for category filter
    - **Property 11: Category Filter Application**
    - **Validates: Requirements 13.1**
  
  - [ ] 5.9 Write property test for date range filter
    - **Property 12: Date Range Filter Application**
    - **Validates: Requirements 14.1**
  
  - [ ] 5.10 Write property test for filter pipeline ordering
    - **Property 9: Filter Pipeline Ordering**
    - **Validates: Requirements 13.4, 14.5**
  
  - [ ] 5.11 Write property test for case-insensitive search
    - **Property 20: Case-Insensitive Search**
    - **Validates: Requirements 6.1**
  
  - [ ] 5.12 Implement pagination logic with React.useMemo
    - Calculate startIndex: (currentPage - 1) × itemsPerPage
    - Calculate endIndex: startIndex + itemsPerPage
    - Slice filtered dataset using indices
    - Memoize paginated dataset computation
    - Sync totalRecords with filtered dataset length using useEffect
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 18.2, 18.3, 18.4, 18.5, 18.6_
  
  - [ ] 5.13 Write property test for pagination slicing
    - **Property 4: Pagination Slicing Correctness**
    - **Validates: Requirements 12.2, 12.3, 12.4, 12.5**
  
  - [ ] 5.14 Write property test for total records sync
    - **Property 13: Total Records Synchronization**
    - **Validates: Requirements 12.6**
  
  - [ ] 5.15 Compute badge counts with React.useMemo
    - Count posts with status PENDING
    - Count posts with status APPROVED
    - Count posts with status REJECTED
    - Memoize counts computation based on raw dataset
    - _Requirements: 3.2, 3.7, 18.3_
  
  - [ ] 5.16 Write property test for badge count accuracy
    - **Property 7: Badge Count Accuracy**
    - **Validates: Requirements 3.2, 3.7**
  
  - [ ] 5.17 Render component hierarchy
    - Render ModerationHeader with onRefresh callback
    - Render ModerationTabs with activeTab, onTabChange, counts, isDark
    - Render BlogModerationFilterBar with all filter props
    - Render BlogModerationTable with paginatedData, activeTab, onReviewPost, isDark
    - Render ModerationPagination with pagination state and onPageChange
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 1.7, 17.1, 17.2, 17.3, 17.4_

- [ ] 6. Implement CSV export functionality
  - [ ] 6.1 Create CSV generation logic
    - Define CSV headers: Post ID, Post Title, Caterer Name, Category, Submitted Date, Status
    - Map filtered dataset to CSV rows
    - Format submittedDate as human-readable string
    - Escape CSV values with quotes
    - Join rows with newlines
    - _Requirements: 20.1, 20.2, 20.3_
  
  - [ ] 6.2 Implement browser download
    - Create Blob with CSV content and UTF-8 encoding
    - Generate filename with current date: blog-moderation-YYYY-MM-DD.csv
    - Create download link and trigger click
    - _Requirements: 20.4, 20.5_
  
  - [ ] 6.3 Write property test for CSV export completeness
    - **Property 10: CSV Export Completeness**
    - **Validates: Requirements 20.1, 20.2, 20.3**

- [ ] 7. Add routing for BlogModerationPage
  - Add route definition in src/routes/ for /admin/moderation/blog
  - Import BlogModerationPage component
  - Configure route with appropriate guards/permissions
  - _Requirements: 1.1_

- [ ] 8. Add navigation link in sidebar/layout
  - Add "Blog Moderation" link to admin navigation menu
  - Place link in Moderation section alongside Menu and Offers
  - Apply Material Symbol "article" icon
  - Configure link to navigate to /admin/moderation/blog
  - _Requirements: 1.1_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Run all unit tests and property-based tests
  - Verify all components render correctly in both themes
  - Test all filter combinations
  - Test pagination edge cases
  - Ensure CSV export works with filtered data
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across all inputs
- The implementation reuses existing moderation components for consistency
- Theme-aware styling is applied throughout using ThemeContext
- All filtering and pagination logic uses React.useMemo for performance optimization
