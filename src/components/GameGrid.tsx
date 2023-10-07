import React, { useEffect, useState } from "react";
import apiClient from "../servies/api-client";
import { Text } from "@chakra-ui/react";
interface Game {
  id: number;
  name: string;
}
interface fetchgamesresponse {
  count: number;
  results: Game[];
}
const GameGrid = () => {
  const [games, Setgames] = useState<Game[]>([]);
  const [error, Seterror] = useState("");
  useEffect(() => {
    apiClient
      .get<fetchgamesresponse>("/games")
      .then((res) => Setgames(res.data.results))
      .catch((err) => Seterror(err.message));
  }, []);
  return (
    <div>
      {error && <Text>{error}</Text>}

      <ul>
        {games.map((game) => (
          <li key={"game.id"}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameGrid;
