import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { setNestedValue } from "../../utils/commonFunctions";
import { CalenderIcon } from "../../utils/icon";
import { MultiSelectFilter } from "./multiselectFilter";
import SalaryRangeFilter from "./rangeFilter";

export default function FilterComponent({
  formControls,
  formData,
  setFormData,
}) {
  const [calendarStates, setCalendarStates] = useState({});

  const toggleCalendar = (name, isOpen) => {
    setCalendarStates((prev) => ({
      ...prev,
      [name]: isOpen,
    }));
  };

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="focus-visible:ring-0 data-[placeholder]:text-sm w-full rounded-[4px] data-[placeholder]:text-[#655F5F] px-[10px] py-[6px] text-sm cursor-pointer">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={optionItem.id}
                      value={optionItem.id}
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "calendar": {
        const isValidDate = value && !isNaN(new Date(value).getTime());
        const isOpen = calendarStates[getControlItem.name] || false;

        return (
          <Popover
            open={isOpen}
            onOpenChange={(open) => toggleCalendar(getControlItem.name, open)}
          >
            <PopoverTrigger asChild>
              <div
                onClick={() => toggleCalendar(getControlItem.name, true)}
                className="self-stretch  py-[6px] px-[10px] bg-white rounded outline outline-neutral-200 inline-flex justify-start items-center gap-2 cursor-pointer"
              >
                <div className="flex-1 self-stretch flex justify-start items-start gap-2.5">
                  <div className="flex-1 justify-start text-[#655F5F] text-sm font-normal leading-normal">
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
                month={isValidDate ? new Date(value) : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setFormData((prev) =>
                    setNestedValue(
                      prev,
                      getControlItem.name,
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
                  toggleCalendar(getControlItem.name, false);
                }}
                className="rounded-md border shadow bg-white calendar"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      }
      case "multi-select":
        return (
          <MultiSelectFilter
            key={getControlItem.name}
            name={getControlItem.name}
            options={getControlItem.options}
            formData={formData}
            setFormData={setFormData}
            placeholder={getControlItem.placeholder}
          />
        );
      case "salary-range":
        return (
          <SalaryRangeFilter
            key={getControlItem.name}
            name={getControlItem.name}
            min={getControlItem.min}
            max={getControlItem.max}
            formData={formData}
            setFormData={setFormData}
          />
        );

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col items-start gap-[23px] w-full">
      {formControls.map((controlItem) => {
        return (
          <div
            key={controlItem.name}
            className="flex flex-col gap-[10px] w-full"
          >
            {controlItem.label && (
              <Label className="text-base text-[#A0AEC0] font-medium">
                {controlItem.label}
              </Label>
            )}
            {renderInputsByComponentType(controlItem)}
          </div>
        );
      })}
    </div>
  );
}
