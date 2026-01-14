# API Documentation

This document provides a comprehensive overview of all API endpoints, their usage, and which pages/components utilize them.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [API Organization](#api-organization)
3. [Common APIs](#common-apis)
4. [Trainer APIs](#trainer-apis)
5. [Job Seeker APIs](#job-seeker-apis)
6. [Corporate APIs](#corporate-apis)
7. [Recruiter APIs](#recruiter-apis)
8. [Super Admin APIs](#super-admin-apis)
9. [API Usage in Pages](#api-usage-in-pages)
10. [Base API Patterns](#base-api-patterns)

---

## Directory Structure

```
src/api/
├── common/              # Shared APIs across all views
├── trainer/             # Trainer-specific APIs
├── job-seeker/         # Job seeker-specific APIs
├── corporate/          # Corporate/Company APIs
├── recruiter/          # Recruiter APIs
└── super-admin/        # Super admin APIs
```

---

## API Organization

APIs are organized by user role, with each role having dedicated files for:
- **Authentication** (`auth.js`)
- **Profile Management** (`profile.js` or `user.js`)
- **Feature-specific APIs** (jobs, trainings, applicants, etc.)

---

## Common APIs

### `common/dropdown.js`
**Purpose**: Fetch dropdown values for forms and filters

**Endpoints**:
- `GET /dropdowns/:dropdownId/values` - Get dropdown values by ID

**Usage**:
- Used across multiple views for form dropdowns
- Accessed via `useDropDown` hook

**Pages/Components Using**:
- Various form pages across all views

---

### `common/upload.js`
**Purpose**: File upload functionality

**Endpoints**:
- `POST /recruiter/upload/cv` - Upload CV/resume file

**Usage**:
- File uploads for resumes, documents, etc.
- Accessed via `useUpload` hook

**Pages/Components Using**:
- Recruiter candidate creation pages
- Profile pages with file uploads

---

### `common/approval.js`
**Purpose**: Submit approval requests

**Endpoints**:
- `POST /approvals/submit` - Submit approval request

**Usage**:
- Used when users need approval for actions
- Accessed via `useApproval` hook

**Pages/Components Using**:
- Various pages requiring approval workflows

---

## Trainer APIs

### `trainer/auth.js`
**Purpose**: Trainer authentication and registration

**Endpoints**:
- `POST /trainer/signup/stage1` - Stage 1 registration (basic details)
- `POST /trainer/signup/stage2` - Stage 2 registration (education)
- `POST /trainer/signup/stage3` - Stage 3 registration (working details)
- `POST /trainer/signup/stage4` - Stage 4 registration (certificate details)
- `POST /trainer/login` - Trainer login

**Usage**:
- Multi-stage registration process
- Accessed via `useTrainerAuth` hook

**Pages Using**:
- `trainner-view/log-in.jsx` - Login
- `trainner-view/basic-details.jsx` - Stage 1 registration
- `trainner-view/education-details.jsx` - Stage 2 registration
- `trainner-view/working-details.jsx` - Stage 3 registration
- `trainner-view/certificate-details.jsx` - Stage 4 registration

---

### `trainer/profile.js`
**Purpose**: Trainer profile management

**Endpoints**:
- `GET /trainer/profile/profile` - Get trainer profile
- `GET /trainer/progress` - Get profile completion progress

**Usage**:
- Fetch trainer profile data
- Track profile completion percentage
- Accessed via `useGetTrainerProfile`, `useGetTrainerProgress` hooks

**Pages Using**:
- `trainner-view/dashboard.jsx` - Display profile progress
- `trainner-view/profile.jsx` - Profile view

---

### `trainer/training.js`
**Purpose**: Training program management for trainers

**Endpoints**:
- `GET /trainer/trainings` - Get all trainings (with filters)
- `GET /trainer/trainings/:id` - Get training by ID
- `POST /applications/trainings/apply` - Apply for a training

**Usage**:
- Browse available trainings
- View training details
- Apply for trainings
- Accessed via `useGetAllTrainings`, `useApplyForTraining` hooks

**Pages Using**:
- `trainner-view/dashboard.jsx` - Display recommended trainings, apply functionality
- `trainner-view/search.jsx` - Search trainings
- `trainner-view/job-description.jsx` - View training details

---

## Job Seeker APIs

### `job-seeker/auth.js`
**Purpose**: Job seeker authentication and registration

**Endpoints**:
- `POST /jobseeker/login` - Job seeker login
- `POST /jobseeker/signup/stage1` - Stage 1 registration
- `POST /jobseeker/signup/stage2` - Stage 2 registration
- `POST /jobseeker/signup/stage3` - Stage 3 registration
- `POST /jobseeker/signup/stage4` - Stage 4 registration
- `POST /jobseeker/signup/stage5` - Stage 5 registration

**Usage**:
- 5-stage registration process
- Accessed via `useJobSeekerAuth` hook

**Pages Using**:
- `jobSeeker-view/log-in.jsx` - Login
- `jobSeeker-view/basic-details.jsx` - Stage 1
- `jobSeeker-view/education-details.jsx` - Stage 2
- `jobSeeker-view/working-details.jsx` - Stage 3
- `jobSeeker-view/certificate-details.jsx` - Stage 4
- `jobSeeker-view/additional-details.jsx` - Stage 5

---

### `job-seeker/profile.js`
**Purpose**: Job seeker profile management

**Endpoints**:
- `GET /jobseeker/profile/profile` - Get job seeker profile
- `GET /jobseeker/progress` - Get profile completion progress

**Usage**:
- Fetch job seeker profile
- Track profile completion
- Accessed via `useGetJobSeekerProfile`, `useJobseekerProfileProgress` hooks

**Pages Using**:
- `jobSeeker-view/dashboard.jsx` - Display profile progress
- `jobSeeker-view/profile.jsx` - Profile view

---

## Corporate APIs

### `corporate/auth.js`
**Purpose**: Corporate authentication and registration

**Endpoints**:
- `POST /corporate/login` - Corporate login
- `POST /corporate/signup/stage1` - Stage 1 registration
- `POST /corporate/signup/stage2` - Stage 2 registration

**Usage**:
- 2-stage registration process
- Accessed via `useCorporateAuth` hook

**Pages Using**:
- `corporate-view/log-in.jsx` - Login
- `corporate-view/basic-details.jsx` - Stage 1
- `corporate-view/final-setup.jsx` - Stage 2

---

### `corporate/user.js`
**Purpose**: Corporate user profile management

**Endpoints**:
- `GET /corporate/profile` - Get corporate profile
- `GET /corporate/multistage/progress` - Get registration progress
- `PUT /corporate/profile/profile` - Update corporate profile

**Usage**:
- Fetch and update corporate profile
- Track registration progress
- Accessed via `useGetCorporateUserDetails`, `useGetCorporateProgressDetails`, `useUpdateCorporateUserDetails` hooks

**Pages Using**:
- `corporate-view/dashboard.jsx` - Display profile info
- `corporate-view/profile.jsx` - Profile management

---

### `corporate/job.js`
**Purpose**: Job posting and management

**Endpoints**:
- `GET /corporate/job` - Get filtered jobs (with query params)
- `POST /corporate/job` - Create new job posting
- `GET /corporate/job/:id` - Get job by ID
- `GET /corporate/applications/jobs/:id` - Get candidates by job ID (with filters)

**Usage**:
- List, create, and view jobs
- View applicants for specific jobs
- Accessed via `useGetFilteredJobs`, `useCorporateJobPost`, `useGetCandidatesByJobId` hooks

**Pages Using**:
- `corporate-view/job-posting.jsx` - Create/edit jobs
- `corporate-view/listing.jsx` - List jobs
- `corporate-view/applied-candidates-jobs.jsx` - View job applicants
- `corporate-view/resume-filtering.jsx` - Filter candidates

---

### `corporate/applicant.js`
**Purpose**: Applicant management

**Endpoints**:
- `GET /corporate/jobseeker/:id` - Get applicant details by ID
- `PATCH /corporate/applications/:id/status` - Update applicant status
- `GET /corporate/applications/jobs` - Get all job applications

**Usage**:
- View applicant profiles
- Update application status (approve/reject)
- Track all applications
- Accessed via `useGetApplicantById`, `useUpdateStatusOfApplicant`, `useGetApplicantCorporateDetails` hooks

**Pages Using**:
- `corporate-view/applied-candidates-jobs.jsx` - View and manage applicants
- `corporate-view/resume-filtering.jsx` - Applicant details

---

### `corporate/training.js`
**Purpose**: Training program management

**Endpoints**:
- `GET /corporate/training` - Get filtered trainings (with query params)
- `POST /corporate/training` - Create new training
- `GET /corporate/trainer/:id` - Get training by ID
- `GET /corporate/applications/trainings/:id` - Get candidates by training ID
- `GET /corporate/applications/trainings` - Get all training applications

**Usage**:
- List, create, and view trainings
- View applicants for trainings
- Accessed via `useGetTrainingList`, `useCorporateTrainingPost`, `useGetCandidatesByTrainingId` hooks

**Pages Using**:
- `corporate-view/trainning-posting.jsx` - Create/edit trainings
- `corporate-view/trainingListing.jsx` - List trainings
- `corporate-view/applied-candidates-trainings.jsx` - View training applicants

---

## Recruiter APIs

### `recruiter/auth.js`
**Purpose**: Recruiter authentication and registration

**Endpoints**:
- `POST /recruiter/login` - Recruiter login
- `POST /recruiter/register` - Recruiter registration
- `POST /recruiter/profile/add-kyc-info` - Add KYC information
- `POST /recruiter/profile/add-professional-info` - Add sectoral/professional info

**Usage**:
- Registration and authentication
- KYC verification
- Professional information setup
- Accessed via `useRecruiterAuth` hook

**Pages Using**:
- `recruiter-view/log-in.jsx` - Login
- `recruiter-view/basic-details.jsx` - Registration
- `recruiter-view/kyc-verification.jsx` - KYC setup
- `recruiter-view/sectoral-details.jsx` - Professional info

---

### `recruiter/user.js`
**Purpose**: Recruiter profile management

**Endpoints**:
- `GET /recruiter/profile` - Get recruiter profile
- `GET /recruiter/multistage/progress` - Get registration progress
- `PUT /recruiter/profile/profile` - Update recruiter profile

**Usage**:
- Fetch and update recruiter profile
- Track registration progress
- Accessed via `useGetUserDetails`, `useGetUserProgress`, `useUpdateUserDetails` hooks

**Pages Using**:
- `recruiter-view/dashboard.jsx` - Display profile
- `recruiter-view/profile.jsx` - Profile view
- `recruiter-view/edit-profile.jsx` - Edit profile

---

### `recruiter/job.js`
**Purpose**: Job management for recruiters

**Endpoints**:
- `GET /recruiter/job` - Get filtered jobs (with query params)
- `GET /recruiter/job/:id` - Get job by ID
- `POST /applications/jobs/recruiter/apply` - Apply single job seeker to job
- `POST /applications/jobs/recruiter/bulk-apply` - Bulk apply job seekers to job

**Usage**:
- Browse available jobs
- View job details
- Apply candidates to jobs (single or bulk)
- Accessed via `useGetFilteredJobs`, `useGetJobById`, `useApplySingleSeeker`, `useApplyBulkSeeker` hooks

**Pages Using**:
- `recruiter-view/job-openings.jsx` - Browse and apply to jobs
- `recruiter-view/matches-and-submission.jsx` - Job applications

---

### `recruiter/applicant.js`
**Purpose**: Candidate/job seeker management

**Endpoints**:
- `GET /recruiter/jobseeker/my-candidates` - Get all candidates (with filters)
- `POST /recruiter/jobseeker` - Create new job seeker/candidate
- `PUT /recruiter/jobseeker/:id` - Update job seeker
- `GET /recruiter/jobseeker/:id` - Get candidate by ID

**Usage**:
- Manage candidate database
- Create and update candidate profiles
- View candidate details
- Accessed via `useGetAllApplicantDetails`, `useCreateJobSeeker`, `useUpdateJobSeeker`, `useGetApplicantsById` hooks

**Pages Using**:
- `recruiter-view/candidates.jsx` - List candidates
- `recruiter-view/candidate-create.jsx` - Create candidate
- `recruiter-view/candidate-releventDetails.jsx` - Add candidate details

---

### `recruiter/training.js`
**Purpose**: Training program access for recruiters

**Endpoints**:
- `GET /recruiter/training` - Get filtered trainings (with query params)
- `GET /recruiter/training/:id` - Get training by ID

**Usage**:
- Browse available trainings
- View training details
- Accessed via `useGetFilteredTrainings`, `useGetTrainningById` hooks

**Pages Using**:
- `recruiter-view/job-openings.jsx` - Browse trainings
- Training-related pages

---

### `recruiter/sectoralOption.js`
**Purpose**: Get sector specialization options

**Endpoints**:
- `GET /recruiter/sector-specialization` - Get all sector options

**Usage**:
- Populate sector dropdowns
- Accessed via `useGetAllSectoralOptions` hook

**Pages Using**:
- `recruiter-view/sectoral-details.jsx` - Sector selection

---

## Super Admin APIs

### `super-admin/auth.js`
**Purpose**: Super admin authentication

**Endpoints**:
- `POST /admin-management/login` - Super admin login

**Usage**:
- Admin authentication
- Accessed via `useSuperAdminAuth` hook

**Pages Using**:
- `super-admin-view/log-in.jsx` - Admin login

---

### `super-admin/baseApi.js`
**Purpose**: Base API factory functions for CRUD operations

**Functions**:
- `createGetAll(endpoint)` - Create GET all function with pagination
- `createGetById(endpoint)` - Create GET by ID function
- `createPost(endpoint)` - Create POST function
- `createUpdate(endpoint)` - Create PUT function
- `createPatch(endpoint)` - Create PATCH function
- `createDelete(endpoint)` - Create DELETE function
- `createUpload(endpoint)` - Create file upload function

**Usage**:
- Used by other super admin APIs to create standardized CRUD operations
- Provides consistent pagination, filtering, and error handling

**Used By**:
- `super-admin/database.js`
- `super-admin/adminManagement.js`
- Other super admin API files

---

### `super-admin/user.js`
**Purpose**: Super admin profile and user management

**Endpoints**:
- `GET /superAdmin/profile` - Get super admin profile
- `PUT /superAdmin/profile/basic-info` - Update basic info
- `PUT /superAdmin/profile/qualification-info` - Update qualification info
- `GET /admin/jobseekers/list` - Get all job seekers
- `GET /admin/jobseekers/:id` - Get job seeker details

**Usage**:
- Manage super admin profile
- View and manage job seekers
- Accessed via `useGetUserDetails`, `useGetJobseekersList`, `useGetCandidateDetails` hooks

**Pages Using**:
- `super-admin-view/dashboard.jsx` - Display admin profile
- Super admin user management pages

---

### `super-admin/approvals.js`
**Purpose**: Approval management

**Endpoints**:
- `PATCH /admin/approvals/:approvalId/review` - Review/approve/reject approval
- `GET /admin/approvals/list` - Get all approvals (with filters)
- `GET /admin/approvals/:id` - Get approval details

**Usage**:
- Review and manage approval requests
- Filter approvals by type
- Accessed via `useReviewApproval`, `useGetApprovalsList`, `useGetApprovalDetails` hooks

**Pages Using**:
- `super-admin-view/approvals.jsx` - Approval management

---

### `super-admin/jobsAndTrainings.js`
**Purpose**: Job and training management

**Endpoints**:
- `GET /admin/trainings/list` - Get all trainings (with pagination)
- `GET /admin/trainings/:id` - Get training by ID
- `GET /admin/jobs/list` - Get all jobs (with pagination)
- `GET /admin/jobs/:id` - Get job by ID
- `GET /admin/applications/jobs/:id` - Get job applications
- `GET /admin/applications/trainings/:id` - Get training applications
- `GET /admin/applications/jobs` - Get jobs by applicant
- `PUT /admin/jobs/:id` - Update job
- `PUT /admin/trainings/:id` - Update training
- `PATCH /admin/jobs/:id/status` - Update job status
- `PATCH /admin/trainings/:id/status` - Update training status
- `PUT /admin/job-applications/applications/:applicationId/status` - Update job application status
- `PUT /admin/training-applications/applications/:applicationId/status` - Update training application status

**Usage**:
- Comprehensive job and training management
- View and manage applications
- Update statuses
- Accessed via various hooks in `hooks/super-admin/`

**Pages Using**:
- `super-admin-view/jobs-and-trainings/jobs-and-trainings.jsx` - Job and training management

---

### `super-admin/database.js`
**Purpose**: Database entity management (CRUD operations)

**Endpoints** (using baseApi factory):
- Trainers: `/admin/trainers/list`, `/admin/trainers/:id`
- Companies: `/admin/corporates`, `/admin/corporates/:id`
- Recruiters: `/admin/recruiters`, `/admin/recruiters/:id`
- Candidates: `/admin/jobseekers/list`, `/admin/jobseekers/:id`
- User Profiles: `/admin/user-profile/:id/profile` (PUT)

**Usage**:
- Standard CRUD operations for all entities
- Accessed via entity-specific hooks (useTrainers, useCompanies, useRecruiters, etc.)

**Pages Using**:
- `super-admin-view/database.jsx` - Database management interface

---

### `super-admin/dropdowns.js`
**Purpose**: Dropdown/master data management

**Endpoints**:
- `GET /admin/dropdowns` - Get all dropdowns
- `GET /dropdowns/:id/values` - Get dropdown values
- `POST /admin/dropdowns/:dropdownId/values` - Create dropdown value
- `PUT /admin/dropdowns/:dropdownId/values` - Update dropdown value
- `DELETE /admin/dropdowns/:dropdownId/values` - Delete dropdown value
- `POST /admin/dropdowns` - Create dropdown
- `PUT /admin/dropdowns/:dropdownId` - Update dropdown

**Usage**:
- Manage master data/dropdowns
- CRUD operations for dropdown values
- Accessed via `useGetDropdowns`, `useGetDropdownValues` hooks

**Pages Using**:
- `super-admin-view/master-data.jsx` - Master data management

---

### `super-admin/adminManagement.js`
**Purpose**: Admin user management

**Endpoints**:
- `POST /admin/upload/profile-images` - Upload admin profile image
- `POST /admin-management/create` - Create new admin
- `GET /admin-management/list` - Get all admins
- `GET /admin-management/:adminId` - Get admin by ID
- `PUT /admin-management/:adminId` - Update admin
- `DELETE /admin-management/:adminId` - Delete admin
- `GET /admin-management/features` - Get admin features

**Usage**:
- Manage admin users
- Upload profile images
- Access control features
- Accessed via `useGetAllAdmins`, `useGetAdminById`, `useCreateAdmin` hooks

**Pages Using**:
- `super-admin-view/admin-management.jsx` - Admin management

---

### `super-admin/notifications.js`
**Purpose**: Notification management

**Endpoints**:
- `GET /notifications` - Get notifications (with filters: isRead, sortBy, sortOrder, pagination)
- `PATCH /notifications/toggle-read` - Mark notification as read/unread
- `PATCH /notifications/mark-all-read` - Mark all notifications as read
- `POST /notifications` - Create notification

**Usage**:
- Fetch and manage notifications
- Mark as read/unread
- Accessed via `useGetNotifications`, `useMarkNotificationAsRead` hooks

**Pages Using**:
- Super admin notification components
- Notification side drawer

---

### `super-admin/uploadFile.js`
**Purpose**: Generic file upload

**Endpoints**:
- `POST /:role/upload/:folder` - Upload file (role and folder are dynamic)

**Usage**:
- Generic file upload for any role and folder
- Accessed via `useUploadFile` hook

**Pages Using**:
- Various pages requiring file uploads

---

## API Usage in Pages

### Trainer View Pages

| Page | APIs Used | Hooks |
|------|-----------|-------|
| `dashboard.jsx` | `getTrainerProgress`, `getAllTrainings`, `applyForTraining` | `useGetTrainerProgress`, `useGetAllTrainings`, `useApplyForTraining` |
| `basic-details.jsx` | `trainerRegistrationStage1` | `useTrainerRegistrationStage1` |
| `education-details.jsx` | `trainerRegistrationStage2` | `useTrainerRegistrationStage2` |
| `working-details.jsx` | `trainerRegistrationStage3` | `useTrainerRegistrationStage3` |
| `certificate-details.jsx` | `trainerRegistrationStage4` | `useTrainerRegistrationStage4` |
| `log-in.jsx` | `trainerLogin` | `useTrainerLogin` |

### Job Seeker View Pages

| Page | APIs Used | Hooks |
|------|-----------|-------|
| `dashboard.jsx` | `jobSeekerProfileProgress` | `useJobseekerProfileProgress` |
| `basic-details.jsx` | `signUpStage1` | `useSignUpStage1` |
| `education-details.jsx` | `signUpStage2` | `useSignUpStage2` |
| `working-details.jsx` | `signUpStage3` | `useSignUpStage3` |
| `certificate-details.jsx` | `signUpStage4` | `useSignUpStage4` |
| `additional-details.jsx` | `signUpStage5` | `useSignUpStage5` |
| `log-in.jsx` | `login` | `useLogin` |

### Corporate View Pages

| Page | APIs Used | Hooks |
|------|-----------|-------|
| `dashboard.jsx` | `getCorporateUserDetails` | `useGetCorporateUserDetails` |
| `applied-candidates-jobs.jsx` | `getCandidatesByJobId`, `getApplicantById`, `updateStatusOfApplicant` | `useGetCandidatesByJobId`, `useGetApplicantById`, `useUpdateStatusOfApplicant` |
| `applied-candidates-trainings.jsx` | `getCandidatesByTrainingId` | `useGetCandidatesByTrainingId` |
| `job-posting.jsx` | `corporateJobPost`, `corporateJobById` | `useCorporateJobPost`, `useCorporateJobById` |
| `trainning-posting.jsx` | `corporateTrainingPost`, `corporateTrainingById` | `useCorporateTrainingPost`, `useCorporateTrainingById` |
| `resume-filtering.jsx` | `getApplicantById` | `useGetApplicantById` |
| `log-in.jsx` | `login`, `register` | `useLogin`, `useRegister` |

### Recruiter View Pages

| Page | APIs Used | Hooks |
|------|-----------|-------|
| `dashboard.jsx` | `getUserDetails` | `useGetUserDetails` |
| `candidates.jsx` | `getAllApplicantDetails`, `getApplicantsById` | `useGetAllApplicantDetails`, `useGetApplicantsById` |
| `candidate-create.jsx` | `createJobSeeker` | `useCreateJobSeeker` |
| `job-openings.jsx` | `getFilteredJobs`, `applySingleSeeker`, `applyBulkSeeker` | `useGetFilteredJobs`, `useApplySingleSeeker`, `useApplyBulkSeeker` |
| `kyc-verification.jsx` | `kycDetails` | `useKycDetails` |
| `sectoral-details.jsx` | `sectoralDetails`, `getAllSectoralOptions` | `useSectoralDetails`, `useGetAllSectoralOptions` |
| `log-in.jsx` | `login`, `register` | `useLogin`, `useRegister` |

### Super Admin View Pages

| Page | APIs Used | Hooks |
|------|-----------|-------|
| `dashboard.jsx` | `getUserDetails` | `useGetSuperAdminProfile` |
| `approvals.jsx` | `getApprovalsList`, `reviewApproval`, `getApprovalDetails` | `useGetApprovalsList`, `useReviewApproval`, `useGetApprovalDetails` |
| `database.jsx` | Various entity APIs (trainers, companies, recruiters, candidates) | Entity-specific hooks |
| `jobs-and-trainings.jsx` | `getAllJobs`, `getAllTrainings`, `updateJob`, `updateTraining`, etc. | Job and training hooks |
| `master-data.jsx` | `getDropdowns`, `getDropdownValues`, CRUD operations | Dropdown hooks |
| `admin-management.jsx` | `getAllAdmins`, `createAdmin`, `updateAdmin`, `deleteAdmin` | Admin management hooks |
| `log-in.jsx` | `login` | `useSuperAdminLogin` |

---

## Base API Patterns

### Query Parameters Pattern
Many GET endpoints support filtering via query parameters:
```javascript
// Example: Get filtered jobs
GET /corporate/job?page=1&limit=10&search=developer&location=remote
```

### Pagination Pattern
Most list endpoints support pagination:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Filter Pattern
Common filter parameters:
- `search` - Search term
- `status` - Filter by status
- `dateRange` - Date range filtering (for super admin)

### Response Pattern
All APIs return data in this structure:
```javascript
{
  data: {
    // Response data
    pagination: {
      page: 1,
      limit: 10,
      totalPages: 5,
      totalItems: 50
    }
  }
}
```

---

## Authentication

All authenticated endpoints require:
- JWT token in Authorization header
- Token stored in auth store (Zustand)
- Automatic token refresh (if implemented)

---

## Error Handling

APIs use axios interceptors for:
- Automatic error handling
- Token refresh on 401
- Error message display
- Request/response logging

---

## File Upload Pattern

File uploads use FormData:
```javascript
const formData = new FormData();
formData.append("file", file);
// Headers: Content-Type: multipart/form-data
```

---

## Notes

1. **API Base URL**: All APIs use a base URL configured in `lib/axios.js`
2. **Hooks Layer**: Pages use React Query hooks that wrap API calls
3. **State Management**: Auth state managed via Zustand store
4. **Type Safety**: Consider adding TypeScript types for better type safety
5. **Error Boundaries**: Consider adding error boundaries for API error handling
6. **Loading States**: All hooks provide loading states via React Query
7. **Caching**: React Query handles caching automatically

---

## Future Considerations

When adding new APIs:
1. Follow the existing naming conventions
2. Place APIs in the appropriate role directory
3. Create corresponding hooks in `hooks/` directory
4. Use `baseApi.js` factory functions for CRUD operations (super admin)
5. Add proper error handling
6. Document query parameters and request/response formats
7. Consider adding TypeScript types

