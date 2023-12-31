import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames, { platform } from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkelton from "./GameCardSkelton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenres";
import { GameQuery } from "../App";
interface Props {
  gameQuery: GameQuery;
}
const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isloading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  if (error) return <Text>{error}</Text>;
  return (
    <div>
      <SimpleGrid
        padding={"10px"}
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
      >
        {isloading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              {" "}
              <GameCardSkelton />
            </GameCardContainer>
          ))}
        {data.map((game) => (
          <GameCardContainer key={game.id}>
            {" "}
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GameGrid;
