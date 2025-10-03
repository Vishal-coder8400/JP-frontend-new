import FilterComponent from "@/components/common/filterComponent";
import JobsTable from "@/components/super-admin-view/common/JobsTable";
import { useState } from "react";

const jobsFilters = [
  {
    name: "skills",
    label: "Skills",
    componentType: "input",
    type: "text",
    placeholder: "Enter skills (e.g. React, JavaScript)",
  },
  {
    name: "industry",
    label: "Industry",
    componentType: "select",
    placeholder: "Select Industry",
    options: [
      { id: "all", label: "All Industries" },
      { id: "technology", label: "Technology" },
      { id: "finance", label: "Finance" },
      { id: "healthcare", label: "Healthcare" },
      { id: "education", label: "Education" },
      { id: "manufacturing", label: "Manufacturing" },
      { id: "retail", label: "Retail" },
      { id: "consulting", label: "Consulting" },
    ],
  },
  {
    name: "experience",
    label: "Experience",
    componentType: "select",
    placeholder: "Select Experience Level",
    options: [
      { id: "all", label: "All Experience Levels" },
      { id: "entry", label: "Entry Level (0-2 years)" },
      { id: "mid", label: "Mid Level (3-5 years)" },
      { id: "senior", label: "Senior Level (6-10 years)" },
      { id: "lead", label: "Lead Level (10+ years)" },
    ],
  },
  {
    name: "location",
    label: "Location",
    componentType: "input",
    type: "text",
    placeholder: "Enter location",
  },
];

const JobsApplied = () => {
  const [filters, setFilters] = useState({
    skills: "",
    industry: "all",
    experience: "all",
    location: "",
  });

  const clearFilters = () => {
    setFilters({
      skills: "",
      industry: "all",
      experience: "all",
      location: "",
    });
  };

  return (
    <div className="flex gap-6">
      <div className="w-80 flex-shrink-0 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear All
          </button>
        </div>
        <FilterComponent
          formControls={jobsFilters}
          formData={filters}
          setFormData={setFilters}
        />
      </div>
      <div className="flex-1 overflow-x-auto">
        <JobsTable filters={filters} />
      </div>
    </div>
  );
};

export default JobsApplied;
