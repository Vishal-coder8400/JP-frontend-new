import { useState } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SalaryRangeFilter({
  name,
  formData,
  setFormData,
  min = 0,
  max = 100,
}) {
  const [range, setRange] = useState(formData[name] || [min, max]);

  const handleChange = (newRange) => {
    setRange(newRange);
    setFormData((prev) => ({ ...prev, [name]: newRange }));
  };

  const handleInput = (index, value) => {
    const numericValue = Number(value);
    const newRange = [...range];
    newRange[index] = numericValue;
    handleChange(newRange);
  };

  return (
    <div className="space-y-2">
      <RadixSlider.Root
        className="relative flex w-full touch-none select-none items-center"
        value={range}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={1}
      >
        {/* Track */}
        <RadixSlider.Track className="relative h-2 w-full grow rounded-full bg-gray-200 overflow-hidden">
          <RadixSlider.Range className="absolute h-full bg-[#6945ED] rounded-full" />
        </RadixSlider.Track>

        {/* Thumbs with opposite shadows */}
        <RadixSlider.Thumb className="block h-5 w-5 rounded-full border-2 border-white bg-white shadow-[0_2px_7px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-1 focus:ring-[#6945ED] cursor-pointer z-10" />
        <RadixSlider.Thumb className="block h-5 w-5 rounded-full border-2 border-white bg-white shadow-[0_2px_7px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-1 focus:ring-[#6945ED] cursor-pointer z-10" />
      </RadixSlider.Root>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-xs">Min</Label>
          <Input
            type="text"
            value={range[0]}
            onChange={(e) =>
              handleInput(
                0,
                !Number(e.target.value) ? 0 : Number(e.target.value)
              )
            }
            className="w-full flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[6px] px-[10px] placeholder:text-[#9B959F]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-xs">Max</Label>
          <Input
            type="text"
            value={range[1]}
            onChange={(e) =>
              handleInput(
                1,
                !Number(e.target.value) ? 0 : Number(e.target.value)
              )
            }
            className="w-full flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[6px] px-[10px] placeholder:text-[#9B959F]"
          />
        </div>
      </div>
    </div>
  );
}
