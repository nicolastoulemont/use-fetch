import React, { createContext, useContext } from 'react';

export const cache = new Map();

export const cacheContext = createContext(cache);

export function useCache() {
  return useContext(cacheContext);
}

interface CacheProviderProps {
  cache: typeof cache;
}

export const FetchCacheProvider: React.FC<CacheProviderProps> = ({
  cache,
  children,
}) => {
  return (
    <cacheContext.Provider value={cache}>{children}</cacheContext.Provider>
  );
};
