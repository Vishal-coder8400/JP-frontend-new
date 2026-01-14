import {
  EDUCATION_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
  WORK_MODES,
  BOOLEAN_OPTIONS,
} from "../../constants/super-admin";

export const createInputField = (name, label, placeholder, type = "text") => ({
  name,
  label,
  placeholder,
  componentType: "input",
  type,
});

export const createTextareaField = (name, label, placeholder, rows = 4) => ({
  name,
  label,
  placeholder,
  componentType: "textarea",
  rows,
});

export const createSelectField = (
  name,
  label,
  options,
  placeholder = "Select..."
) => ({
  name,
  label,
  componentType: "select",
  placeholder,
  options,
});

export const createFileField = (
  name,
  label,
  accept = "image",
  placeholder = ""
) => ({
  name,
  label,
  placeholder,
  componentType: "file",
  accept,
});

export const createPhoneField = (
  name,
  label = "Contact Information",
  placeholder = "Ex. XXXXX XXXXX"
) => ({
  name,
  label,
  placeholder,
  componentType: "phone",
  type: "number",
});

export const createCalendarField = (
  name,
  label,
  placeholder = "Select date"
) => ({
  name,
  label,
  placeholder,
  componentType: "calendar",
});

export const createRowFields = (fields) => ({
  row: fields,
});

export const commonFieldConfigs = {
  education: () =>
    createSelectField(
      "minimumEducation",
      "Education",
      EDUCATION_LEVELS,
      "Select education"
    ),

  experience: () =>
    createSelectField(
      "experienceLevel",
      "Experience Level",
      EXPERIENCE_LEVELS,
      "Select experience"
    ),

  jobType: () =>
    createSelectField("jobType", "Job Type", JOB_TYPES, "Select job type"),

  workMode: () =>
    createSelectField("modeOfWork", "Mode of Work", WORK_MODES, "Select mode"),

  yesNo: (name, label) =>
    createSelectField(name, label, BOOLEAN_OPTIONS, "Select"),
};

export const generateBasicInfoFields = (config) => {
  const fields = [];

  if (config.title) {
    fields.push(
      createInputField(
        config.title.name || "title",
        config.title.label || "Title",
        config.title.placeholder || "Enter title"
      )
    );
  }

  if (config.description) {
    fields.push(
      createTextareaField(
        config.description.name || "description",
        config.description.label || "Description",
        config.description.placeholder || "Enter description",
        config.description.rows || 4
      )
    );
  }

  return fields;
};

export const transformArrayToString = (arr) => {
  if (!arr) return "";
  if (typeof arr === "string") return arr;
  if (Array.isArray(arr)) return arr.join("\n");
  return "";
};

export const transformStringToArray = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str;
  if (typeof str === "string") {
    return str
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};
