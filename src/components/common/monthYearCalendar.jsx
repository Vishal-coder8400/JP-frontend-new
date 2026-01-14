import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { setNestedValue } from "../../utils/commonFunctions";

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentYear = new Date().getFullYear();
const pastYears = 30;
const futureYears = 10;

const years = Array.from(
  { length: pastYears + futureYears + 1 },
  (_, i) => currentYear + futureYears - i
);

export default function MonthYearPicker({
  name,
  index,
  setFormData,
  value,
  disabled,
  errorMessage,
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("year");
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearSelect = (year) => {
    if (disabled && index === 1) return;
    setSelectedYear(year);
    setStep("month");
  };
  const handleMonthSelect = (monthIndex) => {
    if (disabled && index === 1) return;
    if (selectedYear !== null) {
      const formatted = `${String(monthIndex + 1).padStart(2, "0")}/${String(
        selectedYear
      ).slice(-2)}`;
      setFormData((prev) => setNestedValue(prev, name, formatted));
      setOpen(false);
      setStep("year");
      setSelectedYear(null);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={disabled && index === 1 ? null : setOpen}
    >
      <PopoverTrigger asChild>
        <div
          onClick={() => setOpen(disabled && index === 1 ? null : !open)}
          className={`w-full self-stretch px-4 py-2.5 bg-white rounded outline ${
            errorMessage ? "outline-red-500" : "outline-neutral-200"
          } inline-flex justify-start items-center gap-2 cursor-pointer text-neutral-400 text-sm font-normal leading-normal`}
        >
          {value ? (
            <span className="text-black">{value}</span>
          ) : (
            "Select Month & Year"
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] bg-white">
        {open && step === "year" && (
          <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto bg-white">
            {years.map((year) => (
              <Button
                key={year}
                variant="ghost"
                onClick={() => handleYearSelect(year)}
                className="cursor-pointer focus-visible:ring-0"
              >
                {year}
              </Button>
            ))}
          </div>
        )}
        {open && step === "month" && (
          <div className="grid grid-cols-3 gap-2 text-center">
            {months.map((month, index) => (
              <Button
                key={index}
                className="cursor-pointer"
                variant="ghost"
                onClick={() => handleMonthSelect(index)}
              >
                {month}
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
