import { Fragment, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import {
  AppliedIcon,
  ArrowDownIcon,
  BlackBag,
  FilterIcon,
  SearchIcon,
} from "../../../utils/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertMonthsToYearsAndMonths } from "../../../utils/commonFunctions";
import useJobSeekerProfileStore from "../../../stores/useJobSeekerProfileStore";
import Pagination from "../../common/pagination";
import SearchComponent from "../../common/searchComponent";
import {
  useApplySingle,
  useBulkApplySingle,
} from "../../../hooks/recruiter/useJob";
import { Button } from "../../ui/button";
import useJobPostStore from "../../../stores/useJobPostStore";
import { Loader2 } from "lucide-react";

const CandidateSelection = ({
  setOpen2,
  show,
  button,
  applicants,
  selectedSeeker,
  setSelectedSeeker,
  filters,
  setFilters,
  totalPages,
  handleSearch,
  searchTextCandidate,
}) => {
  const { setJobSeekerProfile } = useJobSeekerProfileStore();
  const { jobPost } = useJobPostStore();
  const {
    mutate: singleApply,
    isPending,
    isSuccess: successSingle,
  } = useApplySingle();
  const {
    mutate: BulkApply,
    isPending: isPendigBulk,
    isSuccess: successBulk,
  } = useBulkApplySingle();

  const handleOpen = (i) => {
    setJobSeekerProfile(i);
    setOpen2(true);
  };
  const handleSelect = (seeker) => {
    setSelectedSeeker((prev) => {
      let update = [...prev];
      if (update.includes(seeker)) {
        update = update.filter((s) => s !== seeker);
      } else {
        update.push(seeker);
      }
      return update;
    });
  };
  const handleApply = () => {
    if (selectedSeeker.length > 1) {
      BulkApply({
        jobId: jobPost._id,
        applicantIds: selectedSeeker,
      });
    } else {
      singleApply({
        jobId: jobPost._id,
        applicantId: selectedSeeker[0],
      });
    }
    setSelectedSeeker([]);
  };

  return (
    <Fragment>
      <div
        className={`hidden w-full ${
          button ? "min-h-screen" : ""
        } p-6 bg-white outline outline-offset-[-1px] outline-neutral-400 lg:inline-flex flex-col justify-start items-start gap-9 overflow-auto`}
      >
        {show && (
          <div className="w-full flex items-center justify-between">
            <div className="justify-start text-neutral-900 text-xl font-medium leading-9">
              Select Candidates
            </div>
            <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
              <Button
                disabled={
                  isPending || isPendigBulk || selectedSeeker.length === 0
                }
                onClick={handleApply}
                className="cursor-pointer px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
              >
                <div className="justify-start text-white text-sm font-medium capitalize">
                  {isPending || isPendigBulk ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-2 w-2" /> Please wait
                    </span>
                  ) : (
                    "Submit the Candidate"
                  )}
                </div>
              </Button>
            </div>
          </div>
        )}
        {show && (
          <SearchComponent
            handleSearch={handleSearch}
            value={searchTextCandidate}
          />
        )}
        {show && (
          <div className="h-full border border-[#ddd] rounded-[12px] w-full flex items-center justify-between gap-[34px] py-[8px] px-[16px]">
            <div className="max-w-[261px] w-full flex items-center gap-[8px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex items-center justify-center">
                  <AppliedIcon />
                </div>
                <div className="font-medium text-xs">Applied For</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowDownIcon />
              </div>
            </div>
            <div className="h-[35px] border border-[#606060] border-r-1" />
            <div className="max-w-[261px] w-full flex items-center gap-[8px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex items-center justify-center">
                  <AppliedIcon />
                </div>
                <div className="font-medium text-xs">Experience</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowDownIcon />
              </div>
            </div>
            <div className="h-[35px] border border-[#606060] border-r-1" />
            <div className="max-w-[261px] w-full flex items-center gap-[8px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex items-center justify-center">
                  <AppliedIcon />
                </div>
                <div className="font-medium text-xs">Skills</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowDownIcon />
              </div>
            </div>
          </div>
        )}
        <div className="w-full overflow-x-auto">
          {/* <div className="min-w-[1000px]"> */}
          <Table className="border border-[#DADADA] rounded-[8px]">
            <TableHeader>
              <TableRow>
                {show && (
                  <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold"></TableHead>
                )}
                <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                  Candidates
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Applied for
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Skills
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Experience
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Contact
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants?.length > 0 ? (
                applicants?.map((item, i) => (
                  <TableRow key={i}>
                    {show && (
                      <TableCell className="w-[50px] px-[16px] py-[12px]">
                        <Checkbox
                          onCheckedChange={() => handleSelect(item._id)}
                          checked={selectedSeeker?.includes(item._id)}
                          className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer"
                        />
                      </TableCell>
                    )}
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="flex items-center gap-[10px]">
                        <div
                          onClick={() => handleOpen(item)}
                          className="relative cursor-pointer w-[36px] h-[36px] "
                        >
                          <img
                            src={item?.profilePicture}
                            alt={item?.name}
                            className="h-full w-full rounded-[50px] object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="self-stretch justify-start text-[#35353A] text-sm font-bold leading-tight">
                            {item?.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item?.roleLookingFor ? item?.roleLookingFor : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item?.skills.length > 0
                          ? item?.skills?.join(", ")
                          : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {(item?.totalExperience !== undefined ||
                          item?.totalExperienceInMonth !== undefined) && (
                          <span>
                            {item?.totalExperience !== undefined &&
                              `${item.totalExperience} Years `}
                            {item?.totalExperienceInMonth !== undefined &&
                              `${item.totalExperienceInMonth} Months`}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="flex flex-col gap-[4px]">
                        <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                          {item?.phone?.countryCode} {item?.phone?.number}
                        </div>
                        <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                          {item?.email}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="w-full py-4 text-center">
                  <TableCell colSpan={6}>No candidates found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* </div> */}
        </div>
        <Pagination
          currentPage={filters?.page}
          totalPages={totalPages}
          range={2}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
      <div
        className={`lg:hidden w-full bg-white overflow-y-auto ${
          show ? "p-6 min-h-dvh" : ""
        } inline-flex flex-col justify-center items-center gap-4`}
      >
        {show && (
          <div className="w-full flex items-center justify-between">
            <div className="justify-start text-neutral-900 text-lg font-medium leading-9">
              Select Candidates
            </div>
            <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
              <div className="px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Submit candidates
                </div>
              </div>
            </div>
          </div>
        )}
        {show && (
          <div className="self-stretch inline-flex justify-between items-center gap-6">
            <SearchComponent />
            <div className="p-[12px] rounded-[50px] outline outline-offset-[-1px] outline-black flex justify-center items-center">
              <FilterIcon className="h-[17px] w-[17px]" />
            </div>
          </div>
        )}
        <div className="w-full overflow-hidden">
          <Table className="w-full border border-[#DADADA] rounded-[8px]">
            <TableHeader>
              <TableRow>
                {show && (
                  <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold flex"></TableHead>
                )}
                <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                  Candidates
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Applied for
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Skills
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Experience
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                  Contact
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants?.length > 0 ? (
                applicants?.map((item, index) => (
                  <TableRow key={index}>
                    {show && (
                      <TableCell className="w-[50px] px-[16px] py-[12px]">
                        <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[20px] w-[20px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                      </TableCell>
                    )}
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="flex items-center gap-[10px]">
                        <div
                          onClick={() => handleOpen(item)}
                          className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center"
                        >
                          <img
                            src={item?.profilePicture}
                            alt={item?.name}
                            className="h-full w-full rounded-[50px] object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="self-stretch justify-start text-[#35353A] text-sm font-bold leading-tight">
                            {item?.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item?.roleLookingFor ? item?.roleLookingFor : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item?.skills?.length > 0
                          ? item?.skills?.join(", ")
                          : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {(item?.totalExperience !== undefined ||
                          item?.totalExperienceInMonth !== undefined) && (
                          <span>
                            {item?.totalExperience !== undefined &&
                              `${item.totalExperience} Years `}
                            {item?.totalExperienceInMonth !== undefined &&
                              `${item.totalExperienceInMonth} Months`}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-[16px] py-[12px] flex flex-col gap-[4px]">
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item?.phone?.countryCode} {item?.phone?.number}
                      </div>
                      <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                        {item?.email}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="w-full py-4 text-center">
                  <TableCell colSpan={6}>No candidates found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          range={1}
          currentPage={filters?.page}
          totalPages={totalPages}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </Fragment>
  );
};

export default CandidateSelection;
