# Frontend Pages Documentation

This document provides a comprehensive overview of the pages directory structure, components, and organization in the job portal frontend application.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [View-Based Organization](#view-based-organization)
3. [Common Pages](#common-pages)
4. [Component Usage Patterns](#component-usage-patterns)
5. [Page Details by View](#page-details-by-view)

---

## Directory Structure

The pages directory is organized by user roles/views:

```
src/pages/
├── common/                    # Shared pages across all views
├── corporate-view/           # Corporate/Company user pages
├── jobSeeker-view/           # Job seeker user pages
├── recruiter-view/           # Recruiter user pages
├── super-admin-view/         # Super admin user pages
└── trainner-view/            # Trainer user pages
```

---

## View-Based Organization

The application follows a role-based architecture where each user type has their own dedicated set of pages:

### 1. **Common View** (`/common`)
Shared pages used across multiple user roles.

### 2. **Corporate View** (`/corporate-view`)
Pages for corporate/company users who post jobs and manage their organization.

### 3. **Job Seeker View** (`/jobSeeker-view`)
Pages for job seekers who search and apply for jobs.

### 4. **Recruiter View** (`/recruiter-view`)
Pages for recruiters who manage candidates and job postings.

### 5. **Super Admin View** (`/super-admin-view`)
Pages for super administrators who manage the entire platform.

### 6. **Trainer View** (`/trainner-view`)
Pages for trainers who provide training programs.

---

## Common Pages

### `common/congratulation.jsx`
**Purpose**: Success/celebration page shown after user registration or completion of a major action.

**Key Features**:
- Confetti animation using `react-confetti`
- Dynamic welcome message based on user role
- Redirects to role-specific dashboard
- Uses `useAuthStore` for user information

**Components Used**:
- `react-confetti` (external library)
- `react-router-dom` (Link component)
- `react-use` (useWindowSize hook)

**Route**: `/congratulation`

---

## Page Details by View

### Corporate View (`/corporate-view`)

#### Pages:
1. **`dashboard.jsx`**
   - Main dashboard for corporate users
   - Components: `Navbar`, `Dashboard` (from corporate-view components)

2. **`analytics.jsx`**
   - Analytics and reporting page

3. **`applied-candidates-jobs.jsx`**
   - View candidates who applied for jobs

4. **`applied-candidates-trainings.jsx`**
   - View candidates who applied for trainings

5. **`basic-details.jsx`**
   - Company basic information setup

6. **`final-setup.jsx`**
   - Final setup/onboarding step

7. **`job-posting.jsx`**
   - Create and manage job postings

8. **`listing.jsx`**
   - List view for jobs or candidates

9. **`log-in.jsx`**
   - Corporate user login page

10. **`profile.jsx`**
    - Corporate profile management

11. **`resume-filtering.jsx`**
    - Filter and search through candidate resumes

12. **`trainingListing.jsx`**
    - List of training programs

13. **`trainning-posting.jsx`**
    - Create and manage training postings

**Common Components Used**:
- `Navbar` (from recruiter-view)
- `Dashboard` (from corporate-view components)

---

### Job Seeker View (`/jobSeeker-view`)

#### Pages:
1. **`dashboard.jsx`**
   - Main dashboard for job seekers
   - Shows profile completion progress
   - Displays recommended jobs
   - Components: `Navbar`, `HeroProfile`, `Pagination`
   - Hooks: `useJobseekerProfileProgress`

2. **`basic-details.jsx`**
   - Personal basic information (Stage 1 of profile setup)

3. **`education-details.jsx`**
   - Education history (Stage 2 of profile setup)

4. **`working-details.jsx`**
   - Work experience (Stage 3 of profile setup)

5. **`certificate-details.jsx`**
   - Certifications and credentials (Stage 4 of profile setup)

6. **`additional-details.jsx`**
   - Additional information uploads (Stage 5 of profile setup)

7. **`job-description.jsx`**
   - View detailed job descriptions

8. **`log-in.jsx`**
   - Job seeker login page

9. **`search.jsx`**
   - Job search functionality

**Profile Setup Flow**:
The job seeker profile setup follows a multi-stage process:
- Stage 1 → `basic-details.jsx`
- Stage 2 → `education-details.jsx`
- Stage 3 → `working-details.jsx`
- Stage 4 → `certificate-details.jsx`
- Stage 5 → `additional-details.jsx`

**Common Components Used**:
- `Navbar` (from recruiter-view)
- `HeroProfile` (from recruiter-view/common)
- `Pagination` (from common)
- `SearchComponent` (from common)

---

### Recruiter View (`/recruiter-view`)

#### Pages:
1. **`dashboard.jsx`**
   - Main dashboard for recruiters
   - Components: `Navbar`, `DashboardComponent` (from recruiter-view components)

2. **`basic-details.jsx`**
   - Recruiter basic information

3. **`candidate-create.jsx`**
   - Create new candidate profiles

4. **`candidate-releventDetails.jsx`**
   - Add relevant details for candidates

5. **`candidates.jsx`**
   - List and manage candidates

6. **`edit-profile.jsx`**
   - Edit recruiter profile

7. **`faq.jsx`**
   - Frequently asked questions

8. **`job-openings.jsx`**
   - Manage job openings

9. **`kyc-verification.jsx`**
   - KYC (Know Your Customer) verification

10. **`log-in.jsx`**
    - Recruiter login page

11. **`matches-and-submission.jsx`**
    - View candidate matches and submissions

12. **`profile.jsx`**
    - Recruiter profile view

13. **`qualification-details.jsx`**
    - Qualification information

14. **`sectoral-details.jsx`**
    - Sector-specific details

**Common Components Used**:
- `Navbar` (from recruiter-view)
- `DashboardComponent` (from recruiter-view)
- `HeroProfile` (from recruiter-view/common)

---

### Super Admin View (`/super-admin-view`)

#### Pages:
1. **`dashboard.jsx`**
   - Main super admin dashboard
   - Displays admin profile information
   - Hooks: `useGetSuperAdminProfile`

2. **`admin-management.jsx`**
   - Manage admin users

3. **`approvals.jsx`**
   - Approve/reject user registrations and content

4. **`database.jsx`**
   - Database management interface
   - Components: Database management components from super-admin-view

5. **`jobs-and-trainings/jobs-and-trainings.jsx`**
   - Manage jobs and training programs
   - Located in subdirectory

6. **`log-in.jsx`**
   - Super admin login page

7. **`master-data.jsx`**
   - Manage master data (dropdowns, constants, etc.)
   - Components: Master data management components

**Common Components Used**:
- Components from `super-admin-view/shared/`:
  - `Layout`
  - `Navbar`
  - `TopHeader`
  - `MobileNav`
  - `NotificationSideDrawer`
  - `AdminStatusBadge`
  - `ActionButtons`
- Components from `super-admin-view/common/`:
  - Companies, Candidates, Jobs, Trainings, Trainers, Recruiters, Applications tabs and tables

**Subdirectories**:
- `jobs-and-trainings/` - Contains job and training management pages

---

### Trainer View (`/trainner-view`)

#### Pages:
1. **`dashboard.jsx`**
   - Main trainer dashboard
   - Shows profile completion progress
   - Displays recommended trainings
   - Search functionality for trainings
   - Components: `Navbar`, `HeroProfile`, `Pagination`, `SearchComponent`, `JobCard`, `PendingApprove`
   - Hooks: `useGetTrainerProgress`, `useGetAllTrainings`, `useApplyForTraining`, `useDebounce`

2. **`basic-details.jsx`**
   - Trainer basic information (Stage 1)

3. **`education-details.jsx`**
   - Education details (Stage 2)

4. **`working-details.jsx`**
   - Working experience (Stage 3)

5. **`certificate-details.jsx`**
   - Certificate information (Stage 4)

6. **`additional-details.jsx`**
   - Additional details

7. **`job-description.jsx`**
   - View job/training descriptions

8. **`log-in.jsx`**
   - Trainer login page

9. **`profile.jsx`**
   - Trainer profile view

10. **`search.jsx`**
    - Search for trainings/jobs

**Profile Setup Flow**:
Similar to job seeker, trainers have a multi-stage profile setup:
- Stage 2 → `education-details.jsx`
- Stage 3 → `working-details.jsx`
- Stage 4 → `certificate-details.jsx`

**Common Components Used**:
- `Navbar` (from recruiter-view)
- `HeroProfile` (from recruiter-view/common)
- `Pagination` (from common)
- `SearchComponent` (from common)
- `JobCard` (from trainer-view)
- `PendingApprove` (from common)

---

## Component Usage Patterns

### Navigation Components
- **`Navbar`**: Used across most views (from `recruiter-view/navbar`)
  - Props: `onlySupport` (boolean)
  - Used in: Corporate, Job Seeker, Recruiter, Trainer views

### Layout Components
- **`HeroProfile`**: Profile header component
  - Location: `recruiter-view/common/hero-profile`
  - Used in: Job Seeker, Trainer dashboards

### Common UI Components
- **`Pagination`**: Pagination controls
  - Location: `common/pagination`
  - Used in: Job Seeker, Trainer dashboards

- **`SearchComponent`**: Search input component
  - Location: `common/searchComponent`
  - Used in: Job Seeker, Trainer dashboards

- **`PendingApprove`**: Pending approval status component
  - Location: `common/pending-approve`
  - Used in: Trainer dashboard

### View-Specific Components
- **Corporate View**: `Dashboard` component from `corporate-view/dashboard`
- **Recruiter View**: `DashboardComponent` from `recruiter-view/dashboard`
- **Trainer View**: `JobCard` from `trainer-view/jobCard`

### Super Admin Components
Super admin view uses a more complex component structure:
- **Shared Components**: Layout, Navbar, TopHeader, MobileNav, NotificationSideDrawer
- **Feature Components**: Organized by entity (companies, candidates, jobs, trainings, trainers, recruiters, applications)
- **Management Components**: Master data, database, approvals, admin management

---

## Authentication Pages

All views have their own `log-in.jsx` pages:
- `/corporate-view/log-in.jsx`
- `/jobSeeker-view/log-in.jsx`
- `/recruiter-view/log-in.jsx`
- `/super-admin-view/log-in.jsx`
- `/trainner-view/log-in.jsx`

---

## Profile Management Pages

Most views have profile-related pages:
- **Profile View**: `profile.jsx` (Corporate, Recruiter, Trainer)
- **Profile Setup**: Multi-stage setup pages (Job Seeker, Trainer)
- **Edit Profile**: `edit-profile.jsx` (Recruiter)

---

## State Management

Pages use various state management approaches:
- **Zustand**: `useAuthStore` for authentication state
- **React Query/TanStack Query**: Custom hooks for data fetching
- **Local State**: `useState` for component-level state
- **URL State**: `useSearchParams` for filter/search state

---

## Routing Patterns

Based on the code structure, routes appear to follow this pattern:
- `/{role}/dashboard` - Main dashboard
- `/{role}/log-in` - Login page
- `/{role}/profile` - Profile view
- `/{role}/profile-setup/{stage}` - Profile setup stages
- `/{role}/...` - Role-specific routes

---

## Key Hooks Used

### Profile Hooks
- `useJobseekerProfileProgress` - Job seeker profile progress
- `useGetTrainerProgress` - Trainer profile progress
- `useGetSuperAdminProfile` - Super admin profile

### Data Fetching Hooks
- `useGetAllTrainings` - Fetch trainings
- `useApplyForTraining` - Apply for training
- Custom hooks from `@/hooks/` directory

### Utility Hooks
- `useDebounce` - Debounce search input
- `useWindowSize` - Window size for responsive design

---

## File Naming Conventions

- **Page files**: Use kebab-case (e.g., `job-posting.jsx`, `basic-details.jsx`)
- **Component files**: Use camelCase or kebab-case depending on the component type
- **Subdirectories**: Use kebab-case (e.g., `jobs-and-trainings/`)

---

## Notes

1. **Shared Navbar**: Most views use the `Navbar` component from `recruiter-view`, suggesting it's a shared component despite its location.

2. **Profile Setup**: Both Job Seeker and Trainer views have multi-stage profile setup processes with progress tracking.

3. **Component Reusability**: Common components are stored in `/common` and `/components/common/` directories.

4. **Super Admin Complexity**: The super admin view has the most complex structure with multiple subdirectories and feature-specific components.

5. **Dashboard Patterns**: Each view has a dashboard, but they vary in complexity:
   - Simple: Corporate, Recruiter (wrappers around component)
   - Medium: Job Seeker (profile progress + job listings)
   - Complex: Trainer (profile progress + training listings + search)
   - Most Complex: Super Admin (full admin interface)

---

## Future Considerations

When adding new pages:
1. Follow the existing naming conventions
2. Place pages in the appropriate view directory
3. Reuse common components when possible
4. Use the established hook patterns for data fetching
5. Maintain consistency with existing page structures

