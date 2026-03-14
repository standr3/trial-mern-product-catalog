export const validateGame = (game) => {
	if (!game.title?.trim()) {
		return "Title is required";
	}

	if (game.price === "" || game.price === undefined || game.price === null) {
		return "Price is required";
	}

	if (Number.isNaN(Number(game.price))) {
		return "Price must be a valid number";
	}

	if (Number(game.price) < 0) {
		return "Price must be greater than or equal to 0";
	}

	if (!game.platform?.trim()) {
		return "Platform is required";
	}

	if (!game.genre?.trim()) {
		return "Genre is required";
	}

	if (!game.image?.trim()) {
		return "Image URL is required";
	}

	if (
		game.releaseYear !== "" &&
		game.releaseYear !== undefined &&
		game.releaseYear !== null
	) {
		const year = Number(game.releaseYear);

		if (Number.isNaN(year)) {
			return "Release year must be a valid number";
		}

		if (year < 1970 || year > new Date().getFullYear() + 2) {
			return "Release year is not valid";
		}
	}

	if (game.stock !== "" && game.stock !== undefined && game.stock !== null) {
		const stock = Number(game.stock);

		if (Number.isNaN(stock)) {
			return "Stock must be a valid number";
		}

		if (stock < 0) {
			return "Stock cannot be negative";
		}
	}

	if (game.description && game.description.length > 500) {
		return "Description must be under 500 characters";
	}

	return null;
};