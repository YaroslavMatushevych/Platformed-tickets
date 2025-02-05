import { User } from "./user";

export type Priority = "low" | "medium" | "high";
export type Status = "backlog" | "triage" | "in-progress" | "done";

export type Ticket = {
  id: number;
  title: string;
  description?: string;
  priority?: Priority;
  status: Status;
  assignee?: User;
  dueDate?: string; // ISO 8601 (YYYY-MM-DD)
};
