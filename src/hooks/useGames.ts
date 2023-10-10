import React, { useEffect, useState } from "react";
import apiClient from "../servies/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";
export interface platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: platform }[];
  metacritic: number;
}
interface fetchgamesresponse {
  count: number;
  results: Game[];
}
const useGames = () => {
  const [games, Setgames] = useState<Game[]>([]);
  const [error, Seterror] = useState("");
  const [isloading, Setloading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Setloading(true);
    apiClient
      .get<fetchgamesresponse>("/games", { signal: controller.signal })
      .then((res) => {
        Setgames(res.data.results);
        Setloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        Seterror(err.message);
        Setloading(false);
      });
    return () => controller.abort();
  }, []);
  return { games, error, isloading };
};

export default useGames;
