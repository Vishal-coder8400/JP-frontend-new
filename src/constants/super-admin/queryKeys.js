export const QUERY_KEYS = {
  admins: (token, params) => ["superAdmin-admins", token, params],
  admin: (token, id) => ["superAdmin-admin", token, id],
  features: (token) => ["superAdmin-features", token],

  applicants: (token, params) => ["superAdmin-applicants", token, params],
  applicant: (token, id) => ["superAdmin-applicant", token, id],

  companies: (token, params) => ["superAdmin-companies", token, params],
  company: (token, id) => ["superAdmin-company", token, id],

  trainers: (token, params) => ["superAdmin-trainers", token, params],
  trainer: (token, id) => ["superAdmin-trainer", token, id],

  recruiters: (token, params) => ["superAdmin-recruiters", token, params],
  recruiter: (token, id) => ["superAdmin-recruiter", token, id],
  recruiterDetails: (token, id) => ["superAdmin-recruiter-details", token, id],

  candidates: (token, params) => ["superAdmin-candidates", token, params],
  candidate: (token, id) => ["superAdmin-candidate", token, id],
  candidateDetails: (token, id) => ["superAdmin-candidate-details", token, id],

  jobs: (token, params) => ["superAdmin-jobs", token, params],
  job: (token, id) => ["superAdmin-job", token, id],

  trainings: (token, params) => ["superAdmin-trainings", token, params],
  training: (token, id) => ["superAdmin-training", token, id],

  jobseekers: (token, params) => ["superAdmin-jobseekers", token, params],

  sectoralOptions: (token) => ["superAdmin-sectoral-options", token],

  dropdowns: (token) => ["dropdowns", token],
  dropdownValues: (token, id) => ["dropdownValues", token, id],

  profile: (token) => ["superAdmin-user-profile", token],

  notifications: (token, params) => ["superAdmin-notifications", token, params],

  approvals: {
    corporate: (token, params) => ["approvals-companies", token, params],
    trainer: (token, params) => ["approvals-trainers", token, params],
    trainers: (token, params) => ["approvals-trainers", token, params],
    recruiter: (token, params) => ["approvals-recruiters", token, params],
    recruiters: (token, params) => ["approvals-recruiters", token, params],
    job: (token, params) => ["approvals-jobs", token, params],
    training: (token, params) => ["approvals-trainings", token, params],
    jobsAndTrainings: (token, params) => [
      "approvals-jobs-trainings",
      token,
      params,
    ],
    details: (id) => ["approval-details", id],
  },

  database: {
    companies: (token, params) => ["database-companies", token, params],
    trainers: (token, params) => ["database-trainers", token, params],
    recruiters: (token, params) => ["database-recruiters", token, params],
    candidates: (token, params) => ["database-candidates", token, params],
  },

  applications: {
    job: (token, id, params) => ["job-applications", token, id, params],
    training: (token, id, params) => [
      "training-applications",
      token,
      id,
      params,
    ],
    all: ["applications"],
  },
};

export const INVALIDATION_PATTERNS = {
  allAdmins: ["superAdmin-admins"],
  allApprovals: ["approvals-"],
  allDatabase: ["database-"],
  allApplications: ["applications"],
  allDropdowns: ["dropdowns"],
  allDropdownValues: ["dropdownValues"],
};
