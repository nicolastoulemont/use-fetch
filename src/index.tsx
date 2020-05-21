import { useState } from 'react';
import { sha256 } from 'js-sha256';

const cache = new Map();

export function useFetch(url: string, options: RequestInit = {}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      return json;
    } catch (error) {
      setError(error);
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
      setResponse(json);
    } else {
      setLoading(true);
      const json = await fetchData();
      setLoading(false);
      cache.set(hash, json);
      setResponse(json);
    }
  };

  return { response, loading, error, fetchy };
}
