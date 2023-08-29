import { useEffect, useState } from "react";
import fetchApi from "../utils/fetchApi";

export default function useDebounce(fetchUrl, body) {
  const [output, setOutput] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let getData;
    if (keyword && body) {
      getData = setTimeout(async () => {
        try {
          const json = await fetchApi(fetchUrl, "POST", body);
          setOutput(json);
        } catch (e) {
          console.error(e);
        }
      }, 500);
    } else if (keyword) {
      getData = setTimeout(async () => {
        try {
          setOutput(await fetchApi(fetchUrl + keyword));
        } catch (e) {
          console.error(e);
        }
      }, 500);
    }
    return () => clearTimeout(getData);
  }, [keyword, fetchUrl, body]);

  return { output, keyword, setKeyword };
}
