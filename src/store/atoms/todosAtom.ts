import { atom } from 'jotai';
import { Todo, Tag, Status, CreateTodoParams } from '@models';

export const todosAtom = atom<Todo[]>([]);


export const todosLoadingAtom = atom<boolean>(true);
export const lastChosenTagAtom = atom<Tag>(Tag.Personal);


export const newTodoAtom = atom<CreateTodoParams>({
  title: '',
  tag: Tag.Personal,
  status: Status.Pending,
});

export const doneTodoAtom = atom(false);
