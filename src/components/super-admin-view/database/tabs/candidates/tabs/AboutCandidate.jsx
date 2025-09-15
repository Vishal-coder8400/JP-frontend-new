import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MailIcon, PhoneCallIcon } from "lucide-react";

const AboutCandidate = () => {
  const professionalExperiences = [
    {
      companyLogo: "/google.png",
      companyName: "Google",
      role: "Product Designer",
      duration: "Jan 2020 - Present",
      jobType: "Full-time",
    },
    {
      companyLogo: "/google.png",
      companyName: "Google",
      role: "Product Designer",
      duration: "Jan 2020 - Present",
      jobType: "Intern",
    },
  ];

  const professionalDetails = [
    { field: "Current working status", value: "Employed" },
    { field: "Role Looking for", value: "Product Designer" },
    { field: "Current Industry", value: "Technology" },
    { field: "Area of Expertise", value: "UI/UX Design, Interaction Design" },
    { field: "Functional Industry", value: "Design & Creative" },
    { field: "Notice Period", value: "2 Months" },
    { field: "Preferred work location", value: "Bangalore, India" },
    { field: "Annual Current Salary / CTC", value: "₹12 LPA" },
    { field: "Expected Salary / CTC", value: "₹18 LPA" },
  ];

  const additionalInformation = [
    { field: "DOB", value: "18/08/1995" },
    { field: "Gender", value: "Female" },
    { field: "Marital Status", value: "Single" },
    { field: "Have you handled a team?", value: "YES" },
    { field: "Are you willing to work 6 days a week?", value: "YES" },
    {
      field: "Are you willing to relocate from your current location?",
      value: "YES",
    },
    { field: "Are you open to joining an early-stage startup?", value: "NO" },
    { field: "Are you Differently Abled?", value: "NO" },
    { field: "Are you suffering from any medical problem?", value: "NO" },
    { field: "Are you suffering from any medical problem?", value: "NO" },
    { field: "Languages", value: "English, Hindi, Kannada" },
  ];

  const skills = [
    "UI/UX Design",
    "Interaction Design",
    "Prototyping",
    "User Research",
    "Wireframing",
    "Figma",
    "Adobe XD",
  ];

  const educations = [
    {
      institutionLogo: "/education.png",
      name: "MIT",
      degree: "B.Sc.",
      duration: "2012 - 2016",
    },
    {
      institutionLogo: "/education.png",
      name: "MIT",
      degree: "B.Sc.",
      duration: "2012 - 2016",
    },
  ];

  const certificates = [
    {
      name: "Certified UX Professional",
      link: "https://www.google.com",
      duration: "2012 - 2016",
    },
    {
      name: "Advanced Figma Course",
      link: "https://www.coursera.com",
      duration: "2012 - 2016",
    },
  ];
  return (
    <div className="mt-6">
      <div className="grid grid-cols-9 gap-4">
        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center">
          <span className="text-gray1/50">Location</span>
          <p className="">Bangalore, India</p>
        </div>

        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center">
          <span className="text-gray1/50">Current Employment</span>
          <p className="mt-2">Product Designer</p>
          <div className="flex items-center gap-2 mt-2">
            <img src="/google.png" className="w-6 h-6" alt="Company Logo" />
            <p>Google</p>
          </div>
        </div>

        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center space-y-2">
          <span className="text-gray1/50">Resume</span>
          <p className="bg-gray2 rounded px-3 py-2 text-center">resume.pdf</p>
        </div>

        <div className="p-4 border-1 col-span-3 border-gray2 rounded text-sm flex flex-col justify-center spcace-y-3">
          <span className="text-gray1/50">Contact Information</span>
          <p className="flex items-center gap-2 mt-2">
            <PhoneCallIcon className="w-4 h-4" /> +919300030336
          </p>
          <p className="flex items-center gap-2 mt-2">
            <MailIcon className="w-4 h-4 text-black" />{" "}
            margaretthetcher@gmail.com
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        <div className="col-span-3 border-1 border-gray2 rounded-lg p-6">
          <h3 className="text-lg font-semibold">Professional Experience</h3>
          <div className="mt-4 space-y-4">
            {professionalExperiences.map((exp, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border border-gray-200 rounded p-4"
              >
                <img
                  src={exp.companyLogo}
                  alt={`${exp.companyName} Logo`}
                  className="w-12 h-12"
                />
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h4 className="font-semibold">{exp.role}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray1">{exp.companyName}</p>
                      <Badge
                        className={`${
                          exp.jobType === "Intern"
                            ? "bg-light-pink"
                            : "bg-light-blue"
                        } text-gray1 text-sm rounded-xl`}
                      >
                        {exp.jobType}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray1">{exp.duration} · 2Yrs</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            {professionalDetails.map((detail, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <span className="text-gray1">{detail.field}</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 border-1 border-gray2 rounded-lg p-6 flex flex-col gap-6">
          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-gray2 text-gray1 px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="mt-4 space-y-4">
              {educations.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border border-gray-200 rounded p-4"
                >
                  <img
                    src={edu.institutionLogo}
                    alt={`${edu.institutionName} Logo`}
                    className="w-12 h-12"
                  />
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="">{edu.name}</p>
                      <p className="text-sm text-gray1/50">{edu.duration}</p>
                    </div>
                    <p>{edu.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold">Certifications</h3>
            <div className="mt-4 space-y-2">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <div>
                    <p>{cert.name}</p>
                    <p>{cert.duration}</p>
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 border-1 border-gray2 rounded-lg p-6">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <div className="mt-4 space-y-2">
          {additionalInformation.map((info, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 border-b border-gray-200 py-2"
            >
              <p>{info.field}</p>
              <p className="">{info.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Button variant={"purple"} className={"w-fit m-6"}>
        Edit Profile
      </Button>
    </div>
  );
};

export default AboutCandidate;
