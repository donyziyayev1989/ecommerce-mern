import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setData(response.data);
          });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { data, error, loading };
}
