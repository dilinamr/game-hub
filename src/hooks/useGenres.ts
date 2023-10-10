import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../servies/api-client";
import { Game } from "./useGames";
interface Genre {
  id: number;
  name: string;
}
interface FetchGenresResponse {
  count: number;
  results: Genre[];
}
const useGenres = () => {
  const [genres, Setgenres] = useState<Genre[]>([]);
  const [error, Seterror] = useState("");
  const [isloading, Setloading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Setloading(true);
    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        Setgenres(res.data.results);
        Setloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        Seterror(err.message);
        Setloading(false);
      });
    return () => controller.abort();
  }, []);
  return { genres, error, isloading };
};

export default useGenres;
