import { Link } from "react-router-dom";
import Navbar from "../../components/recruiter-view/navbar";
import useAuthStore from "../../stores/useAuthStore";
import EditTrainerDrawer from "../../components/common/EditDrawer";
import EditProfile from "../../components/corporate-view/edit-profile";
import { useState } from "react";
import { Button } from "../../components/ui/button";

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col w-full gap-[24px]">
      <Navbar onlySupport={false} />
      <div className="relative flex w-full bg-white pt-[120px] px-[48px] pb-[47px] rounded-t-[16px] overflow-hidden ">
        <div class="absolute top-0 left-0 h-[186px] w-full bg-[url('/Group_1000005865.jpg')] bg-cover bg-center"></div>
        <div className="w-full flex flex-col gap-[36px] ">
          <div className="self-stretch pl-52 pr-10 py-5 relative bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
              <div className="text-center justify-start text-black text-xl font-semibold leading-tight">
                {user?.basicInformation?.companyName}
              </div>
            </div>
            <img
              className="size-28 left-[42px] top-[-21px] absolute object-cover rounded-full outline-2 outline-white"
              src={user?.basicInformation?.companyLogo}
              alt={user?.basicInformation?.companyName}
            />
            <div className="size- inline-flex flex-col justify-center items-start gap-2.5">
              <Button
                onClick={() => setIsEditOpen(true)}
                className="cursor-pointer self-stretch px-3 py-2 bg-black rounded-lg inline-flex justify-center items-center gap-1"
              >
                <div className="justify-start text-white text-xs font-normal leading-tight">
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Basic Information
            </div>
            <div className="flex items-center justify-between w-full gap-[12px]">
              <div className="max-w-[337px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.89437 14.4713C10.187 14.7641 10.187 15.2387 9.89437 15.5316L8.9625 16.4691C6.91033 18.5199 3.58416 18.5189 1.53328 16.4667C-0.517594 14.4145 -0.516544 11.0884 1.53562 9.0375L3.79688 6.77625C5.76196 4.80959 8.91953 4.71586 10.9978 6.5625C11.3085 6.83795 11.337 7.31309 11.0616 7.62375C10.7861 7.93441 10.311 7.96295 10.0003 7.6875C8.51599 6.36936 6.26156 6.43635 4.85813 7.84031L2.59688 10.0988C1.13211 11.5635 1.13211 13.9384 2.59688 15.4031C4.06164 16.8679 6.43649 16.8679 7.90125 15.4031L8.83313 14.4713C8.9738 14.3304 9.16469 14.2513 9.36375 14.2513C9.56281 14.2513 9.7537 14.3304 9.89437 14.4713V14.4713ZM16.4644 1.53375C14.4122 -0.513869 11.0897 -0.513869 9.0375 1.53375L8.10563 2.46656C7.81283 2.75962 7.81304 3.23455 8.10609 3.52734C8.39915 3.82014 8.87408 3.81993 9.16687 3.52688L10.0988 2.595C11.5635 1.13024 13.9384 1.13024 15.4031 2.595C16.8679 4.05976 16.8679 6.43461 15.4031 7.89937L13.1419 10.1625C11.7377 11.5656 9.48328 11.6314 7.99969 10.3125C7.79873 10.1343 7.51797 10.0769 7.26317 10.1618C7.00838 10.2468 6.81826 10.4612 6.76442 10.7243C6.71059 10.9875 6.80123 11.2593 7.00219 11.4375C9.07998 13.2846 12.2375 13.1917 14.2031 11.2256L16.4644 8.96437C18.5132 6.91194 18.5132 3.58806 16.4644 1.53562V1.53375Z"
                        fill="#0F121A"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Website
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  {user?.basicInformation?.websiteURL}
                </div>
              </div>
              <div className="max-w-[337px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.3988 17.875C17.9709 15.4066 15.7706 13.6366 13.2028 12.7975C15.8135 11.2433 17.0641 8.13638 16.2582 5.2069C15.4522 2.27741 12.7883 0.247449 9.75 0.247449C6.71167 0.247449 4.04779 2.27741 3.24182 5.2069C2.43585 8.13638 3.68645 11.2433 6.29719 12.7975C3.72938 13.6356 1.52906 15.4056 0.10125 17.875C-0.0412965 18.1074 -0.0464728 18.3989 0.0877311 18.6363C0.221935 18.8736 0.474375 19.0194 0.747024 19.0171C1.01967 19.0147 1.26958 18.8646 1.39969 18.625C3.16594 15.5725 6.28781 13.75 9.75 13.75C13.2122 13.75 16.3341 15.5725 18.1003 18.625C18.2304 18.8646 18.4803 19.0147 18.753 19.0171C19.0256 19.0194 19.2781 18.8736 19.4123 18.6363C19.5465 18.3989 19.5413 18.1074 19.3988 17.875ZM4.5 7C4.5 4.1005 6.8505 1.75 9.75 1.75C12.6495 1.75 15 4.1005 15 7C15 9.8995 12.6495 12.25 9.75 12.25C6.85179 12.2469 4.5031 9.89821 4.5 7Z"
                        fill="#121417"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Company Owner
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  {user?.spocInformation?.fullName}
                </div>
              </div>
              <div className="max-w-[337px] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    {user?.basicInformation?.companyContactNumber?.countryCode}{" "}
                    {user?.basicInformation?.companyContactNumber?.number}
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.3337 3.5L7.50033 7.58333L1.66699 3.5"
                        stroke="#61758A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>{user?.basicInformation?.companyEmail}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              SPOC Information
            </div>
            <div className="flex items-center justify-between w-full gap-[12px]">
              <div className="max-w-[337px] bg-[#FAFAFA] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3142 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208703 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51957 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875V17.875ZM4.75 7C4.75 4.10051 7.10051 1.75 10 1.75C12.8995 1.75 15.25 4.10051 15.25 7C15.25 9.89949 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7V7Z"
                        fill="#0F121A"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Full Name
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  {user?.spocInformation?.fullName}
                </div>
              </div>
              <div className="max-w-[337px] bg-[#FAFAFA] w-full h-[125px] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.8472 12.8556L13.4306 10.8766L13.4184 10.8709C12.9526 10.6717 12.4177 10.7211 11.9963 11.0022C11.9718 11.0183 11.9483 11.0359 11.9259 11.0547L9.64406 13C8.19844 12.2978 6.70594 10.8166 6.00375 9.38969L7.95187 7.07312C7.97062 7.04969 7.98844 7.02625 8.00531 7.00094C8.28032 6.5807 8.32677 6.05073 8.12906 5.58906V5.57781L6.14437 1.15375C5.88009 0.543904 5.246 0.180693 4.58625 0.26125C1.95833 0.607054 -0.00475144 2.84943 0 5.5C0 12.9437 6.05625 19 13.5 19C16.1506 19.0048 18.3929 17.0417 18.7388 14.4137C18.8195 13.7542 18.4567 13.1202 17.8472 12.8556V12.8556ZM13.5 17.5C6.87558 17.4928 1.50723 12.1244 1.5 5.5C1.4927 3.60618 2.89195 2.00108 4.76906 1.75C4.76869 1.75374 4.76869 1.75751 4.76906 1.76125L6.73781 6.1675L4.8 8.48687C4.78033 8.50951 4.76246 8.53364 4.74656 8.55906C4.45961 8.99938 4.42405 9.55777 4.65281 10.0309C5.50219 11.7681 7.2525 13.5053 9.00844 14.3538C9.48515 14.5804 10.0459 14.5398 10.485 14.2469C10.5091 14.2307 10.5322 14.2131 10.5544 14.1944L12.8334 12.25L17.2397 14.2234V14.2234C17.2397 14.2234 17.2472 14.2234 17.25 14.2234C17.002 16.1033 15.3962 17.5064 13.5 17.5V17.5Z"
                        fill="#0F121A"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Contact Number
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  {user?.spocInformation?.contactNumber?.countryCode}{" "}
                  {user?.spocInformation?.contactNumber?.number}
                </div>
              </div>
              <div className="max-w-[337px] w-full h-[125px] bg-[#FAFAFA] flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19 0.5H1C0.585786 0.5 0.25 0.835786 0.25 1.25V14C0.25 14.8284 0.921573 15.5 1.75 15.5H18.25C19.0784 15.5 19.75 14.8284 19.75 14V1.25C19.75 0.835786 19.4142 0.5 19 0.5V0.5ZM10 8.48281L2.92844 2H17.0716L10 8.48281ZM7.25406 8L1.75 13.0447V2.95531L7.25406 8ZM8.36406 9.01719L9.48906 10.0531C9.77592 10.3165 10.2166 10.3165 10.5034 10.0531L11.6284 9.01719L17.0659 14H2.92844L8.36406 9.01719ZM12.7459 8L18.25 2.95437V13.0456L12.7459 8Z"
                        fill="#0F121A"
                      />
                    </svg>
                  </div>
                  <div className="text-[#121417] text-md font-semibold">
                    Email ID
                  </div>
                </div>
                <div className="text-[#61758A] text-base font-normal">
                  {user?.spocInformation?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-[12px]">
            <div className="w-full inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
                Professional Details
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Type
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {user?.sectorSpecialization
                      ?.map((item) => item.name)
                      .join(", ")}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Current Address
                  </div>
                  <Link
                    to={user?.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight truncate"
                  >
                    {user?.linkedinProfile}
                  </Link>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Industry Type
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {user?.experienceLevel?.join(", ") || "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    PAN Card Number
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {user?.lastOrganization?.name || "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    GSTIN
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {user?.lastOrganization?.position || "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Bank Name
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {user?.sectorSpecialization
                      ?.map((item) => item.name)
                      .join(", ")}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Bank Account Number
                  </div>
                  <Link
                    to={user?.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight truncate"
                  >
                    {user?.linkedinProfile}
                  </Link>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 inline-flex justify-start items-center gap-28">
                  <div className="w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Cancelled Cheque
                  </div>
                  <div className="w-48 justify-start text-neutral-900 text-sm font-normal leading-tight">
                    {user?.experienceLevel?.join(", ") || "Not Specified"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditTrainerDrawer isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <EditProfile setIsEditOpen={setIsEditOpen} />
      </EditTrainerDrawer>
    </div>
  );
};

export default Profile;
