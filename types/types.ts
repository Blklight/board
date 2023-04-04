import { LucideIcon } from "lucide-react";

interface Priority {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
}
interface Project {
  id: String;
  name: String;
  logo?: String;
  description: String;
  createdAt: String;
  updatedAt?: String;
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

interface Status {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
  style: string;
  card: string;
}

export { Card, Priority, Project, Status };
