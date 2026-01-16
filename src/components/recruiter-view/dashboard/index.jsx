import { Fragment } from "react";
import HeroProfile from "../common/hero-profile";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import SearchComponent from "../../common/searchComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserProgress } from "../../../hooks/recruiter/useProfile";
import PendingApprove from "@/components/common/pending-approve";
import ApprovedUi from "@/components/common/approved-ui";

const data = [
  { company: "ABC Tech", submitted: 32, shortlisted: 18, hired: 18 },
  { company: "XYZ Corp", submitted: 21, shortlisted: 20, hired: 20 },
  { company: "ABC Tech", submitted: 18, shortlisted: 14, hired: 14 },
  { company: "Innovate Ltd", submitted: 14, shortlisted: 11, hired: 11 },
  { company: "XYZ Corp", submitted: 14, shortlisted: 10, hired: 10 },
  { company: "Innovate Ltd", submitted: 13, shortlisted: 9, hired: 9 },
];

const Index = () => {
  const { user } = useAuthStore();
  const { data: progress } = useGetUserProgress();
  const nextStagePath =
    progress?.data?.currentStage === 2
      ? "/recruiter/profile-setup/kyc-verification"
      : progress?.data?.currentStage === 3
        ? "/recruiter/profile-setup/sectoral-details"
        : progress?.data?.currentStage === 4
          ? "/recruiter/profile-setup/qualification-details"
          : "/recruiter/dashboard";

  return (
    <Fragment>
      <div className="hidden lg:flex flex-col gap-[25px] w-full">
        <HeroProfile />
        {progress?.data?.signupProgress < 100 ? (
          <div className="self-stretch p-10 bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-offset-[-1px] outline-neutral-300 flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch inline-flex justify-start items-start gap-12">
              <div className="inline-flex flex-col justify-center items-start gap-3.5">
                <div className="justify-start text-gray-900 text-6xl font-semibold leading-[64px]">
                  {progress?.data?.signupProgress}%
                </div>
                <div className="w-28 opacity-70 justify-start text-gray-900 text-base font-semibold">
                  Of your profile is complete
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch justify-start text-gray-900 text-lg font-semibold leading-tight">
                  Complete your profile to post jobs!
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  {Array.from({
                    length: progress?.data?.totalStages,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-2 ${progress?.data?.completedStages.includes(index + 1)
                          ? "bg-lime-600"
                          : "bg-zinc-300"
                        } rounded-xl`}
                    />
                  ))}
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-12">
                  <div className="flex-1 opacity-70 justify-start text-gray-900 text-base font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut.
                  </div>
                  <Link
                    to={nextStagePath}
                    className="px-4 py-3.5 bg-neutral-800 rounded-md shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] flex justify-center items-center gap-[3px]"
                  >
                    <div className="text-center justify-start text-white text-base font-semibold leading-tight">
                      Proceed to Complete
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : user?.status === "pending" ? (
          <PendingApprove />
        ) : user?.status === "active" ? (
          <ApprovedUi />
        ) : null}
        <div className="w-full self-stretch backdrop-blur-sm bg-white/30 rounded-2xl border border-white/40 shadow-lg p-10 flex flex-col items-center justify-center gap-6 min-h-[400px] relative overflow-hidden">

          {/* Background Pattern from Option 2 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          {/* Option 1 Content */}
          <div className="relative z-10">
            {/* Animated Icon Container from Option 1 */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-sm font-bold">🎯</span>
              </div>
            </div>
          </div>

          {/* Option 1 Content Text */}
          <div className="relative z-10 text-center space-y-3">
            <h3 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h3>
            <p className="text-gray-700 text-lg max-w-md">
              We're crafting powerful insights to help you make data-driven decisions.
            </p>

            {/* Progress Bar from Option 1 */}
            <div className="w-64 h-2 bg-gray-200/50 rounded-full overflow-hidden mt-6 mx-auto">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-3/4 animate-progress"></div>
            </div>

            {/* Status Indicator from Option 1 */}
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>In Development • Launching Soon</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full p-6 inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        {(user?.fatherName === undefined || user?.fatherName === "") && (
          <div className="self-stretch p-7 bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-offset-[-1px] outline-neutral-300 flex flex-col justify-start items-end gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-3">
              <div className="inline-flex flex-col justify-center items-start gap-3.5">
                <div className="justify-start text-gray-900 text-5xl font-semibold leading-[48px]">
                  50%
                </div>
                <div className="w-28 opacity-70 justify-start text-gray-900 text-sm font-semibold">
                  Of your profile is complete
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch justify-start text-gray-900 text-lg font-semibold leading-tight">
                  Complete your profile to post jobs!
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2">
              <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
              <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
              <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
              <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
            </div>
            <div className="self-stretch opacity-70 justify-start text-gray-900 text-sm font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut.
            </div>
            <Link
              to="/recruiter/profile-setup/sectoral-details"
              className="px-4 py-3.5 bg-neutral-800 rounded-md shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] inline-flex justify-center items-center gap-[3px]"
            >
              <div className="text-center justify-start text-white text-xs font-semibold leading-tight">
                Proceed to Complete
              </div>
            </Link>
          </div>
        )}
        <div className="w-full self-stretch backdrop-blur-sm bg-white/30 rounded-2xl border border-white/40 shadow-lg p-10 flex flex-col items-center justify-center gap-6 min-h-[400px] relative overflow-hidden">

          {/* Background Pattern from Option 2 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          {/* Option 1 Content */}
          <div className="relative z-10">
            {/* Animated Icon Container from Option 1 */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-sm font-bold">🎯</span>
              </div>
            </div>
          </div>

          {/* Option 1 Content Text */}
          <div className="relative z-10 text-center space-y-3">
            <h3 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h3>
            <p className="text-gray-700 text-lg max-w-md">
              We're crafting powerful insights to help you make data-driven decisions.
            </p>

            {/* Progress Bar from Option 1 */}
            <div className="w-64 h-2 bg-gray-200/50 rounded-full overflow-hidden mt-6 mx-auto">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-3/4 animate-progress"></div>
            </div>

            {/* Status Indicator from Option 1 */}
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>In Development • Launching Soon</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
