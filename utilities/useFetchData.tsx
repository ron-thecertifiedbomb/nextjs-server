import { useState, useEffect, useCallback } from 'react';

type UseFetchData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetchData = <T,>(url: string): UseFetchData<T> => {

  const [data, setData] = useState<T | null>(null);
 
  const [loading, setLoading] = useState<boolean>(true);
 
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: T = await res.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);


  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error };
};

export default useFetchData;
