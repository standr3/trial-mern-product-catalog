const BASE_URL = "/api/games";

const handleResponse = async (res) => {
	const contentType = res.headers.get("content-type");

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
	}

	if (!contentType || !contentType.includes("application/json")) {
		throw new Error("Server did not return JSON");
	}

	return res.json();
};

export const getGames = async (params = {}) => {
	const query = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			query.append(key, value);
		}
	});

	const res = await fetch(`${BASE_URL}?${query.toString()}`);
	return handleResponse(res);
};

export const getGameById = async (id) => {
	const res = await fetch(`${BASE_URL}/${id}`);
	return handleResponse(res);
};

export const createGame = async (game) => {
	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(game),
	});
	return handleResponse(res);
};

export const updateGame = async (id, game) => {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(game),
	});
	return handleResponse(res);
};

export const deleteGame = async (id) => {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: "DELETE",
	});
	return handleResponse(res);
};