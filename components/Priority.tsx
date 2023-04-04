import { useState } from "react";
import { Signal } from "lucide-react";

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

import { priorities } from "@/lib/data";
import { Priority } from "@/types/types";

const Priority = ({ getPriority }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );

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
                    getPriority(priority.value);
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

const ShowPriority = ({ priority }: any) => {
  const [priorityToShow, setPriorityToShow] = useState<Priority | null>(
    (): any => priorities.find((obj) => obj.value === priority)
  );

  return (
    <>
      {priorityToShow && (
        <div
          className={`flex items-center px-2 font-bold leading-normal tracking-wide rounded ${priorityToShow.style}`}
        >
          <priorityToShow.icon className="mr-1 h-5 w-5" />
          {priorityToShow.label}
        </div>
      )}
    </>
  );
};

export { Priority, ShowPriority };
