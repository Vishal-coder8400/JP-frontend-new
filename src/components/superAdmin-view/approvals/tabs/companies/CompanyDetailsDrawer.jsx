import { Button } from "@/components/ui/button";
import { Building2, Briefcase } from "lucide-react";
import { Fragment, useState } from "react";
import CompanyDetailsTab from "./tabs/CompanyDetailsTab";
import JobListingTab from "./tabs/JobListingTab";
import CompanyStats from "./CompanyStats";

const CompanyDetailsDrawer = ({ company, areApprovalBtnsVisible = false }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!company) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No company selected</p>
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
            alt={`${company.name} logo`}
            className="object-contain h-fit"
            width={24}
          />
        ) : (
          <Building2 className="h-6 w-6 text-gray-400" />
        )}

        <div>
          <h3 className="text-xl font-medium">{company.name}</h3>
          <div className="border-1 border-gray2 p-4 rounded-lg mt-4">
            <h4 className=" font-medium">About the Company</h4>
            <p className="text-sm text-gray1/75 mt-2">{company.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          {areApprovalBtnsVisible ? (
            <Fragment className="flex items-center gap-4">
              <Button variant={"purple"} className={"w-full"}>
                Accept Job
              </Button>
              <Button variant={"destructive"} className={"w-full"}>
                Reject Job
              </Button>
              <Button variant={"black"} className={"w-full"}>
                Hold Job
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button variant={"purple"} className={"px-3 w-full"}>
                Post Job
              </Button>
              <Button variant={"black"}>Post Training</Button>
            </Fragment>
          )}
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
