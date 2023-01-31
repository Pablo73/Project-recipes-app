import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((req) => req.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error));
  }, [url]);

  return { data };
}
