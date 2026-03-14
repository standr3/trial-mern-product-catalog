import { Box, Button, Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
	return (
		<Box borderBottom='1px solid' borderColor='whiteAlpha.200' py={4}>
			<Container maxW='container.xl'>
				<Flex justify='space-between' align='center'>
					<Heading size='md' as={RouterLink} to='/games'>
						GameVault
					</Heading>

					<HStack spacing={3}>
						<Button as={RouterLink} to='/games' variant='ghost'>
							Catalog
						</Button>
						<Button as={RouterLink} to='/games/new' colorScheme='purple'>
							Add Game
						</Button>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;