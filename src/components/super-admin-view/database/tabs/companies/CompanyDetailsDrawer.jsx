import { Button } from "@/components/ui/button";
import { Building2, Briefcase } from "lucide-react";
import { useState } from "react";
import CompanyDetailsTab from "./tabs/CompanyDetailsTab";
import JobListingTab from "./tabs/JobListingTab";
import CompanyStats from "./CompanyStats";
import { useCompanyDetails } from "../../../../../hooks/super-admin/useCompanyDetails";

const CompanyDetailsDrawer = ({ companyId }) => {
  const { data: company, loading, error } = useCompanyDetails(companyId);
  const [activeTab, setActiveTab] = useState("details");

  if (loading) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No company data available</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "details",
      label: "Company Details",
      icon: Building2,
    },
    {
      id: "jobs",
      label: "Job Listings",
      icon: Briefcase,
    },
  ];

  return (
    <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col gap-8 overflow-y-auto">
      {/* Header */}
      <div className="w-full border-1 border-gray2 p-4 rounded-lg flex justify-center gap-4">
        {company.logo ? (
          <img
            src={company.logo}
            alt={`Company ${company._id || "logo"}`}
            className="object-contain h-fit"
            width={24}
          />
        ) : (
          <Building2 className="h-6 w-6 text-gray-400" />
        )}

        <div>
          <h3 className="text-xl font-medium">
            Company ID: {company._id || "N/A"}
          </h3>
          <div className="border-1 border-gray2 p-4 rounded-lg mt-4">
            <h4 className=" font-medium">About the Company</h4>
            <p className="text-sm text-gray1/75 mt-2">
              {company.description || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant={"purple"} className={"px-3 w-full"}>
            Post Job
          </Button>
          <Button variant={"black"}>Post Training</Button>
        </div>
      </div>

      {/* Company Information */}
      <div className="w-full">
        <div className="justify-start text-gray-900 text-xl font-semibold leading-tight mb-4">
          Company Information
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
            <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
              Company ID
            </div>
            <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
              {company?._id || "N/A"}
            </div>
          </div>
          <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
            <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
              Status
            </div>
            <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
              {company?.status || "N/A"}
            </div>
          </div>
          <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
            <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
              Verification Status
            </div>
            <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
              {company?.verificationStatus || "N/A"}
            </div>
          </div>
          <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
            <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
              Created At
            </div>
            <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
              {company?.createdAt
                ? new Date(company.createdAt).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
          <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
            <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
              Updated At
            </div>
            <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
              {company?.updatedAt
                ? new Date(company.updatedAt).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <CompanyStats company={company} />

      {/* Tabs */}
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "details" && <CompanyDetailsTab company={company} />}
          {activeTab === "jobs" && <JobListingTab company={company} />}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsDrawer;
