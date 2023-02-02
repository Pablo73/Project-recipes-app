import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading('Loading...');
    fetch(url)
      .then((req) => req.json())
      .then((res) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [url]);

  return { data, loading };
}
