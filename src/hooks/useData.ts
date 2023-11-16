import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../servies/api-client";
import { Game } from "./useGames";

interface FetchResponse<T> {
  count: number;
  results: T[];
}
const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, Seterror] = useState("");
  const [isloading, Setloading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Setloading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data.results);
        Setloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        Seterror(err.message);
        Setloading(false);
      });
    return () => controller.abort();
  }, []);
  return { data, error, isloading };
};

export default useData;
