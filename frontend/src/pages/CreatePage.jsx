import { useState } from "react";
import { Container, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GameForm from "../components/GameForm";
import { useGameStore } from "../store/game";
import { validateGame } from "../utils/validateGame";

const CreatePage = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { createGame, loading } = useGameStore();

	const [formData, setFormData] = useState({
		title: "",
		price: "",
		platform: "",
		genre: "",
		image: "",
		releaseYear: "",
		stock: "",
		description: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationError = validateGame(formData);
		if (validationError) {
			toast({
				title: "Validation error",
				description: validationError,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		const payload = {
			...formData,
			price: Number(formData.price),
			releaseYear: formData.releaseYear ? Number(formData.releaseYear) : undefined,
			stock: formData.stock ? Number(formData.stock) : 0,
		};

		const { success, message } = await createGame(payload);

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

	return (
		<Container maxW='container.md' py={8}>
			<Heading mb={6}>Add New Game</Heading>

			<GameForm
				formData={formData}
				setFormData={setFormData}
				onSubmit={handleSubmit}
				isLoading={loading}
				submitLabel='Create Game'
			/>
		</Container>
	);
};

export default CreatePage;