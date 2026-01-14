export const KycVerificationDetails = [
  {
    name: "cancelChequeOrPassbookImage",
    label: "Cancel Cheque Upload",
    placeholder: "Cancel Cheque Upload",
    componentType: "file",
    type: "file",
    accept: "image",
  },
  {
    name: "panDetails.number",
    label: "PAN Card Details",
    placeholder: "PAN Card Number",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "panDetails.image",
    label: "",
    placeholder: "PAN Card Upload",
    componentType: "file",
    type: "file",
    accept: "image",
    // required: true,
  },
  {
    name: "aadharDetails.number",
    label: "Aadhar Card Details",
    placeholder: "Aadhar Card Number",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "aadharDetails.image",
    label: "",
    placeholder: "Aadhar Card Upload",
    componentType: "file",
    type: "file",
    accept: "image",
    // required: true,
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
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        placeholder: "e.g. Jason Wild",
        componentType: "input",
        type: "text",
        width: "2/3",
        required: true,
      },
      {
        name: "profileImage",
        label: "",
        placeholder: "Profile Picture",
        componentType: "file",
        type: "file",
        width: "1/3",
        accept: "image",
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
    required: true,
  },
  {
    name: "currentAddress.address",
    label: "Current Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
    required: true,
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
        required: true,
      },
      {
        name: "currentAddress.state",
        label: "",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "currentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
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
    required: true,
  },
  {
    name: "password",
    label: "Enter Password",
    placeholder: "********",
    componentType: "input",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "********",
    componentType: "input",
    type: "password",
    required: true,
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
    label: "Sectoral Specialization",
    componentType: "multi-select",
    max: 3,
    options: [],
    required: true,
  },

  {
    name: "totalExperience",
    label: "Total Years of Experience in Recruitment (In year)",
    componentType: "input",
    type: "number",
    placeholder: "e.g. 5",
    required: true,
  },

  {
    name: "experienceLevel",
    label: "You have expertise in",
    componentType: "multi-select",
    max: 2,
    options: [
      { id: "frontline", label: "Frontline Hirings" },
      { id: "midlevel", label: "Mid Level Hirings" },
      { id: "senior", label: "Senior Level Hirings" },
    ],
    required: true,
  },
  {
    name: "lastOrganization.name",
    label: "Last Organization Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter Organization Name",
    required: true,
  },
  {
    name: "lastOrganization.position",
    label: "Designation in Last Organization",
    componentType: "input",
    type: "text",
    placeholder: "Enter Designation",
    required: true,
  },
  {
    name: "relievingLetter",
    label: "Relieving Letter",
    componentType: "file",
    placeholder: "Upload relieving letter",
    accept: "pdf",
    // required: true,
  },

  {
    name: "linkedinProfile",
    label: "LinkedIn Profile URL",
    componentType: "input",
    type: "url",
    placeholder: "Enter LinkedIn Profile URL",
    required: true,
  },
  {
    name: "permanentAddress.address",
    label: "Permanent Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
    required: true,
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
        required: true,
      },
      {
        name: "permanentAddress.state",
        label: "",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "permanentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
    ],
  },
];
export const sectoralFieldsForm2 = [
  {
    name: "latestQualificationName",
    label: "Latest Qualification",
    componentType: "input",
    placeholder: "Experience",
    width: "2/4",
    type: "text",
    required: true,
  },
  {
    name: "latestQualification",
    label: "",
    componentType: "file",
    placeholder: "Upload supporting document",
    accept: "pdf",
    // required: true,
  },

  {
    name: "joinReason",
    label: "Why do you want to join? (Max 30 words)",
    componentType: "textarea-count",
    maxWords: 30,
    placeholder: "Write your reason...",
    required: true,
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
    required: true,
  },

  {
    name: "fatherName",
    label: "Father's Name",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "motherName",
    label: "Mother's Name",
    componentType: "input",
    type: "text",
    required: true,
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
    required: true,
  },
];
export const referenceFields = [
  {
    row: [
      {
        name: "name",
        label: "Reference",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
        required: true,
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
        required: true,
      },
      {
        name: "profilePicture",
        label: "Profile Picture",
        componentType: "file",
        placeholder: "Upload image",
        accept: "image",
      },
    ],
  },

  {
    name: "phone",
    label: "Phone Number",
    componentType: "phone",
    placeholder: "Ex. XXXXX XXXXX",
    required: true,
  },
  {
    name: "email",
    label: "E-mail ID",
    componentType: "input",
    type: "email",
    placeholder: "Enter email",
    required: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    componentType: "calendar",
    placeholder: "Select date of birth (DD/Month/YYYY)",
    required: true,
  },

  {
    name: "currentAddress.address",
    label: "Current Address",
    placeholder: "Enter Primary Address",
    componentType: "textarea",
    type: "text",
    width: "full",
    required: true,
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
        required: true,
      },
      {
        name: "currentAddress.state",
        label: "",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "currentAddress.pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
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
    required: true,
  },
  {
    name: "summary",
    componentType: "textarea-count",
    placeholder: "Write a brief summary about the candidate",
    label: "Summary",
    type: "text",
    maxWords: 300,
    required: true,
  },
  {
    name: "skills",
    label: "Skills",
    componentType: "multi-select",
    max: 30,
    options: [],
    required: true,
  },
];
export const highestQualification = [
  {
    name: "degree",
    label: "Highest Qualification",
    placeholder: "e.g B.Tech",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    row: [
      {
        name: "startDate",
        label: "Starting Year",
        componentType: "monthYear",
      },
      {
        name: "endDate",
        label: "Ending Year",
        componentType: "monthYear",
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
    allowOther: true,
    showOtherInput: true,
    inlineOther: true,
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
        label: "Annual Current Salary / CTC (In LPA)",
        placeholder: "e.g., 7.5 Lakhs",
        componentType: "input",
        type: "number",
        max: true,
      },
      {
        name: "expectedSalary",
        label: "Expected Salary / CTC (In LPA)",
        placeholder: "e.g., 9 Lakhs",
        componentType: "input",
        type: "number",
        max: true,
      },
    ],
  },
];
export const workingExperience = [
  {
    name: "companyName",
    label: "Last Organisation",
    placeholder: "e.g Company Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "designation",
    label: "Designation in Last Organisation",
    placeholder: "e.g Software Engineer",
    componentType: "input",
    type: "text",
  },
  {
    row: [
      {
        name: "startDate",
        label: "Starting Year",
        componentType: "monthYear",
      },
      {
        name: "endDate",
        label: "Ending Year",
        componentType: "monthYear",
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
        required: true,
      },
      {
        name: "basicInformation.companyLogo",
        label: "Company Logo",
        placeholder: "",
        componentType: "file",
        type: "file",
        width: "1/3",
        accept: "image",
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
    required: true,
  },
  {
    name: "basicInformation.companyEmail",
    label: "Company Email Id",
    placeholder: "Enter your Email Id",
    componentType: "input",
    type: "email",
    width: "full",
    required: true,
  },
  {
    name: "basicInformation.password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    width: "full",
    required: true,
  },
  {
    name: "basicInformation.confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    componentType: "input",
    type: "password",
    width: "full",
    required: true,
  },
];
export const basicCorporateInformationUpdate = [
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
        accept: "image",
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
];
export const basicInformationControls = [
  {
    name: "basicInformation.websiteURL",
    label: "Website URL",
    componentType: "input",
    type: "text",
    placeholder: "Enter Website URL",
    required: true,
  },
  {
    name: "basicInformation.companyType",
    label: "Company Type",
    componentType: "select",
    placeholder: "Select a type",
    options: [
      { id: "privateCompany", label: "Private company" },
      { id: "proprietorship", label: "Proprietorship" },
      { id: "lld", label: "LLD" },
    ],
    required: true,
  },
  {
    name: "basicInformation.companyDescription",
    label: "About Company",
    componentType: "textarea",
    placeholder: "Write about your company",
    required: true,
  },
];
export const spocInformationControls = [
  {
    name: "spocInformation.fullName",
    label: "Full Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Full Name",
    required: true,
    // Adjusted to a more appropriate placeholder
  },
  {
    name: "spocInformation.contactNumber",
    label: "Contact Number",
    componentType: "phone",
    placeholder: "Ex. XXXXXXXXXX",
    type: "number",
    required: true,
  },
  {
    name: "spocInformation.email",
    label: "Email ID",
    componentType: "input",
    type: "email",
    placeholder: "Enter the Email id",
    required: true,
  },
];
export const corporateFormControls = [
  {
    label: "Current Address",
    name: "currentAddress",
    placeholder: "Enter Permanent Address",
    componentType: "textarea",
    type: "text",
    required: true,
  },
  {
    row: [
      {
        label: "",
        name: "city",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        label: "",
        name: "state",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        label: "",
        name: "pincode",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        required: true,
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
    required: true,
  },
  {
    row: [
      {
        label: "PAN Card No.",
        name: "panCardNumber",
        placeholder: "Enter PAN Card Number",
        componentType: "input",
        type: "text",
      },
      {
        label: "",
        name: "panCardFile",
        placeholder: "Upload PAN",
        componentType: "file",
        formats: "JPG, PNG, PDF.",
        accept: "image",
      },
    ],
  },
  {
    label: "GSTIN",
    name: "gstin",
    placeholder: "Enter GSTIN",
    componentType: "input",
    type: "text",
    required: true,
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
    accept: "image",
  },
];
export const formControlsForIndividual = [
  {
    label: "Current Address",
    name: "currentAddress",
    placeholder: "Enter Permanent Address",
    componentType: "textarea",
    type: "text",
    required: true,
  },
  {
    row: [
      {
        label: "City",
        name: "city",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        label: "State",
        name: "state",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        label: "Pincode",
        name: "pincode",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        required: true,
      },
    ],
  },
  {
    label: "GSTIN",
    name: "gstin",
    placeholder: "Enter GSTIN",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    label: "PAN Card No.",
    name: "panCardNumber",
    placeholder: "Enter PAN Card Number",
    componentType: "input",
    type: "text",
  },
  {
    label: "",
    name: "panCardFile",
    placeholder: "Upload PAN",
    componentType: "file",
    formats: "JPG, PNG, PDF.",
    accept: "image",
  },
  {
    label: "Aadhar Card No.",
    name: "aadharCardNumber",
    placeholder: "Enter Aadhar Card Number",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    label: "",
    name: "aadharCardFile",
    placeholder: "Upload Aadhar",
    componentType: "file",
    formats: "JPG, PNG, PDF.",
    accept: "image",
    // required: true,
  },
];
export const jobOpeningFilters = [
  {
    label: "Status",
    componentType: "select",
    placeholder: "Choose Job Status",
    name: "status",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },
  {
    label: "Select Range",
    componentType: "select",
    placeholder: "Select Range",
    options: [
      {
        id: "last week",
        label: "Last Week",
      },
      { id: "last month", label: "Last Month" },
      { id: "last 3 months", label: "Last 3 Months" },
      { id: "last 6 months", label: "Last 6 Months" },
    ],
  },
];
export const CandidatesFilters = [
  {
    label: "Designation",
    componentType: "input",
    placeholder: "Choose Designation",
    name: "designation",
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
    label: "Current Sector",
    componentType: "multi-select",
    placeholder: "Enter Sector",
    name: "currentSector",
    options: [
      {
        id: "active",
        label: "Active",
      },
      { id: "ended", label: "Ended" },
    ],
  },

  {
    label: "Last Organization",
    componentType: "input",
    placeholder: "Enter Last Organization",
    name: "lastOrganization",
  },
  {
    label: "Experience Level",
    componentType: "select",
    placeholder: "Select Experience",
    name: "experienceLevel",
    options: [
      {
        id: "0-1 year",
        label: "0-1 year",
      },
      { id: "1-2 year", label: "1-2 year" },
      { id: "2-3 year", label: "2-3 years" },
      { id: "3-4 year", label: "3-4 years" },
      { id: "4-5 year", label: "4-5 years" },
      { id: "5-7 year", label: "5-7 years" },
      { id: "7-10 year", label: "7-10 years" },
      { id: "10+ years", label: "10+ years" },
      { id: "15+ years", label: "15+ years" },
    ],
  },
  {
    label: "Degree",
    componentType: "multi-select",
    placeholder: "Enter Degree",
    name: "degree",
    options: [
      {
        id: "10th Pass",
        label: "10th Pass",
      },
      { id: "12th Pass", label: "12th Pass" },
      { id: "Diploma", label: "Diploma" },
      { id: "Graduation", label: "Graduation" },
      { id: "Post Graduation", label: "Post Graduation" },
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
    placeholder: "Select Notice Period",
    name: "noticePeriod",
    componentType: "input",
  },
];
export const trainingController1 = [
  {
    label: "What is the title or subject of the training?",
    componentType: "input",
    type: "text",
    placeholder: "Enter Title",
    name: "title",
    required: true,
  },
  {
    name: "description",
    label: "Please provide a detailed description of the training program.",
    placeholder: "Enter Description",
    componentType: "textarea",
    type: "text",
    width: "full",
    required: true,
  },
  {
    name: "skills",
    label: "What skills should the trainer have?",
    componentType: "multi-select",
    max: 30,
    options: [],
    required: true,
  },
];
export const trainingMode = [
  {
    label: "What is the mode of the training?",
    componentType: "select",
    placeholder: "Select",
    name: "trainingMode",
    options: [
      {
        id: "Virtual / Online",
        label: "Virtual / Online",
      },
      { id: "In-person / On-site", label: "In-person / On-site" },
      { id: "Hybrid", label: "Hybrid" },
    ],
    required: true,
  },
];
export const trainingAddress = [
  {
    name: "address",
    label: "Where will the training be conducted?",
    placeholder: "Enter Address",
    componentType: "textarea",
    type: "text",
    width: "full",
    required: true,
  },
  {
    row: [
      {
        name: "city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "state",
        label: "",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
    ],
  },
];
export const trainingController2 = [
  {
    label: "How frequently should the training sessions be conducted?",
    componentType: "select",
    placeholder: "Select",
    name: "sessionFrequency",
    options: [
      {
        id: "daily",
        label: "Daily",
      },
      { id: "alternateDays", label: "Alternate Days" },
      { id: "weekly", label: "Weekly" },
      { id: "monthly", label: "Monthly" },
      { id: "quarterly", label: "Quarterly" },
      { id: "halfYearly", label: "Half-yearly" },
      { id: "yearly", label: "Yearly" },
    ],
    required: true,
  },
  {
    name: "totalDurationDays",
    label: " What is the total duration of the training in days?",
    placeholder: "Enter duration",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "hoursPerDay",
    label: "How many hours per day will the training be conducted?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "1 hour", label: "1 hour" },
      { id: "2 hour", label: "2 hour" },
      { id: "4 hour", label: "4 hour" },
      { id: "6 hour", label: "6 hour" },
    ],
    allowOther: true,
    showOtherInput: true,
    inlineOther: true,
    required: true,
  },
  {
    label: "What is the minimum experience required?",
    componentType: "select",
    placeholder: "Select",
    name: "minimumExperience",
    options: [
      {
        id: "0-1 year",
        label: "0-1 year",
      },
      { id: "1-2 year", label: "1-2 year" },
      { id: "2-3 year", label: "2-3 years" },
      { id: "3-4 year", label: "3-4 years" },
      { id: "4-5 year", label: "4-5 years" },
      { id: "5-7 year", label: "5-7 years" },
      { id: "7-10 year", label: "7-10 years" },
      { id: "10+ years", label: "10+ years" },
      { id: "15+ years", label: "15+ years" },
    ],
    required: true,
  },
  {
    label: "What level of subject matter expertise do you expect?",
    componentType: "select",
    placeholder: "Select",
    name: "subjectMatterExpertise",
    options: [
      {
        id: "high",
        label: "High",
      },
      { id: "moderate", label: "Moderate" },
    ],
    required: true,
  },
  {
    name: "qualificationsRequired",
    label: "What qualifications are preferred or required?",
    placeholder: "Enter Degree",
    componentType: "input",
    type: "text",
    required: true,
  },
];
export const trainingController3 = [
  {
    name: "budgetPerSession",
    label: "What is the budget per session",
    placeholder: "Enter Budget",
    componentType: "input",
    type: "text",
    required: true,
  },
];

export const trainingController4 = [
  {
    name: "sessionsExpected",
    label: " How many sessions are expected in total?",
    placeholder: "Enter session",
    componentType: "input",
    type: "number",
    required: true,
  },
  {
    label: "Will you cover travel/stay if the trainer needs to relocate?",
    componentType: "select",
    placeholder: "Select",
    name: "travelRequired",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
      { id: "partially", label: "Partially" },
    ],
    required: true,
  },
  {
    name: "languagesFluent",
    label: "What languages should the trainer be fluent in?",
    componentType: "multi-select",
    max: 30,
    options: [],
    required: true,
  },
  {
    name: "participantsPerBatch",
    label: " How many participants will be in each batch?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "1-5", label: "1-5" },
      { id: "5-10", label: "5-10" },
      { id: "10-20", label: "10-20" },
      { id: "20+", label: "20+" },
    ],
    allowOther: true,
    showOtherInput: true,
    inlineOther: true,
    required: true,
  },
  {
    label: "Do you expect the trainer to provide study materials or slides?",
    componentType: "select",
    placeholder: "Select",
    name: "studyMaterialsProvided",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
      { id: "shared", label: "Shared Responsibility" },
    ],
    required: true,
  },
  {
    label: "Would you like a demo session before confirming?",
    componentType: "select",
    placeholder: "Select",
    name: "demoSessionBeforeConfirming",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
    required: true,
  },
];
export const jobController1 = [
  {
    name: "jobTitle",
    label: "What is the job title or designation?",
    placeholder: "Enter Title",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    label: "What type of job is this?",
    componentType: "select",
    placeholder: "Select",
    name: "jobType",
    options: [
      {
        id: "Full-Time",
        label: "Full-Time",
      },
      { id: "Part-Time", label: "Part-Time" },
      { id: "Internship", label: "Internship" },
    ],
    required: true,
  },
  {
    name: "workingHours",
    label: "What are the working hours for this job?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "8 hours", label: "8 hours" },
      { id: "8.5 hour", label: "8.5 hours" },
      { id: "9 hours", label: "9 hours" },
    ],
    allowOther: true,
    showOtherInput: true,
    inlineOther: true,
    required: true,
  },
  {
    name: "workingDays",
    label: "What are the working (days)?",
    componentType: "input",
    placeholder: "e.g. Monday to Friday",
    type: "text",
    required: true,
  },
  {
    label: "Is Sunday a working day?",
    componentType: "select",
    placeholder: "Select",
    name: "isSundayWorking",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
    required: true,
  },
  {
    name: "officeLocation",
    label: "Where is the office located?",
    placeholder: "Enter Address",
    componentType: "textarea",
    type: "text",
    width: "full",
    required: true,
  },
  {
    row: [
      {
        name: "city",
        label: "",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "state",
        label: "",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
      {
        name: "pincode",
        label: "",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        width: "1/3",
        required: true,
      },
    ],
  },
  {
    label: "What is the mode of work?",
    componentType: "select",
    placeholder: "Select",
    name: "modeOfWork",
    options: [
      {
        id: "Work from Office",
        label: "Work from Office",
      },
      { id: "Work from Home", label: "Work from Home" },
      { id: "Hybrid", label: "Hybrid" },
    ],
    required: true,
  },
  {
    label: "What experience level is required?",
    componentType: "select",
    placeholder: "Select",
    name: "experienceLevel",
    options: [
      {
        id: "0-1 year",
        label: "0-1 year",
      },
      { id: "1-2 year", label: "1-2 year" },
      { id: "2-3 years", label: "2-3 years" },
      { id: "3-4 years", label: "3-4 years" },
      { id: "4-5 years", label: "4-5 years" },
      { id: "5-7 years", label: "5-7 years" },
      { id: "7-10 years", label: "7-10 years" },
      { id: "10+ years", label: "10+ years" },
      { id: "15+ years", label: "15+ years" },
    ],
    required: true,
  },
  {
    name: "genderPreference",
    label: "What's your gender preference?",
    componentType: "select",
    placeholder: "Select gender",
    options: [
      { id: "Male", label: "Male" },
      { id: "Female", label: "Female" },
      { id: "Other", label: "Other" },
    ],
    required: true,
  },
  {
    name: "minimumEducation",
    label: "Minimum education requirement?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "10th Pass", label: "10th Pass" },
      { id: "12th Pass", label: "12th Pass" },
      { id: "Diploma", label: "Diploma" },
      { id: "Graduate", label: "Graduate" },
      { id: "Postgraduate", label: "Postgraduate" },
    ],
    required: true,
  },
];
export const jobController2 = [
  {
    name: "englishLevel",
    label: "What level of English is expected?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "basic", label: "Basic" },
      { id: "moderate", label: "Moderate" },
      { id: "fluent", label: "Fluent" },
    ],
    required: true,
  },
  {
    name: "regionalLanguageRequired",
    label: "Is any regional language required?",
    componentType: "select",
    placeholder: "Select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
    required: true,
  },
];
export const regionalLanguage = [
  {
    name: "regionalLanguages",
    label: "",
    placeholder: "Enter Language",
    componentType: "multi-select",
    max: 30,
    options: [],
  },
];
export const jobController3 = [
  {
    name: "noOfPositions",
    componentType: "input",
    label: "No of positions for this job",
    placeholder: "e.g. 15",
    type: "text",
    required: true,
  },
  {
    name: "preferredAgeRange",
    componentType: "input",
    label: "Preferred age range (if any in Years)?",
    placeholder: "e.g. 18-50",
    type: "text",
  },
  {
    name: "salaryRange",
    componentType: "salary-range",
    label: "Salary Range (In ₹ LPA)",
    required: true,
  },
  {
    name: "requiredSkills",
    label: "What skills are required for this role?",
    componentType: "multi-select",
    max: 30,
    options: [],
    required: true,
  },
  {
    name: "twoWheelerMandatory",
    label: "Is having a two-wheeler mandatory for this job?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: true,
  },
  {
    name: "jobDescription",
    label:
      "Please provide a detailed job description. (Minimum 300 characters)",
    placeholder: "Enter Description",
    componentType: "textarea-count",
    type: "text",
    maxChars: 300,
    width: "full",
    required: true,
  },
  {
    name: "jobDescriptionFile",
    label: "Or Upload Job Description File",
    componentType: "file",
    accept: "document",
    placeholder: "Upload file",
  },
  {
    name: "isWalkInInterview",
    label: "Is this a walk-in interview?",
    componentType: "select",
    placeholder: "Select",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    required: true,
  },
];
export const walkinAdress = [
  {
    name: "walkInDate",
    label: "",
    componentType: "calendar",
    placeholder: "Select Date",
  },
  {
    name: "walkInTime",
    label: "",
    componentType: "time",
    placeholder: "Enter Time",
  },
  {
    name: "walkInAddress",
    label: "Address",
    componentType: "textarea",
    placeholder: "Enter your address",
  },
  {
    name: "spocName",
    label: "SPOC Name (Contact Person)",
    componentType: "input",
    type: "text",
    placeholder: "Enter name",
  },
  {
    name: "spocNumber",
    label: "SPOC Number",
    componentType: "input",
    type: "text",
    placeholder: "Enter number",
  },
];
export const jobSeekerBasicDetails = [
  {
    row: [
      {
        name: "name",
        label: "Full Name",
        componentType: "input",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
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
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    componentType: "phone",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    componentType: "input",
    type: "email",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "",
    componentType: "input",
    type: "password",
    placeholder: "Enter your confirm password",
    required: true,
  },
  {
    name: "bio",
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
    required: true,
  },
  {
    row: [
      {
        name: "currentAddress.city",
        label: "",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city",
        required: true,
      },
      {
        name: "currentAddress.state",
        label: "",
        componentType: "input",
        type: "text",
        placeholder: "Enter your State",
        required: true,
      },

      {
        name: "currentAddress.pincode",
        label: "",
        componentType: "input",
        type: "text",
        placeholder: "Enter your pincode",
        required: true,
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
    required: true,
  },
];
export const jobSeekerEducationFormControls = [
  {
    name: "institution",
    label: "Institution",
    componentType: "input",
    type: "text",
    placeholder: "Enter the name",
    required: true,
  },
  {
    name: "degree",
    label: "Highest Degree",
    componentType: "select",
    placeholder: "PostGraduate / Graduate / InterCollege",
    options: [
      { id: "postgraduate", label: "PostGraduate" },
      { id: "graduate", label: "Graduate" },
      { id: "intercollege", label: "InterCollege" },
    ],
    required: true,
  },
  {
    name: "fieldOfStudy",
    label: "Field of Study",
    componentType: "select",
    placeholder: "Eg. Bachelor of Design",
    options: [
      { id: "bachelor_of_design", label: "Bachelor of Design" },
      { id: "bachelor_of_engineering", label: "Bachelor of Engineering" },
      { id: "bachelor_of_science", label: "Bachelor of Science" },
      { id: "other", label: "Other" },
    ],
    required: true,
  },
  {
    row: [
      {
        name: "startDate",
        label: "Starting Year",
        componentType: "monthYear",
        placeholder: "Select Date",
        required: true,
      },
      {
        name: "endDate",
        label: "Ending Year",
        componentType: "monthYear",
        placeholder: "Select Date",
        required: true,
      },
    ],
  },
  {
    name: "document",
    label: "Supporting Document",
    placeholder: "Upload Profile Picture",
    componentType: "file",
    accept: "image", // only allow images
    // required: true,
  },
];
export const workExperienceFormControls = [
  {
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
  {
    name: "position",
    label: "Position in Last Organization",
    componentType: "input",
    type: "text",
    placeholder: "Enter position",
    required: true,
  },
  {
    name: "employmentType",
    label: "Employment Type",
    componentType: "select",
    placeholder: "Select employment type",
    options: [
      { id: "full_time", label: "Full-Time" },
      { id: "part_time", label: "Part-Time" },
      { id: "contract", label: "Contract" },
      { id: "freelance", label: "Freelance" },
    ],
    required: true,
  },
  {
    row: [
      {
        name: "startingYear",
        label: "Starting Year",
        componentType: "monthYear",
        placeholder: "Select Date",
        required: true,
      },
      {
        name: "endingYear",
        label: "Ending Year",
        componentType: "monthYear",
        placeholder: "Select Date",
        required: true,
      },
    ],
  },
  {
    name: "skillSet",
    label: "Key skills",
    componentType: "multi-select",
    max: 30,
    options: [],
  },
];
export const roleExpertiseFormControls = [
  {
    name: "roleLookingFor",
    label: "Role Looking For",
    componentType: "input",
    type: "text",
    placeholder: "Enter the role you're looking for",
    required: true,
  },
  {
    name: "currentIndustry",
    label: "Current Industry",
    componentType: "select",
    placeholder: "Choose your Current Industry",
    options: [
      { id: "it", label: "Information Technology" },
      { id: "healthcare", label: "Healthcare" },
      { id: "finance", label: "Finance" },
      { id: "education", label: "Education" },
      { id: "other", label: "Other" },
    ],
    showOtherInput: true,
    required: true,
  },
  {
    name: "areaOfExpertise",
    label: "Expertise Areas",
    componentType: "multi-select",
    type: "text",
    placeholder: "Enter the Area of Expertise",
    required: true,
  },
  {
    name: "functionalAreas",
    label: "Functional Areas",
    componentType: "multi-select",
    placeholder: "Select the functional areas",
    options: [
      { id: "marketing", label: "Marketing" },
      { id: "sales", label: "Sales" },
      { id: "development", label: "Development" },
      { id: "operations", label: "Operations" },
      { id: "other", label: "Other" },
    ],
    max: 5,
    showOtherInput: true,
    required: true,
  },
  {
    name: "location",
    label: "Preferred work location",
    componentType: "multi-select",
    placeholder: "Top 3 Preferences",
    options: [
      { id: "marketing", label: "Marketing" },
      { id: "sales", label: "Sales" },
      { id: "development", label: "Development" },
      { id: "operations", label: "Operations" },
      { id: "other", label: "Other" },
    ],
    max: 3,
    showOtherInput: true,
    required: true,
  },
];
export const certificateFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    name: "organisation",
    label: "Issuing Organization",
    componentType: "input",
    type: "text",
    placeholder: "Enter the issuing organization",
  },
  {
    row: [
      {
        name: "issueDate",
        label: "Issue Date",
        componentType: "monthYear",
        placeholder: "Select Issue Date",
      },
      {
        name: "expiryDate",
        label: "Expiry Date",
        componentType: "monthYear",
        placeholder: "Select Expiry Date",
      },
    ],
  },
];
export const additionalDetailsJobSeeker = [
  {
    name: "maritalStatus",
    label: "Marital Status",
    componentType: "selection",
    options: [
      { id: "single", label: "Single" },
      { id: "married", label: "Married" },
      { id: "divorced", label: "Divorced" },
      { id: "widowed", label: "Widowed" },
      { id: "separated", label: "Separated" },
      { id: "other", label: "Other" },
    ],
  },
  {
    name: "handleTeam",
    label: "Have you handled a team?",
    componentType: "selection",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
];
export const gigTrainingFormConfig = [
  {
    name: "gigTrainingReason",
    label:
      "Why do you want to proceed ahead with this Gig Training assignment?",
    componentType: "textarea-count",
    placeholder: "Enter your reason (max 30 words)",
    maxWords: 30,
    required: true,
  },
  {
    name: "avgMonthlySessions",
    label: "Average number of monthly sessions in your last work assignment",
    componentType: "input",
    type: "number",
    placeholder: "Enter number of sessions",
    required: true,
  },
  {
    name: "opportunitySource",
    label: "How did you come to know about this opportunity?",
    componentType: "select",
    placeholder: "Select one option",
    options: [
      { id: "socialMedia", label: "Social Media" },
      { id: "friends", label: "Friends" },
      { id: "jobPortal", label: "Job Portal" },
      { id: "colleagues", label: "Colleagues" },
      { id: "other", label: "Any other" },
    ],
    showOtherInput: true,
    inlineOther: true,
    required: true,
  },
  {
    name: "fatherName",
    label: "Father's Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your father's name",
    required: true,
  },
  {
    name: "motherName",
    label: "Mother's Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your mother's name",
    required: true,
  },
  {
    row: [
      {
        name: "name",
        label: "Testimonial 1",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
        required: true,
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
  {
    row: [
      {
        name: "name",
        label: "Testimonial 2",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
        required: true,
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
  {
    row: [
      {
        name: "name",
        label: "Testimonial 3",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
        required: true,
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
  {
    name: "hasMedicalProblem",
    label: "Any Medical Problem?",
    componentType: "select",
    placeholder: "Select one",
    options: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
    ],
    required: true,
  },
  {
    name: "professionalAchievements",
    label: "Any professional achievement you’d like to highlight?",
    componentType: "textarea-count",
    placeholder: "Enter your achievement (max 50 words)",
    maxWords: 50,
  },
  {
    row: [
      {
        name: "trainingPictures",
        label: "Pictures of past training sessions",
        componentType: "file",
        accept: "image",
        placeholder: "Upload image",
      },
      {
        name: "trainingPictures",
        label: "",
        componentType: "file",
        accept: "image",
        placeholder: "Upload image",
      },
      {
        name: "trainingPictures",
        label: "",
        componentType: "file",
        accept: "image",
        placeholder: "Upload image",
      },
    ],
  },
];

export const additionalDetailsJobSeeker2 = [
  {
    name: "willingTo6DayWork",
    label: "Are you willing to work 6 days a week?",
    componentType: "selection",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
  },
  {
    name: "willingToRelocate",
    label: "Are you willing to relocate from your current location?",
    componentType: "selection",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
  },
  {
    name: "relocationPreferences",
    componentType: "multi-select",
    options: [],
    placeholder: "Select your relocation preferences",
  },
  {
    name: "earlyStageStartup",
    componentType: "selection",
    label: "Are you open to joining an early-stage startup?",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
  },
  {
    name: "differentlyAbled",
    componentType: "selection",
    label: "Are you Differently Abled?",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
  },
  {
    name: "medicalProblem",
    componentType: "selection",
    label: "Are you suffering from any medical problem?",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
  },
];
export const additionalDetailsJobSeeker3 = [
  {
    name: "willingToTravel",
    label: "Willingness to Travel",
    componentType: "selection",
    placeholder: "Select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      { id: "no", label: "No" },
    ],
  },
  {
    name: "languages",
    label: "Languages",
    componentType: "multi-select",
    options: [],
    placeholder: "Select all the languages you speak",
  },
];
// candidateFormControls.js

export const trainerFormControls1 = [
  {
    row: [
      {
        name: "fullName",
        label: "Candidate Name",
        placeholder: "e.g. Jason Wild",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        name: "profilePicture",
        label: "Profile Picture",
        placeholder: "Upload Profile Picture",
        componentType: "file",
        accept: "image", // only allow images
      },
    ],
  },
  {
    name: "phone",
    label: "Contact Number",
    placeholder: "Ex. XXXXX XXXXX",
    componentType: "phone",
    required: true,
  },
  {
    name: "email",
    label: "E-mail ID",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
    required: true,
  },
  {
    row: [
      {
        name: "currentAddress.address",
        label: "Current Address",
        placeholder: "Enter Current Address",
        componentType: "textarea",
        type: "text",
        width: "full",
        required: true,
      },
    ],
  },
  {
    row: [
      {
        name: "currentAddress.city",
        placeholder: "Enter City",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        name: "currentAddress.state",
        placeholder: "Enter State",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        name: "currentAddress.pincode",
        placeholder: "Enter Pincode",
        componentType: "input",
        type: "text",
        required: true,
      },
    ],
  },
];
// kycBankFormControls.js

export const kycBankFormControls = [
  {
    name: "aadharDetails.image",
    label: "Upload Aadhar Card",
    placeholder: "Upload Aadhar Card",
    componentType: "file",
    accept: "image",
    // required: true,
  },
  {
    name: "aadharDetails.number",
    label: "Adhar Number",
    placeholder: "Enter Adhar Number",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "panDetails.image",
    label: "Upload PAN Card",
    placeholder: "Upload PAN Card",
    componentType: "file",
    accept: "image",
    // required: true,
  },
  {
    name: "panDetails.number",
    label: "PAN Number",
    placeholder: "Enter PAN Number",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "bankDetails.accountNumber",
    label: "Account Number",
    placeholder: "Enter Account Number",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "bankDetails.accountHolderName",
    label: "Account Holder's Name",
    placeholder: "Enter Account Holder's name",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    row: [
      {
        name: "bankDetails.branchName",
        label: "Branch Name",
        placeholder: "Branch Name",
        componentType: "input",
        type: "text",
        required: true,
      },
      {
        name: "bankDetails.ifscCode",
        label: "IFSC Code",
        placeholder: "IFSC Code",
        componentType: "input",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "cancelChequeOrPassbookImage",
    label: "Upload Cancel Cheque",
    placeholder: "",
    componentType: "file",
    accept: "image", // you can also use "pdf" if needed
    // required: true,
  },
];
// experienceFormControls.js

export const experienceFormControls = [
  {
    name: "expertiseLevel",
    label: "Experience Level",
    placeholder: "Select level",
    componentType: "multi-select",
    options: [
      { id: "frontline", label: "Frontline Team Trainnings" },
      { id: "midLevel", label: "Mid-Level Hirings" },
      { id: "expert", label: "Senior-Level Hirings" },
    ],
    max: 2,
    required: true,
  },
  {
    row: [
      {
        name: "totalYearsExperience",
        label: "Total Experience (Years)",
        placeholder: "X Years",
        componentType: "select",
        options: Array.from({ length: 31 }, (_, i) => ({
          id: i.toString(),
          label: `${i} Years`,
        })),
        required: true,
      },
      {
        name: "totalMonthsExperience",
        label: "Total Experience (Months)",
        placeholder: "Y Months",
        componentType: "select",
        options: Array.from({ length: 12 }, (_, i) => ({
          id: i.toString(),
          label: `${i} Months`,
        })),
        required: true,
      },
    ],
  },
  {
    name: "linkedin",
    label: "LinkedIn Profile",
    placeholder: "Enter URL",
    componentType: "input",
    type: "url",
    required: true,
  },

  {
    name: "WorkingDetails.companyName",
    label: "Name of Last Organization",
    placeholder: "Enter Name",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "WorkingDetails.designation",
    label: "Designation in Last Organization",
    placeholder: "Enter Position",
    componentType: "input",
    type: "text",
    required: true,
  },

  {
    row: [
      {
        name: "WorkingDetails.startDate",
        label: "Starting Year",
        placeholder: "Select Date",
        componentType: "monthYear",
      },
      {
        name: "WorkingDetails.endDate",
        label: "Ending Year",
        placeholder: "Select Date",
        componentType: "monthYear",
      },
    ],
  },
  {
    name: "relievingLetter",
    label: "Relieving Letter",
    componentType: "file",
    placeholder: "Upload relieving letter",
    accept: "pdf",
  },
  {
    name: "expertiseAreas",
    label: "Expertise Areas",
    componentType: "multi-select",
    type: "text",
    placeholder: "Enter the Area of Expertise",
    required: true,
  },
];

export const gigTrainingFormControls = [
  {
    name: "whyProceed",
    label: "Why you want to proceed ahead with this Gig Training assignment?",
    placeholder: "Write in 30 words max",
    componentType: "textarea-count",
    maxWords: 30,
  },
  {
    name: "avgMonthlySessions",
    label: "Average Monthly Sessions in Last Assignment?",
    placeholder: "Enter number",
    componentType: "input",
    type: "number",
  },
  {
    name: "opportunitySource",
    label: "How did you come to know about this Opportunity?",
    placeholder: "Select One",
    componentType: "select",
    options: [
      { id: "socialMedia", label: "Social Media" },
      { id: "friends", label: "Friends" },
      { id: "jobPortal", label: "Job Portal" },
      { id: "colleagues", label: "Colleagues" },
      { id: "other", label: "Any Other" },
    ],
  },
  {
    row: [
      {
        name: "fatherName",
        label: "Father's Name",
        placeholder: "Enter Father's Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "motherName",
        label: "Mother's Name",
        placeholder: "Enter Mother's Name",
        componentType: "input",
        type: "text",
      },
    ],
  },
  // Testimonials
  {
    row: [
      {
        name: "testimonial1Name",
        label: "Testimonial 1 - Name",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial1Contact",
        label: "Testimonial 1 - Contact No.",
        placeholder: "Enter Contact Number",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial1Org",
        label: "Testimonial 1 - Organization",
        placeholder: "Enter Organization",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial1Designation",
        label: "Testimonial 1 - Designation",
        placeholder: "Enter Designation",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "testimonial2Name",
        label: "Testimonial 2 - Name",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial2Contact",
        label: "Testimonial 2 - Contact No.",
        placeholder: "Enter Contact Number",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial2Org",
        label: "Testimonial 2 - Organization",
        placeholder: "Enter Organization",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial2Designation",
        label: "Testimonial 2 - Designation",
        placeholder: "Enter Designation",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "testimonial3Name",
        label: "Testimonial 3 - Name",
        placeholder: "Enter Name",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial3Contact",
        label: "Testimonial 3 - Contact No.",
        placeholder: "Enter Contact Number",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial3Org",
        label: "Testimonial 3 - Organization",
        placeholder: "Enter Organization",
        componentType: "input",
        type: "text",
      },
      {
        name: "testimonial3Designation",
        label: "Testimonial 3 - Designation",
        placeholder: "Enter Designation",
        componentType: "input",
        type: "text",
      },
    ],
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
  {
    name: "professionalAchievements",
    label: "Any Professional Achievement to Highlight?",
    placeholder: "Max 50 words",
    componentType: "textarea-count",
    maxWords: 50,
  },

  {
    name: "trainingPictures",
    label:
      "Any pictures of your past Training Sessions?(Self image in the pic is the mandator)",
    placeholder: "Upload image",
    componentType: "file",
    accept: "image", // only images
    maxFiles: 3, // custom property (you can enforce this inside handleUpload)
  },
  {
    name: "trainingPictures",
    placeholder: "Upload image",
    componentType: "file",
    accept: "image", // only images
    maxFiles: 3, // custom property (you can enforce this inside handleUpload)
  },
  {
    name: "trainingPictures",
    placeholder: "Upload image",
    componentType: "file",
    accept: "image", // only images
    maxFiles: 3, // custom property (you can enforce this inside handleUpload)
  },
];
