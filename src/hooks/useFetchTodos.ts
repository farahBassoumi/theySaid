import { useRef } from 'react';
import { fetchTodos } from '@/services';
import { todosAtom, todosLoadingAtom } from '@atoms';
import { useSetAtom } from 'jotai';
import { debounce } from 'lodash';

export const useFetchTodos = () => {
  const setTodos = useSetAtom(todosAtom);
  const setLoading = useSetAtom(todosLoadingAtom);

  const debouncedFetchRef = useRef(
    debounce(async () => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 100)
  );

  return debouncedFetchRef.current;
};
