import { useEffect } from "react";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useGameStore } from "../store/game";
import GameFilters from "../components/GameFilters";
import GameGrid from "../components/GameGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";

const HomePage = () => {
	const {
		games,
		loading,
		error,
		fetchGames,
		filters,
		setFilters,
		resetFilters,
		pagination,
	} = useGameStore();

	useEffect(() => {
		fetchGames();
	}, []);

	const handleSearchChange = (value) => {
		setFilters({ search: value, page: 1 });
	};

	const handlePlatformChange = (value) => {
		setFilters({ platform: value, page: 1 });
	};

	const handleGenreChange = (value) => {
		setFilters({ genre: value, page: 1 });
	};

	const handleSortChange = (value) => {
		setFilters({ sort: value, page: 1 });
	};

	const handleResetFilters = async () => {
		resetFilters();
		const store = useGameStore.getState();
		await store.fetchGames({
			search: "",
			platform: "",
			genre: "",
			sort: "",
			page: 1,
			limit: 9,
		});
	};

	const handlePageChange = async (newPage) => {
		await fetchGames({ ...filters, page: newPage });
	};

	const handleApplyFilters = async () => {
		await fetchGames(filters);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			fetchGames(filters);
		}, 300);

		return () => clearTimeout(timeout);
	}, [filters.search, filters.platform, filters.genre, filters.sort]);

	return (
		<Container maxW='container.xl' py={8}>
			<VStack align='stretch' spacing={6}>
				<Heading>Gaming Store</Heading>

				<Text color='gray.400'>
					Browse, filter and manage your game catalog.
				</Text>

				<GameFilters
					searchTerm={filters.search}
					setSearchTerm={handleSearchChange}
					selectedPlatform={filters.platform}
					setSelectedPlatform={handlePlatformChange}
					selectedGenre={filters.genre}
					setSelectedGenre={handleGenreChange}
					sortBy={filters.sort}
					setSortBy={handleSortChange}
					onReset={handleResetFilters}
					onApply={handleApplyFilters}
				/>

				{loading && <LoadingSpinner />}

				{!loading && error && <ErrorState message={error} />}

				{!loading && !error && games.length === 0 && (
					<EmptyState
						title='No games found'
						description='Try changing your filters or add a new game.'
						showButton
					/>
				)}

				{!loading && !error && games.length > 0 && (
					<>
						<Text color='gray.400'>
							Showing {games.length} games out of {pagination.totalGames}
						</Text>

						<GameGrid games={games} />

						<PaginationControls
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
							onPageChange={handlePageChange}
						/>
					</>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;