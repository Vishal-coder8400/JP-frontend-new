import { LANGUAGES, INDUSTRIES, CITIES } from "@/constants/super-admin";

const makeFieldsOptional = (fields) =>
  fields.map((field) => {
    if (field.row) {
      return {
        ...field,
        row: field.row.map((f) => ({ ...f, required: false })),
      };
    }
    return { ...field, required: false };
  });

export const editCandidateBasicDetails = [
  {
    row: [
      {
        name: "name",
        label: "Full Name",
        componentType: "input",
        type: "text",
        placeholder: "Enter your full name",
        required: false,
      },
      {
        name: "profilePicture",
        label: "Profile Picture",
        componentType: "file",
        accept: "image",
        placeholder: "Upload profile picture",
        required: false,
      },
    ],
  },
  {
    name: "birthDate",
    label: "Date of Birth",
    componentType: "calendar",
    placeholder: "Select your date of birth",
    required: false,
  },
  {
    name: "phone",
    label: "Phone Number",
    componentType: "phone",
    placeholder: "Enter your phone number",
    required: false,
  },
  {
    name: "email",
    label: "Email Address",
    componentType: "input",
    type: "email",
    placeholder: "Enter your email address",
    required: false,
  },
  {
    name: "about",
    label: "About Me",
    componentType: "textarea",
    placeholder: "Write a brief description about yourself",
    required: false,
  },
  {
    name: "currentAddress.address",
    label: "Current Address",
    componentType: "textarea",
    placeholder: "Enter your current address",
    required: false,
  },
  {
    row: [
      {
        name: "currentAddress.city",
        label: "",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city",
        required: false,
      },
      {
        name: "currentAddress.state",
        label: "",
        componentType: "input",
        type: "text",
        placeholder: "Enter your State",
        required: false,
      },
      {
        name: "currentAddress.pincode",
        label: "",
        componentType: "input",
        type: "text",
        placeholder: "Enter your pincode",
        required: false,
      },
    ],
  },
  {
    name: "gender",
    label: "Gender",
    componentType: "select",
    placeholder: "Select your gender",
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
      { id: "other", label: "Other" },
    ],
    required: false,
  },
];

export const editCandidateEducation = [
  {
    name: "institution",
    label: "Institution",
    componentType: "input",
    type: "text",
    placeholder: "Enter institution name",
    required: false,
  },
  {
    name: "degree",
    label: "Degree",
    componentType: "select",
    placeholder: "Select degree",
    required: false,
    options: [
      { id: "highschool", label: "High School" },
      { id: "diploma", label: "Diploma" },
      { id: "associate", label: "Associate Degree" },
      { id: "bachelor", label: "Bachelor's Degree" },
      { id: "master", label: "Master's Degree" },
      { id: "doctorate", label: "Doctorate/PhD" },
      { id: "other", label: "Other" },
    ],
  },
  {
    name: "fieldOfStudy",
    label: "Field of Study",
    componentType: "input",
    type: "text",
    placeholder: "e.g., Computer Science",
    required: false,
  },
  {
    row: [
      {
        name: "startDate",
        label: "Start Date",
        componentType: "monthYear",
        placeholder: "Select start date",
        required: false,
      },
      {
        name: "endDate",
        label: "End Date",
        componentType: "monthYear",
        placeholder: "Select end date",
        required: false,
      },
    ],
  },
  {
    name: "grade",
    label: "Grade/GPA",
    componentType: "input",
    type: "text",
    placeholder: "e.g., 3.8/4.0 or 85%",
    required: false,
  },
];

export const editCandidateWorkExperience = [
  {
    name: "companyName",
    label: "Company Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter company name",
    required: false,
  },
  {
    name: "position",
    label: "Position",
    componentType: "input",
    type: "text",
    placeholder: "e.g., Software Engineer",
    required: false,
  },
  {
    name: "employmentType",
    label: "Employment Type",
    componentType: "select",
    placeholder: "Select employment type",
    required: false,
    options: [
      { id: "full-time", label: "Full-time" },
      { id: "part-time", label: "Part-time" },
      { id: "contract", label: "Contract" },
      { id: "internship", label: "Internship" },
      { id: "freelance", label: "Freelance" },
    ],
  },
  {
    row: [
      {
        name: "startingYear",
        label: "Starting Year",
        componentType: "monthYear",
        placeholder: "Select start date",
        required: false,
      },
      {
        name: "endingYear",
        label: "Ending Year",
        componentType: "monthYear",
        placeholder: "Select end date",
        required: false,
      },
    ],
  },
  {
    name: "description",
    label: "Job Description",
    componentType: "textarea",
    placeholder: "Describe your role and responsibilities",
    required: false,
  },
];

export const editCandidateWorkExperienceSummary = [
  {
    name: "totalExperience",
    label: "Total Experience",
    componentType: "input",
    type: "text",
    placeholder: "e.g., 2 years 6 months",
    required: false,
  },
  {
    name: "skillSet",
    label: "Skills",
    componentType: "multi-select",
    max: 10,
    options: [],
    required: false,
  },
];

export const editCandidateRoleExpertise = [
  {
    name: "roleLookingFor",
    label: "Role Looking For",
    componentType: "input",
    type: "text",
    placeholder: "e.g., Software Engineer",
    required: false,
  },
  {
    name: "currentIndustry",
    label: "Current Industry",
    componentType: "select",
    placeholder: "Select current industry",
    required: false,
    options: INDUSTRIES,
  },
  {
    name: "areaOfExpertise",
    label: "Area of Expertise",
    componentType: "multi-select",
    placeholder: "Select areas of expertise",
    max: 5,
    options: INDUSTRIES,
    required: false,
  },
  {
    name: "functionalAreas",
    label: "Functional Areas",
    componentType: "multi-select",
    placeholder: "Select functional areas",
    max: 5,
    options: INDUSTRIES,
    required: false,
  },
  {
    name: "location",
    label: "Preferred Work Location",
    componentType: "multi-select",
    placeholder: "Select preferred locations",
    options: CITIES,
    required: false,
  },
];

export const editCandidateAdditionalDetails = [
  {
    name: "maritalStatus",
    label: "Marital Status",
    componentType: "selection",
    options: [
      { id: "single", label: "Single" },
      { id: "married", label: "Married" },
    ],
    required: false,
  },
  {
    name: "handleTeam",
    label: "Can you handle a team?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
  {
    name: "earlyStageStartup",
    label: "Are you open to early stage startup opportunities?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
  {
    name: "differentlyAbled",
    label: "Are you differently-abled?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
  {
    name: "medicalProblem",
    label: "Do you have any medical problems?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
];

export const editCandidateAdditionalDetails2 = [
  {
    name: "willingTo6DayWork",
    label: "Are you willing to work 6 days a week?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
  {
    name: "willingToRelocate",
    label: "Are you willing to relocate from your current location?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
  {
    name: "noticePeriod",
    label: "Notice Period",
    componentType: "select",
    placeholder: "Select notice period",
    required: false,
    options: [
      { id: "immediate", label: "Immediate" },
      { id: "15days", label: "15 Days" },
      { id: "1month", label: "1 Month" },
      { id: "2months", label: "2 Months" },
      { id: "3months", label: "3 Months" },
    ],
  },
  {
    row: [
      {
        name: "currentSalary",
        label: "Current Salary (Annual)",
        componentType: "input",
        type: "number",
        placeholder: "Current salary",
        required: false,
      },
      {
        name: "expectedSalary",
        label: "Expected Salary (Annual)",
        componentType: "input",
        type: "number",
        placeholder: "Expected salary",
        required: false,
      },
    ],
  },
];

export const editCandidateAdditionalDetails3 = [
  {
    name: "willingToTravel",
    label: "Willingness to Travel",
    componentType: "selection",
    placeholder: "Select",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: false,
  },
  {
    name: "languages",
    label: "Languages",
    componentType: "multi-select",
    options: LANGUAGES,
    placeholder: "Select all the languages you speak",
    required: false,
  },
];

export const editCandidateCertifications = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter certificate title",
    required: false,
  },
  {
    name: "issuingOrganization",
    label: "Issuing Organization",
    componentType: "input",
    type: "text",
    placeholder: "Enter issuing organization",
    required: false,
  },
  {
    name: "issueDate",
    label: "Issue Date",
    componentType: "monthYear",
    placeholder: "Select issue date",
    required: false,
  },
  {
    name: "expirationDate",
    label: "Expiration Date",
    componentType: "monthYear",
    placeholder: "Select expiration date (if applicable)",
    required: false,
  },
  {
    name: "credentialID",
    label: "Credential ID",
    componentType: "input",
    type: "text",
    placeholder: "Enter credential ID",
    required: false,
  },
  {
    name: "credentialURL",
    label: "Credential URL",
    componentType: "input",
    type: "url",
    placeholder: "Enter credential URL",
    required: false,
  },
];
