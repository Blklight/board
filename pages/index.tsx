import { useState, useEffect, useContext } from "react";
import { useToast } from "@/hooks/ui/use-toast";
import { ProjectContext, CardContext } from "@/contexts/contexts";

import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";

import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/content/siteMetadata";
import { labels } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Status, ShowStatus } from "@/components/Status";
import { Priority } from "@/components/Priority";
import SelectProject from "@/components/SelectProject";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tags } from "lucide-react";

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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { InfoCard, TaskCard } from "@/components/Cards";

import { Card, Project } from "@/types/types";

type InputCards = {
  title: string;
  description: string;
  project_id: string;
  status: string;
  priority: string;
  label: string;
};

interface HomeProp {
  documents: Array<object>;
  initialDisplayDocuments: any;
  pagination: number;
}

const Home = () => {
  const { toast } = useToast();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
  });
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
    status: "backlog",
    label: "feature",
    priority: "medium",
    project_id: "",
    createdAt: "",
    updatedAt: "",
  };

  const [project, setProject] = useState<Project>({
    ...initialStateProject,
  });
  const [card, setCard] = useState<Card>({ ...initialStateCard });
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [cards, setCards] = useState<Card[] | null>(null);
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);

  const [backlog, setBacklog] = useState<Card[] | null>(null);
  const [todo, setTodo] = useState<Card[] | null>(null);
  const [inprogress, setInprogress] = useState<Card[] | null>(null);
  const [canceled, setCanceled] = useState<Card[] | null>(null);
  const [done, setDone] = useState<Card[] | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLabels, setOpenLabels] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const waitDialog = () => new Promise((resolve) => setTimeout(resolve, 100));

  const handleDisable = () => {
    return project.name === "" ? true : false;
  };

  const handleCardDisable = () => {
    return card.title === "" ? true : false;
  };

  const handleSubmitProject = (e: any) => {
    e.preventDefault();
    let isDone = false;
    if (project.name) {
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
      setProjects([...projects, project]);
      isDone = true;
      toast({
        description: "Project created successfully!",
      });
    }

    if (isDone) {
      setProject(initialStateProject);
      waitDialog().then(() => setOpen(false));
    }
  };

  const handleSubmitCard = (e: any) => {
    e.preventDefault();
    let isDone = false;
    const alreadyExistsCard =
      cards &&
      cards.find((obj) => obj.title === card.title && obj.label === card.label);

    if (card.title) {
      if (!isEdit) {
        if (alreadyExistsCard) {
          return toast({
            title: "Repeated title and label",
            description: `Already exists a card labeled as ${card.label} and with ${card.title}, we recommend that you change the label!`,
          });
        }
      }

      if (isEdit) {
        setCards(
          (current) =>
            current &&
            current.map((obj) => {
              if (obj.id === card.id) {
                return {
                  ...card,
                  updatedAt: `${new Date()}`,
                };
              }
              return obj;
            })
        );
      } else {
        setCards([...cards, card]);
      }
      isDone = true;
    }

    if (isDone) {
      if (isEdit) {
        setIsEdit(false);
      }
      setCard(initialStateCard);
      waitDialog().then(() => setOpenSheet(false));
      return toast({
        title: isEdit
          ? "Card updated successfully!"
          : "Card registered successfully!",
      });
    }
  };

  useEffect(() => {
    setProjects(loadData()?.projects);
    setCards(loadData()?.cards);
  }, []);

  useEffect(() => {
    if (projects) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (cards) {
      localStorage.setItem("cards", JSON.stringify(cards));

      const findBacklog = cards.filter((card) => card.status === "backlog");
      const findTodo = cards.filter((card) => card.status === "todo");
      const findInprogress = cards.filter(
        (card) => card.status === "in progress"
      );
      const findCanceled = cards.filter((card) => card.status === "canceled");
      const findDone = cards.filter((card) => card.status === "done");

      setBacklog(findBacklog);
      setTodo(findTodo);
      setInprogress(findInprogress);
      setCanceled(findCanceled);
      setDone(findDone);
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

  const updateCardStatus = (updatedCard: Card) => {
    setCards(
      (current) =>
        current &&
        current.map((obj) => {
          if (obj.id === updatedCard.id) {
            return {
              ...obj,
              status: updatedCard.status,
              updatedAt: updatedCard.updatedAt,
            };
          }
          return obj;
        })
    );
  };

  const setDeleteCard = (cardId: string) => {
    if (cardId && cards) {
      const card = cards.find((obj) => obj.id === cardId);
      if (card) {
        setCardToDelete(card);
        setAlertOpen(true);
        console.log(cards.find((obj) => obj.id === cardId));
      }
    }
  };

  const setEditCard = (cardId: string) => {
    if (cardId && cards) {
      const card = cards.find((obj) => obj.id === cardId);
      if (card) {
        setIsEdit(true);
        setCard(card);
        setOpenSheet(true);
      }
    }
  };

  const deleteCard = () => {
    if (cardToDelete) {
      setCards(
        (current) =>
          current &&
          current.filter((obj) => {
            return obj.id !== cardToDelete.id;
          })
      );
    }
    waitDialog().then(() => setAlertOpen(false));
    setCardToDelete(null);
  };

  const cancelDelete = () => {
    waitDialog().then(() => setAlertOpen(false));
    setCardToDelete(null);
  };

  const DeleteItemView = ({ isCard }: { isCard: boolean }) => {
    return isCard ? (
      <>
        <InfoCard card={cardToDelete} />
      </>
    ) : (
      <> </>
    );
  };

  return (
    <>
      <ProjectContext.Provider value={{ projects, setProjects }}>
        <CardContext.Provider value={{ cards, setCards }}>
          <PageSEO
            title={siteMetadata.title}
            description={siteMetadata.description}
          />
          <section className="">
            <div className="container-fluid py-4">
              <div className="flex gap-2 mb-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant={"uv"}>Create Project</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Project</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <>
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
                          <p className="text-sm text-slate-500">
                            Enter project name.
                          </p>
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
                              setProject({
                                ...project,
                                description: e.target.value,
                              });
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
                    </>
                  </DialogContent>
                </Dialog>

                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                  <SheetTrigger asChild>
                    <Button variant={"uv"}>Create Board Sheet</Button>
                  </SheetTrigger>
                  <SheetContent position="right" size="lg">
                    <form onSubmit={handleSubmitCard}>
                      <SheetHeader>
                        <SheetTitle>Create board</SheetTitle>
                        <SheetDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </SheetDescription>
                      </SheetHeader>
                      <>
                        <div className="grid w-full items-center gap-1.5 mt-2 mb-4">
                          <SelectProject
                            projects={projects}
                            getProject={getProject}
                            value={isEdit ? card.project_id : null}
                          />

                          <div className="my-2">
                            <div className="flex items-center px-3 bg-white dark:bg-dark-800 rounded-md shadow-md border border-slate-300 dark:border-slate-700">
                              <Popover
                                open={openLabels}
                                onOpenChange={setOpenLabels}
                              >
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
                                      <CommandEmpty>
                                        No label found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {labels.map((label) => (
                                          <CommandItem
                                            key={label}
                                            onSelect={(value) => {
                                              setCard({
                                                ...card,
                                                label: value,
                                              });
                                              setOpenLabels(false);
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
                                value={card.title}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Status
                              getStatus={getStatus}
                              value={isEdit ? card.status : null}
                            />
                            <Priority
                              getPriority={getPriority}
                              value={isEdit ? card.priority : null}
                            />
                          </div>
                          <div className="grid w-full gap-1.5 mb-4">
                            <Label htmlFor="message">Description:</Label>
                            <Textarea
                              className="shadow-md"
                              placeholder="Write a description..."
                              id="message"
                              onChange={(e) =>
                                setCard({
                                  ...card,
                                  description: e.target.value,
                                })
                              }
                              value={card.description}
                            />
                          </div>
                        </div>
                      </>
                      <SheetFooter>
                        <Button
                          type="submit"
                          variant={"uv"}
                          disabled={handleCardDisable()}
                        >
                          {isEdit ? "Update Card" : "Create Card"}
                        </Button>
                      </SheetFooter>
                    </form>
                  </SheetContent>
                </Sheet>

                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                  {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                  <AlertDialogContent className="dark:!dark-glass">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <DeleteItemView isCard />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={cancelDelete}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={deleteCard}>
                        Delete Card
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="shadow-md">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="create">
                    Create projects/cards
                  </TabsTrigger>
                  <TabsTrigger value="teste">Debugger</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="projects"
                  className="bg-transparent dark:bg-transparent border-0 p-1"
                >
                  <>
                    {cards && cards.length > 0 ? (
                      <section className="">
                        <ScrollArea>
                          <div className="flex gap-4 my-3 px-4 pb-5">
                            <div className="w-[600px]">
                              <h2 className="bg-sky-500 text-light-500 text-3xl font-bold mb-4 rounded-lg">
                                <span className="marker-line">Backlog</span>
                              </h2>
                              <ScrollArea className="w-full h-[600px]">
                                <div className="flex flex-col gap-4 my-3 px-5 pb-4">
                                  {cards.map((card: any) => (
                                    <TaskCard
                                      key={card.id}
                                      card={card}
                                      updateStatus={updateCardStatus}
                                      deleteCard={setDeleteCard}
                                      editCard={setEditCard}
                                    />
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                            <div className="w-[600px]">
                              <h2 className="bg-blue-700 text-light-500 text-3xl font-bold mb-4 rounded-lg">
                                <span className="marker-line">Todo</span>
                              </h2>
                              <ScrollArea className="w-full h-[600px]">
                                <div className="flex flex-col gap-4 my-3 px-4 pb-4">
                                  {cards.map((card: any) => (
                                    <TaskCard
                                      key={card.id}
                                      card={card}
                                      updateStatus={updateCardStatus}
                                      deleteCard={setDeleteCard}
                                      editCard={setEditCard}
                                    />
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                            <div className="w-[600px]">
                              <h2 className="bg-yellow-500 text-dark-500 text-3xl font-bold mb-4 rounded-lg">
                                <span className="marker-line">In Progress</span>
                              </h2>
                              <ScrollArea className="w-full h-[600px]">
                                <div className="flex flex-col gap-4 my-3 px-4 pb-4">
                                  {cards.map((card: any) => (
                                    <TaskCard
                                      key={card.id}
                                      card={card}
                                      updateStatus={updateCardStatus}
                                      deleteCard={setDeleteCard}
                                      editCard={setEditCard}
                                    />
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                            <div className="w-[600px]">
                              <h2 className="bg-crimson-500 text-light-500 text-3xl font-bold mb-4 rounded-lg">
                                <span className="marker-line">Canceled</span>
                              </h2>
                              <ScrollArea className="w-full h-[600px]">
                                <div className="flex flex-col gap-4 my-3 px-4 pb-4">
                                  {cards.map((card: any) => (
                                    <TaskCard
                                      key={card.id}
                                      card={card}
                                      updateStatus={updateCardStatus}
                                      deleteCard={setDeleteCard}
                                      editCard={setEditCard}
                                    />
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                            <div className="w-[600px]">
                              <h2 className="bg-emerald-500 text-light-500 text-3xl font-bold mb-4 rounded-lg">
                                <span className="marker-line">Done</span>
                              </h2>
                              <ScrollArea className="w-full h-[600px]">
                                <div className="flex flex-col gap-4 my-3 px-4 pb-4">
                                  {cards.map((card: any) => (
                                    <TaskCard
                                      key={card.id}
                                      card={card}
                                      updateStatus={updateCardStatus}
                                      deleteCard={setDeleteCard}
                                      editCard={setEditCard}
                                    />
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </section>
                    ) : (
                      <></>
                    )}
                  </>
                </TabsContent>
                <TabsContent
                  value="cards"
                  className="border-0 bg-transparent dark:bg-transparent px-1"
                >
                  <>
                    <ScrollArea className="w-full h-[650px]">
                      <div className="inline-flex gap-4">
                        <section className="w-[560px] mb-5">
                          <h2 className="bg-sky-500 text-light-500 text-3xl font-bold mb-4 rounded-md">
                            <span className="marker-line">Backlog</span>
                          </h2>
                          <ScrollArea>
                            <div className="p-4">
                              <div className="flex flex-col gap-3">
                                {backlog && backlog.length > 0 ? (
                                  backlog.map((card: any) => (
                                    <TaskCard
                                      key={card.id}
                                      card={card}
                                      updateStatus={updateCardStatus}
                                      deleteCard={setDeleteCard}
                                      editCard={setEditCard}
                                    />
                                  ))
                                ) : (
                                  <>
                                    <h1 className="text-5xl font-bold">
                                      Nothing in the backlog
                                    </h1>
                                  </>
                                )}
                              </div>
                            </div>
                          </ScrollArea>
                        </section>

                        <section className="w-[560px] mb-5">
                          <h2 className="bg-blue-700 text-light-500 text-3xl font-bold mb-4">
                            <span className="marker-line">Todo</span>
                          </h2>
                          <div className="flex flex-col gap-4">
                            {todo && todo.length > 0 ? (
                              todo.map((card: any) => (
                                <TaskCard
                                  key={card.id}
                                  card={card}
                                  updateStatus={updateCardStatus}
                                  deleteCard={setDeleteCard}
                                  editCard={setEditCard}
                                />
                              ))
                            ) : (
                              <>
                                <h1 className="text-5xl font-bold">
                                  Nothing to do
                                </h1>
                              </>
                            )}
                          </div>
                        </section>

                        <section className="w-[560px] mb-5">
                          <h2 className="bg-yellow-500 text-dark-500 text-3xl font-bold mb-4">
                            <span className="marker-line">In Progress</span>
                          </h2>
                          <div className="flex flex-col gap-4">
                            {inprogress && inprogress.length > 0 ? (
                              inprogress.map((card: any) => (
                                <TaskCard
                                  key={card.id}
                                  card={card}
                                  updateStatus={updateCardStatus}
                                  deleteCard={setDeleteCard}
                                  editCard={setEditCard}
                                />
                              ))
                            ) : (
                              <>
                                <h1 className="text-5xl font-bold">
                                  Nothing in progress
                                </h1>
                              </>
                            )}
                          </div>
                        </section>

                        <section className="w-[560px] mb-5">
                          <h2 className="bg-crimson-500 text-light-500 text-3xl font-bold mb-4">
                            <span className="marker-line">Canceled</span>
                          </h2>
                          <div className="flex flex-col gap-4">
                            {canceled && canceled.length > 0 ? (
                              canceled.map((card: any) => (
                                <TaskCard
                                  key={card.id}
                                  card={card}
                                  updateStatus={updateCardStatus}
                                  deleteCard={setDeleteCard}
                                  editCard={setEditCard}
                                />
                              ))
                            ) : (
                              <>
                                <h1 className="text-5xl font-bold">
                                  Nothing canceled
                                </h1>
                              </>
                            )}
                          </div>
                        </section>

                        <section className="w-[560px] mb-5">
                          <h2 className="bg-emerald-500 text-light-500 text-3xl font-bold mb-4">
                            <span className="marker-line">Done</span>
                          </h2>
                          <div className="flex flex-col gap-4">
                            {done && done.length > 0 ? (
                              done.map((card: any) => (
                                <TaskCard
                                  key={card.id}
                                  card={card}
                                  updateStatus={updateCardStatus}
                                  deleteCard={setDeleteCard}
                                  editCard={setEditCard}
                                />
                              ))
                            ) : (
                              <>
                                <h1 className="text-5xl font-bold my-5">
                                  Nothing done
                                </h1>
                              </>
                            )}
                          </div>
                        </section>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </>
                </TabsContent>
                <TabsContent value="create"></TabsContent>
                <TabsContent value="teste"></TabsContent>
              </Tabs>
            </div>
          </section>
        </CardContext.Provider>
      </ProjectContext.Provider>
    </>
  );
};
export default Home;
