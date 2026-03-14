import { Link as RouterLink } from "react-router-dom";
import {
	Badge,
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { formatPrice } from "../utils/formatPrice";

const GameCard = ({ game }) => {
	return (
		<Box borderWidth='1px' rounded='lg' overflow='hidden' shadow='md'>
			<Image
				src={game.image}
				alt={game.title}
				h='220px'
				w='full'
				objectFit='cover'
				fallbackSrc='https://placehold.co/600x400?text=No+Image'
			/>

			<VStack align='stretch' p={4} spacing={3}>
				<Heading size='md'>{game.title}</Heading>

				<HStack wrap='wrap'>
					<Badge colorScheme='purple'>{game.platform}</Badge>
					<Badge colorScheme='green'>{game.genre}</Badge>
					<Badge colorScheme={game.stock > 0 ? "blue" : "red"}>
						{game.stock > 0 ? `In Stock: ${game.stock}` : "Out of Stock"}
					</Badge>
				</HStack>

				<Text color='gray.400'>
					Release Year: {game.releaseYear || "N/A"}
				</Text>

				<Text fontWeight='bold'>{formatPrice(game.price)}</Text>

				<HStack>
					<Button as={RouterLink} to={`/games/${game._id}`} size='sm' colorScheme='purple'>
						Details
					</Button>
					<Button as={RouterLink} to={`/games/${game._id}/edit`} size='sm' variant='outline'>
						Edit
					</Button>
				</HStack>
			</VStack>
		</Box>
	);
};

export default GameCard;