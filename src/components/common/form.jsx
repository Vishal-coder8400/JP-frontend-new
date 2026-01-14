import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalenderIcon, Plus } from "../../utils/icon";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNestedValue, setNestedValue } from "../../utils/commonFunctions";
import MultiSelectField from "./MultiSelectField";
import MonthYearPicker from "./monthYearCalendar";
import { X } from "lucide-react";

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  i,
  handleUpload,
  disabled = false,
  formType = null,
  errors = {},
  showSerialNumber = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [otherSelections, setOtherSelections] = useState({});

  let fieldIndex = 0;

  // -----------------------------------------
  // VALIDATION: allow only alphabets, digits etc.
  // -----------------------------------------
  const applyRestrictions = (fieldName, value) => {
    let v = value;
    const lower = fieldName.toLowerCase();

    // -----------------------------------------
    // FIX: Ignore email fields completely
    // -----------------------------------------
    if (lower.includes("email")) {
      return value; // allow @ . _ -
    }

    // -----------------------------------------
    // 1️⃣ Organization / Company — allow letters + numbers
    // (EXCLUDING any email field)
    // -----------------------------------------
    if (
      (lower.includes("organization") ||
        lower.includes("organisation") ||
        lower.includes("company") ||
        lower.includes("companyname") ||
        lower.includes("lastorganization") ||
        lower.includes("org")) &&
      !lower.includes("email") // IMPORTANT FIX
    ) {
      let cleaned = v.replace(/[^A-Za-z0-9 ]/g, "");

      if (/^[0-9]+$/.test(cleaned)) {
        return "";
      }

      return cleaned;
    }

    // -----------------------------------------
    // 2️⃣ Designation — allow letters + numbers
    // -----------------------------------------
    if (lower.includes("designation")) {
      let cleaned = v.replace(/[^A-Za-z0-9 ]/g, "");

      if (/^[0-9]+$/.test(cleaned)) {
        return "";
      }

      return cleaned;
    }

    // -----------------------------------------
    // 3️⃣ Contact Number → ONLY digits
    // -----------------------------------------
    if (lower.includes("contactno") || lower === "contact") {
      return v.replace(/[^0-9]/g, "").slice(0, 10);
    }

    // -----------------------------------------
    // 4️⃣ Names (first/last/full)
    // -----------------------------------------
    if (
      fieldName.toLowerCase().includes("name") &&
      !fieldName.toLowerCase().includes("username")
    ) {
      v = v.replace(/[^A-Za-z]/g, "");
    }

    // -----------------------------------------
    // 5️⃣ City / State — letters only
    // -----------------------------------------
    if (lower.includes("city") || lower.includes("state")) {
      return v.replace(/[^A-Za-z ]/g, "");
    }

    // -----------------------------------------
    // 6️⃣ Pincode — digits only
    // -----------------------------------------
    if (lower.includes("pincode")) {
      return v.replace(/[^0-9]/g, "").slice(0, 6);
    }

    // -----------------------------------------
    // 7️⃣ Account Number — 18 digits max
    // -----------------------------------------
    if (lower.includes("accountnumber")) {
      return v.replace(/[^0-9]/g, "").slice(0, 18);
    }

    // -----------------------------------------
    // 8️⃣ IFSC Code — A-Z + numbers (max 11)
    // -----------------------------------------
    if (lower.includes("ifsc")) {
      return v
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 11);
    }

    // -----------------------------------------
    // 9️⃣ PAN Number — 5 letters + 4 digits + 1 letter
    // -----------------------------------------
    if (lower.includes("pan")) {
      return v
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10);
    }

    // -----------------------------------------
    // 🔟 Aadhaar Number — 12 digits
    // -----------------------------------------
    if (lower.includes("aadhaar") || lower.includes("aadhar")) {
      return v.replace(/[^0-9]/g, "").slice(0, 12);
    }

    // GSTIN — Only Caps + Numbers, Max 15
    // -----------------------------------------
    if (lower.includes("gstin")) {
      return v
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 15);
    }

    // No of positions → only digits
    // -----------------------------------------
    if (lower.includes("noofpositions") || lower.includes("positions")) {
      return v.replace(/[^0-9]/g, "");
    }

    // -----------------------------------------
    // Preferred age range (example: "18-50")
    // Allow only digits and a single hyphen
    // -----------------------------------------
    if (lower.includes("agerange") || lower.includes("age")) {
      // Allow digits and - (only one)
      let cleaned = v.replace(/[^0-9-]/g, "");

      // Prevent multiple hyphens
      const hyphens = cleaned.split("-").length - 1;
      if (hyphens > 1) {
        cleaned = cleaned.replace(/-+$/, "");
      }

      return cleaned;
    }
    return v;
  };

  function renderInputsByComponentType(getControlItem, index) {
    let nameWithIndex = getControlItem.name;

    if (formType !== null && i >= 0) {
      nameWithIndex = `${formType}.${i}.${getControlItem.name}`;
    }

    const value = getNestedValue(formData, nameWithIndex) || "";

    const errorMessage =
      errors?.[nameWithIndex]?.[0] || errors?.[nameWithIndex];

    const commonInputProps = {
      name: nameWithIndex,
      id: nameWithIndex,
      placeholder: getControlItem.placeholder,
      value,
      onChange: (event) => {
        let val = applyRestrictions(getControlItem.name, event.target.value);

        if (getControlItem.max && val.length > 3) return;

        setFormData((prev) =>
          setNestedValue(
            prev,
            nameWithIndex,
            getControlItem.type === "number" ? Number(val) : val
          )
        );
      },

      onWheel: (e) => e.currentTarget.blur(),

      className: `flex placeholder:translate-y-[1px] items-center justify-center text-black text-base rounded-[4px] border py-[10px] px-[16px] 
          placeholder:text-[#9B959F] ${
            errorMessage ? "border-red-500" : "border-[#E2E2E2]"
          } focus:outline-none focus-visible:ring-0`,
    };

    // -----------------------------------------
    // PHONE COMPONENT
    // -----------------------------------------
    if (getControlItem.componentType === "phone") {
      const phoneObject = getNestedValue(formData, nameWithIndex) || {
        number: "",
        countryCode: "",
      };

      const numberError = errors?.[`${nameWithIndex}.number`];
      const codeError = errors?.[`${nameWithIndex}.countryCode`];

      return (
        <div>
          <PhoneInput
            country={"in"}
            value={(phoneObject.countryCode || "") + (phoneObject.number || "")}
            onChange={(value, countryData) => {
              const dialCode = "+" + countryData.dialCode;
              let number = value.replace(/[^0-9]/g, "");
              number = number.slice(countryData.dialCode.length).slice(0, 10);

              setFormData((prev) =>
                setNestedValue(prev, nameWithIndex, {
                  countryCode: dialCode,
                  number: number,
                })
              );
            }}
            inputClass={`!w-full !h-[44px] !rounded-[4px] !px-[16px] !text-sm !border 
              ${
                numberError || codeError
                  ? "!border-red-500"
                  : "!border-[#E2E2E2]"
              }`}
            buttonClass={`!border-r ${
              numberError || codeError ? "!border-red-500" : "!border-[#E2E2E2]"
            } !bg-white`}
            containerClass="!w-full"
            dropdownClass="!bg-white !text-sm !rounded-md !shadow-lg z-50"
          />

          {(numberError || codeError) && (
            <p className="text-red-500 text-sm mt-1">
              {numberError || codeError}
            </p>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------
    // SWITCH COMPONENTS
    switch (getControlItem.componentType) {
      case "selection":
        return (
          <div className="flex justify-between items-center gap-2">
            {getControlItem.options.map((item) => (
              <div
                key={item.id}
                className="w-full h-11 px-4 py-2.5 bg-white rounded-sm outline-1 outline-neutral-200 
                inline-flex justify-center items-center gap-2 cursor-pointer"
                onClick={() => {
                  setFormData((prev) =>
                    setNestedValue(prev, nameWithIndex, item.id)
                  );
                }}
              >
                <div className="w-full flex justify-center items-center gap-2.5">
                  {item.id === value && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <circle
                        cx="6"
                        cy="6"
                        r="4"
                        fill="white"
                        stroke="#6945ED"
                        strokeWidth="4"
                      />
                    </svg>
                  )}
                  <div className="text-neutral-400 text-sm">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case "input":
        if (getControlItem.type === "password") {
          return (
            <div className="relative w-full">
              <Input
                {...commonInputProps}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9B959F]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          );
        } else {
          return <Input {...commonInputProps} type={getControlItem.type} />;
        }

      case "monthYear":
        return (
          <MonthYearPicker
            name={nameWithIndex}
            formData={formData}
            setFormData={setFormData}
            value={value}
            disabled={disabled}
            index={index}
            errorMessage={errorMessage}
          />
        );

      case "select":
        const isMedicalProblemField =
          getControlItem.name === "hasMedicalProblem";

        const selectedValue = getNestedValue(formData, nameWithIndex) ?? "";
        const showOther = otherSelections?.[getControlItem.name] ?? false;

        return (
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(val) => {
                setFormData((prev) => setNestedValue(prev, nameWithIndex, val));

                setOtherSelections((prev) => ({
                  ...prev,
                  [getControlItem.name]: val === "other",
                }));
              }}
              value={showOther ? "other" : selectedValue}
            >
              <SelectTrigger
                className={`w-full rounded-[4px] border ${
                  errorMessage ? "border-red-500" : "border-[#E2E2E2]"
                } py-[20px] px-[16px]`}
              >
                <SelectValue placeholder={getControlItem.placeholder} />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {getControlItem.options?.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}

                {getControlItem.showOtherInput && (
                  <SelectItem value="other">Other (please specify)</SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Show OTHER input */}
            {getControlItem.showOtherInput && showOther && (
              <Input
                type="text"
                placeholder="Please specify"
                value={selectedValue === "other" ? "" : selectedValue}
                onChange={(e) =>
                  setFormData((prev) =>
                    setNestedValue(prev, nameWithIndex, e.target.value)
                  )
                }
                className={`border ${
                  errorMessage ? "border-red-500" : "border-[#E2E2E2]"
                } rounded-[4px] py-[10px] px-[16px]`}
              />
            )}

            {/* Extra input if gender = yes */}
            {isMedicalProblemField && selectedValue === "yes" && (
              <Input
                type="text"
                placeholder="Specify the medical problem"
                value={getNestedValue(formData, "medicalProblemDetails") || ""}
                onChange={(e) =>
                  setFormData((prev) =>
                    setNestedValue(
                      prev,
                      "medicalProblemDetails",
                      e.target.value
                    )
                  )
                }
                className="border border-[#E2E2E2] rounded-[4px] py-[10px] px-[16px]"
              />
            )}
          </div>
        );

      case "textarea-count":
        const maxWords = getControlItem.maxWords || null;
        const text = value || "";
        const wordCount =
          text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

        return (
          <div className="relative flex flex-col">
            <Textarea
              {...commonInputProps}
              rows={4}
              onChange={(e) => {
                const newVal = e.target.value;
                const count =
                  newVal.trim() === "" ? 0 : newVal.trim().split(/\s+/).length;
                if (maxWords && count > maxWords) return;

                setFormData((prev) =>
                  setNestedValue(prev, nameWithIndex, newVal)
                );
              }}
            />
            {maxWords && (
              <span
                className={`absolute bottom-[-16px] right-0 text-xs ${
                  wordCount > maxWords ? "text-red-500" : "text-gray-500"
                }`}
              >
                {wordCount}/{maxWords} words
              </span>
            )}
          </div>
        );

      case "textarea":
        return (
          <Textarea
            {...commonInputProps}
            rows={4}
            disabled={getControlItem.disabled}
          />
        );
      case "time":
        return (
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue="10:30:00"
            onChange={(event) =>
              setFormData((prev) =>
                setNestedValue(prev, nameWithIndex, event.target.value)
              )
            }
            className={`bg-background appearance-none flex placeholder:translate-y-[1px] 
              text-black text-base rounded-[4px] border py-[10px] px-[16px]
              ${errorMessage ? "border-red-500" : "border-[#E2E2E2]"}`}
          />
        );

      case "salary-range":
        const minSalary =
          getNestedValue(formData, `${nameWithIndex}.min`) || "";
        const maxSalary =
          getNestedValue(formData, `${nameWithIndex}.max`) || "";

        const handleSalaryChange = (type, value) => {
          let num = value.replace(/\D/g, "").slice(0, 3);
          num = num ? Number(num) : "";

          setFormData((prev) => {
            let updated = { ...prev };
            updated = setNestedValue(updated, `${nameWithIndex}.${type}`, num);
            return updated;
          });
        };

        return (
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min Salary"
              value={minSalary}
              onChange={(e) => handleSalaryChange("min", e.target.value)}
              className={`rounded-[4px] border py-[10px] px-[16px] ${
                errors[`${nameWithIndex}.min`]
                  ? "border-red-500"
                  : "border-[#E2E2E2]"
              }`}
            />
            <Input
              type="number"
              placeholder="Max Salary"
              value={maxSalary}
              onChange={(e) => handleSalaryChange("max", e.target.value)}
              className={`rounded-[4px] border py-[10px] px-[16px] ${
                errors[`${nameWithIndex}.max`]
                  ? "border-red-500"
                  : "border-[#E2E2E2]"
              }`}
            />
          </div>
        );

      case "file":
        const fileUrl = getNestedValue(formData, nameWithIndex);
        const fileName =
          fileUrl && typeof fileUrl === "string"
            ? fileUrl.split("/").pop()
            : "";

        const acceptType =
          getControlItem.accept === "image"
            ? "image/*"
            : getControlItem.accept === "pdf"
            ? "application/pdf"
            : "";

        const removeFile = () => {
          setFormData((prev) => setNestedValue(prev, nameWithIndex, ""));
        };

        return (
          <div className="relative">
            <div className="relative w-full cursor-pointer">
              {!fileName && (
                <Input
                  type="file"
                  accept={acceptType}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const isImage = file.type.startsWith("image/");
                    const isPdf = file.type === "application/pdf";
                    const isValidSize = file.size <= 5 * 1024 * 1024;

                    let isValidType = false;
                    if (getControlItem.accept === "image")
                      isValidType = isImage;
                    if (getControlItem.accept === "pdf") isValidType = isPdf;

                    if (!isValidType) {
                      alert(
                        getControlItem.accept === "image"
                          ? "Only images allowed."
                          : "Only PDF allowed."
                      );
                      return;
                    }

                    if (!isValidSize) {
                      alert("File must be smaller than 5MB.");
                      return;
                    }

                    handleUpload(file, (uploadedUrl) => {
                      setFormData((prev) =>
                        setNestedValue(prev, nameWithIndex, uploadedUrl)
                      );
                    });
                  }}
                />
              )}

              <Label
                className={`flex items-center justify-between border ${
                  errorMessage ? "border-red-500" : "border-[#E2E2E2]"
                } rounded-[4px] py-[10px] px-[16px]`}
              >
                <span className="truncate w-60">
                  {fileName || getControlItem.placeholder || "Upload File"}
                </span>

                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (fileName) removeFile();
                  }}
                >
                  {fileName ? (
                    <X className="h-[15px] w-[15px] text-red-500" />
                  ) : (
                    <Plus className="h-[15px] w-[15px]" />
                  )}
                </span>
              </Label>
            </div>

            <div className="text-xs text-[#655F5F] absolute bottom-[-18px]">
              Supported: {getControlItem.accept === "image" ? "Images" : "PDF"},
              Max 5MB
            </div>
          </div>
        );
      case "calendar":
        const isValidDate = value && !isNaN(new Date(value).getTime());
        const [isOpen, setIsOpen] = useState(false);

        // For DOB fields, restrict to 18+ years
        const isDOBField =
          getControlItem.name?.toLowerCase().includes("dob") ||
          getControlItem.name?.toLowerCase().includes("birth");

        const maxDate = isDOBField
          ? (() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 18);
              return date;
            })()
          : undefined;

        // ✅ FIX: Define specific year range for dropdowns (1900 to Current)
        const currentYear = new Date().getFullYear();
        const fromYear = 1900;

        return (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div
                className={`px-4 py-2.5 bg-white rounded outline ${
                  errorMessage ? "outline-red-500" : "outline-neutral-200"
                } cursor-pointer flex justify-between items-center`}
                onClick={() => setIsOpen(true)}
              >
                <span className="text-neutral-400 text-sm">
                  {isValidDate
                    ? new Date(value)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short", // ✅ Shows "Jan", "Feb" etc.
                          year: "numeric",
                        })
                        .replace(/ /g, "/") // ✅ Formats as "12/Jan/2000"
                    : getControlItem.placeholder || "Select Date"}
                </span>

                <CalenderIcon className="h-5 w-5" />
              </div>
            </PopoverTrigger>

            <PopoverContent className="bg-white p-0 w-auto" align="start">
              <Calendar
                mode="single"
                // ✅ THIS enables real month + year dropdowns
                captionLayout="dropdown"
                // ✅ These are REQUIRED for year dropdown to appear
                fromDate={new Date(1900, 0, 1)}
                toDate={new Date(new Date().getFullYear(), 11, 31)}
                selected={isValidDate ? new Date(value) : undefined}
                onSelect={(date) => {
                  setFormData((prev) =>
                    setNestedValue(
                      prev,
                      nameWithIndex,
                      date ? date.toISOString() : ""
                    )
                  );
                  setIsOpen(false); // ✅ fix
                }}
                className="rounded-md border shadow bg-white pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        );

      case "multi-select":
        return (
          <MultiSelectField
            value={value || []}
            max={getControlItem.max}
            options={getControlItem.options || []}
            onChange={(updated) =>
              setFormData((prev) =>
                setNestedValue(prev, nameWithIndex, updated)
              )
            }
            placeholder={getControlItem.placeholder}
            errorMessage={errorMessage}
          />
        );
     
  case "checkbox":
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={nameWithIndex}
        checked={Boolean(value)}
        onCheckedChange={(checked) => {
          setFormData((prev) =>
            setNestedValue(prev, nameWithIndex, Boolean(checked))
          );
        }}
        className="
          h-5 w-5 
          rounded border border-gray-300
          data-[state=checked]:bg-[#6945ED]
          data-[state=checked]:border-[#6945ED]
          data-[state=checked]:text-white
          focus-visible:ring-0
        "
      />

      <Label
        htmlFor={nameWithIndex}
        className="text-sm font-medium cursor-pointer select-none"
      >
        {getControlItem.label}
      </Label>
    </div>
  );


      default:
        return <Input {...commonInputProps} />;
    }
  }
  return (
    <div key={i} className="w-full">
      <div className="flex flex-col gap-[18px] max-sm:gap-[10px]">
        {formControls.map((controlItem, index) => {
          // ---------------------------------------------------
          // ROW FIELDS (like city, state, pincode)
          // ---------------------------------------------------
          // ---------------------------------------------------
          // 1. ROW FIELDS (Nested)
          // ---------------------------------------------------
          if (controlItem.row) {
            return (
              <div
                key={index}
                className="flex gap-[8px] w-full flex-wrap justify-end items-end"
              >
                {controlItem.row.map((item, subIndex) => (
                  <div key={item.name} className="gap-[8px] flex-2/3 lg:flex-1">
                    <div
                      className={`flex flex-col gap-[8px] ${
                        item.componentType === "file" ? "max-sm:mb-2" : ""
                      }`}
                    >
                      {item.label && (
                        <Label className="text-base text-[#20102B] font-semibold">
                          {/* ✅ CHANGE: Increment Serial Number Here */}
                          {showSerialNumber ? `${++fieldIndex}. ` : ""}
                          {item.label}
                          {item.required && (
                            <span className="text-red-500 text-[14px]">*</span>
                          )}
                        </Label>
                      )}

                      {renderInputsByComponentType(item, subIndex)}
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          // ---------------------------------------------------
          // 2. SINGLE FIELDS
          // ---------------------------------------------------
          return (
            <div
              key={controlItem.name}
              className={`flex flex-col gap-[8px] ${
                controlItem.componentType === "file" ? "mb-2" : ""
              }`}
            >
              {controlItem.label && (
                <Label className="text-base text-[#20102B] font-semibold">
                  {/* ✅ CHANGE: Increment Serial Number Here */}
                  {showSerialNumber ? `${++fieldIndex}. ` : ""}
                  {controlItem.label}
                  {controlItem.required && (
                    <span className="text-red-500 text-[14px]">*</span>
                  )}
                </Label>
              )}

              {renderInputsByComponentType(controlItem, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
