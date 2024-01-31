import { useEffect, useState } from "react";

export default function useFetch(url: string) {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url !== "") {
      setLoading(true);
      fetch(url)
        .then(async (res) => await res.text())
        .then((data) => setFlag(data))
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url]);

  return { flag, loading, error };
}
