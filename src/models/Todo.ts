export enum Tag {
  Work = 'work',
  Personal = 'personal',
  Shopping = 'shopping',
}

export enum Status {
  Pending = 'pending',
  InProgress = 'in_progress',
  Done = 'done',
}

export interface Todo{
  id: number;
  title: string;
  isChecked: boolean;
  tag?: Tag;
  status?: Status;
  createdAt: Date;
 // user_id?: string; // optional if set by RLS
}
