import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalenderIcon } from "@/utils/icon";

export default function DateRangeFilter({
  name,
  formData,
  setFormData,
  label = "Date Range",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dateRange = formData[name] || { from: null, to: null };

  const handleDateSelect = (field, date) => {
    const newRange = {
      ...dateRange,
      [field]: date
        ? new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          ).toISOString()
        : null,
    };

    setFormData((prev) => ({
      ...prev,
      [name]: newRange,
    }));
  };

  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) {
      return "Select Date Range";
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
    } else if (dateRange.from) {
      return `From ${formatDate(dateRange.from)}`;
    } else if (dateRange.to) {
      return `To ${formatDate(dateRange.to)}`;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            className="py-[6px] px-[10px] bg-white rounded outline outline-neutral-200 inline-flex justify-start items-center gap-2 cursor-pointer"
          >
            <div className="flex-1 justify-start text-[#655F5F] text-sm font-normal leading-normal">
              <span
                className={dateRange.from || dateRange.to ? "text-black" : ""}
              >
                {formatDateRange()}
              </span>
            </div>
            <div className="w-5 h-5 relative overflow-hidden">
              <CalenderIcon className="h-full w-full" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 bg-white" align="start">
          <div className="flex gap-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                From Date
              </Label>
              <Calendar
                mode="single"
                selected={dateRange.from ? new Date(dateRange.from) : undefined}
                onSelect={(date) => handleDateSelect("from", date)}
                className="rounded-md border bg-white"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">To Date</Label>
              <Calendar
                mode="single"
                selected={dateRange.to ? new Date(dateRange.to) : undefined}
                onSelect={(date) => handleDateSelect("to", date)}
                className="rounded-md border bg-white"
                disabled={(date) => {
                  if (!dateRange.from) return false;
                  return date < new Date(dateRange.from);
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
