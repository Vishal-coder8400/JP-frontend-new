import { getValue } from "@/utils/commonFunctions";
import { DownloadIcon, YourImageIcon, YourPdfIcon } from "@/utils/icon";
import { Link } from "react-router-dom";
import { useRecruiterDetails } from "../../../../../hooks/super-admin/useRecruiterDetails";

const RecruiterDetails = ({ recruiterId }) => {
  const { data: recruiter, loading, error } = useRecruiterDetails(recruiterId);
  const pdfObject = {
    Resume: "resume",
    "PAN Card": "kycDetails.panDetails.image",
    "Aadhar Card": "kycDetails.aadharDetails.image",
    "Cancel Cheque": "kycDetails.cancelChequeOrPassbookImage",
    "Relieving Letter": "relievingLetter",
    "Latest Qualification": "latestQualification",
  };
  const pdfFiles = Object.entries(pdfObject).reduce(
    (acc, [customKey, path]) => {
      // acc[customKey] = getValue(recruiter, path);
      acc[customKey] = "test.pdf";
      return acc;
    },
    {}
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500">Loading recruiter details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!recruiter) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500">No recruiter data available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-[24px]">
      <div className="relative flex w-full bg-white pt-[120px] px-[48px] pb-[47px] rounded-t-[16px] overflow-hidden">
        <div class="absolute top-0 left-0 h-[186px] w-full bg-[url('/Group_1000005865.jpg')] bg-cover bg-center"></div>
        <div className="w-full flex flex-col gap-[36px] ">
          <div className="self-stretch pl-52 pr-10 py-5 relative bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
              <div className="text-center justify-start text-black text-xl font-semibold leading-tight">
                Recruiter ID: {recruiter?._id || "N/A"}
              </div>
            </div>
            <img
              className="size-28 left-[42px] top-[-21px] absolute object-cover rounded-full outline-2 outline-white"
              src={recruiter?.profileImage || "/person.png"}
              alt={`Recruiter ${recruiter?._id || "avatar"}`}
            />
            <div className="size- inline-flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch px-3 py-2 bg-black rounded-lg inline-flex justify-center items-center gap-1">
                <div className="items-center justify-start text-white text-xs font-normal leading-tight">
                  Edit Your Profile
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="size- p-2 left-[123px] top-[66px] absolute bg-white rounded-lg flex justify-start items-center gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <g clip-path="url(#clip0_2310_12132)">
                  <path
                    d="M5.95801 2.1665H2.16634C1.87902 2.1665 1.60347 2.28064 1.40031 2.4838C1.19714 2.68697 1.08301 2.96252 1.08301 3.24984V10.8332C1.08301 11.1205 1.19714 11.396 1.40031 11.5992C1.60347 11.8024 1.87902 11.9165 2.16634 11.9165H9.74967C10.037 11.9165 10.3125 11.8024 10.5157 11.5992C10.7189 11.396 10.833 11.1205 10.833 10.8332V7.0415"
                    stroke="#6945ED"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.0205 1.35413C10.236 1.13864 10.5283 1.01758 10.833 1.01758C11.1378 1.01758 11.43 1.13864 11.6455 1.35413C11.861 1.56962 11.9821 1.86188 11.9821 2.16663C11.9821 2.47137 11.861 2.76364 11.6455 2.97913L6.49967 8.12496L4.33301 8.66663L4.87467 6.49996L10.0205 1.35413Z"
                    stroke="#6945ED"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2310_12132">
                    <rect width="13" height="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Recruiter Information
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Recruiter ID
                </div>
                <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                  {recruiter?._id || "N/A"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Status
                </div>
                <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                  {recruiter?.status || "N/A"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Verification Status
                </div>
                <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                  {recruiter?.verificationStatus || "N/A"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Is Verified
                </div>
                <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                  {recruiter?.isVerified ? "Yes" : "No"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Created At
                </div>
                <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                  {recruiter?.createdAt
                    ? new Date(recruiter.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Updated At
                </div>
                <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                  {recruiter?.updatedAt
                    ? new Date(recruiter.updatedAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Personal Information
            </div>
            <div className="flex items-center justify-between w-full gap-[12px]">
              <div className="max-w-[237px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 0.5H1C0.585786 0.5 0.25 0.835786 0.25 1.25V14C0.25 14.8284 0.921573 15.5 1.75 15.5H18.25C19.0784 15.5 19.75 14.8284 19.75 14V1.25C19.75 0.835786 19.4142 0.5 19 0.5ZM10 8.48281L2.92844 2H17.0716L10 8.48281ZM7.25406 8L1.75 13.0447V2.95531L7.25406 8ZM8.36406 9.01719L9.48906 10.0531C9.77592 10.3165 10.2166 10.3165 10.5034 10.0531L11.6284 9.01719L17.0659 14H2.92844L8.36406 9.01719ZM12.7459 8L18.25 2.95437V13.0456L12.7459 8Z"
                        fill="#121417"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Experience
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  {recruiter?.totalExperience || "N/A"} YOE
                </div>
              </div>
              <div className="max-w-[237px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.3988 17.875C17.9709 15.4066 15.7706 13.6366 13.2028 12.7975C15.8135 11.2433 17.0641 8.13638 16.2582 5.2069C15.4522 2.27741 12.7883 0.247449 9.75 0.247449C6.71167 0.247449 4.04779 2.27741 3.24182 5.2069C2.43585 8.13638 3.68645 11.2433 6.29719 12.7975C3.72938 13.6356 1.52906 15.4056 0.10125 17.875C-0.0412965 18.1074 -0.0464728 18.3989 0.0877311 18.6363C0.221935 18.8736 0.474375 19.0194 0.747024 19.0171C1.01967 19.0147 1.26958 18.8646 1.39969 18.625C3.16594 15.5725 6.28781 13.75 9.75 13.75C13.2122 13.75 16.3341 15.5725 18.1003 18.625C18.2304 18.8646 18.4803 19.0147 18.753 19.0171C19.0256 19.0194 19.2781 18.8736 19.4123 18.6363C19.5465 18.3989 19.5413 18.1074 19.3988 17.875ZM4.5 7C4.5 4.1005 6.8505 1.75 9.75 1.75C12.6495 1.75 15 4.1005 15 7C15 9.8995 12.6495 12.25 9.75 12.25C6.85179 12.2469 4.5031 9.89821 4.5 7Z"
                        fill="#121417"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Latest Qualification
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  8 YOE
                </div>
              </div>
              <div className="max-w-[237px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.3472 12.8556L13.9306 10.8766L13.9184 10.8709C13.4526 10.6717 12.9177 10.7211 12.4963 11.0022C12.4718 11.0183 12.4483 11.0359 12.4259 11.0547L10.1441 13C8.69844 12.2978 7.20594 10.8166 6.50375 9.38969L8.45187 7.07312C8.47062 7.04969 8.48844 7.02625 8.50531 7.00094C8.78032 6.5807 8.82677 6.05073 8.62906 5.58906V5.57781L6.64437 1.15375C6.38009 0.543904 5.746 0.180692 5.08625 0.26125C2.45833 0.607054 0.495249 2.84943 0.5 5.5C0.5 12.9438 6.55625 19 14 19C16.6506 19.0048 18.8929 17.0417 19.2388 14.4137C19.3195 13.7542 18.9567 13.1202 18.3472 12.8556ZM14 17.5C7.37558 17.4928 2.00723 12.1244 2 5.5C1.9927 3.60618 3.39195 2.00108 5.26906 1.75C5.26869 1.75374 5.26869 1.75751 5.26906 1.76125L7.23781 6.1675L5.3 8.48687C5.28033 8.50951 5.26246 8.53364 5.24656 8.55906C4.95961 8.99938 4.92405 9.55777 5.15281 10.0309C6.00219 11.7681 7.7525 13.5053 9.50844 14.3538C9.98515 14.5804 10.5459 14.5398 10.985 14.2469C11.0091 14.2307 11.0322 14.2131 11.0544 14.1944L13.3334 12.25L17.7397 14.2234C17.7397 14.2234 17.7472 14.2234 17.75 14.2234C17.502 16.1033 15.8962 17.5064 14 17.5Z"
                        fill="#121417"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Contact Information
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M13.3328 9.86989V11.6199C13.3335 11.7824 13.3002 11.9432 13.2351 12.092C13.1701 12.2409 13.0746 12.3745 12.9549 12.4843C12.8352 12.5941 12.6938 12.6778 12.54 12.7298C12.3861 12.7819 12.223 12.8012 12.0612 12.7866C10.2662 12.5915 8.54193 11.9781 7.02701 10.9957C5.61758 10.1001 4.42263 8.90516 3.52701 7.49573C2.54117 5.97393 1.92766 4.24131 1.73618 2.43823C1.7216 2.27692 1.74077 2.11434 1.79247 1.96084C1.84417 1.80735 1.92726 1.6663 2.03646 1.54667C2.14566 1.42705 2.27857 1.33147 2.42672 1.26603C2.57488 1.20059 2.73505 1.16671 2.89701 1.16656H4.64701C4.93011 1.16377 5.20456 1.26402 5.41921 1.44862C5.63386 1.63322 5.77406 1.88957 5.81368 2.16989C5.88754 2.72993 6.02453 3.27982 6.22201 3.80906C6.3005 4.01785 6.31748 4.24476 6.27096 4.46291C6.22443 4.68105 6.11635 4.88129 5.95951 5.03989L5.21868 5.78073C6.04909 7.24113 7.25828 8.45032 8.71868 9.28073L9.45951 8.53989C9.61812 8.38306 9.81835 8.27497 10.0365 8.22845C10.2546 8.18192 10.4816 8.19891 10.6903 8.27739C11.2196 8.47488 11.7695 8.61186 12.3295 8.68573C12.6129 8.7257 12.8717 8.86843 13.0567 9.08677C13.2417 9.3051 13.3399 9.58381 13.3328 9.86989Z"
                        stroke="#61758A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    {recruiter?.phone?.countryCode && recruiter?.phone?.number
                      ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
                      : "N/A"}
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M2.83366 2.3335H12.167C12.8087 2.3335 13.3337 2.8585 13.3337 3.50016V10.5002C13.3337 11.1418 12.8087 11.6668 12.167 11.6668H2.83366C2.19199 11.6668 1.66699 11.1418 1.66699 10.5002V3.50016C1.66699 2.8585 2.19199 2.3335 2.83366 2.3335Z"
                        stroke="#61758A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.3337 3.5L7.50033 7.58333L1.66699 3.5"
                        stroke="#61758A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div>{recruiter?.email || "N/A"}</div>
                </div>
              </div>
              <div className="max-w-[237px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="22"
                      viewBox="0 0 17 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.25 5C6.17893 5 4.5 6.67893 4.5 8.75C4.5 10.8211 6.17893 12.5 8.25 12.5C10.3211 12.5 12 10.8211 12 8.75C12 6.67893 10.3211 5 8.25 5ZM8.25 11C7.00736 11 6 9.99264 6 8.75C6 7.50736 7.00736 6.5 8.25 6.5C9.49264 6.5 10.5 7.50736 10.5 8.75C10.5 9.99264 9.49264 11 8.25 11ZM8.25 0.5C3.69579 0.505166 0.00516653 4.19579 0 8.75C0 11.6938 1.36031 14.8138 3.9375 17.7734C5.09552 19.1108 6.39886 20.3151 7.82344 21.3641C8.08177 21.545 8.42573 21.545 8.68406 21.3641C10.106 20.3147 11.4068 19.1104 12.5625 17.7734C15.1359 14.8138 16.5 11.6938 16.5 8.75C16.4948 4.19579 12.8042 0.505166 8.25 0.5ZM8.25 19.8125C6.70031 18.5938 1.5 14.1172 1.5 8.75C1.5 5.02208 4.52208 2 8.25 2C11.9779 2 15 5.02208 15 8.75C15 14.1153 9.79969 18.5938 8.25 19.8125Z"
                        fill="#121417"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Address
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal leading-tight line-clamp-2">
                  {recruiter?.currentAddress?.address &&
                  recruiter?.currentAddress?.city &&
                  recruiter?.currentAddress?.state
                    ? `${recruiter.currentAddress.address}, ${recruiter.currentAddress.city}, ${recruiter.currentAddress.state}`
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Documents
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(pdfFiles).map(([key, value]) => {
                const isPdf =
                  key === "Resume" ||
                  key === "Relieving Letter" ||
                  key === "Latest Qualification";
                const fileName = value?.split("/").pop();
                const handleDownload = () => {
                  if (!value) return;
                  const link = document.createElement("a");
                  link.href = value;
                  link.target = "_blank";
                  link.download = fileName || `${key}.pdf`; // default filename fallback
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                };
                return (
                  <div
                    key={key}
                    className="relative overflow-hidden p-3 w-[180px] h-[100px] flex flex-col bg-stone-50 rounded-lg gap-2"
                  >
                    <div className="flex justify-between items-center w-full mb-2">
                      <div className="flex items-center gap-1">
                        {isPdf ? <YourPdfIcon /> : <YourImageIcon />}
                        <div className="text-neutral-900 text-xs font-medium leading-none">
                          {key}
                        </div>
                      </div>
                      {value?.trim() && (
                        <div
                          className="cursor-pointer"
                          onClick={handleDownload}
                        >
                          <DownloadIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full overflow-hidden rounded-sm mb-2">
                      {value?.trim() ? (
                        isPdf ? (
                          <iframe
                            src={`${value}#toolbar=0&navpanes=0&scrollbar=0`}
                            title={key}
                            className="w-full h-full border-none no-scrollbar"
                          />
                        ) : (
                          <img
                            src={value}
                            alt={key}
                            className="w-full h-full object-cover rounded-sm"
                          />
                        )
                      ) : (
                        <div className="text-center text-gray-400 text-xs h-full flex items-center justify-center">
                          No file found
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full px-3 py-1 bg-stone-50 text-zinc-600 text-xs truncate border-t border-stone-200">
                      {fileName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-[12px]">
            <div className="w-[48%] inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
                Professional Details
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Sectoral Specialization
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {recruiter?.sectorSpecialization?.length > 0
                      ? recruiter.sectorSpecialization
                          .map((item) => item.name)
                          .join(", ")
                      : "N/A"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    LinkedIn
                  </div>
                  {recruiter?.linkedinProfile ? (
                    <Link
                      to={recruiter.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight truncate"
                    >
                      {recruiter.linkedinProfile}
                    </Link>
                  ) : (
                    <span className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                      N/A
                    </span>
                  )}
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Experience In
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {recruiter?.experienceLevel?.length > 0
                      ? recruiter.experienceLevel.join(", ")
                      : "N/A"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Last Organization Name
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {recruiter?.lastOrganization?.name || "N/A"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Designation in last Organization
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {recruiter?.lastOrganization?.position || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[48%] h-full inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
                Additional Information
              </div>
              <div className="grid grid-cols-2 gap-[12px] justify-between w-full">
                <div className="flex flex-col gap-[12px] p-[16px]  w-full h-[115px] rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3141 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208704 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51958 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875ZM4.75 7C4.75 4.1005 7.1005 1.75 10 1.75C12.8995 1.75 15.25 4.1005 15.25 7C15.25 9.8995 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7Z"
                        fill="#0D0F1C"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Father’s Name
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {recruiter?.fatherName || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px] p-[16px]  w-full h-[115px] rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3141 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208704 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51958 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875ZM4.75 7C4.75 4.1005 7.1005 1.75 10 1.75C12.8995 1.75 15.25 4.1005 15.25 7C15.25 9.8995 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7Z"
                        fill="#0D0F1C"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Mother's Name
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {recruiter?.motherName || "N/A"}
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-[12px] p-[16px]  w-full h-[115px] rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3141 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208704 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51958 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875ZM4.75 7C4.75 4.1005 7.1005 1.75 10 1.75C12.8995 1.75 15.25 4.1005 15.25 7C15.25 9.8995 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7Z"
                        fill="#0D0F1C"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Reference
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      Michael Bennett
                    </div>
                  </div>
                </div> */}
                <div className="col-start-1 col-end-3 flex flex-col gap-[12px] p-[16px]  w-full h-[115px] rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3141 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208704 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51958 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875ZM4.75 7C4.75 4.1005 7.1005 1.75 10 1.75C12.8995 1.75 15.25 4.1005 15.25 7C15.25 9.8995 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7Z"
                        fill="#0D0F1C"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Medical Problems
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {recruiter?.medicalProblemDetails === "" ||
                      !recruiter?.medicalProblemDetails
                        ? "None"
                        : recruiter?.medicalProblemDetails}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDetails;
