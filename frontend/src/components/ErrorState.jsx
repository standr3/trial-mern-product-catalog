import { Alert, AlertIcon, Container } from "@chakra-ui/react";

const ErrorState = ({ message = "Something went wrong" }) => {
	return (
		<Container maxW='container.md' py={8}>
			<Alert status='error' rounded='md'>
				<AlertIcon />
				{message}
			</Alert>
		</Container>
	);
};

export default ErrorState;