import { LucideIcon } from "lucide-react";

export type Priority = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
  style: string;
};

export type Project = {
  id: String;
  name: String;
  logo?: String;
  description: String;
  createdAt: String;
  updatedAt?: String;
};

export type Card = {
  id: String;
  title: String;
  description: String;
  status: String;
  label: String;
  priority: String;
  project_id: String;
  createdAt: String;
  updatedAt?: String;
};

export type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
  style: string;
  card: string;
};

export type CardTaskProp = {
  card: Card;
};

export type ProjectCardProp = {
  project: Project;
};
