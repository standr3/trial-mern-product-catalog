import { Center, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
	return (
		<Center py={10}>
			<Spinner size='xl' />
		</Center>
	);
};

export default LoadingSpinner;