export const KycVerificationDetails = [
  {
    name: "cancelChequeUpload",
    label: "",
    placeholder: "Cancel Cheque Upload",
    componentType: "file",
    type: "file",
    formats: "JPG, PNG, PDF.",
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
    formats: "JPG, PNG, PDF.",
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
    formats: "JPG, PNG, PDF.",
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
      {
        name: "bankDetails.accountType",
        label: "",
        placeholder: "Account Type",
        componentType: "select",
        options: [
          { id: "saving", label: "Saving" },
          { id: "current", label: "Current" },
        ],
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
        formats: "JPG, PNG, PDF.",
      },
    ],
  },

  {
    name: "phone",
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
        name: "currentAddress.state",
        label: "",
        placeholder: "Enter State",
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
    formats: "JPG, PNG, PDF.",
  },

  {
    name: "linkedinProfile",
    label: "LinkedIn Profile URL",
    componentType: "input",
    type: "url",
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
        name: "permanentAddress.state",
        label: "",
        placeholder: "Enter State",
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
export const sectoralFieldsForm2 = [
  {
    name: "",
    label: "Latest Qualification",
    componentType: "input",
    placeholder: "Experience",
    width: "2/4",
  },
  {
    name: "latestQualification",
    label: "",
    componentType: "file",
    placeholder: "Upload supporting document",
    formats: "JPG, PNG, PDF.",
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
      { id: "Social Media", label: "Social Media" },
      { id: "Friends", label: "Friends" },
      { id: "Job portal", label: "Job Portal" },
      { id: "Colleagues", label: "Colleagues" },
      { id: "Other", label: "Other" },
    ],
    allowOther: false,
    showOtherInput: false,
    inlineOther: false,
    placeholder: "Select",
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
    name: "hasMedicalProblem",
    label: "Any Medical Problem?",
    componentType: "select",
    options: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
    ],
    placeholder: "select",
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
        formats: "JPG, PNG, PDF.",
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
    label: "",
    row: [
      {
        name: "totalExperience",
        label: "Total Experience",
        componentType: "select",
        options: Array.from({ length: 31 }, (_, i) => ({
          id: i.toString(),
          label: `${i} Year${i === 1 ? "" : "s"}`,
        })),

        placeholder: "Select",
      },
      {
        name: "totalExperienceInMonth",
        label: "",
        componentType: "select",
        options: Array.from({ length: 12 }, (_, i) => ({
          id: i.toString(),
          label: `${i} Month${i === 1 ? "" : "s"}`,
        })),
        placeholder: "Select",
      },
    ],
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
export const workingExperience = [
  {
    name: "companyName",
    label: "Work Experience",
    placeholder: "e.g Company Name",
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
export const basicCorporateInformation = [
  {
    row: [
      {
        name: "basicInformation.companyName",
        label: "Company Name",
        placeholder: "e.g. Google",
        componentType: "input",
        type: "text",
        width: "2/3",
      },
      {
        name: "basicInformation.companyLogo",
        label: "Company Logo",
        placeholder: "",
        componentType: "file",
        type: "file",
        width: "1/3",
        formats: "JPG, PNG, PDF.",
      },
    ],
  },
  {
    name: "basicInformation.companyContactNumber",
    label: "Company Contact Number",
    placeholder: "Ex. XXXXX XXXXX",
    componentType: "phone",
    type: "number",
    width: "full",
  },
  {
    name: "basicInformation.companyEmail",
    label: "Company Email Id",
    placeholder: "Enter your Email Id",
    componentType: "input",
    type: "email",
    width: "full",
  },
  {
    name: "basicInformation.password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    width: "full",
  },
  {
    name: "basicInformation.confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    componentType: "input",
    type: "password",
    width: "full",
  },
];
export const basicInformationControls = [
  {
    name: "basicInformation.websiteURL",
    label: "Website URL",
    componentType: "input",
    type: "text",
    placeholder: "Enter Website URL",
  },
  {
    name: "basicInformation.companyType",
    label: "Company Type",
    componentType: "select",
    placeholder: "Select a type",
    options: [
      { id: "privateCompany", label: "Private company" },
      { id: "proprietorship", label: "Proprietorship" },
      { id: "individual", label: "Individual" },
    ],
  },
];
export const spocInformationControls = [
  {
    name: "spocInformation.fullName",
    label: "Full Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Full Name", // Adjusted to a more appropriate placeholder
  },
  {
    name: "spocInformation.contactNumber",
    label: "Contact Number",
    componentType: "phone",
    placeholder: "Ex. XXXXXXXXXX",
  },
  {
    name: "spocInformation.email",
    label: "Email ID",
    componentType: "input",
    type: "email",
    placeholder: "Enter the Email id",
  },
];
export const corporateFormControls = [
  {
    label: "Current Address",
    name: "currentAddress",
    placeholder: "Enter Permanent Address",
    componentType: "textarea",
  },
  {
    row: [
      {
        label: "",
        name: "city",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
      },
      {
        label: "",
        name: "state",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
      },
      {
        label: "",
        name: "pincode",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    label: "Industry Type",
    name: "industryType",
    placeholder: "Select a type",
    componentType: "select",
    options: [
      { id: "manufacturing", label: "Manufacturing" },
      { id: "services", label: "Services" },
      { id: "trading", label: "Trading" },
      { id: "other", label: "Other" },
    ],
  },
  {
    row: [
      {
        label: "PAN Card No.",
        name: "panCardNumber",
        placeholder: "Enter PAN Card Number",
        componentType: "input",
        type: "text",
        value: "MBBPS6808E", // Pre-filled as per screenshot
      },
      {
        label: "",
        name: "panCardFile",
        placeholder: "Upload PAN",
        componentType: "file",
        formats: "JPG, PNG, PDF.",
      },
    ],
  },
  {
    label: "GSTIN",
    name: "gstin",
    placeholder: "Enter GSTIN",
    componentType: "input",
    type: "text",
    value: "42AALCA2030B01830", // Pre-filled as per screenshot
  },
];
export const formControlsBankDetails = [
  {
    label: "Bank Name",
    name: "bankName",
    placeholder: "Enter Bank Name",
    componentType: "input",
    type: "text",
  },
  {
    label: "Bank Account No.",
    name: "bankAccountNumber",
    placeholder: "Account No.",
    componentType: "input",
    type: "text",
  },
  {
    label: "IFSC Code",
    name: "ifscCode",
    placeholder: "IFSC Code",
    componentType: "input",
    type: "text",
  },
  {
    label: "Cancel Cheque / Account Statement",
    name: "chequeOrStatementFile",
    placeholder: "Upload Cheque / Statement",
    componentType: "file",
    formats: "JPG, PNG, PDF.",
  },
];
export const formControlsForIndividual = [
  {
    label: "Current Address",
    name: "currentAddress",
    placeholder: "Enter Permanent Address",
    componentType: "textarea",
  },
  {
    row: [
      {
        label: "City",
        name: "city",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
      },
      {
        label: "State",
        name: "state",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
      },
      {
        label: "Pincode",
        name: "pincode",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    label: "GSTIN",
    name: "gstin",
    placeholder: "Enter GSTIN",
    componentType: "input",
    type: "text",
    value: "ads1023230391830", // Pre-filled as per screenshot
  },
  {
    label: "PAN Card No.",
    name: "panCardNumber",
    placeholder: "Enter PAN Card Number",
    componentType: "input",
    type: "text",
    value: "MBBPS6808E", // Pre-filled as per screenshot
  },
  {
    label: "",
    name: "panCardFile",
    placeholder: "Upload PAN",
    componentType: "file",
    formats: "JPG, PNG, PDF.",
  },
  {
    label: "Aadhar Card No.",
    name: "aadharCardNumber",
    placeholder: "Enter Aadhar Card Number",
    componentType: "input",
    type: "text",
    value: "64271 2281 238972", // Pre-filled as per screenshot
  },
  {
    label: "",
    name: "aadharCardFile",
    placeholder: "Upload Aadhar",
    componentType: "file",
    formats: "JPG, PNG, PDF.",
  },
];
export const jobOpeningFilters = [
  {
    label: "Job Type",
    componentType: "select",
    placeholder: "Choose Job Type",
    name: "jobType",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    label: "Select Date",
    componentType: "calendar",
    placeholder: "Select Date",
    name: "sortBy",
  },
];
export const CandidatesFilters = [
  {
    label: "Application Date",
    componentType: "calendar",
    placeholder: "Application Date",
    name: "sortBy",
  },
  ,
  {
    label: "Designation",
    componentType: "multi-select",
    placeholder: "Choose Designation",
    name: "designation",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    label: "Job Location",
    componentType: "multi-select",
    placeholder: "Enter City",
    name: "jobLocation",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    label: "Gender Preference",
    componentType: "select",
    placeholder: "Select Gender",
    name: "gender",
    options: [
      {
        id: "male",
        label: "Male",
      },
      { id: "female", label: "Female" },
    ],
  },
  {
    label: "Current Organization",
    componentType: "multi-select",
    placeholder: "Enter Current Organization",
    name: "currentOrganisation",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    label: "Experience Level",
    componentType: "select",
    placeholder: "Select Experience",
    name: "experienceLevel",
    options: [
      {
        id: "male",
        label: "Male",
      },
      { id: "female", label: "Female" },
    ],
  },
  {
    label: "Department/Functional Area",
    componentType: "multi-select",
    placeholder: "Enter Functional Area",
    name: "departmentArea",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    label: "Degree",
    componentType: "multi-select",
    placeholder: "Enter Degree",
    name: "degree",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    name: "salaryRange",
    componentType: "salary-range",
    label: "Salary Range",
    min: 5,
    max: 50,
  },
  {
    label: "Notice Period",
    componentType: "select",
    placeholder: "Select Notice Period",
    name: "noticePeriod",
    options: [
      {
        id: "male",
        label: "Male",
      },
      { id: "female", label: "Female" },
    ],
  },
  {
    label: "Industry",
    componentType: "multi-select",
    placeholder: "Enter Industry",
    name: "industry",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
];
