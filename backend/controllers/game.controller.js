import mongoose from "mongoose";
import { Game } from "../models/game.model.js";

// GET /api/games
export const getGames = async (req, res) => {
	try {
		const page = Math.max(parseInt(req.query.page) || 1, 1);
		const limit = Math.max(parseInt(req.query.limit) || 9, 1);
		const skip = (page - 1) * limit;

		const search = req.query.search || "";
		const platform = req.query.platform || "";
		const genre = req.query.genre || "";
		const sort = req.query.sort || "";

		const query = {};

		if (search) {
			query.title = { $regex: search, $options: "i" };
		}

		if (platform) {
			query.platform = platform;
		}

		if (genre) {
			query.genre = genre;
		}

		let sortOption = { createdAt: -1 };

		switch (sort) {
			case "price_asc":
				sortOption = { price: 1 };
				break;
			case "price_desc":
				sortOption = { price: -1 };
				break;
			case "year_asc":
				sortOption = { releaseYear: 1 };
				break;
			case "year_desc":
				sortOption = { releaseYear: -1 };
				break;
			case "title_asc":
				sortOption = { title: 1 };
				break;
			default:
				break;
		}

		const totalGames = await Game.countDocuments(query);
		const totalPages = Math.ceil(totalGames / limit);

		const games = await Game.find(query)
			.sort(sortOption)
			.skip(skip)
			.limit(limit);

		res.status(200).json({
			success: true,
			data: games,
			pagination: {
				totalGames,
				totalPages,
				currentPage: page,
				limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
		});
	} catch (error) {
		console.error("Error in fetching games:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// GET /api/games/:id
export const getGame = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Game Id" });
	}

	try {
		const game = await Game.findById(id);

		if (!game) {
			return res.status(404).json({ success: false, message: "Game not found" });
		}

		res.status(200).json({ success: true, data: game });
	} catch (error) {
		console.error("Error in fetching game:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// POST /api/games
export const createGame = async (req, res) => {
	const game = req.body;

	if (
		!game.title?.trim() ||
		game.price === undefined ||
		!game.platform?.trim() ||
		!game.genre?.trim() ||
		!game.image?.trim() ||
		game.releaseYear === undefined
	) {
		return res.status(400).json({
			success: false,
			message: "Please provide all required fields",
		});
	}

	try {
		const existingGame = await Game.findOne({
			title: game.title.trim(),
			releaseYear: Number(game.releaseYear),
			platform: game.platform.trim(),
		});

		if (existingGame) {
			return res.status(409).json({
				success: false,
				message: "This game already exists for the selected platform and year",
			});
		}

		const newGame = new Game({
			...game,
			title: game.title.trim(),
			platform: game.platform.trim(),
			genre: game.genre.trim(),
			image: game.image.trim(),
			releaseYear: Number(game.releaseYear),
			price: Number(game.price),
			stock: game.stock !== undefined ? Number(game.stock) : 0,
		});

		await newGame.save();

		return res.status(201).json({
			success: true,
			data: newGame,
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({
				success: false,
				message: "This game already exists for the selected platform and year",
			});
		}

		console.error("Error in create game:", error.message);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// PUT /api/games/:id
export const updateGame = async (req, res) => {
	const { id } = req.params;
	const game = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Game Id" });
	}

	try {
		const duplicateGame = await Game.findOne({
			_id: { $ne: id },
			title: game.title?.trim(),
			releaseYear: Number(game.releaseYear),
			platform: game.platform?.trim(),
		});

		if (duplicateGame) {
			return res.status(409).json({
				success: false,
				message: "Another game with the same title, year and platform already exists",
			});
		}

		const updatedGame = await Game.findByIdAndUpdate(
			id,
			{
				...game,
				title: game.title?.trim(),
				platform: game.platform?.trim(),
				genre: game.genre?.trim(),
				image: game.image?.trim(),
				releaseYear:
					game.releaseYear !== undefined ? Number(game.releaseYear) : undefined,
				price: game.price !== undefined ? Number(game.price) : undefined,
				stock: game.stock !== undefined ? Number(game.stock) : undefined,
			},
			{ new: true, runValidators: true }
		);

		if (!updatedGame) {
			return res.status(404).json({
				success: false,
				message: "Game not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: updatedGame,
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({
				success: false,
				message: "Another game with the same title, year and platform already exists",
			});
		}

		console.error("Error in updating game:", error.message);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// DELETE /api/games/:id
export const deleteGame = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Game Id" });
	}

	try {
		const deletedGame = await Game.findByIdAndDelete(id);

		if (!deletedGame) {
			return res.status(404).json({ success: false, message: "Game not found" });
		}

		res.status(200).json({ success: true, message: "Game deleted" });
	} catch (error) {
		console.error("Error in deleting game:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};