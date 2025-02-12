import { useState, useCallback } from "react";
import { getData } from "./getData"; // Assuming getData is an async function

type UseFetchData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

const useFetchData = <T,>(): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_API_URL || ""; 

 
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getData<T>(url); 
      setData(result); 
    } catch (err) {
      setError((err as Error).message); 
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetchData }; 
};

export default useFetchData;
