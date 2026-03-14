import { create } from "zustand";
import {
	getGames,
	getGameById,
	createGame,
	updateGame,
	deleteGame,
} from "../services/gameApi";

export const useGameStore = create((set) => ({
	games: [],
	selectedGame: null,
	loading: false,
	error: null,

	pagination: {
		totalGames: 0,
		totalPages: 1,
		currentPage: 1,
		limit: 9,
		hasNextPage: false,
		hasPrevPage: false,
	},

	filters: {
		search: "",
		platform: "",
		genre: "",
		sort: "",
		page: 1,
		limit: 9,
	},

	setFilters: (newFilters) =>
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
		})),

	resetFilters: () =>
		set({
			filters: {
				search: "",
				platform: "",
				genre: "",
				sort: "",
				page: 1,
				limit: 9,
			},
		}),

	fetchGames: async (customFilters = {}) => {
		set({ loading: true, error: null });

		try {
			const state = useGameStore.getState();
			const params = { ...state.filters, ...customFilters };

			const data = await getGames(params);

			set({
				games: data.data || [],
				pagination: data.pagination,
				filters: params,
				loading: false,
			});
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	fetchGameById: async (id) => {
		set({ loading: true, error: null, selectedGame: null });
		try {
			const data = await getGameById(id);
			set({ selectedGame: data.data, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	createGame: async (newGame) => {
		set({ loading: true, error: null });
		try {
			const data = await createGame(newGame);
			set({ loading: false });
			return { success: true, message: data.message || "Game created successfully" };
		} catch (error) {
			set({ error: error.message, loading: false });
			return { success: false, message: error.message };
		}
	},

	updateGame: async (id, updatedGame) => {
		set({ loading: true, error: null });
		try {
			const data = await updateGame(id, updatedGame);
			set((state) => ({
				games: state.games.map((game) =>
					game._id === id ? data.data : game
				),
				selectedGame: data.data,
				loading: false,
			}));
			return { success: true, message: "Game updated successfully" };
		} catch (error) {
			set({ error: error.message, loading: false });
			return { success: false, message: error.message };
		}
	},

	deleteGame: async (id) => {
		set({ loading: true, error: null });
		try {
			const data = await deleteGame(id);
			set((state) => ({
				games: state.games.filter((game) => game._id !== id),
				loading: false,
			}));
			return { success: true, message: data.message };
		} catch (error) {
			set({ error: error.message, loading: false });
			return { success: false, message: error.message };
		}
	},

	clearSelectedGame: () => set({ selectedGame: null }),
}));