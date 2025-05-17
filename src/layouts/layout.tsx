import { useFetchTodos } from '@hooks';
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import { TodoHome } from '@pages';

const Layout = () => {
  const fetchTodos = useFetchTodos();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchTodos();
      hasFetched.current = true;
    }
  }, [fetchTodos]);
  return (
    <div className="h-full h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-mainBg to-[#f5f5dc]">
      <Header />
      <main className="flex-1  px-4 md:px-6 lg:px-8">
        <TodoHome />
      </main>
    </div>
  );
};

export default Layout;
