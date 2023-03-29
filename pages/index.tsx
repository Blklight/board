import { useState, useEffect } from "react";
import { useToast } from "@/hooks/ui/use-toast";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { v4 as uuid } from "uuid";
import { format } from "date-fns";

import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/content/siteMetadata";
import { status, priority, label } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Status from "@/components/Status";
import Priority from "@/components/Priority";
import SelectProject from "@/components/SelectProject";
import { Textarea } from "@/components/ui/textarea";
import { CommandCombobox } from "@/components/Combobox";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Signal,
  Calendar,
  MoreHorizontal,
  Pen,
  Tags,
  Trash,
  User,
  PlusCircle,
  Plus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeProp {
  documents: Array<object>;
  initialDisplayDocuments: any;
  pagination: number;
}

interface Card {
  id: String;
  title: String;
  description: String;
  status: String;
  label: String;
  priority: String;
  project_id: String;
  createdAt: String;
  updatedAt?: String;
}

interface Project {
  id: String;
  name: String;
  logo: String;
  description: String;
  createdAt: String;
  updatedAt?: String;
}

const Home = () => {
  const { toast } = useToast();

  const loadData = () => {
    if (typeof window !== "undefined") {
      const loadProjects = localStorage.getItem("projects");
      const loadCards = localStorage.getItem("cards");

      return {
        projects: loadProjects ? JSON.parse(loadProjects) : [],
        cards: loadCards ? JSON.parse(loadCards) : [],
      };
    }
  };

  const initialStateProject = {
    id: uuid(),
    name: "",
    logo: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  };

  const initialStateCard = {
    id: uuid(),
    title: "",
    description: "",
    status: "in progress",
    label: "feature",
    priority: "medium",
    project_id: "",
    createdAt: "",
    updatedAt: "",
  };

  const [projects, setProjects] = useState<Project[]>(loadData()?.projects);
  const [cards, setCards] = useState<Card[]>(loadData()?.cards);

  const [project, setProject] = useState<Project>({
    ...initialStateProject,
  });
  const [card, setCard] = useState<Card>({ ...initialStateCard });

  const [open, setOpen] = useState(false);
  const [openLabels, setOpenLabels] = useState(false);

  const waitDialog = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const handleDisable = () => {
    return project.name === "" ? true : false;
  };

  const handleCardDisable = () => {
    return card.title === "" ? true : false;
  };

  const handleSubmitProject = (e: any) => {
    e.preventDefault();
    console.log(project);
    debugger;
    let isDone = false;
    if (project.name) {
      debugger;
      if (
        projects.find(
          (object: any) =>
            object.name.toLowerCase() === project.name.toLowerCase()
        )
      ) {
        return toast({
          description: "Already exists a project with this name!",
        });
      }
      console.log(projects);
      debugger;
      setProjects([...projects, project]);
      console.log(projects);
      debugger;
      isDone = true;
      toast({
        description: "Project created successfully!",
      });
      // resetProject();
    } else {
      alert("Sem nome definido!");
    }

    if (isDone) {
      setProject(initialStateProject);
      waitDialog().then(() => setOpen(false));
    }
  };

  const handleSubmitCard = (e: any) => {
    e.preventDefault();
    // setCard({ ...card, updatedAt: `${new Date()}` });
    let isDone = false;

    if (card.title) {
      if (cards.find((obj: any) => obj.label === card.label)) {
        return toast({
          title: "Repeated label",
          description: `Already exists a card labeled as ${card.label}!`,
        });
      }
      setCards([...cards, card]);
      isDone = true;
    } else {
      return toast({
        title: "Repeated label",
        description: `Already exists a card labeled as ${card.label}!`,
      });
    }
    if (isDone) {
    }
  };

  useEffect(() => {
    if (projects) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (cards) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  const getProject = (projectId: string) => {
    setCard({ ...card, project_id: projectId });
  };
  const getStatus = (status: string) => {
    setCard({ ...card, status: status });
  };
  const getPriority = (priority: string) => {
    setCard({ ...card, priority: priority });
  };

  const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
  ];

  // console.log("Line 175:", project);
  const date = format(new Date(), "dd'/'M'/'yyyy, HH:mm");
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <section className="min-home-screen background-texture pb-10">
        <div className="container-fluid py-4">
          <div className="flex gap-2 mb-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"uv"}>Create Project</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmitProject}>
                  <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid w-full items-center gap-1 mt-2">
                    <Label htmlFor="name-project">Project name:</Label>
                    <Input
                      type="text"
                      id="name-project"
                      className="shadow-md"
                      placeholder="Project name..."
                      onChange={(e) => {
                        setProject({
                          ...project,
                          name: e.target.value,
                          createdAt: `${new Date()}`,
                        });
                      }}
                    />
                    <p className="text-sm text-slate-500">
                      Enter project name.
                    </p>
                  </div>
                  <div className="grid w-full items-center gap-1 mt-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="name-project">Logo:</Label>
                    <Input
                      type="text"
                      id="name-project"
                      className="shadow-md"
                      placeholder="Project logo url here..."
                      onChange={(e) => {
                        setProject({ ...project, logo: e.target.value });
                      }}
                    />
                    <p className="text-sm text-slate-500">
                      It's optional. Only if you want.
                    </p>
                  </div>
                  <div className="grid w-full gap-1 mt-2 mb-4">
                    <Label htmlFor="message">Description:</Label>
                    <Textarea
                      className="shadow-md"
                      placeholder="Write a description..."
                      id="message"
                      onChange={(e) => {
                        setProject({ ...project, description: e.target.value });
                      }}
                    />
                  </div>

                  <Status />
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant={"uv"}
                      disabled={handleDisable()}
                    >
                      Create Project
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"uv"}>Create Board Sheet</Button>
              </SheetTrigger>
              <SheetContent position="right" size="lg">
                <SheetHeader>
                  <SheetTitle>Create board</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid w-full items-center gap-1.5 mt-2 mb-4">
                  <SelectProject projects={projects} getProject={getProject} />

                  <div className="my-2">
                    <div className="flex items-center px-3 bg-white dark:bg-dark-800 rounded-md shadow-md border border-slate-300 dark:border-slate-700">
                      <Popover open={openLabels} onOpenChange={setOpenLabels}>
                        <PopoverTrigger asChild>
                          <button className="flex items-center text-light-500 bg-blue-700 font-mono font-medium tracking-wider leading-normal rounded sm:text-sm py-1 px-2 cursor-pointer">
                            <Tags className="mr-2 w-4 h-4" />
                            {card.label}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          side="bottom"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Filtrar etiqueta..."
                              autoFocus={true}
                            />
                            <CommandList>
                              <CommandEmpty>No label found.</CommandEmpty>
                              <CommandGroup>
                                {labels.map((label) => (
                                  <CommandItem
                                    key={label}
                                    onSelect={(value) => {
                                      setOpen(false);
                                    }}
                                  >
                                    {label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <input
                        type="text"
                        className="w-full p-3 mx-3 focus:outline-none text-dark-500 bg-white dark:text-light-500 dark:bg-dark-800 leading-normal"
                        name=""
                        id=""
                        placeholder="Title..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Status />
                    <Priority />
                  </div>
                  <div className="grid w-full gap-1.5 mb-4">
                    <Label htmlFor="message">Description:</Label>
                    <Textarea
                      className="shadow-md"
                      placeholder="Write a description..."
                      id="message"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <div className="md:mb-0 mb-2 mr-auto">
                    <span className="flex whitespace-pre font-mono font-medium text-sm py-2 px-3 bg-transparent text-dark-500 dark:text-light-500 border border-slate-300 dark:border-slate-700 rounded-md shadow-md">
                      Created at: {date}
                    </span>
                  </div>
                  {/* <Button
                    type="submit"
                    variant={"uv"}
                    onClick={() => createProject()}
                  >
                    Create Project
                  </Button> */}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="shadow-md">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="create">Create projects/cards</TabsTrigger>
              <TabsTrigger value="teste">Debugger</TabsTrigger>
            </TabsList>
            <TabsContent
              value="projects"
              className="bg-transparent dark:bg-transparent border-0 px-0 py-1"
            >
              <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {projects &&
                  projects.length > 0 &&
                  projects.map((project: any) => (
                    <div
                      key={project.id}
                      className="flex items-center relative p-5 rounded-lg bg-light-500 dark:bg-dark-500 border border-grey-300 dark:border-slate-700 shadow-md"
                    >
                      <div className="overflow-hidden w-40 h-40 rounded-full">
                        <img
                          src={
                            project.logo
                              ? project.logo
                              : "/images/blklight-thumb.jpg"
                          }
                          className="w-40 h-40 object-cover rounded-full transition-all hover:scale-105"
                          alt=""
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="text-3xl font-bold">{project.name}</h3>
                        <p className="text-sm font-medium tracking-wide">
                          Created at:
                          {format(
                            new Date(project.createdAt),
                            "dd'/'M'/'yyyy, HH:mm"
                          )}
                        </p>
                        {project.description && <p>{project.description}</p>}
                      </div>
                    </div>
                  ))}
              </section>
            </TabsContent>
            <TabsContent value="cards" className="w-[1000px]">
              <h2 className="text-3xl font-bold">Create card</h2>
              <form onSubmit={handleSubmitCard}>
                <div className="grid w-full items-center gap-1.5 mt-2 mb-4">
                  <SelectProject projects={projects} getProject={getProject} />

                  <div className="my-2">
                    <div className="flex items-center px-3 bg-white dark:bg-dark-800 rounded-md shadow-md border border-slate-300 dark:border-slate-700">
                      <Popover open={openLabels} onOpenChange={setOpenLabels}>
                        <PopoverTrigger asChild>
                          <button className="flex items-center text-light-500 bg-blue-700 font-mono font-medium tracking-wider leading-normal rounded sm:text-sm py-1 px-2 cursor-pointer">
                            <Tags className="mr-2 w-4 h-4" />
                            {card.label}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          side="bottom"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Filtrar etiqueta..."
                              autoFocus={true}
                            />
                            <CommandList>
                              <CommandEmpty>No label found.</CommandEmpty>
                              <CommandGroup>
                                {labels.map((label) => (
                                  <CommandItem
                                    key={label}
                                    onSelect={(value) => {
                                      setCard({ ...card, label: value });
                                      setOpen(false);
                                    }}
                                  >
                                    {label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <input
                        type="text"
                        className="w-full p-3 mx-3 focus:outline-none text-dark-500 bg-white dark:text-light-500 dark:bg-dark-800 leading-normal"
                        name=""
                        id=""
                        placeholder="Title..."
                        onChange={(e) => {
                          setCard({
                            ...card,
                            title: e.target.value,
                            createdAt: `${new Date()}`,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Status getStatus={getStatus} />
                    <Priority getPriority={getPriority} />
                  </div>
                  <div className="grid w-full gap-1.5 mb-4">
                    <Label htmlFor="message">Description:</Label>
                    <Textarea
                      className="shadow-md"
                      placeholder="Write a description..."
                      id="message"
                      onChange={(e) =>
                        setCard({ ...card, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant={"uv"}
                      disabled={handleCardDisable()}
                    >
                      Create Card
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="create">
              <h2 className="text-3xl font-bold">Create Project</h2>
              <form onSubmit={handleSubmitProject}>
                <div className="grid w-full items-center gap-1 mt-2">
                  <Label htmlFor="name-project">Project name:</Label>
                  <Input
                    type="text"
                    id="name-project"
                    className="shadow-md"
                    placeholder="Project name..."
                    onChange={(e) => {
                      setProject({
                        ...project,
                        name: e.target.value,
                        createdAt: `${new Date()}`,
                      });
                    }}
                  />
                  <p className="text-sm text-slate-500">Enter project name.</p>
                </div>
                <div className="grid w-full items-center gap-1 mt-2">
                  <Label htmlFor="name-project">Logo:</Label>
                  <Input
                    type="text"
                    id="name-project"
                    className="shadow-md"
                    placeholder="Project logo url here..."
                    onChange={(e) => {
                      setProject({ ...project, logo: e.target.value });
                    }}
                  />
                  <p className="text-sm text-slate-500">
                    It's optional. Only if you want.
                  </p>
                </div>
                <div className="grid w-full gap-1 mt-2 mb-4">
                  <Label htmlFor="message">Description:</Label>
                  <Textarea
                    className="shadow-md"
                    placeholder="Write a description..."
                    id="message"
                    onChange={(e) => {
                      setProject({ ...project, description: e.target.value });
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant={"uv"}
                    disabled={handleDisable()}
                  >
                    Create Project
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="teste">
              <pre className="text-xl text-dark-500 dark:text-light-500">
                {JSON.stringify(projects, undefined, 2)}
              </pre>
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    description: "Your message has been sent.",
                  });
                }}
              >
                Show Toast
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};
export default Home;
