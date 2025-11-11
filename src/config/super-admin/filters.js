import {
  CITIES,
  INDUSTRIES,
  SKILLS,
  STATUS_OPTIONS,
  APPROVAL_STATUSES,
  APPLICATION_STATUSES,
  APPLICATION_SOURCES,
  APPLICATION_STAGES,
  SORT_OPTIONS,
  SORT_ORDER,
  COMPANY_SIZE,
  EXPERIENCE_RANGES,
  JOB_TYPES,
  WORK_MODES,
  GENDER_OPTIONS,
  BOOLEAN_OPTIONS,
} from "../../constants/super-admin";

const createFilter = (config) => ({
  label: config.label,
  componentType: config.componentType || "select",
  placeholder: config.placeholder || `Select ${config.label}`,
  name: config.name,
  options: config.options,
  defaultValue: config.defaultValue,
});

const createDateFilter = (name, label) => ({
  label,
  componentType: "calendar",
  placeholder: `Select ${label}`,
  name,
});

export const BASE_FILTERS = {
  status: createFilter({
    label: "Status",
    componentType: "select",
    name: "status",
    options: APPROVAL_STATUSES,
  }),

  dateRange: {
    label: "Date Range",
    componentType: "date-range",
    name: "dateRange",
  },

  location: createFilter({
    label: "Location",
    componentType: "multi-select",
    name: "location",
    options: CITIES,
    placeholder: "Select Locations",
  }),

  industry: createFilter({
    label: "Industry",
    componentType: "multi-select",
    name: "industry",
    options: INDUSTRIES,
    placeholder: "Select Industries",
  }),

  skills: createFilter({
    label: "Skills",
    componentType: "multi-select",
    name: "skills",
    options: SKILLS,
    placeholder: "Select Skills",
  }),

  sortBy: (options) =>
    createFilter({
      label: "Sort By",
      componentType: "select",
      name: "sortBy",
      options: options || SORT_OPTIONS.general,
      placeholder: "Select Sort By",
    }),

  sortOrder: createFilter({
    label: "Sort Order",
    componentType: "select",
    name: "sortOrder",
    options: SORT_ORDER,
    placeholder: "Select Sort Order",
  }),
};

export const createApprovalFilters = (type, additionalOptions = {}) => {
  const filters = [
    BASE_FILTERS.dateRange,
    BASE_FILTERS.sortBy(SORT_OPTIONS[type] || SORT_OPTIONS.approval),
    BASE_FILTERS.sortOrder,
  ];

  return filters;
};

export const createDatabaseFilters = (type) => {
  const filters = [];

  switch (type) {
    case "companies":
      filters.push(
        createFilter({
          label: "Status",
          componentType: "select",
          name: "status",
          options: STATUS_OPTIONS.general,
        }),
        createFilter({
          label: "Verification",
          componentType: "select",
          name: "verification",
          options: STATUS_OPTIONS.verification,
          defaultValue: "verified",
        }),
        BASE_FILTERS.industry,
        createFilter({
          label: "Company Size",
          componentType: "multi-select",
          name: "companySize",
          options: COMPANY_SIZE,
        }),
        BASE_FILTERS.location,
        BASE_FILTERS.sortBy(SORT_OPTIONS.company),
        BASE_FILTERS.sortOrder
      );
      break;

    case "candidates":
      filters.push(
        BASE_FILTERS.sortBy(SORT_OPTIONS.candidate),
        BASE_FILTERS.sortOrder
      );
      break;

    case "trainers":
      filters.push(
        createFilter({
          label: "Status",
          componentType: "select",
          name: "status",
          options: STATUS_OPTIONS.general,
          defaultValue: "active",
        }),
        createFilter({
          label: "Verification",
          componentType: "select",
          name: "verification",
          options: STATUS_OPTIONS.verification,
          defaultValue: "verified",
        }),
        createFilter({
          label: "Specialization",
          componentType: "multi-select",
          name: "specialization",
          options: INDUSTRIES,
          placeholder: "Select Specialization",
        }),
        BASE_FILTERS.sortBy(SORT_OPTIONS.trainer),
        BASE_FILTERS.sortOrder
      );
      break;

    case "recruiters":
      filters.push(
        createFilter({
          label: "Status",
          componentType: "select",
          name: "status",
          options: STATUS_OPTIONS.general,
          defaultValue: "active",
        }),
        createFilter({
          label: "Verification",
          componentType: "select",
          name: "verification",
          options: STATUS_OPTIONS.verification,
          defaultValue: "verified",
        }),
        createFilter({
          label: "Experience",
          componentType: "select",
          name: "experience",
          options: EXPERIENCE_RANGES,
          placeholder: "Select experience",
        }),
        createFilter({
          label: "Location",
          componentType: "select",
          name: "location",
          options: CITIES,
          placeholder: "Select location",
        })
      );
      break;

    default:
      break;
  }

  return filters;
};

export const createJobsAndTrainingsFilters = () => {
  return [
    createFilter({
      label: "Status",
      componentType: "select",
      name: "status",
      options: STATUS_OPTIONS.job,
    }),
    createFilter({
      label: "Job Type",
      componentType: "select",
      name: "jobType",
      options: JOB_TYPES,
    }),
    createFilter({
      label: "Experience Level",
      componentType: "select",
      name: "experienceLevel",
      options: EXPERIENCE_RANGES,
    }),
    createFilter({
      label: "Location",
      componentType: "select",
      name: "location",
      options: CITIES,
    }),
    createFilter({
      label: "Mode of Work",
      componentType: "select",
      name: "modeOfWork",
      options: WORK_MODES,
    }),
    createFilter({
      label: "Gender Preference",
      componentType: "select",
      name: "genderPreference",
      options: GENDER_OPTIONS,
    }),
    createFilter({
      label: "Walk-in Interview",
      componentType: "select",
      name: "isWalkInInterview",
      options: BOOLEAN_OPTIONS,
    }),
  ];
};

export const createApplicationFilters = () => {
  return [
    createFilter({
      label: "Status",
      componentType: "select",
      name: "status",
      options: APPLICATION_STATUSES,
    }),
    createFilter({
      label: "Source",
      componentType: "select",
      name: "source",
      options: APPLICATION_SOURCES,
    }),
    createFilter({
      label: "Stage",
      componentType: "select",
      name: "stage",
      options: APPLICATION_STAGES,
    }),
    {
      label: "Date Range",
      componentType: "date-range",
      name: "dateRange",
    },
  ];
};

export const getRecruitersFilters = (context = "database") => {
  if (context === "approvals") {
    return [
      BASE_FILTERS.dateRange,
      BASE_FILTERS.sortBy(SORT_OPTIONS.user),
      BASE_FILTERS.sortOrder,
    ];
  }

  return [
    createFilter({
      label: "Status",
      componentType: "select",
      name: "status",
      options: STATUS_OPTIONS.general,
      defaultValue: "active",
    }),
    createFilter({
      label: "Verification",
      componentType: "select",
      name: "verification",
      options: STATUS_OPTIONS.verification,
      defaultValue: "verified",
    }),
    createFilter({
      label: "Experience",
      componentType: "select",
      name: "experience",
      options: EXPERIENCE_RANGES,
      placeholder: "Select experience",
    }),
    createFilter({
      label: "Location",
      componentType: "select",
      name: "location",
      options: CITIES,
      placeholder: "Select location",
    }),
  ];
};

export default {
  createApprovalFilters,
  createDatabaseFilters,
  createJobsAndTrainingsFilters,
  createApplicationFilters,
  getRecruitersFilters,
};
