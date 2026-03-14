import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		platform: {
			type: String,
			required: true,
			trim: true,
		},
		genre: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
			trim: true,
		},
		releaseYear: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			default: 0,
			min: 0,
		},
		description: {
			type: String,
			default: "",
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

gameSchema.index(
	{ title: 1, releaseYear: 1, platform: 1 },
	{ unique: true }
);

export const Game = mongoose.model("Game", gameSchema);