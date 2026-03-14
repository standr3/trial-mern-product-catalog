import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<Container maxW="container.md" py={20}>
			<VStack spacing={6} textAlign="center">
				<Heading size="2xl">404</Heading>

				<Heading size="md">Page Not Found</Heading>

				<Text color="gray.400">
					The page you are looking for does not exist or has been moved.
				</Text>

				<Button
					as={RouterLink}
					to="/games"
					colorScheme="purple"
					size="lg"
				>
					Back to Catalog
				</Button>
			</VStack>
		</Container>
	);
};

export default NotFoundPage;