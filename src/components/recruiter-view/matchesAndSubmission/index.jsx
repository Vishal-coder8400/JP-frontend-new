import React, { Fragment } from "react";
import HeroProfile from "../common/hero-profile";
import { Input } from "../../ui/input";
import { SearchIcon } from "../../../utils/icon";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../ui/button";

const Index = () => {
  const data = [
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      appliedfor: "UX Designer",
      skills: "ABC Tech",
      experience: "March 20, 2025",
      lastUpdate: "2 Days ago",
    },
  ];
  return (
    <Fragment>
      <div className="hidden lg:flex flex-col gap-[51px] w-full">
        <HeroProfile />
        <div className="flex-1 p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden w-full">
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Matches & Submissions
            </div>
            <div className="justify-start text-zinc-500 text-md font-medium leading-tight">
              View All
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="relative flex items-center justify-center w-full">
            <Input
              type="search"
              placeholder="Enter job title, company, location"
              className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[2px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
            />
            <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <Table className="w-full border border-[#DADADA] rounded-[8px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                    Owner
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Applied for
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Company
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Submission Date
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
                      <Button
                        onClick={() => setOpen2(true)}
                        className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center"
                      >
                        <img
                          src=""
                          alt=""
                          className="h-full w-full rounded-[50px]"
                        />
                      </Button>
                      <div className="flex flex-col">
                        <div class="self-stretch justify-start text-[#35353A] text-sm font-bold leading-tight">
                          {item.name}
                        </div>
                        <div className="self-stretch justify-start text-[#6E6E71] text-xs font-normal leading-none">
                          {item.role}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item.appliedfor}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item.skills}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item.experience}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="px-2 py-1 bg-amber-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                        <div className="justify-start text-amber-600 text-md font-medium leading-none">
                          Pending
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
      <div className="w-full p-[24px] lg:hidden inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        <div className="p-6 w-full bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Matches & Submissions
            </div>
            <div className="justify-start text-zinc-500 text-md font-medium leading-tight">
              View All
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="relative w-full flex items-center justify-center">
            <Input
              type="search"
              placeholder="Enter job title, company, location"
              className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[1.5px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
            />
            <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <Table className="w-full border border-[#DADADA] rounded-[8px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                    Owner
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Applied for
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Company
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Submission Date
                  </TableHead>
                  <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item,i) => (
                  <TableRow key={i}>
                    <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
                      <Button
                        onClick={() => setOpen2(true)}
                        className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center"
                      >
                        <img
                          src=""
                          alt=""
                          className="h-full w-full rounded-[50px]"
                        />
                      </Button>
                      <div className="flex flex-col">
                        <div class="self-stretch justify-start text-[#35353A] text-sm font-bold leading-tight">
                          {item.name}
                        </div>
                        <div className="self-stretch justify-start text-[#6E6E71] text-xs font-normal leading-none">
                          {item.role}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item.appliedfor}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item.skills}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item.experience}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="px-2 py-1 bg-amber-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                        <div className="justify-start text-amber-600 text-md font-medium leading-none">
                          Pending
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
    </Fragment>
  );
};

export default Index;
