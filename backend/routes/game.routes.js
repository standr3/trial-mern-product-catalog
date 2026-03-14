import express from "express";
import {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/", getGames);          // GET /api/games
router.get("/:id", getGame);        // GET /api/games/:id
router.post("/", createGame);       // POST /api/games
router.put("/:id", updateGame);     // PUT /api/games/:id
router.delete("/:id", deleteGame);  // DELETE /api/games/:id

export default router;