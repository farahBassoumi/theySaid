import { QueryCache, QueryClientConfig } from '@tanstack/react-query';
const DEFAULT_STALE_CACHE_TIME = 20 * 60 * 1000; // 20 minutes and then fetch todos again

const retry = (failureCount: number, error: unknown) => {
  const e = error as unknown as { httpStatus?: number };
  const status = e?.httpStatus || 500;
  return (
    failureCount < 3 &&
    (status === undefined || (status >= 500 && status < 600))
  );
};

const queryCache = new QueryCache();

export const DEFAULT_QUERY_CLIENT_OPTIONS: QueryClientConfig = {
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_CACHE_TIME,
      retry,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
};
