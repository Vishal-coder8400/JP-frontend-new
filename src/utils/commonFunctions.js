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
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
};
export const getDurationBetweenDates = (startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  let totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  totalMonths += endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    totalMonths--; // account for partial month
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let result = "";
  if (years > 0) result += `${years} yr${years > 1 ? "s" : ""} `;
  if (months > 0) result += `${months} mon${months > 1 ? "s" : ""}`;

  return result.trim() || "0 mon";
};
export const validateFormData = (validationSchema, formData) => {
  if (!validationSchema) return true;

  const result = validationSchema.safeParse(formData);

  if (!result.success) {
    const allErrors = result.error.flatten().fieldErrors;
    const firstError = Object.values(allErrors)[0]?.[0];

    if (firstError) toast.error(firstError);
    return false;
  }

  return true;
};
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
