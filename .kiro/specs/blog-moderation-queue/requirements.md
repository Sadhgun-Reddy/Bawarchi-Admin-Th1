# Requirements Document

## Introduction

The Blog Moderation Queue is a new moderation module for the Command Deck admin panel that enables administrators to review, approve, or reject caterer-submitted blog posts. This system follows established moderation patterns used in Menu and Offers moderation, providing a consistent user experience for content review workflows. Phase A focuses on the structural implementation of the Pending Blog Posts moderation queue with tab-based filtering, search capabilities, and theme-aware UI components.

## Glossary

- **Blog_Moderation_System**: The complete moderation module for managing caterer-submitted blog posts
- **BlogModerationPage**: Root orchestrator component managing state for tabs, filters, and blog dataset
- **ModerationHeader**: Component displaying breadcrumbs and action panel with FILTER, EXPORT CSV, and HISTORY_LOG buttons
- **ModerationTabs**: Navigation component for switching between Pending, Approved, and Rejected tabs with badge counts
- **ModerationFilterBar**: Component providing search, category dropdown, and date range picker functionality
- **BlogModerationTable**: High-density grid component displaying blog post submissions with action buttons
- **ReviewAction**: Primary button component triggering the "Review Post" workflow
- **ModerationPagination**: Footer component for queue navigation
- **Blog_Post_Submission**: Entity representing a caterer-submitted blog post awaiting moderation
- **Blog_Status**: Enumeration of post states: PENDING, APPROVED, REJECTED
- **Blog_Category**: Enumeration of content themes: TRENDS, SAFETY, RECIPES, DIETARY, GUIDE, BUSINESS, SEASONAL
- **Caterer**: Entity representing the business that submitted the blog post
- **Command_Deck**: The admin panel application containing moderation modules
- **Dark_Mode**: Theme variant with bg-[#050505] and purple/magenta accent gradients
- **Light_Mode**: Theme variant with bg-[#E2E8F0] and solid borders
- **Fuzzy_Search**: Search algorithm matching partial strings across multiple fields
- **Theme_Context**: React context providing current theme state (dark or light)

## Requirements

### Requirement 1: Blog Moderation Page Component Structure

**User Story:** As an administrator, I want a dedicated blog moderation page with organized components, so that I can efficiently review caterer-submitted blog posts.

#### Acceptance Criteria

1. THE BlogModerationPage SHALL render as the root orchestrator component
2. THE BlogModerationPage SHALL manage state for active tab, search query, category filter, date range, and pagination
3. THE BlogModerationPage SHALL render ModerationHeader as the first child component
4. THE BlogModerationPage SHALL render ModerationTabs below the ModerationHeader
5. THE BlogModerationPage SHALL render ModerationFilterBar below the ModerationTabs
6. THE BlogModerationPage SHALL render BlogModerationTable below the ModerationFilterBar
7. THE BlogModerationPage SHALL render ModerationPagination as the last child component
8. THE BlogModerationPage SHALL apply theme-aware background styling from Theme_Context
9. WHEN Theme_Context indicates Dark_Mode, THE BlogModerationPage SHALL apply bg-[#050505] background color
10. WHEN Theme_Context indicates Light_Mode, THE BlogModerationPage SHALL apply bg-[#E2E8F0] background color

### Requirement 2: Moderation Header Component

**User Story:** As an administrator, I want a header with breadcrumbs and action buttons, so that I can navigate and access key functions quickly.

#### Acceptance Criteria

1. THE ModerationHeader SHALL display breadcrumbs showing "System / Moderation_Queue"
2. THE ModerationHeader SHALL render a FILTER button in the action panel
3. THE ModerationHeader SHALL render an EXPORT CSV button in the action panel
4. THE ModerationHeader SHALL render a HISTORY_LOG button in the action panel
5. WHEN the FILTER button is clicked, THE ModerationHeader SHALL emit a filter toggle event
6. WHEN the EXPORT CSV button is clicked, THE ModerationHeader SHALL emit an export event
7. WHEN the HISTORY_LOG button is clicked, THE ModerationHeader SHALL emit a history navigation event
8. THE ModerationHeader SHALL apply theme-aware styling based on Theme_Context

### Requirement 3: Moderation Tabs Navigation

**User Story:** As an administrator, I want tabs to switch between Pending, Approved, and Rejected posts, so that I can focus on specific moderation states.

#### Acceptance Criteria

1. THE ModerationTabs SHALL render three tab buttons: Pending, Approved, Rejected
2. THE ModerationTabs SHALL display a numerical badge on the Pending tab showing the count of pending posts
3. WHEN Theme_Context indicates Dark_Mode, THE ModerationTabs SHALL apply orange-glow styling to the Pending badge
4. WHEN Theme_Context indicates Light_Mode, THE ModerationTabs SHALL apply solid primary color styling to the Pending badge
5. WHEN a tab button is clicked, THE ModerationTabs SHALL emit a tab change event with the selected Blog_Status
6. THE ModerationTabs SHALL visually highlight the active tab
7. THE ModerationTabs SHALL update badge counts when the blog dataset changes

### Requirement 4: Blog Post Data Model

**User Story:** As a developer, I want a well-defined data model for blog post submissions, so that I can maintain type safety and consistency.

#### Acceptance Criteria

1. THE Blog_Post_Submission interface SHALL include an id field of type string formatted as "BLG-XXX"
2. THE Blog_Post_Submission interface SHALL include a title field of type string
3. THE Blog_Post_Submission interface SHALL include an excerpt field of type string
4. THE Blog_Post_Submission interface SHALL include a caterer object with name, logoUrl, and initials properties
5. THE Blog_Post_Submission interface SHALL include a category field of type Blog_Category
6. THE Blog_Post_Submission interface SHALL include a submittedDate field containing an ISO 8601 formatted string
7. THE Blog_Post_Submission interface SHALL include a status field of type Blog_Status
8. THE Blog_Status type SHALL define exactly three values: PENDING, APPROVED, REJECTED
9. THE Blog_Category type SHALL define exactly seven values: TRENDS, SAFETY, RECIPES, DIETARY, GUIDE, BUSINESS, SEASONAL

### Requirement 5: Moderation Filter Bar

**User Story:** As an administrator, I want to filter blog posts by search query, category, and date range, so that I can quickly find specific submissions.

#### Acceptance Criteria

1. THE ModerationFilterBar SHALL render a search input field
2. THE ModerationFilterBar SHALL render a category dropdown selector
3. THE ModerationFilterBar SHALL render a date range picker
4. WHEN text is entered in the search input, THE ModerationFilterBar SHALL emit a search query change event
5. WHEN a category is selected, THE ModerationFilterBar SHALL emit a category filter change event
6. WHEN a date range is selected, THE ModerationFilterBar SHALL emit a date range change event
7. THE ModerationFilterBar SHALL apply theme-aware styling based on Theme_Context
8. THE category dropdown SHALL display all seven Blog_Category values as options

### Requirement 6: Fuzzy Search Functionality

**User Story:** As an administrator, I want to search across Post ID, Title, and Caterer Name, so that I can find posts using partial information.

#### Acceptance Criteria

1. WHEN a search query is provided, THE Blog_Moderation_System SHALL perform case-insensitive matching
2. THE Blog_Moderation_System SHALL match the search query against the Blog_Post_Submission id field
3. THE Blog_Moderation_System SHALL match the search query against the Blog_Post_Submission title field
4. THE Blog_Moderation_System SHALL match the search query against the Blog_Post_Submission caterer name field
5. WHEN a Blog_Post_Submission matches any of the three fields, THE Blog_Moderation_System SHALL include it in the filtered results
6. WHEN the search query is empty, THE Blog_Moderation_System SHALL display all posts matching the current tab filter

### Requirement 7: Blog Moderation Table Display

**User Story:** As an administrator, I want a high-density table showing post details, so that I can review multiple submissions efficiently.

#### Acceptance Criteria

1. THE BlogModerationTable SHALL render columns for Post ID, Post Title, Caterer Name, Category, Submitted Date, and Action
2. THE BlogModerationTable SHALL display Post ID in monospaced font
3. THE BlogModerationTable SHALL display Post Title with a text snippet preview
4. THE BlogModerationTable SHALL display Caterer Name with the caterer logo when logoUrl is available
5. WHEN logoUrl is not available, THE BlogModerationTable SHALL display caterer initials in a circular badge
6. THE BlogModerationTable SHALL display Category as a styled badge
7. THE BlogModerationTable SHALL display Submitted Date in a human-readable format
8. THE BlogModerationTable SHALL render a ReviewAction button in the Action column for each row
9. THE BlogModerationTable SHALL apply theme-aware styling based on Theme_Context

### Requirement 8: Category Badge Styling

**User Story:** As an administrator, I want visually distinct category badges, so that I can quickly identify content themes.

#### Acceptance Criteria

1. WHEN Theme_Context indicates Dark_Mode, THE BlogModerationTable SHALL render category badges with low-opacity colored backgrounds
2. WHEN Theme_Context indicates Light_Mode, THE BlogModerationTable SHALL render category badges with solid high-contrast borders and light backgrounds
3. THE BlogModerationTable SHALL apply blue styling to TRENDS category badges
4. THE BlogModerationTable SHALL apply green styling to DIETARY category badges
5. THE BlogModerationTable SHALL apply red styling to SAFETY category badges
6. THE BlogModerationTable SHALL apply orange styling to RECIPES category badges
7. THE BlogModerationTable SHALL apply purple styling to GUIDE category badges
8. THE BlogModerationTable SHALL apply yellow styling to BUSINESS category badges
9. THE BlogModerationTable SHALL apply teal styling to SEASONAL category badges

### Requirement 9: Review Post Action

**User Story:** As an administrator, I want to click a Review button for each post, so that I can open the editorial review workflow.

#### Acceptance Criteria

1. THE ReviewAction SHALL render as a primary button in each BlogModerationTable row
2. THE ReviewAction SHALL display "Review Post" as the button label
3. WHEN the ReviewAction button is clicked, THE ReviewAction SHALL emit an onReviewPost event with the Blog_Post_Submission id
4. THE BlogModerationPage SHALL handle the onReviewPost event
5. WHEN onReviewPost is triggered, THE BlogModerationPage SHALL initiate navigation to the editorial editor or open a review side-panel
6. THE ReviewAction SHALL apply theme-aware styling based on Theme_Context

### Requirement 10: Tab-Based Filtering

**User Story:** As an administrator, I want the table to automatically filter posts when I switch tabs, so that I see only relevant submissions.

#### Acceptance Criteria

1. WHEN the Pending tab is active, THE BlogModerationTable SHALL display only Blog_Post_Submission records with status PENDING
2. WHEN the Approved tab is active, THE BlogModerationTable SHALL display only Blog_Post_Submission records with status APPROVED
3. WHEN the Rejected tab is active, THE BlogModerationTable SHALL display only Blog_Post_Submission records with status REJECTED
4. WHEN the active tab changes, THE BlogModerationPage SHALL reset the current page to 1
5. WHEN the active tab changes, THE BlogModerationPage SHALL clear the search query
6. THE BlogModerationTable SHALL re-render when the active tab state changes

### Requirement 11: Pagination Controls

**User Story:** As an administrator, I want pagination controls, so that I can navigate through large sets of blog submissions.

#### Acceptance Criteria

1. THE ModerationPagination SHALL display the current page number
2. THE ModerationPagination SHALL display the total number of pages
3. THE ModerationPagination SHALL render a Previous button
4. THE ModerationPagination SHALL render a Next button
5. WHEN the Previous button is clicked and the current page is greater than 1, THE ModerationPagination SHALL emit a page change event with currentPage minus 1
6. WHEN the Next button is clicked and the current page is less than total pages, THE ModerationPagination SHALL emit a page change event with currentPage plus 1
7. WHEN the current page is 1, THE ModerationPagination SHALL disable the Previous button
8. WHEN the current page equals total pages, THE ModerationPagination SHALL disable the Next button
9. THE ModerationPagination SHALL apply theme-aware styling based on Theme_Context

### Requirement 12: Pagination Data Slicing

**User Story:** As an administrator, I want to see a limited number of posts per page, so that the interface remains performant and readable.

#### Acceptance Criteria

1. THE BlogModerationPage SHALL maintain an itemsPerPage value in pagination state
2. THE BlogModerationPage SHALL calculate the start index as (currentPage minus 1) multiplied by itemsPerPage
3. THE BlogModerationPage SHALL calculate the end index as start index plus itemsPerPage
4. THE BlogModerationPage SHALL slice the filtered blog dataset using the start and end indices
5. THE BlogModerationTable SHALL render only the sliced subset of Blog_Post_Submission records
6. WHEN the filtered dataset length changes, THE BlogModerationPage SHALL update the totalRecords value in pagination state

### Requirement 13: Category Filter Application

**User Story:** As an administrator, I want to filter posts by category, so that I can focus on specific content themes.

#### Acceptance Criteria

1. WHEN a Blog_Category is selected in the category filter, THE BlogModerationPage SHALL filter the blog dataset to include only posts matching that category
2. WHEN the category filter is cleared, THE BlogModerationPage SHALL display all posts matching the current tab filter
3. WHEN the category filter changes, THE BlogModerationPage SHALL reset the current page to 1
4. THE BlogModerationPage SHALL apply category filtering after tab filtering and before search filtering
5. THE BlogModerationTable SHALL display the filtered results

### Requirement 14: Date Range Filter Application

**User Story:** As an administrator, I want to filter posts by submission date range, so that I can review posts from specific time periods.

#### Acceptance Criteria

1. WHEN a date range is selected, THE BlogModerationPage SHALL filter the blog dataset to include only posts with submittedDate within the range
2. WHEN the date range filter is cleared, THE BlogModerationPage SHALL display all posts matching other active filters
3. WHEN the date range filter changes, THE BlogModerationPage SHALL reset the current page to 1
4. THE BlogModerationPage SHALL parse submittedDate as ISO 8601 format for comparison
5. THE BlogModerationPage SHALL apply date range filtering after tab filtering and category filtering

### Requirement 15: Theme-Aware Dark Mode Styling

**User Story:** As an administrator using Dark Mode, I want purple/magenta accent gradients and low-opacity badges, so that the interface is visually comfortable.

#### Acceptance Criteria

1. WHEN Theme_Context indicates Dark_Mode, THE BlogModerationPage SHALL apply bg-[#050505] background color
2. WHEN Theme_Context indicates Dark_Mode, THE BlogModerationPage SHALL render an ambient overlay with purple/magenta gradient effects
3. WHEN Theme_Context indicates Dark_Mode, THE BlogModerationTable SHALL apply low-opacity colored backgrounds to category badges
4. WHEN Theme_Context indicates Dark_Mode, THE ModerationTabs SHALL apply orange-glow styling to the Pending badge
5. WHEN Theme_Context indicates Dark_Mode, THE BlogModerationTable SHALL apply backdrop-blur effects to table containers

### Requirement 16: Theme-Aware Light Mode Styling

**User Story:** As an administrator using Light Mode, I want sharp corners and solid borders, so that the interface has clear visual boundaries.

#### Acceptance Criteria

1. WHEN Theme_Context indicates Light_Mode, THE BlogModerationPage SHALL apply bg-[#E2E8F0] background color
2. WHEN Theme_Context indicates Light_Mode, THE BlogModerationTable SHALL apply solid high-contrast borders to category badges
3. WHEN Theme_Context indicates Light_Mode, THE BlogModerationTable SHALL apply light backgrounds to category badges
4. WHEN Theme_Context indicates Light_Mode, THE ModerationTabs SHALL apply solid primary color styling to the Pending badge
5. WHEN Theme_Context indicates Light_Mode, THE BlogModerationTable SHALL use sharp corners instead of rounded borders

### Requirement 17: Reusable Component Integration

**User Story:** As a developer, I want to reuse existing moderation components, so that I maintain consistency and reduce code duplication.

#### Acceptance Criteria

1. THE BlogModerationPage SHALL reuse the existing ModerationPagination component
2. THE BlogModerationPage SHALL reuse the existing ModerationHeader component
3. THE BlogModerationPage SHALL reuse the existing ModerationTabs component with Blog_Status configuration
4. THE BlogModerationPage SHALL reuse the existing ModerationFilterBar component with Blog_Category options
5. WHERE existing components require customization, THE Blog_Moderation_System SHALL extend them through props rather than duplication

### Requirement 18: High-Throughput Queue Management

**User Story:** As an administrator, I want efficient rendering and state management, so that I can review large volumes of blog submissions without performance degradation.

#### Acceptance Criteria

1. THE BlogModerationPage SHALL use React.useMemo for filtered dataset computation
2. THE BlogModerationPage SHALL use React.useMemo for paginated dataset computation
3. THE BlogModerationPage SHALL use React.useMemo for badge count computation
4. WHEN state changes occur, THE BlogModerationPage SHALL recompute only affected derived values
5. THE BlogModerationTable SHALL render only the current page of Blog_Post_Submission records
6. THE BlogModerationPage SHALL maintain pagination state to prevent unnecessary re-renders

### Requirement 19: Caterer Logo Display

**User Story:** As an administrator, I want to see caterer logos in the table, so that I can quickly identify businesses visually.

#### Acceptance Criteria

1. WHEN a Blog_Post_Submission caterer object includes a logoUrl, THE BlogModerationTable SHALL render the logo as an image
2. THE BlogModerationTable SHALL render caterer logos with a maximum width of 32 pixels
3. THE BlogModerationTable SHALL render caterer logos with a maximum height of 32 pixels
4. WHEN a Blog_Post_Submission caterer object does not include a logoUrl, THE BlogModerationTable SHALL render caterer initials in a circular badge
5. THE BlogModerationTable SHALL apply theme-aware styling to the initials badge

### Requirement 20: Export CSV Functionality

**User Story:** As an administrator, I want to export the current filtered dataset as CSV, so that I can analyze blog submissions in external tools.

#### Acceptance Criteria

1. WHEN the EXPORT CSV button is clicked, THE Blog_Moderation_System SHALL generate a CSV file containing the filtered blog dataset
2. THE CSV file SHALL include columns for Post ID, Post Title, Caterer Name, Category, Submitted Date, and Status
3. THE CSV file SHALL include only Blog_Post_Submission records matching the current filters
4. THE Blog_Moderation_System SHALL trigger a browser download of the CSV file
5. THE CSV file SHALL use UTF-8 encoding to support international characters
