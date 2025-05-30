import { Fragment, useState } from "react";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { BlackBag, FilterIcon, SearchIcon } from "../../../utils/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertMonthsToYearsAndMonths } from "../../../utils/objectUtils";
import useJobSeekerProfileStore from "../../../stores/useJobSeekerProfileStore";
import Pagination from "../../common/pagination";
import SearchComponent from "../../common/searchComponent";

const CandidateSelection = ({ setOpen2, show, button, applicants }) => {
  const { setJobSeekerProfile } = useJobSeekerProfileStore();
  const [currentPage, setCurrentPage] = useState(1);
  const handleOpen = (i) => {
    setJobSeekerProfile(i);
    setOpen2(true);
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
              <div className="px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Submit the candidates
                </div>
              </div>
            </div>
          </div>
        )}
        {show && <SearchComponent />}
        {show && (
          <div className="h-full border border-[#ddd] rounded-[12px] w-full flex items-center justify-between gap-[34px] py-[8px] px-[16px]">
            <div className="max-w-[261px] w-full flex items-center gap-[8px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M13.3335 5.16675H2.66683C1.93045 5.16675 1.3335 5.7637 1.3335 6.50008V13.1667C1.3335 13.9031 1.93045 14.5001 2.66683 14.5001H13.3335C14.0699 14.5001 14.6668 13.9031 14.6668 13.1667V6.50008C14.6668 5.7637 14.0699 5.16675 13.3335 5.16675Z"
                      stroke="#606060"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6668 14.5V3.83333C10.6668 3.47971 10.5264 3.14057 10.2763 2.89052C10.0263 2.64048 9.68712 2.5 9.3335 2.5H6.66683C6.31321 2.5 5.97407 2.64048 5.72402 2.89052C5.47397 3.14057 5.3335 3.47971 5.3335 3.83333V14.5"
                      stroke="#606060"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="font-medium text-xs">Applied For</div>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M4 6.5L8 10.5L12 6.5"
                    stroke="#606060"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="h-[35px] border border-[#606060] border-r-1" />
            <div className="max-w-[261px] w-full flex items-center gap-[8px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M13.3335 5.16675H2.66683C1.93045 5.16675 1.3335 5.7637 1.3335 6.50008V13.1667C1.3335 13.9031 1.93045 14.5001 2.66683 14.5001H13.3335C14.0699 14.5001 14.6668 13.9031 14.6668 13.1667V6.50008C14.6668 5.7637 14.0699 5.16675 13.3335 5.16675Z"
                      stroke="#606060"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6668 14.5V3.83333C10.6668 3.47971 10.5264 3.14057 10.2763 2.89052C10.0263 2.64048 9.68712 2.5 9.3335 2.5H6.66683C6.31321 2.5 5.97407 2.64048 5.72402 2.89052C5.47397 3.14057 5.3335 3.47971 5.3335 3.83333V14.5"
                      stroke="#606060"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="font-medium text-xs">Applied For</div>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M4 6.5L8 10.5L12 6.5"
                    stroke="#606060"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="h-[35px] border border-[#606060] border-r-1" />
            <div className="max-w-[261px] w-full flex items-center gap-[8px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M13.3335 5.16675H2.66683C1.93045 5.16675 1.3335 5.7637 1.3335 6.50008V13.1667C1.3335 13.9031 1.93045 14.5001 2.66683 14.5001H13.3335C14.0699 14.5001 14.6668 13.9031 14.6668 13.1667V6.50008C14.6668 5.7637 14.0699 5.16675 13.3335 5.16675Z"
                      stroke="#606060"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6668 14.5V3.83333C10.6668 3.47971 10.5264 3.14057 10.2763 2.89052C10.0263 2.64048 9.68712 2.5 9.3335 2.5H6.66683C6.31321 2.5 5.97407 2.64048 5.72402 2.89052C5.47397 3.14057 5.3335 3.47971 5.3335 3.83333V14.5"
                      stroke="#606060"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="font-medium text-xs">Applied For</div>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M4 6.5L8 10.5L12 6.5"
                    stroke="#606060"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className="w-full overflow-x-auto">
          {/* <div className="min-w-[1000px]"> */}
          <Table className="w-full border border-[#DADADA] rounded-[8px]">
            <TableHeader>
              <TableRow>
                <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold">
                  <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                  Owner
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
              {applicants?.data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="w-[50px] px-[16px] py-[12px]">
                    <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
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
                      <div className="self-stretch justify-start text-[#6E6E71] text-xs font-normal leading-none">
                        {item?.areaOfExpertise}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px]">
                    <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                      {item?.roleLookingFor}
                    </div>
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px]">
                    <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                      {item?.skills?.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px]">
                    <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                      {convertMonthsToYearsAndMonths(item?.totalExperience)}
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
              ))}
            </TableBody>
          </Table>
          {/* </div> */}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          range={2}
          onPageChange={(page) => setCurrentPage(page)}
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
                <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold flex">
                  <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[20px] w-[20px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                </TableHead>
                <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                  Owner
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
              {applicants?.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[50px] px-[16px] py-[12px]">
                    <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[20px] w-[20px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
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
                      <div className="self-stretch justify-start text-[#6E6E71] text-xs font-normal leading-none">
                        {item?.areaOfExpertise}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px]">
                    <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                      {item?.roleLookingFor}
                    </div>
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px]">
                    <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                      {item?.skills?.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="px-[16px] py-[12px]">
                    <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                      {convertMonthsToYearsAndMonths(item?.totalExperience)}
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
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          range={1}
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Fragment>
  );
};

export default CandidateSelection;
