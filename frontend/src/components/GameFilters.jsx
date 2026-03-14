import {
	Button,
	HStack,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	GENRE_OPTIONS,
	PLATFORM_OPTIONS,
	SORT_OPTIONS,
} from "../constants/gameOptions";

const FilterMenu = ({ label, value, options, onChange }) => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
				variant='outline'
				w='full'
				textAlign='left'
				fontWeight='normal'
			>
				{value || label}
			</MenuButton>

			<MenuList bg='surface.100' borderColor='whiteAlpha.200'>
				<MenuItem
					color='white'
					bg='transparent'
					_hover={{ bg: "whiteAlpha.100" }}
					onClick={() => onChange("")}
				>
					{label}
				</MenuItem>

				{options.map((option) => {
					const optionValue = typeof option === "string" ? option : option.value;
					const optionLabel = typeof option === "string" ? option : option.label;

					return (
						<MenuItem
							key={optionValue}
							color='white'
							bg='transparent'
							_hover={{ bg: "whiteAlpha.100" }}
							onClick={() => onChange(optionValue)}
						>
							{optionLabel}
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
};

const GameFilters = ({
	searchTerm,
	setSearchTerm,
	selectedPlatform,
	setSelectedPlatform,
	selectedGenre,
	setSelectedGenre,
	sortBy,
	setSortBy,
	onReset,
}) => {
	const selectedSortLabel =
		SORT_OPTIONS.find((option) => option.value === sortBy)?.label || "";

	return (
		<VStack spacing={4} align='stretch' mb={8}>
			<Input
				placeholder='Search by title...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<HStack spacing={4} align='stretch' flexDir={{ base: "column", md: "row" }}>
				<FilterMenu
					label='All Platforms'
					value={selectedPlatform}
					options={PLATFORM_OPTIONS}
					onChange={setSelectedPlatform}
				/>

				<FilterMenu
					label='All Genres'
					value={selectedGenre}
					options={GENRE_OPTIONS}
					onChange={setSelectedGenre}
				/>

				<FilterMenu
					label='Sort By'
					value={selectedSortLabel}
					options={SORT_OPTIONS}
					onChange={setSortBy}
				/>

				<Button onClick={onReset} variant='outline'>
					Reset
				</Button>
			</HStack>
		</VStack>
	);
};

export default GameFilters;