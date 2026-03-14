import { useEffect, useState } from "react";
import { Container, Heading, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import GameForm from "../components/GameForm";
import { useGameStore } from "../store/game";
import { validateGame } from "../utils/validateGame";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

const EditGamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    selectedGame,
    loading,
    error,
    fetchGameById,
    updateGame,
    clearSelectedGame,
  } = useGameStore();

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

  useEffect(() => {
    fetchGameById(id);

    return () => {
      clearSelectedGame();
    };
  }, [id, fetchGameById, clearSelectedGame]);

  useEffect(() => {
    if (selectedGame) {
      setFormData({
        title: selectedGame.title || "",
        price: selectedGame.price ?? "",
        platform: selectedGame.platform || "",
        genre: selectedGame.genre || "",
        image: selectedGame.image || "",
        releaseYear: selectedGame.releaseYear ?? "",
        stock: selectedGame.stock ?? "",
        description: selectedGame.description || "",
      });
    }
  }, [selectedGame]);

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

    const { success, message } = await updateGame(id, payload);

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

    navigate(`/games/${id}`);
  };

  if (loading && !selectedGame) {
    return <LoadingSpinner />;
  }

  if (error && !selectedGame) {
    return <ErrorState message={error} />;
  }

  return (
    <Container maxW='container.md' py={8}>
      <Heading mb={6}>Edit Game</Heading>

      <GameForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={loading}
        submitLabel='Update Game'
      />
    </Container>
  );
};

export default EditGamePage;