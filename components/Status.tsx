import { useState } from "react";
import { PlusCircle } from "lucide-react";

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
import { statuses } from "@/lib/data";
import { Status } from "@/types/types";

const Status = ({ getStatus }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

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

const ShowStatus = ({ status = "backlog" }: any) => {
  const [statusToShow, setStatusToShow] = useState<Status | null>((): any =>
    statuses.find((obj) => obj.value === status)
  );

  return (
    <>
      {statusToShow && (
        <>
          <div
            className={`inline-flex items-center px-2 py-1 rounded font-medium tracking-wider leading-normal ${statusToShow.style}`}
          >
            <statusToShow.icon className="mr-2 h-4 w-4" />
            {statusToShow.label}
          </div>
        </>
      )}
    </>
  );
};

export { Status, ShowStatus };
