import { CandidatesFilters } from "../../config";
import FilterComponent from "../common/filterComponent";
import Pagination from "../common/pagination";
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
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { MoveLeftIcon } from "lucide-react";

const ResumeFiltering = ({
  candidateProfiles,
  formData,
  setFormData,
  setOpen2,
  setSwitchState,
  switchState,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBackBtnEnabled = location.pathname.includes("listing");
  const link = location.pathname.includes("job-posting")
    ? "/corporate/job-posting/listing"
    : location.pathname.includes("training")
    ? "/corporate/training-listing"
    : null;

  const handleBackClick = () => {
    navigate(link);
  };
  const { setJobSeekerProfile } = useJobSeekerProfileStore();
  const handleOpen = (i, id) => {
    setJobSeekerProfile({ _id: i, id });
    setOpen2(true);
  };

  return (
    <div className="w-full inline-flex flex-col justify-start items-start gap-12 overflow-hidden">
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex gap-2 justify-start text-black text-3xl font-bold leading-loose">
          <div className="flex items-center gap-4">
            {isBackBtnEnabled && (
              <MoveLeftIcon
                onClick={handleBackClick}
                className="w-5 h-5 text-gray-600 cursor-pointer"
              />
            )}
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
          </div>
          {location.pathname.includes("job-posting")
            ? "List of candidates applied for this job"
            : location.pathname.includes("training")
            ? "List of candidates applied in this training"
            : "List of candidates"}
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-7">
        <div className="w-[196px] flex flex-col gap-[23px]">
          <div className="text-lg text-[#171923] font-semibold">Filters</div>
          <div
            // onClick={ClearAll}
            className="text-[#3F93FF] text-base font-medium cursor-pointer"
          >
            Clear All
          </div>
          <FilterComponent
            formControls={CandidatesFilters}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="flex-1 justify-start text-gray-900 text-lg font-semibold leading-tight">
              Candidate List
            </div>
            {location.pathname.includes("corporate/resume-filtering") && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="airplane-mode">
                  {!switchState ? "Job" : "Training"}
                </Label>
                <Switch
                  id="job-training"
                  checked={switchState}
                  onCheckedChange={(checked) => setSwitchState(checked)}
                  className="data-[state=checked]:bg-[#6945ED] data-[state=unchecked]:bg-gray-400 relative"
                >
                  <span
                    className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
               data-[state=checked]:translate-x-5"
                  ></span>
                </Switch>
              </div>
            )}
          </div>
          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
          <SearchComponent />
          <div className="self-stretch rounded-lg ">
            <div className="w-full overflow-x-auto">
              {/* <div className="min-w-[1000px]"> */}
              <Table className="w-full border border-[#DADADA] rounded-[8px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold">
                      {/* <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" /> */}
                    </TableHead>
                    <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                      Candidate Name
                    </TableHead>
                    <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                      Job Appled for
                    </TableHead>
                    <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                      Job Id
                    </TableHead>
                    <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidateProfiles?.data?.applications?.length > 0 ? (
                    candidateProfiles?.data?.applications?.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="w-[50px] px-[16px] py-[12px]">
                          <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                        </TableCell>
                        <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
                          <div
                            onClick={() =>
                              handleOpen(
                                item.applicantId || item.applicant._id,
                                item._id
                              )
                            }
                            className="relative cursor-pointer w-[36px] h-[36px] "
                          >
                            <img
                              src={
                                item?.profilePicture ||
                                item.applicant?.profilePicture ||
                                item?.applicantImage ||
                                item?.applicant?.profileImage
                              }
                              alt={
                                item?.name ||
                                item.applicant?.name ||
                                item?.applicantName
                              }
                              className="h-full w-full rounded-[50px] object-cover"
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="self-stretch justify-start text-[#35353A] text-sm font-bold leading-tight">
                              {item?.name ||
                                item.applicant?.name ||
                                item?.applicantName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-[16px] py-[12px]">
                          <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                            {item?.job?.jobTitle || item?.training?.title}
                          </div>
                        </TableCell>
                        <TableCell className="px-[16px] py-[12px]">
                          <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                            {item?.job?._id || item?.training?._id}
                          </div>
                        </TableCell>
                        <TableCell className="px-[16px] py-[12px]">
                          {(item?.application?.status || item?.status) ===
                          "rejected" ? (
                            <div className="size- px-2 py-1 bg-red-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                              <div className="justify-start text-red-600 text-xs font-medium leading-none">
                                Rejected
                              </div>
                            </div>
                          ) : (item?.application?.status || item?.status) ===
                            "approved" ? (
                            <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                              <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                                Approved
                              </div>
                            </div>
                          ) : (item?.application?.status || item?.status) ===
                            "hold" ? (
                            <div className="size- px-2 py-1 bg-[#000] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                              <div className="justify-start text-[#fff] text-xs font-medium leading-none">
                                Hold
                              </div>
                            </div>
                          ) : (
                            <div className="size- px-2 py-1 bg-amber-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                              <div className="justify-start text-amber-600 text-xs font-medium leading-none">
                                Pending
                              </div>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="px-[16px] py-[12px] text-center"
                      >
                        No candidates have applied for this job yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* </div> */}
            </div>
            <Pagination
              currentPage={candidateProfiles?.data?.pagination?.currentPage}
              totalPages={candidateProfiles?.data?.pagination?.totalPages}
              range={2}
              onPageChange={(page) =>
                setFormData((prev) => ({ ...prev, page }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFiltering;
