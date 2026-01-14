import Navbar from "@/components/recruiter-view/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/stores/useAuthStore";
import {
  formatToMonthYear,
  getDurationBetweenDates,
} from "@/utils/commonFunctions";
import { Badge, ChevronRightIcon, ExternalLinkIcon } from "lucide-react";

const skills = [
  "UX Design",
  "Product Design",
  "Adobe Suite",
  "Figma",
  "Webflow",
  "UX Research",
];

const educationData = [
  {
    id: 1,
    institution: "University of Anytown",
    duration: "Aug 2020 - Feb 2022 · 2 Yrs",
    degree: "M.Tech",
    logo: "/image-6-2.png",
  },
];

const additionalInfoData = [
  { label: "DOB", value: "18 /09/1904" },
  { label: "Gender", value: "Male" },
  { label: "Marital Status", value: "Single" },
  { label: "Have you handled a team?", value: "YES" },
  { label: "Are you willing to work 6 days a week?", value: "YES" },
  {
    label: "Are you willing to relocate from your current location?",
    value: "YES",
  },
  { label: "Are you open to joining an early-stage startup?", value: "YES" },
  { label: "Are you Differently Abled?", value: "NO" },
  { label: "Are you suffering from any medical problem?", value: "YES" },
  { label: "Willingness to Travel", value: "YES" },
  { label: "Languages", value: "English, Hindi" },
];

const Profile = () => {
  const { user } = useAuthStore();
  const experienceData = [
    {
      id: 1,
      title: `${user?.WorkingDetails?.designation}`,
      company: `${user?.WorkingDetails?.companyName}`,
      type: "Full-time",
      typeBgColor: "bg-[#e1e5ff]",
      duration: `${formatToMonthYear(
        user?.WorkingDetails?.startDate
      )} - ${formatToMonthYear(
        user?.WorkingDetails?.endDate
      )} · ${getDurationBetweenDates(
        user?.WorkingDetails?.startDate,
        user?.WorkingDetails?.endDate
      )}`,
    },
  ];

  const professionalDetails = [
    { label: "Aadhar Number", value: `${user?.aadharNumber}` },
    { label: "Pan Card Number", value: `${user?.panCardNumber}` },
    { label: "Bank account", value: `${user?.bankAccountNumber}` },
    { label: "IFSC Code", value: `${user?.bankIFSCCode}` },
    { label: "Branch Name", value: `${user?.branchName}` },
    { label: "Expertise Level", value: `${user?.expertiseLevel?.join(", ")}` },
    { label: "Linkedin", value: `${user?.linkedin}` },
    {
      label: "Total Experience(in years)",
      value: `${user?.totalYearsExperience} Years`,
    },
    {
      label: "Total Experience(in months)",
      value: `${user?.totalMonthsExperience} Months`,
    },
  ];
  const infoCards = [
    {
      id: "location",
      label: "Location",
      content: [
        {
          type: "text",
          value: `${user?.currentAddress}`,
        },
      ],
    },
    {
      id: "employment",
      label: "Current Employment",
      content: [
        {
          type: "text",
          value: `${user?.WorkingDetails?.designation}`,
        },
        {
          type: "company",
          name: `${user?.WorkingDetails?.companyName}`,
        },
      ],
    },
    {
      id: "resume",
      label: "Resume",
      content: [
        {
          type: "file",
          icon: "/file-plus.svg",
          name: "Resume.pdf",
          value: `${user?.resume}`,
        },
      ],
    },
    {
      id: "contact",
      label: "Contact Information",
      content: [
        {
          type: "phone",
          icon: (
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
          ),
          value: `${user?.phoneNumber}`,
        },
        {
          type: "email",
          icon: (
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
          ),
          value: `${user?.email}`,
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col w-full gap-[24px]">
      <Navbar onlySupport={false} />
      <div className="flex flex-col w-full mx-auto items-start gap-9 pt-[120px] pb-[47px] px-12 relative bg-white">
        <img
          className="absolute top-0 left-0 w-full h-[186px] object-cover rounded-t-[16px]"
          alt="Image"
          src="/Group_1000005865.jpg"
        />

        <Card className="relative w-full bg-white rounded-[14px] border border-solid border-[#d1d1d1] shadow-[6px_6px_54px_#0000000d]">
          <CardContent className="flex items-center gap-2.5 pl-[210px] pr-10 py-5">
            <img
              className="absolute top-[-21px] left-10 w-[122px] h-[122px] rounded-full border-2 border-solid border-white object-cover"
              alt={user?.name}
              src={user?.profileImage}
            />

            <div className="flex flex-col items-start gap-1.5 flex-1">
              <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-black text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] [font-style:var(--sub-heading-font-style)]">
                {user?.name}
              </h2>
            </div>

            <Button className="h-auto bg-black text-white rounded-lg px-3 py-2 gap-1 hover:bg-black/90">
              <span className="[font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[-0.39px] leading-[19.5px]">
                Edit Your Profile
              </span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
        <section className="flex items-start gap-[29px] w-full">
          {infoCards.map((card) => (
            <Card
              key={card.id}
              className={`${
                card.id === "contact" ? "flex-1" : "inline-flex"
              } flex-col items-center justify-center gap-[18px] px-6 py-4 bg-white rounded-lg border border-solid border-[#dadada] shadow-[0px_1px_2px_#00000008] h-[116px]`}
            >
              <CardContent className="inline-flex flex-col items-start justify-center gap-1.5 p-0">
                <div className="relative w-fit mt-[-1.00px] font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[#818181] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap [font-style:var(--input-field-app-font-style)]">
                  {card.label}
                </div>

                {card.content.map((item, index) => {
                  if (item.type === "text") {
                    return (
                      <div
                        key={index}
                        className="w-fit font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap relative text-[#171923] [font-style:var(--input-field-app-font-style)]"
                      >
                        {item.value}
                      </div>
                    );
                  }

                  if (item.type === "company") {
                    return (
                      <div
                        key={index}
                        className="inline-flex items-center gap-3 relative flex-[0_0_auto]"
                      >
                        <div className="relative w-fit mt-[-1.00px] font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[#141414] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap [font-style:var(--input-field-app-font-style)]">
                          {item.name}
                        </div>
                      </div>
                    );
                  }

                  if (item.type === "file") {
                    const fileName = item?.value?.split("/").pop();
                    const handleDownload = () => {
                      if (!item?.value) return;
                      const link = document.createElement("a");
                      link.href = item?.value;
                      link.target = "_blank";
                      link.download = fileName || `${key}.pdf`; // default filename fallback
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    };
                    return (
                      <div
                        onClick={handleDownload}
                        key={index}
                        className="cursor-pointer inline-flex items-center gap-3 px-5 py-3 relative flex-[0_0_auto] bg-neutral-100 rounded-lg"
                      >
                        <div className="relative w-fit mt-[-1.00px] font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[#141414] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap [font-style:var(--input-field-app-font-style)]">
                          Resume.pdf
                        </div>
                      </div>
                    );
                  }

                  if (item.type === "phone" || item.type === "email") {
                    return (
                      <div
                        key={index}
                        className="inline-flex items-center gap-3 relative flex-[0_0_auto]"
                      >
                        {item.icon}
                        <div className="relative w-fit mt-[-1.00px] font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[#141414] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap [font-style:var(--input-field-app-font-style)]">
                          {item.value}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </CardContent>
            </Card>
          ))}
        </section>
        <section className="flex items-start gap-6 w-full">
          <div className="flex flex-col w-[571px] gap-9">
            <Card className="bg-white rounded-lg border border-solid border-[#dadada] shadow-[0px_1px_2px_#00000008]">
              <CardContent className="flex flex-col gap-[18px] p-6">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] text-[#171923] [font-style:var(--sub-heading-font-style)]">
                    Professional Experience
                  </h2>
                </div>

                <Separator className="bg-[#dadada]" />

                <div className="flex flex-col gap-[21px]">
                  {experienceData.map((experience) => (
                    <div
                      key={experience.id}
                      className="flex items-center gap-5 p-3 rounded-lg overflow-hidden border border-solid border-[#dadada]"
                    >
                      <div className="flex flex-col flex-1">
                        <div className="font-body-text font-[number:var(--body-text-font-weight)] text-[#141414] text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] whitespace-nowrap [font-style:var(--body-text-font-style)]">
                          {experience.title}
                        </div>

                        <div className="inline-flex items-center gap-2">
                          <div className="font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[#141414] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap [font-style:var(--input-field-app-font-style)]">
                            {experience.company}
                          </div>
                        </div>
                      </div>

                      <div className="[font-family:'Inter',Helvetica] font-medium text-[#adadad] text-sm tracking-[-0.28px] leading-6 whitespace-nowrap">
                        {experience.duration}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  {professionalDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-[106px] px-0 py-4 border-t border-b border-solid border-[#e5e8eb] -mt-px first:mt-0"
                    >
                      <div className="w-[186px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#6b7582] text-sm tracking-[0] leading-[21px]">
                        {detail.label}
                      </div>

                      <div className="w-[186px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#121417] text-sm tracking-[0] leading-[21px]">
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col flex-1 gap-9">
            <Card className="bg-white rounded-lg border border-solid border-[#dadada] shadow-[0px_1px_2px_#00000008]">
              <CardContent className="flex flex-col gap-[18px] p-6">
                <div className="flex flex-col gap-3">
                  <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] text-[#171923] [font-style:var(--sub-heading-font-style)]">
                    Skills
                  </h2>

                  <div className="flex flex-wrap items-center gap-[12px]">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px] bg-[#f6f6f6] rounded-md overflow-hidden border-0 hover:bg-[#f6f6f6]"
                      >
                        <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[#5f5f5f] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                          {skill}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] text-[#171923] [font-style:var(--sub-heading-font-style)]">
                    About Me
                  </h2>

                  <p className="font-body-text font-[number:var(--body-text-font-weight)] text-[#808080] text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)]">
                    I&#39;m a Product Designer based in Melbourne, Australia. I
                    specialise in UX/UI design, brand strategy, and Webflow
                    development. I&#39;m always striving to grow and leam
                    something new and I don&#39;t take myself too seriously.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] text-[#171923] [font-style:var(--sub-heading-font-style)]">
                    Education
                  </h2>
                </div>

                <div className="flex flex-col gap-[21px]">
                  {user?.education?.map((education) => (
                    <div
                      key={education._id}
                      className="flex items-center gap-5 p-3 rounded-lg overflow-hidden border border-solid border-[#dadada]"
                    >
                      <div className="flex flex-col flex-1">
                        <div className="font-body-text font-[number:var(--body-text-font-weight)] text-[#141414] text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] whitespace-nowrap [font-style:var(--body-text-font-style)]">
                          {education.institution}
                        </div>

                        <div className="[font-family:'Inter',Helvetica] font-medium text-[#adadad] text-sm tracking-[-0.28px] leading-6 whitespace-nowrap">
                          {formatToMonthYear(education.startDate)} -
                          {formatToMonthYear(education.endDate)} ·
                          {getDurationBetweenDates(
                            education.startDate,
                            education.endDate
                          )}
                        </div>
                      </div>

                      <div className="font-input-field-app font-[number:var(--input-field-app-font-weight)] text-[#141414] text-[length:var(--input-field-app-font-size)] tracking-[var(--input-field-app-letter-spacing)] leading-[var(--input-field-app-line-height)] whitespace-nowrap [font-style:var(--input-field-app-font-style)]">
                        {education.degree.replace(/^./, (c) => c.toUpperCase())}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] text-[#171923] [font-style:var(--sub-heading-font-style)]">
                    Certifications
                  </h2>
                </div>

                <div className="flex flex-col gap-[21px]">
                  {user?.certificates?.map((certification) => (
                    <div
                      key={certification._id}
                      className="flex items-center gap-5 p-3 rounded-lg overflow-hidden border border-solid border-[#dadada]"
                    >
                      <div className="flex flex-col flex-1">
                        <div className="font-body-text font-[number:var(--body-text-font-weight)] text-[#141414] text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] whitespace-nowrap [font-style:var(--body-text-font-style)]">
                          {certification.title}
                        </div>

                        <div className="[font-family:'Inter',Helvetica] font-medium text-[#adadad] text-sm tracking-[-0.28px] leading-6 whitespace-nowrap">
                          {formatToMonthYear(certification.issueDate)} -
                          {formatToMonthYear(certification.expiryDate)} ·
                          {getDurationBetweenDates(
                            certification.issueDate,
                            certification.expiryDate
                          )}
                        </div>
                      </div>

                      <ExternalLinkIcon className="w-6 h-6 text-[#141414]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="flex flex-wrap items-start gap-[51px] w-full">
          <div className="flex flex-col items-start gap-9 flex-1">
            <Card className="w-full bg-white rounded-lg border border-solid border-[#dadada] shadow-[0px_1px_2px_#00000008]">
              <CardContent className="flex flex-col items-start gap-[18px] p-6">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="font-sub-heading font-[number:var(--sub-heading-font-weight)] text-[length:var(--sub-heading-font-size)] tracking-[var(--sub-heading-letter-spacing)] leading-[var(--sub-heading-line-height)] text-[#171923] [font-style:var(--sub-heading-font-style)]">
                    Additional Information
                  </h2>
                </div>

                <div className="flex flex-col items-start w-full">
                  {additionalInfoData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-[106px] px-0 py-4 w-full border-t border-b border-solid border-[#e5e8eb] -mt-px first:mt-0"
                    >
                      <div className="w-[306px] text-[#6b7582] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm tracking-[0] leading-[21px]">
                        {item.label}
                      </div>
                      <div className="flex-1 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#121417] text-sm tracking-[0] leading-[21px]">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
