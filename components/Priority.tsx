import { useState } from "react";
import {
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Signal,
  LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utilities";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
};

type Priority = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
};

const Priority = () => {
  const [open, setOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );

  const priorities = [
    {
      id: 1,
      label: "Heavy Low",
      value: "heavy low",
      icon: SignalZero,
    },
    {
      id: 2,
      label: "Low",
      value: "low",
      icon: SignalLow,
    },
    {
      id: 3,
      label: "Medium",
      value: "medium",
      icon: SignalMedium,
    },
    {
      id: 4,
      label: "High",
      value: "high",
      icon: SignalHigh,
    },
    {
      id: 5,
      label: "Heavy High",
      value: "heavy high",
      icon: Signal,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[200px] w-full justify-start shadow-md"
        >
          {selectedPriority ? (
            <>
              <selectedPriority.icon className="mr-2 h-6 w-6 shrink-0" />
              {selectedPriority.label}
            </>
          ) : (
            <>
              <Signal className="mr-2 h-6 w-6" /> Set priority
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Change priority..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {priorities.map((priority) => (
                <CommandItem
                  key={priority.value}
                  onSelect={(value) => {
                    setSelectedPriority(
                      priorities.find((priority) => priority.value === value) ||
                        null
                    );
                    setOpen(false);
                  }}
                >
                  <priority.icon
                    className={cn(
                      "mr-2 h-6 w-6",
                      priority.value === selectedPriority?.value
                        ? "opacity-100"
                        : "opacity-50"
                    )}
                  />
                  <span>{priority.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Priority;
