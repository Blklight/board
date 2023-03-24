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

interface Board {
  id: String;
  title: String;
  description: String;
  status: String;
  label: String;
  priority: Number;
  createdAt: String;
  updatedAt: String;
}

interface Project {
  id: String;
  name: String;
  createdAt: String;
  updatedAt: null;
  boards?: Array<Board>;
}

const SelectProject = ({ projects, getProject }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const items = projects.map((project: any) => {
    return {
      id: project.id,
      name: project.name,
    };
  });

  const Item = (project: any) => {
    return (
      <>
        <span
          id={project.id}
          className="relative flex cursor-pointer select-none items-center rounded-md py-1.5 px-2 text-sm font-medium outline-none aria-selected:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-slate-700"
        >
          {project.name}
        </span>
      </>
    );
  };

  return (
    <div className="flex items-center md:space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="default"
            className="min-w-[200px] w-full justify-start shadow-md"
          >
            {selectedProject ? (
              <>{selectedProject.name}</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" /> Choose a Project
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Choose a project..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {projects.length > 0 ? (
                  projects.map((project: any) => (
                    <CommandItem
                      key={project.id}
                      onSelect={(value) => {
                        setSelectedProject(project);
                        getProject(project.id);
                        setOpen(false);
                      }}
                    >
                      <span>{project.name}</span>
                    </CommandItem>
                  ))
                ) : (
                  <span className="text-center"> Projects not found.</span>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectProject;
