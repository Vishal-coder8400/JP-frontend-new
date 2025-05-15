import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { X } from "lucide-react";
import { Input } from "../ui/input";

export default function MultiSelectField({
  value = [],
  options = [],
  onChange,
  max = 3,
}) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    if (value.find((s) => s.id === item.id)) return;

    const updated = value.length >= 3 ? value : [...value, item];
    onChange(updated);
    setInputValue("");
  };

  const handleRemove = (item) => {
    const updated = value.filter((s) => s.id !== item.id);
    onChange(updated);
  };

  const filteredOptions =
    value.length >= max
      ? [] // Don't show any options
      : options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.some((s) => s.id === opt.id)
        );

  return (
    <div className="w-full">
      <Command className="overflow-visible">
        <div className="text-sm">
          <div className="flex flex-wrap gap-1">
            {value.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1 bg-gray-200 text-sm rounded-full px-2 py-1"
              >
                {item.label}
                <X
                  className="size-3 ml-2 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemove(item)}
                />
              </div>
            ))}
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setOpen(true)}
              onBlur={() => {
                setTimeout(() => {
                  setOpen(false);
                }, 150);
              }}
              placeholder="Select options..."
              className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
            />
          </div>
        </div>

        {open && (
          <div className="relative mt-2">
            <CommandList className="absolute z-10 w-full rounded-md border bg-white shadow-md max-h-60 overflow-auto">
              <CommandGroup>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item) => (
                    <CommandItem key={item.id} className="!p-0 !bg-transparent">
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(item);
                        }}
                        className="cursor-pointer px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 w-full"
                      >
                        {item.label}
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No options found
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
