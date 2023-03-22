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
  // console.log(
  //   "Find:",
  //   projects.find(
  //     (project: any) => project.id === "4ed1ad5a-4518-431a-bd4a-2b1f188a8d2c"
  //   )
  // );
  // console.log(selectedProject);

  return (
    <div className="flex items-center md:space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[200px] justify-start shadow-md"
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
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Choose a project..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {projects.map((project: any) => (
                  <CommandItem
                    key={project.id}
                    onSelect={(project) => {
                      console.log("87:", project);
                      setSelectedProject(
                        projects.find((item: any) => item.id === project) ||
                          null
                      );
                      getProject(selectedProject);
                      setOpen(false);
                    }}
                  >
                    <span key={project.id}>{project.name}</span>
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

export default SelectProject;
