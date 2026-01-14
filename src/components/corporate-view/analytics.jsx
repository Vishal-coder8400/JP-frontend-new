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
import Pagination from "../common/pagination";
const jobTableData = [
  {
    title: "UX Designer",
    applications: 120,
    shortlisted: 56,
    interviewed: 24,
    selected: 2,
    status: "Open",
  },
  {
    title: "Software Engineer",
    applications: 134,
    shortlisted: 43,
    interviewed: 24,
    selected: 3,
    status: "Closed",
  },
  {
    title: "Software Engineer",
    applications: 243,
    shortlisted: 40,
    interviewed: 24,
    selected: 1,
    status: "Open",
  },
  {
    title: "UX Designer",
    applications: 324,
    shortlisted: 40,
    interviewed: 24,
    selected: 2,
    status: "Open",
  },
];

const Analytics = () => {
  return (
    <div className="w-full flex flex-col gap-6 max-sm:p-[20px]">
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch text-gray-900 lg:text-3xl text-lg font-bold">
            Job & Training Postings
          </div>
        </div>
      </div>
      <div className="size- inline-flex justify-start items-center gap-5">
        <Link
          to={"/corporate/job-posting/listing"}
          className="w-28 p-3 bg-white rounded-[69px] flex justify-center items-center outline-1 outline-offset-[-1px] gap-6 overflow-hidden outline-neutral-400"
        >
          <div className="justify-center  text-neutral-400 text-base font-normal leading-snug">
            Listings
          </div>
        </Link>
        <div className="w-28 p-3 bg-[#6945ED] rounded-[69px] flex justify-center items-center gap-6 overflow-hidden">
          <div className="justify-center text-white text-base font-normal leading-snug">
            Analytics
          </div>
        </div>
      </div>
      <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
            Job Post Performance
          </div>
        </div>
        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
        <div className="self-stretch rounded-lg outline-1 outline-zinc-300 inline-flex justify-start items-start">
          <Table>
            <TableHeader className="[&_th]:font-semibold [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Applications Received</TableHead>
                <TableHead>Shortlisted</TableHead>
                <TableHead>
                  Interviews
                  <br />
                  Scheduled
                </TableHead>
                <TableHead>Hires Made</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
              {jobTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.applications}</TableCell>
                  <TableCell>{item.shortlisted}</TableCell>
                  <TableCell>{item.interviewed}</TableCell>
                  <TableCell>{item.selected}</TableCell>
                  <TableCell>
                    {item.status === "Open" ? (
                      <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                        <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                          Open
                        </div>
                      </div>
                    ) : (
                      <div className="size- px-2 py-1 bg-red-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                        <div className="justify-start text-red-600 text-xs font-medium leading-none">
                          Closed
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination />
      </div>
      <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
            Training
          </div>
        </div>
        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
        <div className="self-stretch rounded-lg outline-1 outline-zinc-300 inline-flex justify-start items-start">
          <Table>
            <TableHeader className="[&_th]:font-semibold [&_th]:px-[16px]  [&_th]:py-[4px] [&_th]:text-sm">
              <TableRow>
                <TableHead>Training Title</TableHead>
                <TableHead>Applications Received</TableHead>
                <TableHead>Shortlisted</TableHead>
                <TableHead>
                  Interviews
                  <br />
                  Scheduled
                </TableHead>
                <TableHead>Hires Made</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_td]:text-base [&_td]:px-[16px] [&_td]:py-[12px]">
              {jobTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.applications}</TableCell>
                  <TableCell>{item.shortlisted}</TableCell>
                  <TableCell>{item.interviewed}</TableCell>
                  <TableCell>{item.selected}</TableCell>
                  <TableCell>
                    {item.status === "Open" ? (
                      <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                        <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                          Open
                        </div>
                      </div>
                    ) : (
                      <div className="size- px-2 py-1 bg-red-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                        <div className="justify-start text-red-600 text-xs font-medium leading-none">
                          Closed
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Analytics;
