import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/ui/use-toast";

import { Card, CardTaskProp, ProjectCardProp } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ShowProject } from "@/components/Projects";
import { Button } from "@/components/ui/button";
import { ShowStatus, StatusCardSelector } from "@/components/Status";
import { ShowPriority } from "@/components/Priority";
import { statuses } from "@/lib/data";
import { Tags, Trash, Edit, MoreVertical } from "lucide-react";

const TaskCard = ({
  card,
  updateStatus,
  deleteCard,
  editCard,
}: CardTaskProp): JSX.Element => {
  const { toast } = useToast();
  const [styling, setStyling] = useState({} as any);

  useEffect(() => {
    setStyling(statuses.find((obj) => obj.value === card.status));
  }, [card]);

  const getStatus = (status: string) => {
    const updateCard = {
      ...card,
      status: status,
      updatedAt: `${new Date()}`,
    };
    updateStatus(updateCard);
  };

  return card ? (
    <article
      className={`glass dark:dark-glass dark:text-light-500 border !border-b-[5px] p-5 rounded-lg relative shadow-lg my-2 ${styling?.card}`}
    >
      <button
        className="absolute -top-5 cursor-pointer"
        onClick={() =>
          toast({
            title: `${card.title}`,
            description: `${card.description}`,
          })
        }
      >
        <StatusCardSelector status={card.status} getStatus={getStatus} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`absolute -top-4 right-4 cursor-pointer flex items-center p-1 font-medium rounded ${styling?.style}`}
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="glass dark:dark-glass !rounded-md"
          align="end"
        >
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-light-500 dark:bg-dark-500" />
          <DropdownMenuItem
            className="rounded"
            onClick={() => editCard(card.id)}
          >
            <Edit className="mr-2 w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded"
            onClick={() => deleteCard(card.id)}
          >
            <Trash className="mr-2 w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

      <div className="lg:flex flex-wrap block lg:gap-2 justify-center my-2">
        <span className="flex mb-1 justify-center whitespace-pre font-mono font-medium text-sm py-1 px-2 bg-transparent text-dark-500 dark:text-light-500 border border-dark-200 dark:border-light-600 rounded">
          Created at:
          <span>
            {format(new Date(card.createdAt), "dd'/'M'/'yyyy, HH:mm")}
          </span>
        </span>
        <span className="flex mb-1 justify-center whitespace-pre font-mono font-medium text-sm py-1 px-2 bg-transparent text-dark-500 dark:text-light-500 border border-dark-200 dark:border-light-600 rounded">
          Updated at:
          <span>
            {card.updatedAt ? (
              format(new Date(card.updatedAt), "dd'/'M'/'yyyy, HH:mm")
            ) : (
              <>--/--/----, --:--</>
            )}
          </span>
        </span>
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 cursor-pointer">
        <span
          className={`inline-flex items-center px-2 py-1 font-medium rounded bg-light-500 dark:bg-dark-400 border ${styling?.card}`}
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

const ProjectCard = ({
  project,
  deleteProject,
  editProject,
  toDelete = false,
}: ProjectCardProp): JSX.Element => {
  return project ? (
    <article className="flex relative p-5 rounded-lg glass dark:dark-glass border !border-light-600 dark:!border-dark-700 shadow-md">
      <div className="overflow-hidden w-20 h-20 rounded-full">
        <img
          src={project.logo ? project.logo : "/images/blklight-thumb.jpg"}
          className="w-20 h-20 object-cover rounded-full transition-all hover:scale-105"
          alt=""
        />
      </div>

      <div className="ml-4 flex-1">
        <h3 className="text-3xl font-bold text-dark-500 dark:text-light-500">
          {project.name}
        </h3>
        <p className="text-sm font-medium tracking-wide text-dark-500 dark:text-light-500">
          Created at:
          <span>
            {format(new Date(project.createdAt), "dd'/'M'/'yyyy, HH:mm")}
          </span>
        </p>
        {project.updatedAt && (
          <p className="text-sm font-medium tracking-wide text-dark-500 dark:text-light-500">
            Updated at:
            <span>
              {format(new Date(project.updatedAt), "dd'/'M'/'yyyy, HH:mm")}
            </span>
          </p>
        )}
        {project.description && (
          <>
            <p className="text-dark-500 dark:text-light-500">
              {project.description}
            </p>
          </>
        )}
        {!toDelete && (
          <div className="flex mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"sm"}>
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="glass dark:dark-glass !rounded-md"
                align="start"
              >
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-light-500 dark:bg-dark-500" />
                <DropdownMenuItem
                  className="rounded"
                  onClick={() => editProject(project.id)}
                >
                  <Edit className="mr-2 w-4 h-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="rounded"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash className="mr-2 w-4 h-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </article>
  ) : (
    <article></article>
  );
};

type InfoCardProp = {
  card: Card | null;
};

const InfoCard = ({ card }: InfoCardProp) => {
  const [styling, setStyling] = useState({} as any);

  useEffect(() => {
    if (card) {
      setStyling(statuses.find((obj) => obj.value === card.status));
    }
  }, [card]);

  return card ? (
    <article
      className={`glass dark:dark-glass dark:text-light-500 border p-5 rounded-lg relative shadow-lg my-4 ${styling?.card}`}
    >
      <button className="absolute -top-5 cursor-pointer">
        <ShowStatus status={card.status} />
      </button>

      <div className="flex justify-between my-3">
        <span className="inline-flex items-center text-light-500 bg-blue-700 font-mono font-medium tracking-wider leading-normal rounded sm:text-sm py-1 px-2">
          <Tags className="mr-2 w-4 h-4" />
          {card.label}
        </span>
        <ShowPriority priority={card.priority} />
      </div>

      <h3 className="text-xl font-bold leading-normal font-mono text-dark-500 dark:text-light-500">
        {card.title}
      </h3>

      {card.description && (
        <>
          <p className="font-medium border-b border-dark-500 dark:border-light-500 text-dark-500 dark:text-light-500 mb-1">
            Description:
          </p>
          <p className="text-dark-500 dark:text-light-500">
            {card.description}
          </p>
        </>
      )}

      <div className="block my-2">
        <span className="flex my-1 justify-center whitespace-pre font-mono font-medium text-sm py-1 px-2 bg-transparent text-dark-500 dark:text-light-500 border border-dark-200 dark:border-light-600 rounded">
          Created at:
          <span>
            {format(new Date(card.createdAt), "dd'/'M'/'yyyy, HH:mm")}
          </span>
        </span>
        <span className="flex my-1 justify-center whitespace-pre font-mono font-medium text-sm py-1 px-2 bg-transparent text-dark-500 dark:text-light-500 border border-dark-200 dark:border-light-600 rounded">
          Updated at:
          <span>
            {card.updatedAt ? (
              format(new Date(card.updatedAt), "dd'/'M'/'yyyy, HH:mm")
            ) : (
              <>--/--/----, --:--</>
            )}
          </span>
        </span>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 cursor-pointer">
        <span
          className={`inline-flex items-center px-2 py-1 font-medium rounded bg-light-500 dark:bg-dark-400 border ${styling?.card}`}
        >
          <ShowProject project_id={card.project_id} />
        </span>
      </div>
    </article>
  ) : (
    <></>
  );
};

export { InfoCard, TaskCard, ProjectCard };
