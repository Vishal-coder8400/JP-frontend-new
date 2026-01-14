import { Badge } from "@/components/ui/badge";
import { ExternalLink, MailIcon, PhoneCallIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCandidate = ({ candidate }) => {
  // The API response has candidate.data as the main object
  const candidateData = candidate?.data || candidate || {};

  // Extract data with proper fallbacks
  const skills = Array.isArray(candidateData?.skills)
    ? candidateData.skills
    : [];
  const educations = candidateData?.education || [];
  const certifications = Array.isArray(candidateData?.certifications)
    ? candidateData.certifications
    : [];
  const experiences = Array.isArray(candidateData?.experienceDetails)
    ? candidateData.experienceDetails
    : [];

  // Format fields with proper fallbacks
  const workingStatus = candidateData?.currentWorkingStatus ?? "-";
  const roleLookingFor = candidateData?.roleLookingFor ?? "-";
  const currentIndustry = candidateData?.currentIndustry ?? "-";
  const areaOfExpertise = candidateData?.areaOfExpertise ?? "-";
  const functionalIndustry = candidateData?.functionalIndustry ?? "-";
  const noticePeriodDays = candidateData?.noticePeriod !== undefined &&
    candidateData?.noticePeriod !== null
    ? `${candidateData?.noticePeriod} Days`
    : "-";
  const preferredWorkLocation = candidateData?.preferredWorkLocation ??
    candidateData?.preferredLocation ?? "-";
  const currentSalary = candidateData?.currentSalary !== undefined &&
    candidateData?.currentSalary !== null
    ? `${candidateData?.currentSalary} LPA`
    : "-";
  const expectedSalary = candidateData?.expectedSalary !== undefined &&
    candidateData?.expectedSalary !== null
    ? `${candidateData?.expectedSalary} LPA`
    : "-";

  // Format location with city and state
  const formatLocation = () => {
    const address = candidateData?.currentAddress?.address || "";
    const city = candidateData?.currentAddress?.city || "";
    const state = candidateData?.currentAddress?.state || "";
    const pincode = candidateData?.currentAddress?.pincode || "";


    
    const parts = [];
    if (address) parts.push(address);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (pincode) parts.push(pincode);

    
    return parts.length > 0 ? parts.join(", ") : "-";
  };

  const overviewFields = [
    { label: "Current working status", value: workingStatus },
    { label: "Role Looking for", value: roleLookingFor },
    { label: "Current Industry", value: currentIndustry },
    { label: "Area of Expertise", value: areaOfExpertise },
    { label: "Functional Industry", value: functionalIndustry },
    { label: "Notice Period", value: noticePeriodDays },
    { label: "Preferred work location", value: preferredWorkLocation },
    { label: "Annual Current Salary / CTC", value: currentSalary },
    { label: "Expected Salary / CTC", value: expectedSalary },
  ];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-9 gap-4">
        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center">
          <span className="text-gray1/50">Location</span>
          <p className="">{formatLocation()}</p>
        </div>

        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center">
          <span className="text-gray1/50">Total Experience</span>
          <p className="mt-2 capitalize">
            {candidateData?.totalExperience !== undefined && candidateData?.totalExperience !== null
              ? candidateData.totalExperience >= 1
                ? `${candidateData.totalExperience} years`
                : candidateData?.totalExperienceInMonth
                  ? `${candidateData.totalExperienceInMonth} months`
                  : "Less than 1 year"
              : "-"
            }
          </p>
        </div>

        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center space-y-2">
          <span className="text-gray1/50">Resume</span>
          <Link
            to={candidateData?.resume || "/resume.pdf"}
            target="_blank"
            className="bg-gray2 rounded px-3 py-2 text-center"
          >
            Resume.pdf
          </Link>
        </div>

        <div className="p-4 border-1 col-span-3 border-gray2 rounded text-sm flex flex-col justify-center space-y-3">
          <span className="text-gray1/50">Contact Information</span>
          <p className="flex items-center gap-2 mt-2">
            <PhoneCallIcon className="w-4 h-4" />{" "}
            {candidateData?.phone?.countryCode && candidateData?.phone?.number
              ? `${candidateData.phone.countryCode}-${candidateData.phone.number}`
              : "-"}
          </p>
          <p className="flex items-center gap-2 mt-2">
            <MailIcon className="w-4 h-4 text-black" />{" "}
            {candidateData?.email || "-"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        <div className="col-span-3 border-1 border-gray2 rounded-lg p-6">
          <h3 className="text-lg font-semibold">Professional Experience</h3>
          <div className="mt-4 space-y-4">
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border border-gray-200 rounded p-4"
                >
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h4 className="font-semibold">{exp?.role || "N/A"}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray1">{exp?.companyName || ""}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray1">
                      {exp?.startDate || ""}
                      {exp?.endDate ? ` - ${exp.endDate}` : ""}
                      {exp?.currentlyWorking ? " (Current)" : ""}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray1/70">No experience added</p>
            )}
          </div>

          <div className="mt-6">
            {overviewFields.map((field) => (
              <div
                key={field.label}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <span className="text-gray1">{field.label}</span>
                <span>{field.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 border-1 border-gray2 rounded-lg p-6 flex flex-col gap-6">
          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gray2 text-gray1 px-3 py-1 rounded-full text-xs"
                  >
                    {skill?.label || skill?.value || "Skill"}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray1/70">No skills added</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="mt-4 space-y-4">
              {educations.length > 0 ? (
                educations.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border border-gray-200 rounded p-4"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <p className="capitalize">{edu?.institution || "-"}</p>
                        <p className="text-sm text-gray1/50">
                          {edu?.startDate || ""}
                          {edu?.endDate ? ` - ${edu.endDate}` : ""}
                        </p>
                      </div>
                      <p className="capitalize">{edu?.degree || "-"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray1/70">No education added</p>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold">Certifications</h3>
            <div className="mt-4 space-y-2">
              {certifications.length > 0 ? (
                certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    <div>
                      <p className="capitalize">{cert?.name || ""}</p>
                      <p className="text-sm text-gray1/50">
                        {cert?.duration || ""}
                      </p>
                    </div>
                    {cert?.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray1/70">No certifications added</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 border-1 border-gray2 rounded-lg p-6">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <div className="mt-4 space-y-2">
          {[
            { label: "DOB", value: candidateData?.dob || "-" },
            { label: "Gender", value: candidateData?.gender || "-" },
            {
              label: "Marital Status",
              value: candidateData?.maritalStatus || "-",
            },
            {
              label: "Have you handled a team?",
              value: candidateData?.handelTeams === true
                ? "YES"
                : candidateData?.handelTeams === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Are you willing to work 6 days a week?",
              value: candidateData?.willingToWork6Days === true
                ? "YES"
                : candidateData?.willingToWork6Days === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Are you willing to relocate from your current location?",
              value: candidateData?.willingToRelocate === true
                ? "YES"
                : candidateData?.willingToRelocate === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Are you open to joining an early-stage startup?",
              value: candidateData?.joinInStartup === true
                ? "YES"
                : candidateData?.joinInStartup === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Are you Differently Abled?",
              value: candidateData?.isDifferentlyAbled === true
                ? "YES"
                : candidateData?.isDifferentlyAbled === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Are you suffering from any medical problem?",
              value: candidateData?.hasMedicalProblem === true
                ? "YES"
                : candidateData?.hasMedicalProblem === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Willingness to Travel",
              value: candidateData?.willingToTravel === true
                ? "YES"
                : candidateData?.willingToTravel === false
                  ? "NO"
                  : "-",
            },
            {
              label: "Languages",
              value: Array.isArray(candidateData?.languages) && candidateData.languages.length > 0
                ? candidateData.languages.join(", ")
                : "-",
            },
          ].map((info) => (
            <div
              key={info.label}
              className="grid grid-cols-2 gap-4 border-b border-gray-200 py-2"
            >
              <p>{info.label}</p>
              <p className="">{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutCandidate;