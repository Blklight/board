import { format } from "date-fns";

import { ShowStatus } from "@/components/Status";

import { CardTaskProp, ProjectCardProp } from "@/types/types";
import { ShowPriority } from "@/components/Priority";
import { statuses } from "@/lib/data";
import { Tags } from "lucide-react";

const TaskCard = ({ card }: CardTaskProp) => {
  const borderCard = statuses.find((obj) => obj.value === card.status);
  console.log(borderCard);
  return (
    <>
      {card && (
        <div
          className={`bg-light-500 dark:bg-dark-500 dark:text-light-500 border p-4 rounded-lg relative shadow-lg my-2 ${borderCard?.card}`}
        >
          <div className="absolute -top-4">
            <ShowStatus status={card.status} />
          </div>

          <div className="flex justify-between my-2">
            <span className="inline-flex items-center text-light-500 bg-blue-700 font-mono font-medium tracking-wider leading-normal rounded sm:text-sm py-1 px-2">
              <Tags className="mr-2 w-4 h-4" />
              {card.label}
            </span>
            <ShowPriority priority={card.priority} />
          </div>

          <h3 className="text-xl font-bold leading-normal font-mono">
            {card.title}
          </h3>

          {card.description && (
            <>
              <p className="font-medium border-b border-dark-500 dark:border-light-500 mb-1">
                Description:
              </p>
              <p>{card.description}</p>
            </>
          )}
          {/* <p>{card.project_id}</p> */}
          <div className="flex mt-4">
            <span className="flex whitespace-pre font-mono font-medium text-sm py-2 px-3 bg-transparent text-dark-500 dark:text-light-500 border border-slate-300 dark:border-slate-700 rounded-md shadow-md">
              Created at:
              {format(new Date(card.createdAt), "dd'/'M'/'yyyy, HH:mm")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const ProjectCard = ({ project }: ProjectCardProp): JSX.Element => {
  console.log(project);
  return (
    <>
      {project && (
        <div className="flex items-center relative p-5 rounded-lg bg-light-500 dark:bg-dark-500 border border-grey-300 dark:border-slate-700 shadow-md">
          <div className="overflow-hidden w-40 h-40 rounded-full">
            <img
              src={project.logo ? project.logo : "/images/blklight-thumb.jpg"}
              className="w-40 h-40 object-cover rounded-full transition-all hover:scale-105"
              alt=""
            />
          </div>

          <div className="ml-4 flex-1">
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="text-sm font-medium tracking-wide">
              Created at:
              {format(new Date(project.createdAt), "dd'/'M'/'yyyy, HH:mm")}
            </p>
            {project.description && <p>{project.description}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export { TaskCard, ProjectCard };
