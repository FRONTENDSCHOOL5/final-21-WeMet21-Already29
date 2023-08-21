import { useEffect, useState } from "react";

export default function useFetch(fetchUrl, fetchMethod, body) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.mandarin.weniv.co.kr/${fetchUrl}`, {
          method: fetchMethod,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json",
          },
          body: body,
        });

        const json = await res.json();

        const extractData = (json) => {
          const keys = ["post", "profile", "product"];
          for (const key of keys) {
            if (json[key]) {
              return json[key];
            }
          }

          return json;
        };

        const result = extractData(json);
        setData(result);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl, fetchMethod, body, setIsLoading]);

  return { data, isLoading, error };
}
