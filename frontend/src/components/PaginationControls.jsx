import { Button, HStack, Text } from "@chakra-ui/react";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<HStack justify='center' spacing={4} mt={8}>
			<Button
				variant='outline'
				onClick={() => onPageChange(currentPage - 1)}
				isDisabled={currentPage === 1}
			>
				Previous
			</Button>

			<Text>
				Page {currentPage} of {totalPages}
			</Text>

			<Button
				variant='outline'
				onClick={() => onPageChange(currentPage + 1)}
				isDisabled={currentPage === totalPages}
			>
				Next
			</Button>
		</HStack>
	);
};

export default PaginationControls;