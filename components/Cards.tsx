import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/ui/use-toast";

import { CardTaskProp, ProjectCardProp } from "@/types/types";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ShowProject } from "@/components/Projects";

import { ShowStatus } from "@/components/Status";
import { ShowPriority } from "@/components/Priority";
import { statuses } from "@/lib/data";
import { Tags } from "lucide-react";

const TaskCard = ({ card }: CardTaskProp): JSX.Element => {
  const { toast } = useToast();
  const [border, setBorder] = useState({} as any);

  useEffect(() => {
    setBorder(statuses.find((obj) => obj.value === card.status));
  }, [card]);

  return card ? (
    <article
      className={`glass dark:text-light-500 border p-4 rounded-lg relative shadow-lg my-2 ${border?.card}`}
    >
      <button
        className="absolute -top-4 cursor-pointer"
        onClick={() =>
          toast({
            title: `${card.title}`,
            description: `${card.description}`,
          })
        }
      >
        <ShowStatus status={card.status} />
      </button>

      <div className="flex justify-between my-3">
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

      <div className="flex my-3">
        <span className="flex whitespace-pre font-mono font-medium text-sm py-1 px-2 bg-transparent text-dark-500 dark:text-light-500 border border-slate-300 dark:border-slate-700 rounded">
          Created at:
          <span>
            {format(new Date(card.createdAt), "dd'/'M'/'yyyy, HH:mm")}
          </span>
        </span>
      </div>

      <div className="absolute -bottom-4 right-4 cursor-pointer">
        <span
          className={`inline-flex items-center px-2 py-1 font-medium rounded bg-light-500 dark:bg-dark-400 border ${border?.card}`}
        >
          <ShowProject project_id={card.project_id} />
        </span>
      </div>
    </article>
  ) : (
    <article
      className={`glass dark:text-light-500 border p-4 rounded-lg relative shadow-lg my-2 border-grey-300`}
    >
      <button
        className="absolute -top-4 cursor-pointer"
        onClick={() =>
          toast({
            title: "Status",
          })
        }
      >
        Status
      </button>

      <div className="flex justify-between my-2">
        <span className="inline-flex items-center text-light-500 bg-blue-700 font-mono font-medium tracking-wider leading-normal rounded sm:text-sm py-1 px-2">
          <Tags className="mr-2 w-4 h-4" />
          label
        </span>
        <span
          className={`flex items-center px-2 font-bold leading-normal tracking-wide rounded bg-gradient-to-r from-zinc-700 to-dark-500`}
        ></span>
      </div>
    </article>
  );
};

const ProjectCard = ({ project }: ProjectCardProp): JSX.Element => {
  return project ? (
    <article className="flex items-center relative p-5 rounded-lg bg-light-500 dark:bg-dark-500 border border-grey-300 dark:border-slate-700 shadow-md">
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
          <span>
            {format(new Date(project.createdAt), "dd'/'M'/'yyyy, HH:mm")}
          </span>
        </p>
        {project.description && (
          <>
            <p>{project.description}</p>
          </>
        )}
      </div>
    </article>
  ) : (
    <article></article>
  );
};

export { TaskCard, ProjectCard };
