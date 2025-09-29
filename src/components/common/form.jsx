import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [otherSelections, setOtherSelections] = useState({});
  function renderInputsByComponentType(getControlItem, index) {
    let nameWithIndex = getControlItem.name;
    if (formType !== null && i >= 0) {
      nameWithIndex = `${formType}.${i}.${getControlItem.name}`;
    }
    const value = getNestedValue(formData, nameWithIndex) || "";
    const commonInputProps = {
      name: nameWithIndex,
      id: nameWithIndex,
      placeholder: getControlItem.placeholder,
      value,
      onChange: (event) =>
        setFormData((prev) =>
          setNestedValue(
            prev,
            nameWithIndex,
            getControlItem.type === "number"
              ? Number(event.target.value)
              : event.target.value
          )
        ),
      className:
        "flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]",
    };

    switch (getControlItem.componentType) {
      case "selection":
        return (
          <div className="flex justify-between items-center gap-2">
            {getControlItem.options.map((item) => (
              <div
                key={item.id}
                className="w-full h-11 px-4 py-2.5 bg-white rounded-sm outline-1 outline-neutral-200 inline-flex justify-center items-center gap-2 cursor-pointer"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    [getControlItem.name]: item.id,
                  }));
                }}
              >
                <div className="w-full self-stretch flex justify-center items-center gap-2.5">
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
                  <div className="justify-start text-neutral-400 text-sm font-normal">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "phone":
        const phoneObject = getNestedValue(formData, nameWithIndex) || {
          number: "",
          countryCode: "",
        };
        const fullNumber =
          (phoneObject.countryCode || "") + (phoneObject.number || "");

        return (
          <PhoneInput
            country={"in"}
            value={fullNumber}
            onChange={(value, countryData) => {
              const dialCode = "+" + countryData.dialCode;
              const number = value.slice(countryData.dialCode.length);
              setFormData((prev) =>
                setNestedValue(prev, nameWithIndex, {
                  countryCode: dialCode,
                  number: number,
                })
              );
            }}
            inputClass="!w-full !h-[44px] !rounded-[4px] !px-[16px] !text-sm !border !border-[#E2E2E2] !placeholder:text-[#9B959F] focus:!ring-1 focus:!ring-black focus:!outline-none"
            buttonClass="!border-r !border-[#E2E2E2] !bg-white"
            containerClass="!w-full"
            dropdownClass="!bg-white !text-sm !rounded-md !shadow-lg z-50"
            placeholder={getControlItem.placeholder || "Enter phone number"}
          />
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9B959F] text-md"
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
          />
        );
      case "select":
        const isMedicalProblemField =
          getControlItem.name === "hasMedicalProblem";
        const medicalDetailsValue =
          getNestedValue(formData, "medicalProblemDetails") || "";

        const isOtherEnabled = getControlItem.showOtherInput; // Decide if "Other" should show input field
        const selectedValue = getNestedValue(formData, nameWithIndex) ?? ""; // Dynamically get the value

        const shouldShowOtherInput =
          otherSelections?.[getControlItem.name] ?? false;

        return (
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(val) => {
                setFormData((prev) => {
                  let updated = { ...prev };

                  if (isOtherEnabled && val === "other") {
                    // "Other" is selected — keep the field empty or use existing value
                    if (getControlItem.inlineOther) {
                      updated = setNestedValue(updated, nameWithIndex, ""); // Override same field (like jobSource)
                    } else {
                      updated = setNestedValue(updated, nameWithIndex, "other");
                    }
                  } else {
                    updated = setNestedValue(updated, nameWithIndex, val);

                    if (!getControlItem.inlineOther) {
                      // Clean up other field if it exists
                      const otherFieldPath = `${nameWithIndex}_other`;
                      const existingOtherValue = getNestedValue(
                        updated,
                        otherFieldPath
                      );
                      if (existingOtherValue !== undefined) {
                        delete getNestedValue(updated, otherFieldPath);
                      }
                    }
                  }

                  return updated;
                });

                setOtherSelections((prev) => ({
                  ...prev,
                  [getControlItem.name]: val === "other",
                }));
              }}
              value={
                isOtherEnabled && shouldShowOtherInput
                  ? "other"
                  : selectedValue || ""
              }
            >
              <SelectTrigger className="w-full flex placeholder:translate-y-[1px] items-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[20px] px-[16px] data-[placeholder]:text-[#9B959F]">
                <SelectValue placeholder={getControlItem?.placeholder} />
              </SelectTrigger>
              <SelectContent className={"bg-white"}>
                {getControlItem.options?.length > 0 &&
                  getControlItem.options.map((optionItem) => (
                    <SelectItem
                      key={optionItem.id}
                      value={optionItem.id}
                      className="cursor-pointer hover:bg-gray-300"
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))}

                {isOtherEnabled && (
                  <SelectItem
                    value="other"
                    className="cursor-pointer hover:bg-gray-300"
                  >
                    Other (please specify)
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Show "Other" input if selected */}
            {isOtherEnabled && shouldShowOtherInput && (
              <Input
                type="text"
                placeholder="Please specify"
                value={
                  getControlItem.inlineOther
                    ? getNestedValue(formData, nameWithIndex) || ""
                    : getNestedValue(formData, `${nameWithIndex}_other`) || ""
                }
                onChange={(e) =>
                  setFormData((prev) =>
                    setNestedValue(
                      prev,
                      getControlItem.inlineOther
                        ? nameWithIndex
                        : `${nameWithIndex}_other`,
                      e.target.value
                    )
                  )
                }
                className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
              />
            )}

            {/* Medical Problem Details */}
            {isMedicalProblemField && selectedValue === "yes" && (
              <Input
                type="text"
                placeholder="Specify the medical problem"
                value={medicalDetailsValue}
                onChange={(e) =>
                  setFormData((prev) =>
                    setNestedValue(
                      prev,
                      "medicalProblemDetails",
                      e.target.value
                    )
                  )
                }
                className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
              />
            )}
          </div>
        );
      case "textarea":
        return (
          <Textarea
            {...commonInputProps}
            id={getControlItem.id || getControlItem.name}
            rows={4}
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
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
          />
        );
      case "salary-range":
        const minSalary =
          getNestedValue(formData, `${nameWithIndex}.min`) || "";
        const maxSalary =
          getNestedValue(formData, `${nameWithIndex}.max`) || "";

        const handleSalaryChange = (type, value) => {
          let num = value.replace(/\D/g, ""); // Allow only numbers
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
              min={0}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
            />
            <Input
              type="number"
              placeholder="Max Salary"
              value={maxSalary}
              onChange={(e) => handleSalaryChange("max", e.target.value)}
              min={0}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
            />
          </div>
        );

      case "file":
        const [fileNames, setFileNames] = useState("");
        const acceptType =
          getControlItem.accept === "image"
            ? "image/*"
            : getControlItem.accept === "pdf"
            ? "application/pdf"
            : "";

        const handleRemoveFile = () => {
          setFormData(
            (prev) => setNestedValue(prev, nameWithIndex, "") // Clear uploaded file URL
          );
          setFileNames("");
        };

        return (
          <div className="relative">
            <div className="relative w-full cursor-pointer">
              {!fileNames && (
                <Input
                  id={getControlItem.name}
                  type="file"
                  accept={acceptType}
                  className={`absolute inset-0 opacity-0 cursor-pointer z-0 h-full w-full`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const isImage = file.type.startsWith("image/");
                    const isPdf = file.type === "application/pdf";
                    const isValidSize = file.size <= 5 * 1024 * 1024;

                    let isValidType = false;

                    if (getControlItem.accept === "image") {
                      isValidType = isImage;
                    } else if (getControlItem.accept === "pdf") {
                      isValidType = isPdf;
                    }

                    if (!isValidType) {
                      alert(
                        getControlItem.accept === "image"
                          ? "Only image files are allowed."
                          : "Only PDF files are allowed."
                      );
                      return;
                    }

                    if (!isValidSize) {
                      alert("File must be smaller than 5MB.");
                      return;
                    }

                    handleUpload(file, (uploadedFileUrl, fileName) => {
                      setFormData((prev) =>
                        setNestedValue(prev, nameWithIndex, uploadedFileUrl)
                      );
                      setFileNames(fileName);
                    });
                  }}
                />
              )}
              <Label
                htmlFor={!fileNames ? getControlItem.name : undefined}
                className="flex items-center justify-between border border-[#E2E2E2] w-full rounded-[4px] py-[9px] px-[16px] cursor-pointer z-10"
              >
                <span
                  className={`${
                    fileNames === "" ? "text-[#9B959F]" : "text-black"
                  } text-base truncate w-60`}
                >
                  {fileNames || getControlItem.placeholder || "Upload File"}
                </span>

                <span
                  className="flex justify-center items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // stops file dialog from opening
                    if (fileNames !== "") handleRemoveFile();
                  }}
                >
                  {fileNames === "" ? (
                    <Plus className="h-[15px] w-[15px]" />
                  ) : (
                    <X className="h-[15px] w-[15px] text-red-500 cursor-pointer" />
                  )}
                </span>
              </Label>
            </div>
            <div className="absolute bottom-[-20px] left-0 text-xs text-[#655F5F]">
              Supported formats:{" "}
              {getControlItem.accept === "image" ? "Images only" : "PDF only"},{" "}
              Max size: 5MB.
            </div>
          </div>
        );

      case "calendar":
        const isValidDate = value && !isNaN(new Date(value).getTime());
        const [isOpen, setIsOpen] = useState(false);
        return (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div
                onClick={() => setIsOpen(true)}
                className="self-stretch px-4 py-2.5 bg-white rounded outline outline-neutral-200 inline-flex justify-start items-center gap-2 cursor-pointer"
              >
                <div className="flex-1 self-stretch flex justify-start items-start gap-2.5">
                  <div className="flex-1 justify-start text-neutral-400 text-sm font-normal leading-normal">
                    {isValidDate ? (
                      <span className="text-black">
                        {new Date(value).toLocaleDateString("en-US", {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      getControlItem.placeholder || "Select Date"
                    )}
                  </div>
                </div>
                <div className="w-5 h-5 relative overflow-hidden">
                  <CalenderIcon className="h-full w-full" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={isValidDate ? new Date(value) : undefined}
                defaultMonth={isValidDate ? new Date(value) : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setFormData((prev) =>
                    setNestedValue(
                      prev,
                      nameWithIndex,
                      date
                        ? new Date(
                            Date.UTC(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                          ).toISOString()
                        : ""
                    )
                  );
                  setIsOpen(false);
                }}
                className="rounded-md border shadow bg-white calendar"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case "multi-select":
        const selectedItems = value || [];

        return (
          <MultiSelectField
            value={selectedItems}
            max={getControlItem.max || 3}
            options={getControlItem.options || []}
            onChange={(updatedItems) =>
              setFormData((prev) =>
                setNestedValue(prev, getControlItem.name, updatedItems)
              )
            }
            placeholder={getControlItem.placeholder || "Select options..."}
          />
        );

      default:
        return <Input {...commonInputProps} type={getControlItem.type} />;
    }
  }

  return (
    <div key={i} className="w-full">
      <div className="flex flex-col gap-[18px] max-sm:gap-[10px]">
        {formControls.map((controlItem, index) => {
          if (controlItem.row) {
            return (
              <div
                key={index}
                className="flex gap-[8px] w-full flex-wrap justify-end items-end"
              >
                {controlItem.row.map((item, i) => (
                  <div
                    key={item.name}
                    className={`gap-[8px] flex-2/3 lg:flex-1`}
                  >
                    <div
                      className={`flex flex-col gap-[8px] ${
                        item.componentType === "file" ? "max-sm:mb-2" : ""
                      }`}
                    >
                      {item.label && (
                        <Label className="text-base text-[#20102B] font-semibold">
                          {item.label}
                        </Label>
                      )}
                      {renderInputsByComponentType(item, i)}
                    </div>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div
                key={controlItem.name}
                className={`flex flex-col gap-[8px] ${
                  controlItem.componentType === "file" ? "mb-2" : ""
                }`}
              >
                {controlItem.label && (
                  <Label className="text-base text-[#20102B] font-semibold">
                    {controlItem.label}
                  </Label>
                )}
                {renderInputsByComponentType(controlItem, index)}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
