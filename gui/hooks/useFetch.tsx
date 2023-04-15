import { useState, useEffect } from "react";

const useFetch = (url: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    // TODO: comment when not connected with backend..
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
