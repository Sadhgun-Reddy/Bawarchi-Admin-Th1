# Design Document: Blog Moderation Queue

## Overview

The Blog Moderation Queue is a content review module that enables administrators to review, approve, or reject caterer-submitted blog posts within the Command Deck admin panel. This system follows established moderation patterns from Menu and Offers moderation, ensuring consistency in user experience and code architecture.

The module provides a high-throughput queue management interface with tab-based filtering (Pending, Approved, Rejected), fuzzy search across multiple fields, category filtering, date range selection, and theme-aware styling for both Dark Mode (Mission Control) and Light Mode (Technical Console).

### Key Features

- Tab-based navigation with real-time badge counts
- Multi-field fuzzy search (Post ID, Title, Caterer Name)
- Category and date range filtering
- High-density table display with caterer branding
- Theme-aware styling with distinct visual treatments
- Pagination controls for large datasets
- CSV export functionality
- Performance-optimized rendering with React.useMemo

### Design Goals

1. Maintain consistency with existing moderation workflows (Menu, Offers)
2. Provide efficient review experience for high-volume content
3. Support both theme variants with appropriate visual language
4. Reuse existing components where possible
5. Ensure type safety and maintainability
6. Optimize performance for large datasets

## Architecture

### Component Hierarchy

```
BlogModerationPage (Root Orchestrator)
├── ModerationHeader (Reused)
├── ModerationTabs (Reused, configured for Blog_Status)
├── ModerationFilterBar (Extended with category/date filters)
├── BlogModerationTable (New)
│   ├── Table Header
│   └── Table Body
│       └── BlogModerationRow (New)
│           ├── Post ID Cell
│           ├── Post Title Cell
│           ├── Caterer Cell (logo/initials)
│           ├── Category Badge Cell
│           ├── Submitted Date Cell
│           └── ReviewAction Button (New)
└── ModerationPagination (Reused)
```

### State Management

The BlogModerationPage manages all application state using React useState hooks:

```typescript
interface BlogModerationState {
  activeTab: BlogStatus;
  searchQuery: string;
  categoryFilter: BlogCategory | null;
  dateRange: { start: Date | null; end: Date | null };
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalRecords: number;
  };
}
```

State flows unidirectionally from BlogModerationPage to child components via props. Child components emit events upward through callback props (onTabChange, onSearchChange, etc.).

### Data Flow

1. BlogModerationPage maintains raw dataset (MOCK_BLOG_POSTS)
2. Filtering pipeline applies in sequence:
   - Tab filter (by status)
   - Category filter (if selected)
   - Date range filter (if selected)
   - Search filter (fuzzy match across id, title, caterer.name)
3. Filtered dataset is sliced for pagination
4. Paginated subset is passed to BlogModerationTable
5. Badge counts are computed from raw dataset

### Performance Strategy

- React.useMemo for filtered dataset computation
- React.useMemo for paginated dataset computation
- React.useMemo for badge count computation
- Framer Motion AnimatePresence for staggered row animations
- Only render current page of records (not entire dataset)

## Components and Interfaces

### BlogModerationPage

Root orchestrator component managing all state and coordinating child components.

**Props:** None (top-level page component)

**State:**
```typescript
{
  activeTab: BlogStatus;
  searchQuery: string;
  categoryFilter: BlogCategory | null;
  dateRange: { start: Date | null; end: Date | null };
  pagination: PaginationState;
}
```

**Event Handlers:**
- handleTabChange(tab: BlogStatus): void
- handleSearchChange(query: string): void
- handleCategoryChange(category: BlogCategory | null): void
- handleDateRangeChange(range: DateRange): void
- handlePageChange(page: number): void
- handleReviewPost(postId: string): void
- handleExportCSV(): void

**Responsibilities:**
- Manage all application state
- Compute filtered and paginated datasets
- Compute badge counts for tabs
- Coordinate theme context
- Handle navigation to review workflow

### ModerationHeader (Reused)

Displays breadcrumbs and action buttons. Existing component from Menu/Offers moderation.

**Props:**
```typescript
interface ModerationHeaderProps {
  onRefresh: () => void;
  isDark: boolean;
}
```

**Customization for Blog:**
- Update breadcrumb text to "System / Blog_Moderation"
- Update title to "Blog Moderation"
- Update description to "Review caterer-submitted blog posts"

### ModerationTabs (Reused)

Tab navigation component configured for BlogStatus values.

**Props:**
```typescript
interface ModerationTabsProps {
  activeTab: BlogStatus;
  onTabChange: (tab: BlogStatus) => void;
  counts: {
    pending: number;
    approved: number;
    rejected: number;
  };
  isDark: boolean;
}
```

**Configuration:**
- Tabs: Pending, Approved, Rejected
- Badge on Pending tab only
- Dark Mode: Orange glow (#ff5f1f) with shadow-neon-orange pulse
- Light Mode: Solid primary color (#8c2bee) square badge

### ModerationFilterBar (Extended)

Filter component with search, category dropdown, and date range picker.

**Props:**
```typescript
interface BlogModerationFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: BlogCategory | null;
  onCategoryChange: (category: BlogCategory | null) => void;
  dateRange: { start: Date | null; end: Date | null };
  onDateRangeChange: (range: DateRange) => void;
  pagination: PaginationState;
  isDark: boolean;
}
```

**Features:**
- Search input with Material Symbol "search" icon
- Category dropdown with all 7 BlogCategory values
- Date range picker (start/end dates)
- Results counter: "SHOWING X-Y OF Z"
- Theme-aware styling

**Category Options:**
- TRENDS (Blue)
- SAFETY (Red)
- RECIPES (Orange)
- DIETARY (Green)
- GUIDE (Purple)
- BUSINESS (Yellow)
- SEASONAL (Teal)

### BlogModerationTable

High-density table displaying blog post submissions.

**Props:**
```typescript
interface BlogModerationTableProps {
  data: BlogPostSubmission[];
  activeTab: BlogStatus;
  onReviewPost: (postId: string) => void;
  isDark: boolean;
}
```

**Columns:**
1. Post ID (monospaced font)
2. Post Title (with excerpt preview)
3. Caterer Name (with logo/initials)
4. Category (styled badge)
5. Submitted Date (human-readable + time)
6. Action (ReviewAction button)

**Styling:**
- Dark Mode: hover:bg-white/5, glass-panel border
- Light Mode: hover:bg-slate-50, sharp-corners, solid borders
- Framer Motion staggered entrance animations
- Empty state with Material Symbol "article" icon

### ReviewAction Button

Primary action button for initiating review workflow.

**Props:**
```typescript
interface ReviewActionProps {
  postId: string;
  onReviewPost: (postId: string) => void;
  isDark: boolean;
}
```

**Styling:**
- Dark Mode:
  - bg-[#d006f9]/20 with border-[#d006f9]
  - hover: bg-[#d006f9] with shadow-neon glow
  - active:scale-95 transform
- Light Mode:
  - bg-[#8c2bee] solid background
  - hover: bg-[#7220c4]
  - Material Symbol "arrow_forward" on hover
  - sharp-corners with shadow-sm

**Label:** "Review Post"

### ModerationPagination (Reused)

Footer component for page navigation. Existing component from Menu/Offers moderation.

**Props:**
```typescript
interface ModerationPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}
```

**Features:**
- Page indicator: "Page X of Y"
- Previous/Next buttons
- Disabled states at boundaries
- Theme-aware styling

## Data Models

### BlogPostSubmission

Core entity representing a caterer-submitted blog post.

```typescript
interface BlogPostSubmission {
  id: string; // Format: "BLG-XXX" (e.g., "BLG-001")
  title: string;
  excerpt: string; // Short preview text
  caterer: {
    name: string;
    logoUrl?: string; // Optional logo image
    initials: string; // Fallback for missing logo
  };
  category: BlogCategory;
  submittedDate: string; // ISO 8601 format
  status: BlogStatus;
}
```

### BlogStatus

Enumeration of post moderation states.

```typescript
type BlogStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
```

### BlogCategory

Enumeration of content themes.

```typescript
type BlogCategory = 
  | 'TRENDS'    // Blue styling
  | 'SAFETY'    // Red styling
  | 'RECIPES'   // Orange styling
  | 'DIETARY'   // Green styling
  | 'GUIDE'     // Purple styling
  | 'BUSINESS'  // Yellow styling
  | 'SEASONAL'; // Teal styling
```

### BlogModerationState

Application state interface.

```typescript
interface BlogModerationState {
  activeTab: BlogStatus;
  searchQuery: string;
  categoryFilter: BlogCategory | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalRecords: number;
  };
}
```

### PaginationState

Pagination configuration.

```typescript
interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalRecords: number;
}
```

### DateRange

Date filter configuration.

```typescript
interface DateRange {
  start: Date | null;
  end: Date | null;
}
```

## Theme-Aware Styling Specifications

### Mission Control (Dark Mode)

**Background:**
- Page: bg-[#050505]
- Ambient overlay: 40px grid pattern with purple/magenta gradient at 20% opacity
- Radial gradient mask from center to edges

**ModerationTabs:**
- Active tab: text-white with 2px underline in #d006f9 + shadow-neon glow
- Pending badge: bg-[#ff5f1f] (neon-orange) with shadow-neon-orange pulse animation
- Inactive tabs: text-gray-400 with hover:text-white

**BlogModerationTable:**
- Container: glass-panel with border-[#d006f9]/30
- Rows: hover:bg-white/5 transition
- Category badges: Low-opacity colored backgrounds (e.g., bg-green-500/10 for DIETARY) with text-glow effect
- Post ID: font-mono (JetBrains Mono) in text-[#d006f9]/70
- Caterer logo fallback: Circular badge with colored indicator dot

**ReviewAction Button:**
- bg-[#d006f9]/20 with border-[#d006f9]
- hover: bg-[#d006f9] text-white with shadow-[0_0_15px_rgba(208,6,249,0.6)]
- active:scale-95 transform
- rounded-sm (4px radius)

**ModerationFilterBar:**
- glass-panel with bg-black/40
- Search input: bg-white/5 border-white/10, focus:border-[#d006f9] with glow-border
- Results counter: text-[#d006f9] font-mono font-bold

### Technical Console (Light Mode)

**Background:**
- Page: bg-[#E2E8F0]
- No ambient overlays or gradients

**ModerationTabs:**
- Active tab: text-slate-900 font-bold with 3px border-b-2 border-slate-900
- Pending badge: bg-[#8c2bee] text-white (solid square)
- Inactive tabs: text-slate-500 with hover:text-slate-900

**BlogModerationTable:**
- Container: bg-white with border border-slate-200, sharp-corners, shadow-sm
- Rows: hover:bg-slate-50 with border-b border-slate-200
- Category badges: Solid high-contrast borders (e.g., border-green-200) with light backgrounds (e.g., bg-green-50)
- Post ID: font-mono in text-slate-500
- Caterer logo fallback: Circular badge with initials in bg-slate-200

**ReviewAction Button:**
- bg-[#8c2bee] solid background
- hover: bg-[#7220c4]
- Material Symbol "arrow_forward" appears on hover
- sharp-corners (0px radius) with shadow-sm
- active:translate-y-[1px] for pressed effect

**ModerationFilterBar:**
- bg-slate-50 with border border-slate-200, sharp-corners
- Search input: bg-white border-slate-300, focus:ring-1 focus:ring-[#8c2bee]
- Results counter: text-slate-500 font-mono font-bold

### Category Badge Color Mapping

**Dark Mode:**
```typescript
const categoryStylesDark: Record<BlogCategory, string> = {
  TRENDS: 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.2)]',
  SAFETY: 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.2)]',
  RECIPES: 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)]',
  DIETARY: 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.2)]',
  GUIDE: 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]',
  BUSINESS: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_8px_rgba(234,179,8,0.2)]',
  SEASONAL: 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_8px_rgba(20,184,166,0.2)]'
};
```

**Light Mode:**
```typescript
const categoryStylesLight: Record<BlogCategory, string> = {
  TRENDS: 'bg-blue-50 text-blue-700 border border-blue-200',
  SAFETY: 'bg-red-50 text-red-700 border border-red-200',
  RECIPES: 'bg-orange-50 text-orange-700 border border-orange-200',
  DIETARY: 'bg-green-50 text-green-700 border border-green-200',
  GUIDE: 'bg-purple-50 text-purple-700 border border-purple-200',
  BUSINESS: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  SEASONAL: 'bg-teal-50 text-teal-700 border border-teal-200'
};
```

### Material Symbols

Icons used throughout the interface:

- search: Search input icon
- article: Empty state icon
- verified_user: Moderation/approval context
- pending_actions: Pending queue indicator
- notifications: Badge/alert context
- arrow_forward: Light mode button hover
- refresh: Refresh queue action
- history: History log action
- navigate_before: Previous page
- navigate_next: Next page

### Animation Specifications

**Table Row Entrance (Framer Motion):**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren: 0.05 } 
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};
```

**Tab Indicator Slide:**
```typescript
<motion.div
  layoutId="blogTabUnderline"
  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
/>
```

**Search Input Focus:**
- Animate border color from border-white/10 to border-[#d006f9] (Dark)
- Animate ring from none to ring-1 ring-[#8c2bee] (Light)
- Duration: 300ms ease transition

## Filtering and Search Logic

### Filter Pipeline

Filters are applied in the following sequence:

1. **Tab Filter (Status):** Filter by activeTab (PENDING, APPROVED, REJECTED)
2. **Category Filter:** If categoryFilter is not null, filter by matching category
3. **Date Range Filter:** If dateRange has start/end values, filter by submittedDate within range
4. **Search Filter:** If searchQuery is not empty, perform fuzzy match across id, title, caterer.name

### Fuzzy Search Implementation

```typescript
const fuzzyMatch = (submission: BlogPostSubmission, query: string): boolean => {
  const searchLower = query.toLowerCase();
  return (
    submission.id.toLowerCase().includes(searchLower) ||
    submission.title.toLowerCase().includes(searchLower) ||
    submission.caterer.name.toLowerCase().includes(searchLower)
  );
};
```

### Date Range Filtering

```typescript
const dateInRange = (dateStr: string, range: DateRange): boolean => {
  if (!range.start && !range.end) return true;
  
  const date = new Date(dateStr);
  
  if (range.start && date < range.start) return false;
  if (range.end && date > range.end) return false;
  
  return true;
};
```

### Pagination Calculation

```typescript
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedData = filteredData.slice(startIndex, endIndex);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
```

### Badge Count Computation

```typescript
const counts = useMemo(() => ({
  pending: rawData.filter(p => p.status === 'PENDING').length,
  approved: rawData.filter(p => p.status === 'APPROVED').length,
  rejected: rawData.filter(p => p.status === 'REJECTED').length
}), [rawData]);
```

## CSV Export Implementation

### Export Function

```typescript
const handleExportCSV = () => {
  const headers = ['Post ID', 'Post Title', 'Caterer Name', 'Category', 'Submitted Date', 'Status'];
  
  const rows = filteredData.map(post => [
    post.id,
    post.title,
    post.caterer.name,
    post.category,
    new Date(post.submittedDate).toLocaleString(),
    post.status
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `blog-moderation-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};
```

**Features:**
- Exports only filtered dataset (respects current filters)
- UTF-8 encoding for international characters
- Filename includes current date
- Proper CSV escaping with quotes

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies and consolidations:

**Redundancy Group 1: Tab Filtering**
- Properties 10.1, 10.2, 10.3 all test the same pattern (tab filtering by status)
- Consolidated into Property 1: Single property covering all status values

**Redundancy Group 2: Search Field Matching**
- Properties 6.2, 6.3, 6.4, 6.5 all test search matching across different fields
- Consolidated into Property 2: Single property covering OR logic across all fields

**Redundancy Group 3: Filter Event Emissions**
- Properties 5.4, 5.5, 5.6 all test the same pattern (filter changes emit events)
- Consolidated into Property 3: Single property covering all filter types

**Redundancy Group 4: Pagination Index Calculation**
- Properties 12.2, 12.3, 12.4 all test pagination slicing logic
- Consolidated into Property 4: Single property covering the complete slicing operation

**Redundancy Group 5: Page Reset on Filter Change**
- Properties 10.4, 13.3, 14.3 all test the same pattern (reset to page 1)
- Consolidated into Property 5: Single property covering all filter changes

**Redundancy Group 6: Caterer Display Logic**
- Properties 7.4, 7.5, 19.1, 19.4 all test logo vs initials fallback
- Consolidated into Property 6: Single property covering both cases

**Redundancy Group 7: Badge Count Accuracy**
- Properties 3.2, 3.7 both test badge count accuracy
- Consolidated into Property 7: Single property covering count computation

**Redundancy Group 8: Pagination Button Behavior**
- Properties 11.5, 11.6 test next/previous button logic
- Consolidated into Property 8: Single property covering both directions

**Redundancy Group 9: Filter Pipeline Order**
- Properties 13.4, 14.5 test filter ordering
- Consolidated into Property 9: Single property covering complete pipeline

**Redundancy Group 10: CSV Export Content**
- Properties 20.1, 20.2, 20.3 all test CSV export structure
- Consolidated into Property 10: Single property covering complete export

### Property 1: Tab Filtering by Status

For any blog post dataset and any selected tab (PENDING, APPROVED, REJECTED), all displayed posts should have a status matching the selected tab.

**Validates: Requirements 10.1, 10.2, 10.3**

### Property 2: Multi-Field Fuzzy Search

For any blog post dataset and any search query, a post should be included in results if and only if the query (case-insensitive) matches any of: post ID, post title, or caterer name.

**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

### Property 3: Filter Change Event Emission

For any filter control (search, category, date range), when the filter value changes, the component should emit the corresponding change event with the new value.

**Validates: Requirements 5.4, 5.5, 5.6**

### Property 4: Pagination Slicing Correctness

For any filtered dataset, current page number, and items per page value, the displayed posts should be exactly the slice from index (currentPage - 1) × itemsPerPage to (currentPage - 1) × itemsPerPage + itemsPerPage.

**Validates: Requirements 12.2, 12.3, 12.4, 12.5**

### Property 5: Page Reset on Filter Change

For any filter change (tab, category, date range, search), the current page should reset to 1.

**Validates: Requirements 10.4, 10.5, 13.3, 14.3**

### Property 6: Caterer Display Fallback

For any blog post, if the caterer has a logoUrl, an image should be rendered; otherwise, a badge with caterer initials should be rendered.

**Validates: Requirements 7.4, 7.5, 19.1, 19.4**

### Property 7: Badge Count Accuracy

For any blog post dataset, the pending badge count should equal the number of posts with status PENDING.

**Validates: Requirements 3.2, 3.7**

### Property 8: Pagination Navigation Bounds

For any pagination state, clicking Previous when currentPage > 1 should emit (currentPage - 1), and clicking Next when currentPage < totalPages should emit (currentPage + 1).

**Validates: Requirements 11.5, 11.6**

### Property 9: Filter Pipeline Ordering

For any blog post dataset with multiple active filters, the filtering should apply in sequence: tab filter, then category filter, then date range filter, then search filter.

**Validates: Requirements 13.4, 14.5**

### Property 10: CSV Export Completeness

For any filtered blog post dataset, the exported CSV should contain exactly the filtered posts with columns: Post ID, Post Title, Caterer Name, Category, Submitted Date, Status.

**Validates: Requirements 20.1, 20.2, 20.3**

### Property 11: Category Filter Application

For any blog post dataset and any selected category, all displayed posts should have a category matching the selected filter.

**Validates: Requirements 13.1**

### Property 12: Date Range Filter Application

For any blog post dataset and any selected date range, all displayed posts should have a submittedDate within the range (inclusive).

**Validates: Requirements 14.1**

### Property 13: Total Records Synchronization

For any change to the filtered dataset, the pagination totalRecords value should equal the length of the filtered dataset.

**Validates: Requirements 12.6**

### Property 14: Tab Click Event Emission

For any tab button click, the component should emit a tab change event with the BlogStatus corresponding to the clicked tab.

**Validates: Requirements 3.5**

### Property 15: Review Action Event Emission

For any ReviewAction button click, the component should emit an onReviewPost event with the correct Blog_Post_Submission id.

**Validates: Requirements 9.3**

### Property 16: Review Navigation Trigger

For any onReviewPost event, the system should initiate navigation to the review workflow.

**Validates: Requirements 9.5**

### Property 17: Action Button Presence

For any displayed blog post row, a ReviewAction button should be rendered in the Action column.

**Validates: Requirements 7.8**

### Property 18: Current Page Display

For any pagination state, the displayed current page number should match the pagination state's currentPage value.

**Validates: Requirements 11.1**

### Property 19: Total Pages Display

For any pagination state, the displayed total pages should equal ceil(totalRecords / itemsPerPage).

**Validates: Requirements 11.2**

### Property 20: Case-Insensitive Search

For any search query, changing the case of the query should not affect which posts are included in the results (same posts should match regardless of case).

**Validates: Requirements 6.1**

## Error Handling

### Empty State Handling

**No Posts in Current Tab:**
- Display empty state with Material Symbol "article" icon
- Message: "No submissions found in {TAB_NAME} queue"
- Styling: Centered, muted text color

**No Search Results:**
- Display empty state with search icon
- Message: "No posts match your search criteria"
- Suggestion: "Try different keywords or clear filters"

**Zero Total Records:**
- Hide pagination controls when totalRecords === 0
- Display appropriate empty state in table

### Invalid Date Range

**Start Date After End Date:**
- Validate date range before applying filter
- Show error message: "Start date must be before end date"
- Prevent filter application until corrected

**Future Dates:**
- Allow future dates (posts may be scheduled)
- No validation error for future dates

### CSV Export Errors

**Empty Dataset:**
- Allow export of empty CSV with headers only
- Show toast notification: "Exported 0 records"

**Browser Download Failure:**
- Catch download errors
- Show error toast: "Failed to download CSV. Please try again."
- Log error to console for debugging

### Network Errors (Future Implementation)

**API Fetch Failure:**
- Display error banner at top of page
- Message: "Failed to load blog posts. Please refresh."
- Provide "Retry" button

**Timeout:**
- Show loading spinner for max 10 seconds
- After timeout, show error state
- Allow manual refresh

### Invalid State Recovery

**Invalid Page Number:**
- If currentPage > totalPages, reset to page 1
- If currentPage < 1, reset to page 1

**Invalid Items Per Page:**
- If itemsPerPage < 1, default to 10
- If itemsPerPage > 100, cap at 100

**Corrupted Filter State:**
- If categoryFilter is invalid, reset to null
- If dateRange has invalid dates, reset to null
- Log warning to console

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Property-Based Testing

**Library Selection:**
- JavaScript/TypeScript: fast-check
- Minimum 100 iterations per property test
- Each test must reference its design document property

**Property Test Configuration:**

```typescript
import fc from 'fast-check';

// Example property test structure
describe('Blog Moderation Queue - Property Tests', () => {
  it('Property 1: Tab Filtering by Status', () => {
    fc.assert(
      fc.property(
        fc.array(blogPostArbitrary),
        fc.constantFrom('PENDING', 'APPROVED', 'REJECTED'),
        (posts, selectedTab) => {
          const filtered = filterByTab(posts, selectedTab);
          return filtered.every(post => post.status === selectedTab);
        }
      ),
      { numRuns: 100 }
    );
  });
  // Feature: blog-moderation-queue, Property 1: Tab Filtering by Status
});
```

**Arbitraries to Implement:**

```typescript
// Blog post generator
const blogPostArbitrary = fc.record({
  id: fc.string().map(s => `BLG-${s.slice(0, 3)}`),
  title: fc.string({ minLength: 5, maxLength: 100 }),
  excerpt: fc.string({ minLength: 10, maxLength: 200 }),
  caterer: fc.record({
    name: fc.string({ minLength: 3, maxLength: 50 }),
    logoUrl: fc.option(fc.webUrl(), { nil: undefined }),
    initials: fc.string({ minLength: 1, maxLength: 3 })
  }),
  category: fc.constantFrom('TRENDS', 'SAFETY', 'RECIPES', 'DIETARY', 'GUIDE', 'BUSINESS', 'SEASONAL'),
  submittedDate: fc.date().map(d => d.toISOString()),
  status: fc.constantFrom('PENDING', 'APPROVED', 'REJECTED')
});

// Date range generator
const dateRangeArbitrary = fc.record({
  start: fc.option(fc.date(), { nil: null }),
  end: fc.option(fc.date(), { nil: null })
}).filter(range => {
  if (range.start && range.end) {
    return range.start <= range.end;
  }
  return true;
});

// Search query generator
const searchQueryArbitrary = fc.oneof(
  fc.constant(''),
  fc.string({ minLength: 1, maxLength: 20 })
);
```

**Property Tests to Implement:**

1. Property 1: Tab Filtering by Status (100 runs)
2. Property 2: Multi-Field Fuzzy Search (100 runs)
3. Property 3: Filter Change Event Emission (100 runs)
4. Property 4: Pagination Slicing Correctness (100 runs)
5. Property 5: Page Reset on Filter Change (100 runs)
6. Property 6: Caterer Display Fallback (100 runs)
7. Property 7: Badge Count Accuracy (100 runs)
8. Property 8: Pagination Navigation Bounds (100 runs)
9. Property 9: Filter Pipeline Ordering (100 runs)
10. Property 10: CSV Export Completeness (100 runs)
11. Property 11: Category Filter Application (100 runs)
12. Property 12: Date Range Filter Application (100 runs)
13. Property 13: Total Records Synchronization (100 runs)
14. Property 14: Tab Click Event Emission (100 runs)
15. Property 15: Review Action Event Emission (100 runs)
16. Property 16: Review Navigation Trigger (100 runs)
17. Property 17: Action Button Presence (100 runs)
18. Property 18: Current Page Display (100 runs)
19. Property 19: Total Pages Display (100 runs)
20. Property 20: Case-Insensitive Search (100 runs)

### Unit Testing

**Focus Areas:**

Unit tests should focus on specific examples and edge cases that complement property tests:

**Component Rendering:**
- ModerationHeader renders with correct breadcrumbs (Requirement 2.1)
- ModerationHeader renders FILTER, EXPORT CSV, HISTORY_LOG buttons (Requirements 2.2, 2.3, 2.4)
- ModerationTabs renders three tabs: Pending, Approved, Rejected (Requirement 3.1)
- ModerationFilterBar renders search input, category dropdown, date picker (Requirements 5.1, 5.2, 5.3)
- BlogModerationTable renders all six columns (Requirement 7.1)
- ReviewAction button displays "Review Post" label (Requirement 9.2)
- ModerationPagination renders Previous and Next buttons (Requirements 11.3, 11.4)
- Category dropdown displays all seven BlogCategory values (Requirement 5.8)

**Edge Cases:**
- Empty search query displays all posts (Requirement 6.6)
- Cleared category filter displays all posts (Requirement 13.2)
- Cleared date range filter displays all posts (Requirement 14.2)
- Previous button disabled when currentPage === 1 (Requirement 11.7)
- Next button disabled when currentPage === totalPages (Requirement 11.8)
- Pagination hidden when totalRecords === 0

**Event Handling:**
- FILTER button click emits filter toggle event (Requirement 2.5)
- EXPORT CSV button click emits export event (Requirement 2.6)
- HISTORY_LOG button click emits history navigation event (Requirement 2.7)

**Integration Tests:**
- Complete filter pipeline with all filters active
- Tab switch clears search and resets page
- CSV export with multiple active filters
- Pagination with filtered dataset

### Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── BlogModerationPage.test.tsx
│   │   ├── BlogModerationTable.test.tsx
│   │   ├── ReviewAction.test.tsx
│   │   └── ModerationFilterBar.test.tsx
│   ├── utils/
│   │   ├── filterPipeline.test.ts
│   │   ├── fuzzySearch.test.ts
│   │   ├── pagination.test.ts
│   │   └── csvExport.test.ts
│   └── edge-cases/
│       ├── emptyStates.test.tsx
│       ├── boundaryConditions.test.ts
│       └── invalidState.test.ts
└── property/
    ├── filtering.property.test.ts
    ├── search.property.test.ts
    ├── pagination.property.test.ts
    ├── events.property.test.ts
    └── export.property.test.ts
```

### Coverage Goals

- **Unit Test Coverage**: 80% line coverage minimum
- **Property Test Coverage**: All 20 correctness properties implemented
- **Integration Test Coverage**: All major user workflows covered
- **Edge Case Coverage**: All boundary conditions and error states tested

### Continuous Integration

- Run all tests on every pull request
- Fail build if any property test fails
- Fail build if unit test coverage drops below 80%
- Run property tests with 100 iterations in CI
- Run property tests with 1000 iterations nightly for deeper validation
