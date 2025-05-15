import React, { useState } from "react";
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
import { getNestedValue, setNestedValue } from "../../utils/objectUtils";
import MultiSelectField from "./MultiSelectField";
import { highestQualification, referenceFields } from "../../config";

export default function CommonForm({ formControls, formData, setFormData, i }) {
  const [showPassword, setShowPassword] = useState(false);
  const [otherSelections, setOtherSelections] = useState({});
  function renderInputsByComponentType(getControlItem, i, formType = null) {
    let nameWithIndex = getControlItem.name;
    if (formType === "references" && i >= 0) {
      nameWithIndex = `references.${i}.${getControlItem.name}`;
    } else if (formType === "highestQualification" && i >= 0) {
      nameWithIndex = `education.${i}.${getControlItem.name}`;
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
      case "phone":
        const fullNumber =
          (formData.phone.countryCode || "") + (formData.phone.number || "");

        return (
          <PhoneInput
            country={"in"}
            value={fullNumber}
            onChange={(value, countryData) => {
              const dialCode = "+" + countryData.dialCode;
              const number = value.slice(countryData.dialCode.length);
              setFormData((prev) => ({
                ...prev,
                phone: {
                  countryCode: dialCode,
                  number: number,
                },
              }));
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

      case "select":
        const isMedicalProblemField = getControlItem.name === "medicalProblem";
        const medicalDetailsValue = formData?.medicalDetails || "";

        const isOtherEnabled = getControlItem.showOtherInput; // decide if "Other" should show input field
        const selectedValue = formData?.[getControlItem.name] ?? "";

        const shouldShowOtherInput =
          otherSelections?.[getControlItem.name] ?? false;

        return (
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(val) => {
                setFormData((prev) => {
                  const updated = { ...prev };

                  if (isOtherEnabled && val === "other") {
                    // "Other" is selected — keep the field empty or use existing value
                    if (getControlItem.inlineOther) {
                      updated[getControlItem.name] = ""; // override same field (like jobSource)
                    } else {
                      updated[getControlItem.name] = "other";
                    }
                  } else {
                    updated[getControlItem.name] = getControlItem.forceNumber
                      ? Number(val)
                      : val;

                    if (!getControlItem.inlineOther) {
                      delete updated[`${getControlItem.name}_other`]; // clean up other field
                    }
                  }

                  // Medical field case
                  if (isMedicalProblemField && val !== "yes") {
                    updated.medicalDetails = "";
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
                  : selectedValue.toString() || ""
              }
            >
              <SelectTrigger className="w-full flex placeholder:translate-y-[1px] items-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[20px] px-[16px] placeholder:text-[#9B959F]">
                <SelectValue placeholder={getControlItem.label} />
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
                    ? formData?.[getControlItem.name] || ""
                    : formData?.[`${getControlItem.name}_other`] || ""
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [getControlItem.inlineOther
                      ? getControlItem.name
                      : `${getControlItem.name}_other`]: e.target.value,
                  }))
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
                  setFormData((prev) => ({
                    ...prev,
                    medicalDetails: e.target.value,
                  }))
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

      case "file":
        return (
          <div className="relative w-full cursor-pointer">
            <Input
              id={getControlItem.name}
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-0 h-full w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    [getControlItem.name]: file,
                  }));
                }
              }}
            />
            <Label
              htmlFor={getControlItem.name}
              className="flex items-center justify-between border border-[#E2E2E2] w-full rounded-[4px] py-[9px] px-[16px] cursor-pointer z-10"
            >
              <span className="text-[#9B959F] text-base">
                {getControlItem.placeholder || "Upload File"}
              </span>
              <span className="flex justify-center items-center">
                <Plus className="h-[15px] w-[15px]" />
              </span>
            </Label>
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
                className="self-stretch h-11 px-4 py-2.5 bg-white rounded outline outline-neutral-200 inline-flex justify-start items-center gap-2 cursor-pointer"
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={isValidDate ? new Date(value) : undefined}
                defaultMonth={isValidDate ? new Date(value) : undefined}
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
          />
        );

      default:
        return <Input {...commonInputProps} type={getControlItem.type} />;
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-[18px] max-sm:gap-[10px]">
        {formControls.map((controlItem, index) => {
          const isReferenceForm = formControls === referenceFields;
          const isQualificationForm = formControls === highestQualification;
          const formType = isReferenceForm
            ? "references"
            : isQualificationForm
            ? "highestQualification"
            : null;
          if (controlItem.row) {
            return (
              <div
                key={index}
                className="flex gap-[8px] flex-wrap justify-end items-end"
              >
                {controlItem.row.map((item) => (
                  <div
                    key={item.name}
                    className=" gap-[8px] flex-1/3 lg:flex-1"
                  >
                    <div className={`flex flex-col gap-[8px]`}>
                      {item.label && (
                        <Label className="text-base text-[#20102B] font-medium">
                          {i >= 0 ? `${item.label} - ${i + 1}` : item.label}
                        </Label>
                      )}
                      {renderInputsByComponentType(item, i, formType)}
                    </div>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div key={controlItem.name} className="flex flex-col gap-[8px]">
                {controlItem.label && (
                  <Label className="text-base text-[#20102B] font-semibold">
                    {controlItem.label}
                  </Label>
                )}
                {renderInputsByComponentType(controlItem, i, formType)}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
