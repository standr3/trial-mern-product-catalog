import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { PLATFORM_OPTIONS, GENRE_OPTIONS } from "../constants/gameOptions";

const GameForm = ({ formData, setFormData, onSubmit, isLoading, submitLabel }) => {
	return (
		<VStack spacing={4} as='form' onSubmit={onSubmit}>
			<FormControl isRequired>
				<FormLabel>Title</FormLabel>
				<Input
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Price</FormLabel>
				<Input
					type='number'
					value={formData.price}
					onChange={(e) => setFormData({ ...formData, price: e.target.value })}
				/>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Platform</FormLabel>
				<Select
					placeholder='Select platform'
					value={formData.platform}
					onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
				>
					{PLATFORM_OPTIONS.map((platform) => (
						<option key={platform} value={platform}>
							{platform}
						</option>
					))}
				</Select>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Genre</FormLabel>
				<Select
					placeholder='Select genre'
					value={formData.genre}
					onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
				>
					{GENRE_OPTIONS.map((genre) => (
						<option key={genre} value={genre}>
							{genre}
						</option>
					))}
				</Select>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Image URL</FormLabel>
				<Input
					value={formData.image}
					onChange={(e) => setFormData({ ...formData, image: e.target.value })}
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Release Year</FormLabel>
				<Input
					type='number'
					value={formData.releaseYear}
					onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Stock</FormLabel>
				<Input
					type='number'
					value={formData.stock}
					onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Description</FormLabel>
				<Textarea
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
				/>
			</FormControl>

			<Button type='submit' colorScheme='purple' width='full' isLoading={isLoading}>
				{submitLabel}
			</Button>
		</VStack>
	);
};

export default GameForm;