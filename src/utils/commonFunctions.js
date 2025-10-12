import { toast } from "sonner";

export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();

  const deepClone = JSON.parse(JSON.stringify(obj));
  let current = deepClone;
  for (let key of keys) {
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[lastKey] = value;

  return deepClone;
};

export const convertMonthsToYearsAndMonths = (totalMonths) => {
  if (!Number.isInteger(totalMonths) || totalMonths < 0) {
    return "Invalid input";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
  if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  return `${years} year${years !== 1 ? "s" : ""}, ${months} month${
    months !== 1 ? "s" : ""
  }`;
};
export const formatIndianNumber = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num?.toString();
  }
};
export const formatToMonthYear = (dateString) => {
  if (!dateString) return "Present"; // 🧠 handle empty case
  const [month, year] = dateString.split("/");
  const fullDate = new Date(`20${year}-${month}-01`);
  return fullDate.toLocaleString("en-US", { month: "short", year: "numeric" });
};

export const getDurationBetweenDates = (startDateStr, endDateStr) => {
  const parseDate = (str) => {
    if (!str) return new Date(); // 🧠 empty = current date
    if (/^\d{2}\/\d{2}$/.test(str)) {
      const [month, year] = str.split("/");
      return new Date(`20${year}-${month}-01`);
    }
    return new Date(str);
  };

  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);

  if (isNaN(startDate) || isNaN(endDate)) {
    return "Invalid date";
  }

  let totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  totalMonths += endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    totalMonths--; // adjust for partial month
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let result = "";
  if (years > 0) result += `${years} yr${years > 1 ? "s" : ""} `;
  if (months > 0) result += `${months} mon${months > 1 ? "s" : ""}`;

  return result.trim() || "0 mon";
};

export const validateFormData = (validationSchema, formData) => {
  if (!validationSchema) return { isValid: true, errors: {} };

  const result = validationSchema.safeParse(formData);

  if (!result.success) {
    const raw = result.error.format();
    const flattened = flattenZodErrors(raw);

    // ✅ Extract the first field and its first message
    const firstKey = Object.keys(flattened)[0];
    const firstMessage = flattened[firstKey]?.[0];

    // ✅ Show toast for user
    if (firstMessage) toast.error(firstMessage);

    // ✅ Return only one error in the errors object
    return {
      isValid: false,
      errors: firstKey ? { [firstKey]: [firstMessage] } : {},
    };
  }

  return { isValid: true, errors: {} };
};

function flattenZodErrors(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const cleanedKey = key.replace("_errors", ""); // 🚀 remove "_errors"
    const newKey = parentKey
      ? Array.isArray(obj)
        ? `${parentKey}[${key}]`
        : `${parentKey}.${cleanedKey}`
      : cleanedKey;

    if (Array.isArray(value) && typeof value[0] === "string") {
      // ✅ leaf error array
      const normalizedKey = newKey.replace(/\._errors$/, "").replace(/\.$/, "");
      result[normalizedKey] = value;
    } else if (typeof value === "object" && value !== null) {
      flattenZodErrors(value, newKey, result);
    }
  }
  return result;
}

export const formatSalaryRange = (minSalary, maxSalary) => {
  const min = Number(minSalary);
  const max = Number(maxSalary);

  if (isNaN(min) || isNaN(max)) return "";

  if (max >= 10000000) {
    // Crores
    return `${(min / 10000000).toFixed(1)}-${(max / 10000000).toFixed(1)}Cr`;
  } else if (max >= 100000) {
    // Lakhs
    return `${(min / 100000).toFixed(1)}-${(max / 100000).toFixed(1)}L`;
  } else {
    // Thousands
    return `${Math.floor(min / 1000)}-${Math.floor(max / 1000)}k`;
  }
};
export const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (isNaN(diffInSeconds)) return "";

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return past.toLocaleDateString(); // fallback to actual date
};
export const isTodayOrFuture = (dateString) => {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Normalize both to midnight to compare only the date
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate >= today;
};
export function formatExperience(years = 0, months = 0) {
  const totalMonths = years * 12 + months;

  if (totalMonths < 12) {
    return "Less than 1 year";
  }

  const fullYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  // If 6+ months extra, show .5+
  if (remainingMonths >= 6) {
    return `${fullYears}.5+ years`;
  }

  return fullYears === 1 ? "1 year" : `${fullYears}+ years`;
}
export function formatDate(dateValue) {
  const date = new Date(dateValue);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}
export const getValue = (obj, path) => {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};
export const omit = (obj, keysToOmit) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key))
  );

export const formatApiError = (error) => {
  // Check if it's a custom error from our axios interceptor
  if (error.isApiError && error.status === 401) {
    return error.message;
  }

  // Check if it's a standard axios error with API message
  if (error.response?.status === 401 && error.response?.data?.message) {
    return error.response.data.message;
  }

  // Check for other API error messages
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Fallback to generic error message
  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};
export const transformUserData = (apiData = {}) => {
  const kyc = apiData.kycDetails || {};

  return {
    firstName: apiData.firstName || "",
    lastName: apiData.lastName || "",
    email: apiData.email || "",
    password: "",
    profileImage: apiData.profileImage || "",
    phone: apiData.phone || { number: 0, countryCode: "" },

    currentAddress: {
      ...apiData.currentAddress,
      state: apiData.currentAddress?.state || "",
    },

    resume: apiData.resume || "",
    sectorSpecialization:
      apiData.sectorSpecialization?.map((id) => ({
        id: id._id,
        label: id.name,
      })) || [],

    totalExperience: apiData.totalExperience || 0,

    experienceLevel:
      apiData.experienceLevel?.map((item) => ({
        id: item,
        label:
          item === "frontline"
            ? "Frontline Hirings"
            : item === "midlevel"
            ? "Mid Level Hirings"
            : item === "senior"
            ? "Senior Hirings"
            : item,
      })) || [],

    lastOrganization: apiData.lastOrganization || { name: "", position: "" },

    permanentAddress: {
      ...apiData.permanentAddress,
      state: apiData.permanentAddress?.state || "",
    },

    relievingLetter: apiData.relievingLetter || "",
    linkedinProfile: apiData.linkedinProfile || "",

    panDetails: {
      number: kyc.panDetails?.number || "",
      image: kyc.panDetails?.image || "",
    },
    aadharDetails: {
      number: kyc.aadharDetails?.number || "",
      image: kyc.aadharDetails?.image || "",
    },
    bankDetails: {
      accountNumber: kyc.bankDetails?.accountNumber || "",
      accountHolderName: kyc.bankDetails?.accountHolderName || "",
      bankName: kyc.bankDetails?.bankName || "",
      ifscCode: kyc.bankDetails?.ifscCode || "",
      accountType: kyc.bankDetails?.accountType || "",
    },
    cancelChequeOrPassbookImage: kyc.cancelChequeOrPassbookImage || "",

    latestQualification: apiData.latestQualification || "",
    latestQualificationName: apiData.latestQualificationName || "",
    joinReason: apiData.joinReason || "",
    monthlyClosures: apiData.monthlyClosures || 0,
    jobSource: apiData.jobSource || "",
    fatherName: apiData.fatherName || "",
    motherName: apiData.motherName || "",

    references: [
      {
        name: apiData.references?.[0]?.name || "",
        contactNo: apiData.references?.[0]?.contactNo || "",
        organization: apiData.references?.[0]?.organization || "",
        designation: apiData.references?.[0]?.designation || "",
      },
      {
        name: apiData.references?.[1]?.name || "",
        contactNo: apiData.references?.[1]?.contactNo || "",
        organization: apiData.references?.[1]?.organization || "",
        designation: apiData.references?.[1]?.designation || "",
      },
    ],

    hasMedicalProblem: apiData.hasMedicalProblem ? "yes" : "no",
    medicalProblemDetails: apiData.medicalProblemDetails || "",
  };
};
export const transformCompanyData = (apiData = {}) => {
  const safe = (obj, key, fallback = "") => obj?.[key] ?? fallback;

  return {
    basicInformation: {
      companyName: safe(apiData.basicInformation, "companyName"),
      companyLogo: safe(apiData.basicInformation, "companyLogo"),
      companyContactNumber: apiData.basicInformation?.companyContactNumber || {
        number: 0,
        countryCode: "",
      },
      companyEmail: safe(apiData.basicInformation, "companyEmail"),
      password: "",
      confirmPassword: "",
      websiteURL: safe(apiData.basicInformation, "websiteURL"),
      companyType: safe(apiData.basicInformation, "companyType"),
      companyDescription: safe(apiData.basicInformation, "companyDescription"),
    },

    spocInformation: {
      fullName: safe(apiData.spocInformation, "fullName"),
      contactNumber: apiData.spocInformation?.contactNumber || {
        number: "",
        countryCode: "",
      },
      email: safe(apiData.spocInformation, "email"),
    },

    bankAccountNumber: safe(apiData, "bankAccountNumber"),
    ifscCode: safe(apiData, "ifscCode"),
    bankName: safe(apiData, "bankName"),
    city: safe(apiData, "city"),
    currentAddress: safe(apiData, "currentAddress"),
    pincode: safe(apiData, "pincode"),
    state: safe(apiData, "state"),
    industryType: safe(apiData, "industryType"),
    panCardNumber: safe(apiData, "panCardNumber"),
    panCardFile: safe(apiData, "panCardFile"),
    gstin: safe(apiData, "gstin"),
    aadharCardNumber: safe(apiData, "aadharCardNumber"),
    aadharCardFile: safe(apiData, "aadharCardFile"),
  };
};
