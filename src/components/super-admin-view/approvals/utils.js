export const approvalTabs = [
  {
    id: "companies",
    name: "Companies",
    icon: null,
  },
  {
    id: "jobTrainings",
    name: "Job/Trainings",
    icon: null,
  },
  {
    id: "trainers",
    name: "Trainers",
    icon: null,
  },
  {
    id: "recruiters",
    name: "Recruiters",
    icon: null,
  },
];

export const getApprovalFilters = (tabType, additionalOptions = {}) => {
  const baseFilters = [
    {
      label: "Status",
      componentType: "select",
      placeholder: "Select Status",
      name: "status",
      options: [
        { id: "approved", label: "Approved" },
        { id: "pending", label: "Pending" },
        { id: "rejected", label: "Rejected" },
      ],
    },
    {
      label: "Date From",
      componentType: "calendar",
      placeholder: "Select From Date",
      name: "dateFrom",
    },
    {
      label: "Date To",
      componentType: "calendar",
      placeholder: "Select To Date",
      name: "dateTo",
    },
  ];

  const sortByOptions = {
    companies: [
      { id: "submittedAt", label: "Submitted At" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" },
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
    ],
    recruiters: [
      { id: "submittedAt", label: "Submitted At" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" },
      { id: "name", label: "Name" },
      { id: "company", label: "Company" },
    ],
    trainers: [
      { id: "submittedAt", label: "Submitted At" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" },
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
    ],
    jobs: [
      { id: "submittedAt", label: "Submitted At" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" },
      { id: "title", label: "Title" },
      { id: "company", label: "Company" },
    ],
    trainings: [
      { id: "submittedAt", label: "Submitted At" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" },
      { id: "title", label: "Title" },
      { id: "trainer", label: "Trainer" },
    ],
  };

  const sortOrderOptions = [
    { id: "asc", label: "Ascending" },
    { id: "desc", label: "Descending" },
  ];

  const filters = [...baseFilters];

  if (tabType === "companies") {
    filters.push(
      {
        label: "Location",
        componentType: "multi-select",
        placeholder: "Select Locations",
        name: "location",
        options: [
          { id: "mumbai", label: "Mumbai" },
          { id: "delhi", label: "Delhi" },
          { id: "bangalore", label: "Bangalore" },
          { id: "chennai", label: "Chennai" },
          { id: "hyderabad", label: "Hyderabad" },
          { id: "pune", label: "Pune" },
          { id: "kolkata", label: "Kolkata" },
          { id: "ahmedabad", label: "Ahmedabad" },
          { id: "jaipur", label: "Jaipur" },
          { id: "surat", label: "Surat" },
        ],
      },
      {
        label: "Company",
        componentType: "multi-select",
        placeholder: "Select Companies",
        name: "company",
        options: additionalOptions.companyOptions || [],
      },
      {
        label: "Industry",
        componentType: "multi-select",
        placeholder: "Select Industries",
        name: "industry",
        options: [
          { id: "technology", label: "Technology" },
          { id: "healthcare", label: "Healthcare" },
          { id: "education", label: "Education" },
          { id: "finance", label: "Finance" },
          { id: "retail", label: "Retail" },
          { id: "manufacturing", label: "Manufacturing" },
          { id: "consulting", label: "Consulting" },
          { id: "telecommunications", label: "Telecommunications" },
          { id: "automotive", label: "Automotive" },
          { id: "real-estate", label: "Real Estate" },
          { id: "media", label: "Media & Entertainment" },
          { id: "logistics", label: "Logistics & Transportation" },
        ],
      }
    );
  }

  filters.push(
    {
      label: "Sort By",
      componentType: "select",
      placeholder: "Select Sort By",
      name: "sortBy",
      options: sortByOptions[tabType] || sortByOptions.companies,
    },
    {
      label: "Sort Order",
      componentType: "select",
      placeholder: "Select Sort Order",
      name: "sortOrder",
      options: sortOrderOptions,
    }
  );

  return filters;
};
