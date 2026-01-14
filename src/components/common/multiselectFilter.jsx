import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { getNestedValue } from "../../utils/commonFunctions";

export function MultiSelectFilter({
  name,
  options,
  formData,
  setFormData,
  placeholder = "Select options...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = getNestedValue(formData, name) || [];

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setFormData((prev) => ({ ...prev, [name]: updated }));
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.id))
    .map((opt) => opt.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={`w-full font-medium border rounded-md px-[10px] py-[6px] text-sm flex items-center justify-between cursor-pointer
            ${!selected.length ? "text-[#655F5F]" : "text-[#000] border-[#000]"}
          `}
        >
          <span>{selectedLabels.join(", ") || placeholder}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white">
        <Command className="">
          <CommandInput
            placeholder="Search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="w-full max-h-60 overflow-y-auto custom-command-item">
            <CommandEmpty>No results found.</CommandEmpty>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => handleSelect(option.id)}
                className="flex gap-2"
              >
                <Checkbox
                  checked={selected.includes(option.id)}
                  onCheckedChange={() => handleSelect(option.id)}
                  id={option.id}
                  className="cursor-pointer h-[16px] w-[16px]"
                />
                <label htmlFor={option.id} className="text-sm cursor-pointer">
                  {option.label}
                </label>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
