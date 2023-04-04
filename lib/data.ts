import {
  // PlusCircle,
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  // LucideIcon,
  XCircle,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Signal,
} from "lucide-react";

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

const priorities = [
  {
    id: 1,
    label: "Heavy Low",
    value: "heavy low",
    icon: SignalZero,
  },
  {
    id: 2,
    label: "Low",
    value: "low",
    icon: SignalLow,
  },
  {
    id: 3,
    label: "Medium",
    value: "medium",
    icon: SignalMedium,
  },
  {
    id: 4,
    label: "High",
    value: "high",
    icon: SignalHigh,
  },
  {
    id: 5,
    label: "Heavy High",
    value: "heavy high",
    icon: Signal,
  },
];

const statuses = [
  {
    id: 1,
    label: "Backlog",
    value: "backlog",
    icon: HelpCircle,
    style: "bg-sky-500 text-light-500",
    card: "border-sky-500",
  },
  {
    id: 2,
    label: "Todo",
    value: "todo",
    icon: Circle,
    style: "bg-blue-700 text-light-500",
    card: "border-blue-700",
  },
  {
    id: 3,
    label: "In Progress",
    value: "in progress",
    icon: ArrowUpCircle,
    style: "bg-yellow-500 text-dark-500",
    card: "border-yellow-500",
  },
  {
    id: 4,
    label: "Done",
    value: "done",
    icon: CheckCircle2,
    style: "bg-emerald-500 text-light-500",
    card: "border-emerald-500",
  },
  {
    id: 5,
    label: "Canceled",
    value: "canceled",
    icon: XCircle,
    style: "bg-crimson-500 text-light-500",
    card: "border-crimson-500",
  },
];

export { labels, priorities, statuses };
