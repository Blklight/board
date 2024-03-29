import { createContext } from "react";
import { Project, Card } from "@/types/types";

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

// export default createContext({
//   projects: [],
//   setProjects: (projects: Project[]) => {},
// });
type CustomSetter<T> = (data: T) => void;
type SetProject = (projects: Project[]) => void;

type ProjectContext = {
  projects: Project[];
  setProjects: CustomSetter<Project[]>;
};

type CardContext = {
  cards: Card[];
  setCards: CustomSetter<Card[]>;
};

const context: ProjectContext = {
  projects: loadData()?.projects,
  setProjects: (projects) => {},
};

const card: CardContext = {
  cards: loadData()?.cards,
  setCards: (cards) => {},
};

export const ProjectContext = createContext({ ...context });
export const CardContext = createContext({ ...card });
