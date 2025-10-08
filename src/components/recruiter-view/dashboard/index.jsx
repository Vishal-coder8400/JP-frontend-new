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

        {!progress?.data?.signupProgress < 100 && (
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
                      className={`flex-1 h-2 ${
                        progress?.data?.completedStages.includes(index + 1)
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
        )}
        <div className="w-full self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-6 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-[662px]">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Reports & Insights
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          {/* <SearchComponent /> */}
          <div className="w-full self-stretch grid md:grid-cols-3 lg:grid-cols-4 gap-2">
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex items-center justify-center flex-col gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Total Candidates
                  <br />
                  Submitted
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex  flex-col justify-center items-center gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Total Candidates
                  <br /> Selected
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-center items-center gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Offered
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-center items-center gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Joined
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-center items-center gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  HOLD
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
          </div>
          <div className="w-full inline-flex justify-start items-start gap-6">
            <div className="w-full inline-flex flex-col justify-start items-start gap-7">
              <div className="inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Top Hiring Companies
                </div>
              </div>
              <div className="w-full rounded-[8px] border bg-white">
                <Table>
                  <TableHeader className="[&_th]:font-semibold [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
                    <TableRow>
                      <TableHead>Job</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Sumitted</TableHead>
                      <TableHead>Selected</TableHead>
                      <TableHead>Offered</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Hold</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.company}</TableCell>
                        <TableCell>{item.submitted}</TableCell>
                        <TableCell>{item.shortlisted}</TableCell>
                        <TableCell>{item.hired}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="flex-1 justify-start text-gray-900 text-lg font-semibold leading-tight">
              Reports & Insights
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <SearchComponent />
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-xs font-semibold leading-3">
                  Total Candidates
                  <br />
                  Submitted
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-xs font-semibold leading-3">
                  Hired Candidates
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-xs font-semibold leading-3">
                  Shortlisted by
                  <br /> Employers
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-xs font-semibold leading-3">
                  Interviews <br /> Scheduled
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-7">
            <div className="inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
                Top Hiring Companies
              </div>
            </div>
            <div className="w-full rounded-[8px] border bg-white">
              <Table>
                <TableHeader className="[&_th]:font-semibold [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>
                      Candidates
                      <br /> Submitted
                    </TableHead>
                    <TableHead>Shortlisted</TableHead>
                    <TableHead>Hired</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.company}</TableCell>
                      <TableCell>{item.submitted}</TableCell>
                      <TableCell>{item.shortlisted}</TableCell>
                      <TableCell>{item.hired}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
