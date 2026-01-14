import { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { ArrowDown } from "../../utils/icon";

export default function MultiSelectField({
  value = [],
  options = [],
  onChange,
  max = 3,
  placeholder,
  errorMessage,
}) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // ✅ Select from dropdown
  const handleSelect = (item) => {
    if (value.find((s) => s.id === item.id)) return;
    if (value.length >= max) return;

    onChange([...value, item]);
    setInputValue("");
  };

  // ✅ Add custom skill
  const handleAddCustom = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // prevent duplicates
    if (
      value.some(
        (v) => v.label.toLowerCase() === trimmed.toLowerCase()
      )
    )
      return;

    if (value.length >= max) return;

    const customSkill = {
      id: `custom-${Date.now()}`,
      label: trimmed,
      isCustom: true,
    };

    onChange([...value, customSkill]);
    setInputValue("");
    setOpen(false);
  };

  const handleRemove = (item) => {
    onChange(value.filter((s) => s.id !== item.id));
  };

  const filteredOptions =
    value.length >= max
      ? []
      : options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.some((s) => s.id === opt.id)
        );

  return (
    <div className="w-full">
      <Command className="overflow-visible">
        <div className="flex flex-wrap gap-1">
          {/* Selected chips */}
          {value.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1 bg-gray-200 text-sm rounded-full px-2 py-1"
            >
              {item.label}
              <X
                className="size-3 ml-1 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => handleRemove(item)}
              />
            </div>
          ))}

          {/* Input */}
          <div className="relative w-full">
            <Input
              type="text"
  value={inputValue}
  placeholder={placeholder}
  onChange={(e) => setInputValue(e.target.value)}
  onFocus={() => setOpen(true)}
  onKeyDownCapture={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleAddCustom();
    }
  }}
  onBlur={() => setTimeout(() => setOpen(false), 150)}
              className={`py-[10px] px-[16px] text-base placeholder:text-[#9B959F] ${
                errorMessage
                  ? "border-red-500"
                  : "border-[#E2E2E2]"
              }`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <ArrowDown />
            </span>
          </div>
        </div>

        {/* Dropdown */}
        {open && filteredOptions.length > 0 && (
          <div className="relative mt-2">
            <CommandList className="absolute z-10 w-full rounded-md border bg-white shadow-md max-h-60 overflow-auto">
              <CommandGroup>
                {filteredOptions.map((item) => (
                  <CommandItem key={item.id} className="!p-0 !bg-transparent">
                    <div
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelect(item);
                      }}
                      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      {item.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>

      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
