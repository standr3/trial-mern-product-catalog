import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";

const GameGrid = ({ games }) => {
	return (
		<SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
			{games.map((game) => (
				<GameCard key={game._id} game={game} />
			))}
		</SimpleGrid>
	);
};

export default GameGrid;