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
    // TODO:  uncomment this line when integration with the server.
    // fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
