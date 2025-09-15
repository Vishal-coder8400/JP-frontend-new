import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";

const TrainingDetailsDrawer = ({ training }) => {
  if (!training) return null;

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        <img
          src="/google.png"
          alt={training.name}
          className="h-10 w-10 rounded-md"
        />
        <div className="flex-1">
          <p>Google</p>
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">Data Engineer</p>
            <Badge className="text-primary-purple bg-light-purple text-xs">
              2 Applied
            </Badge>
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 text-gray1" />
              Brussels
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray1" />
              Full Time
            </div>
            <div className="flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4 text-gray1" />
              50-55k
            </div>
          </div>

          <div className="text-gray1 flex items-center gap-2 mt-2">
            <CalendarIcon className="h-4 w-4 text-gray1" />
            29 mins ago
          </div>
        </div>
        <Button variant="black">Apply Now</Button>
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the job</h3>
          <div className="text-gray1 mt-4 space-y-2">
            <h4 className="font-semibold">Job Description</h4>
            <p>
              Jayant Fitness is looking for a dynamic and results-driven
              Business Development Executive / Sales Executive to expand our
              client base in the corporate and real estate sectors. The ideal
              candidate will be responsible for generating leads, closing deals,
              and building long-term relationships with clients.
            </p>

            <h4 className="font-semibold">Key Responsibilities</h4>
            <ul className="list-disc list-inside">
              <li>Identify and pursue new business opportunities</li>
              <li>Build and maintain relationships with clients</li>
              <li>
                Conduct market research to identify trends and opportunities
              </li>
              <li>Prepare and deliver presentations to clients</li>
              <li>Negotiate contracts and close deals</li>
            </ul>

            <h4 className="font-semibold">Education</h4>
            <p>Any Graduates</p>

            <h4 className="font-semibold">Other Details</h4>
            <ul className="list-disc list-inside">
              <li>Experience: 0-1 years</li>
              <li>Location: Bangalore</li>
              <li>Salary: 15K - 25K P.A.</li>
              <li>Job Type: Full-time, Permanent</li>
              <li>Industry: Fitness & Wellness</li>
            </ul>

            <p>
              For additional information, you can reach out to me at
              anesh@stimuler.tech
            </p>

            <div className="flex items-center gap-2 mt-4">
              {["Sales", "Marketing", "Communication"].map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Company */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <h4>About the Company</h4>
        <p className="text-gray1 mt-4">
          Google LLC is an American multinational technology company that
          specializes in Internet-related services and products, which include
          online advertising technologies, a search engine, cloud computing,
          software, and hardware. It is considered one of the Big Five companies
          in the U.S. information technology industry, along with Amazon, Apple,
          Meta (Facebook), and Microsoft.
        </p>

        <div className="mt-4 pt-4 flex items-center gap-4 border-t-1 border-gray-2">
          <FacebookIcon className="h-4 w-4 text-gray1" />
          <LinkedinIcon className="h-4 w-4 text-gray1" />
          <TwitterIcon className="h-4 w-4 text-gray1" />
        </div>
      </div>
    </div>
  );
};

export default TrainingDetailsDrawer;
