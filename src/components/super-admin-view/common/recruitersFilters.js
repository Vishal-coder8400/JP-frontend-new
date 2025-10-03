export const getRecruitersFilters = (context = "database") => {
  const baseFilters = [
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
        { id: "noida", label: "Noida" },
        { id: "gurgaon", label: "Gurgaon" },
      ],
    },
    {
      label: "Company",
      componentType: "multi-select",
      placeholder: "Select Companies",
      name: "company",
      options: [
        { id: "tech-corp", label: "Tech Corp" },
        { id: "innovate-solutions", label: "Innovate Solutions" },
        { id: "global-systems", label: "Global Systems" },
        { id: "digital-dynamics", label: "Digital Dynamics" },
        { id: "future-tech", label: "Future Tech" },
        { id: "smart-ventures", label: "Smart Ventures" },
        { id: "nexgen-solutions", label: "NextGen Solutions" },
        { id: "apex-innovations", label: "Apex Innovations" },
        { id: "quantum-systems", label: "Quantum Systems" },
        { id: "synergy-corp", label: "Synergy Corp" },
      ],
    },
    {
      label: "Industry",
      componentType: "multi-select",
      placeholder: "Select Industries",
      name: "industry",
      options: [
        { id: "technology", label: "Technology" },
        { id: "finance", label: "Finance" },
        { id: "healthcare", label: "Healthcare" },
        { id: "education", label: "Education" },
        { id: "manufacturing", label: "Manufacturing" },
        { id: "retail", label: "Retail" },
        { id: "e-commerce", label: "E-commerce" },
        { id: "consulting", label: "Consulting" },
        { id: "media", label: "Media & Entertainment" },
        { id: "real-estate", label: "Real Estate" },
        { id: "telecommunications", label: "Telecommunications" },
        { id: "automotive", label: "Automotive" },
      ],
    },
  ];

  if (context === "approvals") {
    return [
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
      ...baseFilters,
      {
        label: "Sort By",
        componentType: "select",
        placeholder: "Select Sort By",
        name: "sortBy",
        options: [
          { id: "submittedAt", label: "Submitted At" },
          { id: "createdAt", label: "Created At" },
          { id: "updatedAt", label: "Updated At" },
          { id: "name", label: "Name" },
          { id: "company", label: "Company" },
        ],
      },
      {
        label: "Sort Order",
        componentType: "select",
        placeholder: "Select Sort Order",
        name: "sortOrder",
        options: [
          { id: "asc", label: "Ascending" },
          { id: "desc", label: "Descending" },
        ],
      },
    ];
  }

  return [
    {
      label: "Job Status",
      componentType: "multi-select",
      placeholder: "Select Status",
      name: "jobStatus",
      options: [
        { id: "active", label: "Active" },
        { id: "posted", label: "Posted" },
        { id: "closed", label: "Closed" },
        { id: "draft", label: "Draft" },
        { id: "on-hold", label: "On Hold" },
      ],
    },
    {
      label: "Posted Date",
      componentType: "calendar",
      placeholder: "Select Date",
      name: "postedDate",
    },
    ...baseFilters,
  ];
};
