import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

const priority = [
  {
    id: 1,
    title: "Muito Baixa",
    value: "1",
  },
  {
    id: 2,
    title: "Baixa",
    value: "25",
  },
  {
    id: 3,
    title: "Média",
    value: "50",
  },
  {
    id: 4,
    title: "Alta",
    value: "75",
  },
  {
    id: 5,
    title: "Muito Alta",
    value: "100",
  },
];

const label = [
  {
    id: 1,
    title: "feature",
    value: "feature",
  },
  {
    id: 3,
    title: "bug",
    value: "bug",
  },
  {
    id: 4,
    title: "enhancement",
    value: "enhancement",
  },
  {
    id: 5,
    title: "documentation",
    value: "enhancement",
  },
  {
    id: 6,
    title: "design",
    value: "design",
  },
  {
    id: 7,
    title: "question",
    value: "question",
  },
  {
    id: 8,
    title: "maintenance",
    value: "maintenance",
  },
];

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  id: Number;
};

const status = [
  {
    id: 1,
    title: "Backlog",
    value: "backlog",
    icon: HelpCircle,
  },
  {
    id: 2,
    title: "Todo",
    value: "todo",
    icon: Circle,
  },
  {
    id: 3,
    title: "In Progress",
    value: "inProgress",
    icon: ArrowUpCircle,
  },
  {
    id: 4,
    title: "Done",
    value: "done",
    icon: CheckCircle2,
  },
  {
    id: 5,
    title: "Canceled",
    value: "canceled",
    icon: XCircle,
  },
];

export { priority, status, label };
