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
import { priority } from "@/lib/data";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
};

const Status = ({ getStatus }: any) => {
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
      value: "in progress",
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[200px] w-full justify-start shadow-md"
        >
          {selectedStatus ? (
            <>
              <selectedStatus.icon className="mr-2 h-5 w-5 shrink-0" />
              {selectedStatus.label}
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" /> Set status
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  onSelect={(label) => {
                    setSelectedStatus(
                      statuses.find((item) => item.value === label) || null
                    );
                    getStatus(status.value);
                    setOpen(false);
                  }}
                >
                  <status.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      status.value === selectedStatus?.value
                        ? "opacity-100"
                        : "opacity-50"
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
  );
};

export default Status;
