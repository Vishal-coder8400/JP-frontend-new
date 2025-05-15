export const KycVerificationDetails = [
  {
    name: "cancelChequeUpload",
    label: "",
    placeholder: "Cancel Cheque Upload",
    componentType: "file",
    type: "file",
  },
  {
    name: "panDetails.number",
    label: "PAN Card Details",
    placeholder: "PAN Card Number",
    componentType: "input",
    type: "text",
  },
  {
    name: "panCardUpload",
    label: "",
    placeholder: "PAN Card Upload",
    componentType: "file",
    type: "file",
  },
  {
    name: "aadharDetails.number",
    label: "Aadhar Card Details",
    placeholder: "Aadhar Card Number",
    componentType: "input",
    type: "text",
  },
  {
    name: "aadharCardUpload",
    label: "",
    placeholder: "Aadhar Card Upload",
    componentType: "file",
    type: "file",
  },
  {
    name: "bankDetails.accountNumber",
    label: "Bank Details",
    placeholder: "Account Number",
    componentType: "input",
    type: "text",
  },
  {
    name: "bankDetails.accountHolderName",
    label: "",
    placeholder: "Account's Holder Name",
    componentType: "input",
    type: "text",
  },
  {
    row: [
      {
        name: "bankDetails.bankName",
        label: "",
        placeholder: "Branch Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "bankDetails.ifscCode",
        label: "",
        placeholder: "IFSC Code",
        componentType: "input",
        type: "text",
      },
    ],
  },
];

export const basicInformation = [
  {
    row: [
      {
        name: "firstName",
        label: "First Name",
        placeholder: "e.g. Jason Wild",
        componentType: "input",
        type: "text",
        width: "2/3",
      },
      {
        name: "lastName",
        label: "Last Name",
        placeholder: "e.g. Jason Wild",
        componentType: "input",
        type: "text",
        width: "2/3",
      },
      {
        name: "profileImage",
        label: "",
        placeholder: "Profile Picture",
        componentType: "file",
        type: "file",
        width: "1/3",
      },
    ],
  },

  {
    name: "phone.number",
    label: "Contact Information",
    placeholder: "Ex. XXXXX XXXXX",
    componentType: "phone",
    type: "number",
    width: "full",
  },
  {
    name: "currentAddress.address",
    label: "Current Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
  },
  {
    row: [
      {
        name: "currentAddress.city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        width: "1/3",
      },
      {
        name: "currentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
      },
    ],
  },
  {
    name: "permanentAddress.address",
    label: "Permanent Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
  },
  {
    row: [
      {
        name: "permanentAddress.city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        width: "1/3",
      },
      {
        name: "permanentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
      },
    ],
  },
];
export const recruiterSignUp = [
  {
    name: "email",
    label: "Recruiter E-mail",
    placeholder: "Enter your e-mail",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Enter Password",
    placeholder: "********",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "********",
    componentType: "input",
    type: "password",
  },
];

export const CandidateFormFields = [
  {
    row: [
      {
        name: "candidateName",
        label: "Candidate Name",
        placeholder: "e.g. Jason Wild",
        componentType: "input",
        type: "text",
      },
      {
        name: "profilePicture",
        label: "",
        placeholder: "Profile Picture",
        componentType: "file",
        type: "file",
      },
    ],
  },
  {
    name: "phoneNumber",
    label: "Contact Information",
    placeholder: "Ex. XXXXX XXXXX",
    componentType: "phone", // Custom component with country code
    type: "tel",
  },
  {
    name: "email",
    label: "",
    placeholder: "E-mail ID",
    componentType: "input",
    type: "email",
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Tell us about you",
    componentType: "textarea",
  },
  {
    name: "primaryAddress",
    label: "Address",
    placeholder: "Enter Primary Address",
    componentType: "input",
    type: "text",
  },
  {
    row: [
      {
        name: "city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
      },
      {
        name: "pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    name: "languages",
    label: "Languages",
    placeholder: "Select all the languages you speak",
    componentType: "select",
    options: [], // Fill this dynamically
  },
  {
    name: "sector",
    label: "Current Sector",
    placeholder: "IT or Non-IT",
    componentType: "select",
    options: [
      { id: "it", label: "IT" },
      { id: "non-it", label: "NON-IT" },
    ],
  },
];
export const candidateForm1 = [
  {
    name: "cancelChequeUpload",
    label: "",
    placeholder: "Cancel Cheque Upload",
    componentType: "file",
    type: "file",
    collapsible: true,
  },
  {
    name: "aadharCardNumber",
    label: "",
    placeholder: "Aadhar Card Number",
    componentType: "file",
    type: "file",
    collapsible: true,
  },
  {
    name: "panCardUpload",
    label: "",
    placeholder: "PAN Card Upload",
    componentType: "file",
    type: "file",
    collapsible: true,
  },
  {
    name: "accountNumber",
    label: "Account Number",
    placeholder: "Account Number",
    componentType: "input",
    type: "number",
  },
  {
    row: [
      {
        name: "branchName",
        label: "Branch Name",
        placeholder: "Branch Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "ifscCode",
        label: "IFSC Code",
        placeholder: "IFSC Code",
        componentType: "input",
        type: "text",
      },
    ],
  },
];
export const educationFields = [
  {
    name: "institution",
    placeholder: "Enter the name",
    componentType: "input",
    type: "text",
    label: "Institution",
  },
  {
    name: "location",
    placeholder: "Location",
    componentType: "select",
    label: "Location",
    type: "text",
    options: [
      // Example options, add as needed
      { id: "delhi", label: "Delhi" },
      { id: "mumbai", label: "Mumbai" },
    ],
  },
  {
    name: "fieldOfStudy",
    placeholder: "Eg. Bachelor of Design",
    componentType: "input",
    type: "text",
    label: "Field of Study",
  },
  {
    row: [
      {
        label: "Starting Year",
        name: "startYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
      {
        label: "Ending Year",
        name: "endYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
    ],
  },
];
export const academicsAchievementFields = [
  {
    name: "title",
    placeholder: "Enter Title",
    componentType: "input",
    type: "text",
    label: "Title",
  },
  {
    name: "issuer",
    placeholder: "Enter Issuer",
    componentType: "input",
    label: "Issuer",
    type: "text",
  },
  {
    name: "startYear",
    placeholder: "Select Date",
    componentType: "calendar",
  },
];
export const professionFields = [
  {
    name: "location",
    placeholder: "Frontline, Mid-Level, Expert",
    componentType: "select",
    label: "Experience Level",
    type: "text",
    options: [
      // Example options, add as needed
      { id: "delhi", label: "Delhi" },
      { id: "mumbai", label: "Mumbai" },
    ],
  },
  {
    name: "currentSector",
    placeholder: "IT or Non-IT",
    componentType: "select",
    label: "IT or Non-IT",
    type: "text",
    options: [
      // Example options, add as needed
      { id: "delhi", label: "Delhi" },
      { id: "mumbai", label: "Mumbai" },
    ],
  },
  {
    name: "linkedInProfile",
    placeholder: "Enter URL",
    componentType: "input",
    label: "LinkedIn Profile",
    type: "text",
  },
  {
    name: "workExperience",
    placeholder: "Position in Last Organization",
    componentType: "input",
    label: "Work Experience",
    type: "text",
  },
  {
    name: "employmentType",
    placeholder: "Employment Type",
    componentType: "select",
    label: "Employment Type",
    type: "text",
    options: [
      // Example options, add as needed
      { id: "delhi", label: "Delhi" },
      { id: "mumbai", label: "Mumbai" },
    ],
  },
  {
    row: [
      {
        label: "Starting Year",
        name: "startYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
      {
        label: "Ending Year",
        name: "endYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
    ],
  },
  {
    name: "location",
    placeholder: "e.g., Chicago, USA",
    componentType: "input",
    label: "Location",
    type: "text",
  },
];
export const preferencesFields = [
  {
    name: "employmentType",
    placeholder: "Enter the role you’re looking for",
    componentType: "select",
    label: "Role Looking for",
    type: "text",
    options: [
      // Example options, add as needed
      { id: "delhi", label: "Delhi" },
      { id: "mumbai", label: "Mumbai" },
    ],
  },
  {
    name: "location",
    placeholder: "Top 3 Preferences",
    componentType: "input",
    label: "Preferred work location",
    type: "text",
  },
];
export const intershipsFields = [
  {
    name: "location",
    placeholder: "Position in Last Organization",
    componentType: "input",
    label: "Internship Title",
    type: "text",
  },
  {
    name: "employmentType",
    placeholder: "Employment Type",
    componentType: "select",
    label: "Employment Type",
    type: "text",
    options: [
      // Example options, add as needed
      { id: "delhi", label: "Delhi" },
      { id: "mumbai", label: "Mumbai" },
    ],
  },
  {
    row: [
      {
        label: "Starting Year",
        name: "startYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
      {
        label: "Ending Year",
        name: "endYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
    ],
  },
  {
    name: "location",
    placeholder: "e.g., Chicago, USA",
    componentType: "input",
    label: "Location",
    type: "text",
  },
];
export const projectsFields = [
  {
    name: "location",
    placeholder: "Enter Project Title",
    componentType: "input",
    label: "Project Title",
    type: "text",
  },
  {
    name: "",
    label: "Description",
    placeholder: "Enter Description",
    componentType: "textarea",
    type: "text",
  },
  {
    row: [
      {
        label: "Starting Year",
        name: "startYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
      {
        label: "Ending Year",
        name: "endYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
    ],
  },
];
export const certificatesFields = [
  {
    name: "location",
    placeholder: "Enter the name",
    componentType: "input",
    label: "Title",
    type: "text",
  },
  {
    name: "location",
    placeholder: "Enter the name",
    componentType: "input",
    label: "Issuing Organization",
    type: "text",
  },
  {
    name: "location",
    placeholder: "Enter the Credential URL",
    componentType: "input",
    label: "Credential URL",
    type: "text",
  },
  {
    row: [
      {
        label: "Starting Year",
        name: "startYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
      {
        label: "Ending Year",
        name: "endYear",
        placeholder: "Select Date",
        componentType: "calendar",
      },
    ],
  },
];
export const awardsFields = [
  {
    name: "location",
    placeholder: "Enter the name",
    componentType: "input",
    label: "Title",
    type: "text",
  },
  {
    name: "issuer",
    placeholder: "Enter Issuer",
    componentType: "input",
    label: "Issuer",
    type: "text",
  },
  {
    label: "Issue Date",
    name: "endYear",
    placeholder: "Select Date",
    componentType: "calendar",
  },
];
export const clubFields = [
  {
    name: "location",
    placeholder: "Enter the name",
    componentType: "input",
    label: "Title",
    type: "text",
  },
  {
    name: "issuer",
    placeholder: "Enter Issuer",
    componentType: "input",
    label: "Institution",
    type: "text",
  },
  {
    label: "Joining Date",
    name: "endYear",
    placeholder: "Select Date",
    componentType: "calendar",
  },
];
export const LoginFields = [
  {
    name: "email",
    placeholder: "johnsondoe@nomail.com",
    componentType: "input",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    placeholder: "********",
    componentType: "input",
    label: "Password",
    type: "password",
  },
];

export const sectoralFieldsForm = [
  {
    name: "sectorSpecialization",
    label: "Sectoral Specialization ( Select any Three )",
    componentType: "multi-select",
    max: 3,
    options: [],
  },

  {
    name: "totalExperience",
    label: "Total Years of Experience in Recruitment",
    componentType: "input",
    type: "number",
    placeholder: "e.g. 5",
  },

  {
    name: "experienceLevel",
    label: "You have expertise in (Select any two)",
    componentType: "multi-select",
    max: 2,
    options: [
      { id: "frontline", label: "Frontline Hirings" },
      { id: "midlevel", label: "Mid Level Hirings" },
      { id: "senior", label: "Senior Level Hirings" },
    ],
  },
  {
    name: "lastOrganization.name",
    label: "Last Organization Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "lastOrganization.position",
    label: "Designation in Last Organization",
    componentType: "input",
    type: "text",
  },
  {
    name: "relievingLetter",
    label: "Relieving Letter",
    componentType: "file",
    placeholder: "Upload relieving letter",
  },

  {
    name: "linkedinProfile",
    label: "LinkedIn Profile URL",
    componentType: "input",
    type: "url",
  },
];
export const sectoralFieldsForm2 = [
  {
    name: "latestQualification",
    label: "Latest Qualification Proof Document",
    componentType: "file",
    placeholder: "Upload supporting document",
  },

  {
    name: "joinReason",
    label: "Why do you want to join? (Max 30 words)",
    componentType: "textarea",
    placeholder: "Write your reason...",
  },

  {
    name: "monthlyClosures",
    label: "Average Monthly Closures in Last Assignment",
    componentType: "input",
    type: "number",
  },

  {
    name: "jobSource",
    label: "How did you come to know about this job?",
    componentType: "select",
    options: [
      { id: "social", label: "Social Media" },
      { id: "friends", label: "Friends" },
      { id: "jobPortal", label: "Job Portal" },
      { id: "colleagues", label: "Colleagues" },
    ],
    allowOther: true,
    showOtherInput: true,
    inlineOther: true,
  },

  {
    name: "fatherName",
    label: "Father's Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "motherName",
    label: "Mother's Name",
    componentType: "input",
    type: "text",
  },

  {
    name: "medicalProblem",
    label: "Any Medical Problem?",
    componentType: "select",
    options: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
    ],
  },
];
export const referenceFields = [
  {
    row: [
      {
        watkins: false,
        name: "name",
        label: "Reference",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "contactNo",
        label: "",
        placeholder: "Contact No.",
        componentType: "input",
        type: "text",
      },
      {
        name: "organization",
        label: "",
        placeholder: "Organisation",
        componentType: "input",
        type: "text",
      },
      {
        name: "designation",
        label: "",
        placeholder: "Designation",
        componentType: "input",
        type: "text",
      },
    ],
  },
];

export const candiadateCreationformControls = [
  {
    row: [
      {
        name: "name",
        label: "Candidate Name",
        componentType: "input",
        type: "text",
        placeholder: "e.g. Jason Wild",
      },
      {
        name: "profilePicture",
        label: "Profile Picture",
        componentType: "file",
        placeholder: "Upload image",
      },
    ],
  },

  {
    name: "phone",
    label: "Phone Number",
    componentType: "phone",
    placeholder: "Ex. XXXXX XXXXX",
  },
  {
    name: "email",
    label: "E-mail ID",
    componentType: "input",
    type: "email",
    placeholder: "Enter email",
  },

  {
    name: "currentAddress.address",
    label: "Current Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
  },
  {
    row: [
      {
        name: "currentAddress.city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        width: "1/3",
      },
      {
        name: "currentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "number",
        width: "1/3",
      },
    ],
  },
  {
    name: "permanentAddress.address",
    label: "Permanent Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
  },
  {
    row: [
      {
        name: "permanentAddress.city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        width: "1/3",
      },
      {
        name: "permanentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "number",
        width: "1/3",
      },
    ],
  },
  {
    name: "gender",
    label: "Gender",
    componentType: "select",
    placeholder: "Select gender",
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
    ],
    allowOther: true,
    showOtherInput: true,
    inlineOther: true,
  },
];
export const highestQualification = [
  {
    name: "degree",
    label: "Highest Qualification",
    placeholder: "e.g B.Tech",
    componentType: "input",
    type: "text",
  },
  {
    row: [
      {
        name: "startDate",
        label: "Starting Year",
        componentType: "calendar",
      },
      {
        name: "endDate",
        label: "Ending Year",
        componentType: "calendar",
      },
    ],
  },
];

export const releventCandidateProfessionalDetails = [
  {
    name: "experienceLevel",
    label: "Experience Level",
    componentType: "select",
    placeholder: "Frontline, Mid-Level, Expert",
    options: [
      { id: "frontline", label: "Frontline" },
      { id: "midlevel", label: "Mid-Level" },
      { id: "expert", label: "Expert" },
    ],
  },
  {
    name: "currentIndustry",
    label: "Current Sector",
    componentType: "select",
    placeholder: "IT or Non-IT",
    options: [
      { id: "it", label: "IT" },
      { id: "non-it", label: "Non-IT" },
    ],
  },
  {
    label: "Total Experience",
    row: [
      {
        name: "totalExperience",
        label: "Years",
        componentType: "select",
        options: Array.from({ length: 31 }, (_, i) => ({
          id: i.toString(),
          label: `${i} Year${i === 1 ? "" : "s"}`,
        })),
        forceNumber: true,
      },
      {
        name: "totalExperienceInMonth",
        label: "Months",
        componentType: "select",
        options: Array.from({ length: 12 }, (_, i) => ({
          id: i.toString(),
          label: `${i} Month${i === 1 ? "" : "s"}`,
        })),
        forceNumber: true,
      },
    ],
  },
  {
    name: "lastPosition",
    label: "Work Experience",
    componentType: "input",
    type: "text",
    placeholder: "Position in Last Organization",
  },
  {
    name: "currentPosition",
    label: "Current Organisation",
    componentType: "input",
    type: "text",
    placeholder: "Position in Last Organization",
  },
];
export const releventCandidateSalary = [
  {
    row: [
      {
        name: "currentSalary",
        label: "Annual Current Salary / CTC",
        placeholder: "e.g., 7.5 Lakhs",
        componentType: "input",
        type: "number",
      },
      {
        name: "expectedSalary",
        label: "Expected Salary / CTC",
        placeholder: "e.g., 9 Lakhs",
        componentType: "input",
        type: "number",
      },
    ],
  },
];
