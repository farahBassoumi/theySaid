import { z } from 'zod';
import { Status, Tag } from '@models';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  tag: z.nativeEnum(Tag),
  status: z.nativeEnum(Status),
  createdAt: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
});

export const TodosSchema = z.array(TodoSchema);
