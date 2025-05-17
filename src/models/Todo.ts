export enum Tag {
  Work = 'work',
  Personal = 'personal',
  Life = 'life',
}

export enum Status {
  Pending = 'pending',
  InProgress = 'in_progress',
  Done = 'done',
}  

export interface Todo {
  id: string;
  title: string;
  tag: Tag;
  status: Status;
  createdAt: Date;
}
export const tagColorMap: Record<Tag, string> = {
  [Tag.Work]: 'bg-work text-work-text',
  [Tag.Personal]: 'bg-personal text-personal-text',
  [Tag.Life]: 'bg-life text-life-text',
};

export interface CreateTodoResponse {
  data: Todo;
  error: Error | null;
}
export interface CreateTodoParams {
  title: string;
  tag: Tag;
  status: Status.Pending;
}
