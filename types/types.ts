import { LucideIcon } from "lucide-react";

export type Priority = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: number;
  style: string;
};

export type Project = {
  id: string;
  name: string;
  logo?: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
};

export type Card = {
  id: string;
  title: string;
  description: string;
  status: string;
  label: string;
  priority: string;
  project_id: string;
  createdAt: string;
  updatedAt?: string;
};

export type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: number;
  style: string;
  card: string;
};

export type CardTaskProp = {
  card: Card;
  updateStatus: any;
  deleteCard: any;
  editCard: any;
};

export type ProjectCardProp = {
  project: Project;
  deleteProject?: any;
  editProject?: any;
  toDelete?: boolean;
};
