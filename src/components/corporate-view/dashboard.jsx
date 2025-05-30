import { useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../common/searchComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
const candidates = [
  {
    id: 1,
    name: "Heeral Nant",
    areaOfExpertise: "Lead Product Designer",
    status: "Shortlisted",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    isSelected: false,
  },
  {
    id: 2,
    name: "Nithya Menon",
    areaOfExpertise: "UI Designer",
    status: "Rejected",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    isSelected: true,
  },
  {
    id: 3,
    name: "Nithya Menon",
    areaOfExpertise: "UI Designer",
    status: "Shortlisted",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    isSelected: false,
  },
  {
    id: 4,
    name: "Meera Gonzalez",
    areaOfExpertise: "Product Designer",
    status: "Shortlisted",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
    isSelected: false,
  },
];
const jobPostings = [
  {
    title: "Sr. Product Designer",
    applications: 42,
    status: "Open",
    posted: "10 Mar, 2025",
  },
  {
    title: "Sr. UI/UX Designer",
    applications: 34,
    status: "Open",
    posted: "10 Mar, 2025",
  },
  {
    title: "UX Researcher",
    applications: 34,
    status: "Open",
    posted: "10 Mar, 2025",
  },
  {
    title: "UX Researcher",
    applications: 34,
    status: "Draft",
    posted: "10 Mar, 2025",
  },
  {
    title: "UX Researcher",
    applications: 34,
    status: "Expired",
    posted: "10 Mar, 2025",
  },
];
const hiringFunnelData = [
  {
    jobTitle: "Sr. Product Designer",
    totalApplications: 122,
    stages: {
      applied: 34,
      screening: 80,
      interview: 0,
      task: 0,
      hired: 0,
    },
  },
  {
    jobTitle: "Sr. UI/UX Designer",
    totalApplications: 92,
    stages: {
      applied: 34,
      screening: 80,
      interview: 80,
      task: 0,
      hired: 0,
    },
  },
  {
    jobTitle: "UX Researcher",
    totalApplications: 192,
    stages: {
      applied: 34,
      screening: 34,
      interview: 80,
      task: 0,
      hired: 0,
    },
  },
];

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header Section */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Main Dashboard</h1>
          <div className="flex gap-6">
            <button className="cursor-pointer px-6 py-3 bg-gray-900 text-base text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.334 4.66669H2.66732C1.93094 4.66669 1.33398 5.26364 1.33398 6.00002V12.6667C1.33398 13.4031 1.93094 14 2.66732 14H13.334C14.0704 14 14.6673 13.4031 14.6673 12.6667V6.00002C14.6673 5.26364 14.0704 4.66669 13.334 4.66669Z"
                  stroke="#54C413"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6673 14V3.33333C10.6673 2.97971 10.5268 2.64057 10.2768 2.39052C10.0267 2.14048 9.68761 2 9.33398 2H6.66732C6.3137 2 5.97456 2.14048 5.72451 2.39052C5.47446 2.64057 5.33398 2.97971 5.33398 3.33333V14"
                  stroke="#54C413"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Post a New Job
            </button>
            <button className="cursor-pointer px-6 py-3 bg-gray-900 text-base text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.334 4.66669H2.66732C1.93094 4.66669 1.33398 5.26364 1.33398 6.00002V12.6667C1.33398 13.4031 1.93094 14 2.66732 14H13.334C14.0704 14 14.6673 13.4031 14.6673 12.6667V6.00002C14.6673 5.26364 14.0704 4.66669 13.334 4.66669Z"
                  stroke="#D9790A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6673 14V3.33333C10.6673 2.97971 10.5268 2.64057 10.2768 2.39052C10.0267 2.14048 9.68761 2 9.33398 2H6.66732C6.3137 2 5.97456 2.14048 5.72451 2.39052C5.47446 2.64057 5.33398 2.97971 5.33398 3.33333V14"
                  stroke="#D9790A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Post a New Training
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchComponent />

        {/* Profile Completion */}
        <div className="p-10 bg-white rounded-2xl shadow-sm border border-gray-200 flex gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-7xl font-semibold text-gray-900">50%</h2>
            <p className="text-sm font-semibold text-gray-900 opacity-70">
              Of your profile is complete
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Complete your profile to post jobs!
            </h3>
            <div className="flex gap-2">
              <div className="flex-1 h-2 bg-lime-600 rounded-full"></div>
              <div className="flex-1 h-2 bg-lime-600 rounded-full"></div>
              <div className="flex-1 h-2 bg-lime-600 rounded-full"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="flex-1 text-sm text-gray-900 opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Link
                to={"/corporate/profile-setup/final-setup"}
                className="px-4 py-3 bg-gray-800 text-white rounded-md font-semibold text-xs hover:bg-gray-700"
              >
                Proceed to Complete
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-5 gap-7">
        {[
          { title: "Active Job Listings", value: "15" },
          { title: "Total Applications Received", value: "120" },
          { title: "Shortlisted by Employers", value: "53" },
          { title: "Interviews Scheduled", value: "120" },
          { title: "Hired Candidates", value: "120" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-4 items-center justify-center"
          >
            <h4 className="text-base text-center font-semibold text-gray-900">
              {stat.title}
            </h4>
            <p className="text-[28px] font-semibold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-12 flex-wrap">
        {/* Left Column - Application Trends & Candidate Pipeline */}
        <div className="flex-1 flex flex-col gap-9 min-w-[400px]">
          {/* Application Trends */}

          {/* Candidate Pipeline */}
          <div className="flex flex-col gap-7">
            <h3 className="text-lg font-semibold text-gray-900">
              Candidate Pipeline Overview
            </h3>
            <div className="w-full border border-[#DADADA] rounded-[8px] overflow-hidden">
              <Table>
                <TableHeader className="[&_th]:font-semibold [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
                  <TableRow>
                    <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold">
                      <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                    </TableHead>
                    <TableHead>Candidates</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
                  {candidates.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[50px] px-[16px] py-[12px]">
                        <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                      </TableCell>
                      <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
                        <div
                          // onClick={() => handleOpen(item)}
                          className="relative cursor-pointer w-[36px] h-[36px] "
                        >
                          <img
                            src={item?.profilePicture}
                            alt={item?.name}
                            className="h-full w-full rounded-[50px] object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="self-stretch justify-start text-[#35353A] text-base font-bold leading-tight">
                            {item?.name}
                          </div>
                          <div className="self-stretch justify-start text-[#6E6E71] text-xs font-normal leading-none">
                            {item?.areaOfExpertise}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.status === "Shortlisted" ? (
                          <div className="size- px-2 py-1 bg-[#54C4131A] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                            <div className="justify-start text-[#54C413] text-xs font-medium leading-none">
                              Shortlisted
                            </div>
                          </div>
                        ) : (
                          <div className="size- px-2 py-1 bg-[#E726261A] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                            <div className="justify-start text-[#E72626] text-xs font-medium leading-none">
                              Rejected
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Right Column - Hiring Pipeline & Job Postings */}
        <div className="w-[571px] flex flex-col gap-9">
          {/* Hiring Pipeline */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Hiring Pipeline
              </h3>
              <span className="text-sm font-medium text-gray-500 cursor-pointer hover:underline">
                View All
              </span>
            </div>
            <hr className="border-gray-200" />

            <Table>
              <TableHeader className="[&_th]:font-medium [&_th]:text-[#7F7F7F] [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
                <TableRow>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Screening</TableHead>
                  <TableHead>Interview</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Hired</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
                {hiringFunnelData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-40 inline-flex flex-col justify-start items-start gap-1.5">
                        <div className="justify-start text-neutral-900 text-base font-medium leading-tight">
                          {item.jobTitle}
                        </div>
                        <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                          <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                            {item.totalApplications} applied
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-14 px-5 py-2.5 bg-indigo-50 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-indigo-700 text-xs font-medium leading-none">
                          {item.stages.applied}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-14 px-5 py-2.5 bg-green-100 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-green-600 text-xs font-medium leading-none">
                          {item.stages.screening}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-14 px-5 py-2.5 bg-yellow-50 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-yellow-600 text-xs font-medium leading-none">
                          {item.stages.interview}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-14 px-5 py-2.5 bg-indigo-50 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-indigo-700 text-xs font-medium leading-none">
                          {item.stages.task}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-14 px-5 py-2.5 bg-green-100 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-green-600 text-xs font-medium leading-none">
                          {item.stages.hired}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Job Postings Management */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Job Postings Management
              </h3>
              <span className="text-sm font-medium text-gray-500 cursor-pointer hover:underline">
                View All
              </span>
            </div>
            <hr className="border-gray-200" />
            <Table>
              <TableHeader className="[&_th]:font-medium [&_th]:text-[#7F7F7F] [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
                <TableRow>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
                {jobPostings.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-base font-medium leading-tight">
                        {item?.title}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="w-14 px-5 py-[5px] bg-neutral-100 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-zinc-600 text-xs font-medium leading-none">
                          {item?.applications}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      {item?.status === "Open" ? (
                        <div className="w-14 px-5 py-[5px] bg-green-100 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-green-600 text-xs font-medium leading-none">
                            Open
                          </div>
                        </div>
                      ) : item.status === "Expired" ? (
                        <div className="w-14 px-5 py-[5px] bg-red-100 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-red-500 text-xs font-medium leading-none">
                            Expired
                          </div>
                        </div>
                      ) : (
                        <div className="w-14 px-5 py-[5px] bg-yellow-50 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-orange-400 text-xs font-medium leading-none">
                            Draft
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch px-2.5 py-[5px] bg-neutral-100 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-zinc-600 text-xs font-medium leading-none">
                          {item.posted}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
