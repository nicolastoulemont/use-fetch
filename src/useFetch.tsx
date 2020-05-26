import { useState, useEffect, useRef } from 'react';
import { sha256 } from 'js-sha256';
import { useCache } from './cache';

export function useFetch(url: string, options: RequestInit = {}) {
  const isMounted = useRef(true);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cache = useCache();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      return json;
    } catch (error) {
      isMounted.current && setError(error);
    }
  };

  const fetchy = async () => {
    if (typeof url !== 'string')
      throw new Error('useFetch requires a URL string');

    error && setError(null);
    const hash = sha256
      .create()
      .update(url.concat(JSON.stringify(options)))
      .hex();

    if (cache.get(hash)) {
      setResponse(cache.get(hash));
      const json = await fetchData();
      cache.set(hash, json);
      isMounted.current && setResponse(json);
    } else {
      setLoading(true);
      const json = await fetchData();
      cache.set(hash, json);
      if (isMounted.current) {
        setLoading(false);
        setResponse(json);
      }
    }
  };

  return { response, loading, error, fetchy };
}
