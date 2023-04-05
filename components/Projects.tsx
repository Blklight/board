import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProjectContext } from "@/contexts/contexts";
import { Project } from "@/types/types";
import { useContext, useEffect, useState } from "react";

const ShowProject = ({ project_id }: { project_id: string }): JSX.Element => {
  const { projects } = useContext(ProjectContext);
  console.log(projects);
  return (
    <>
      <span>{JSON.stringify(projects)}</span>
    </>
  );
};

export { ShowProject };
