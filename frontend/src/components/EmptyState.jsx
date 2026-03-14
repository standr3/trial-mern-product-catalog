import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const EmptyState = ({
	title = "No games found",
	description = "Start by adding your first game to the catalog.",
	showButton = true,
}) => {
	return (
		<Container maxW='container.md' py={10}>
			<VStack spacing={4}>
				<Heading size='md'>{title}</Heading>
				<Text color='gray.400' textAlign='center'>
					{description}
				</Text>

				{showButton && (
					<Button as={RouterLink} to='/games/new' colorScheme='purple'>
						Add Game
					</Button>
				)}
			</VStack>
		</Container>
	);
};

export default EmptyState;