import { useState } from "react";
import {
  PlusCircle,
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
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

const Status = () => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const statuses = [
    {
      id: 1,
      label: "Backlog",
      value: "backlog",
      icon: HelpCircle,
    },
    {
      id: 2,
      label: "Todo",
      value: "todo",
      icon: Circle,
    },
    {
      id: 3,
      label: "In Progress",
      value: "inProgress",
      icon: ArrowUpCircle,
    },
    {
      id: 4,
      label: "Done",
      value: "done",
      icon: CheckCircle2,
    },
    {
      id: 5,
      label: "Canceled",
      value: "canceled",
      icon: XCircle,
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      <p className="text-base font-medium text-dark-500 dark:text-light-500">
        Status:
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[180px] justify-start shadow-md"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-5 w-5 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" /> Definir status
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Status;
