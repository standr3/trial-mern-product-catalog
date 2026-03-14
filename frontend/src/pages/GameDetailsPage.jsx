import { useEffect } from "react";
import {
	Badge,
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Image,
	SimpleGrid,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useGameStore } from "../store/game";
import { formatPrice } from "../utils/formatPrice";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

const GameDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	const {
		selectedGame,
		loading,
		error,
		fetchGameById,
		deleteGame,
		clearSelectedGame,
	} = useGameStore();

	useEffect(() => {
		fetchGameById(id);

		return () => {
			clearSelectedGame();
		};
	}, [id, fetchGameById, clearSelectedGame]);

	const handleDelete = async () => {
		const { success, message } = await deleteGame(id);

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		toast({
			title: "Success",
			description: message,
			status: "success",
			duration: 3000,
			isClosable: true,
		});

		navigate("/games");
	};

	if (loading && !selectedGame) {
		return <LoadingSpinner />;
	}

	if (error && !selectedGame) {
		return <ErrorState message={error} />;
	}

	if (!selectedGame) {
		return <ErrorState message='Game not found' />;
	}

	return (
		<Container maxW='container.xl' py={8}>
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
				<Box>
					<Image
						src={selectedGame.image}
						alt={selectedGame.title}
						w='full'
						h={{ base: "300px", md: "500px" }}
						objectFit='cover'
						rounded='lg'
						fallbackSrc='https://placehold.co/800x600?text=No+Image'
					/>
				</Box>

				<VStack align='start' spacing={5}>
					<Heading>{selectedGame.title}</Heading>

					<HStack spacing={3}>
						<Badge colorScheme='purple' fontSize='0.9em'>
							{selectedGame.platform}
						</Badge>
						<Badge colorScheme='green' fontSize='0.9em'>
							{selectedGame.genre}
						</Badge>
					</HStack>

					<Text fontSize='2xl' fontWeight='bold'>
						{formatPrice(selectedGame.price)}
					</Text>

					<Text>
						<Text as='span' fontWeight='bold'>
							Release Year:
						</Text>{" "}
						{selectedGame.releaseYear || "N/A"}
					</Text>

					<Text>
						<Text as='span' fontWeight='bold'>
							Stock:
						</Text>{" "}
						{selectedGame.stock ?? 0}
					</Text>

					<Text>
						<Text as='span' fontWeight='bold'>
							Description:
						</Text>
					</Text>

					<Text color='gray.300'>
						{selectedGame.description || "No description available."}
					</Text>

					<HStack pt={4}>
						<Button
							as={RouterLink}
							to={`/games/${selectedGame._id}/edit`}
							colorScheme='purple'
						>
							Edit
						</Button>

						<Button colorScheme='red' variant='outline' onClick={handleDelete}>
							Delete
						</Button>

						<Button as={RouterLink} to='/games' variant='ghost'>
							Back
						</Button>
					</HStack>
				</VStack>
			</SimpleGrid>
		</Container>
	);
};

export default GameDetailsPage;