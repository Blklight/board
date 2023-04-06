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
  const [project, setProject] = useState<Project>();
  // console.log(projects);

  useEffect(() => {
    if (project_id) {
      const projectFound = projects.find((obj) => obj.id === project_id);
      setProject(projectFound);
    }
  }, [project_id, projects]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <span>{project?.name}</span>
        </PopoverTrigger>
        <PopoverContent align="end" alignOffset={-6} sideOffset={8}>
          <div className="flex">
            <img
              src={project?.logo ? project?.logo : "/images/blklight-thumb.jpg"}
              className="w-10 h-10 object-cover rounded-full"
              alt=""
            />
            <div className="ml-2">
              <h4 className="text-lg font-bold">{project?.name}</h4>
              <p className="text-dark-500 dark:text-light-500">
                {project?.description}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export { ShowProject };
