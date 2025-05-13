import supabase from '@/utils/supabase';
import { Todo } from '@models';



export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select()
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Todo[];
};
export interface CreateTodoResponse {
  data: Todo;
  error: Error | null;
}
export interface CreateTodoParams {
  title: string;
  tag?: string;
  status?: string;
 // user_id?: string; // optional if set by RLS
}

export const createTodo = async (params: CreateTodoParams): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .insert([params])
    .select().single();

console.log('createTodo', data, error); 
  if (error) throw error;
  return data;
};


export const updateTodo = async (todo: Todo): Promise<Todo> => {
  todo.isChecked = true;
  const { data, error } = await supabase
    .from('todos')
    .update(todo)
    .eq('id', todo.id)
    .select()
    .single();

console.log('updateTodo', data, error);
  if (error) throw error;
  return data;
};