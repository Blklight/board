import { useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";

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

interface HomeProp {
  documents: Array<object>;
  initialDisplayDocuments: any;
  pagination: number;
}

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
  updatedAt: String;
  boards: Array<Board>;
}

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [project, setProject] = useState<Project>();

  const [nameProject, setNameProject] = useState("");

  const [label, setLabel] = useState("feature");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
  ];
  // const priority = [
  //   {
  //     id: 1,
  //     title: "Muito Baixa",
  //   },
  //   {
  //     id: 2,
  //     title: "Baixa",
  //   },
  //   {
  //     id: 3,
  //     title: "Média",
  //   },
  //   {
  //     id: 4,
  //     title: "Alta",
  //   },
  //   {
  //     id: 5,
  //     title: "Muito Alta",
  //   },
  // ];
  // const label = [
  //   {
  //     id: 1,
  //     title: "feature",
  //   },
  //   {
  //     id: 3,
  //     title: "bug",
  //   },
  //   {
  //     id: 4,
  //     title: "enhancement",
  //   },
  //   {
  //     id: 5,
  //     title: "documentation",
  //   },
  //   {
  //     id: 6,
  //     title: "design",
  //   },
  //   {
  //     id: 7,
  //     title: "question",
  //   },
  //   {
  //     id: 8,
  //     title: "maintenance",
  //   },
  // ];
  // const status = [
  //   {
  //     id: 1,
  //     title: "Backlog",
  //   },
  //   {
  //     id: 2,
  //     title: "Todo",
  //   },
  //   {
  //     id: 3,
  //     title: "In Progress",
  //   },
  //   {
  //     id: 4,
  //     title: "Done",
  //   },
  //   {
  //     id: 5,
  //     title: "Canceled",
  //   },
  // ];
  // console.log(documents);
  const date = format(new Date(), "dd'/'M'/'yyyy, HH:mm");
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <section className="min-home-screen background-texture pb-10">
        <div className="container-fluid">
          <div className="space-y-2 py-5 md:space-y-5">
            <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
              Articles
            </h1>
          </div>
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Projetos</TabsTrigger>
              <TabsTrigger value="password">
                Estatisticas dos projetos
              </TabsTrigger>
              <TabsTrigger value="teste">Teste</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-2xl font-medium text-dark-500 dark:text-light-500 mb-4">
                Make changes to your account here. Click save when you&apos;re
                done.
              </p>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name-project">Nome do projeto:</Label>
                <Input
                  type="text"
                  id="name-project"
                  placeholder="Nome do projeto"
                  onChange={(e) => {
                    setNameProject(e.target.value);
                  }}
                />
                <p className="text-sm text-slate-500">
                  Insira o nome do projeto
                </p>
              </div>
              {/* <img src="/images/blklight-thumb.jpg" alt="" /> */}
            </TabsContent>
            <TabsContent value="password">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Criar board</h1>
                <div className="">
                  <span className="ml-auto font-mono font-medium text-base py-2 px-3 bg-white dark:bg-dark-800 text-dark-500 dark:text-light-500 border border-slate-300 dark:border-slate-700 rounded-md shadow-md">
                    Data: {date}
                  </span>
                </div>
              </div>

              <div className="my-4">
                <div className="relative my-2">
                  <div className="flex items-center px-3 bg-white dark:bg-dark-800 rounded-md shadow-md border border-slate-300 dark:border-slate-700">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <span className="text-light-500 bg-slate-600 font-mono font-medium tracking-wider leading-normal rounded sm:text-sm py-0.5 px-2 cursor-pointer">
                          {label}
                        </span>
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
                              Nenhuma etiqueta encontrada.
                            </CommandEmpty>
                            <CommandGroup>
                              {labels.map((label) => (
                                <CommandItem
                                  key={label}
                                  onSelect={(value) => {
                                    setLabel(value);
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
                      placeholder="Título..."
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="grid w-full gap-1.5 mb-4">
                  <Label htmlFor="message">Descrição:</Label>
                  <Textarea
                    className="shadow-md"
                    placeholder="Escreva a sua descrição..."
                    id="message"
                  />
                </div>
                <div className="flex gap-5">
                  <Status />
                  <Priority />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="teste">
              <pre className="text-xl text-dark-500 dark:text-light-500">
                {nameProject}
              </pre>
              <pre className="text-xl text-dark-500 dark:text-light-500">
                {title}
              </pre>
              <pre className="text-xl text-dark-500 dark:text-light-500">
                {label}
              </pre>
            </TabsContent>
          </Tabs>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus odio
            quibusdam aliquam a recusandae cupiditate illo maxime
            exercitationem, fuga fugiat hic sequi harum ipsam tempora doloribus
            nulla consectetur deleniti numquam.
          </p>
        </div>
      </section>
    </>
  );
};
export default Home;
