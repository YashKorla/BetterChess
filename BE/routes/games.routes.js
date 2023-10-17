const router = require("express").Router();
const GameHistory = require("../models/game-history.model");

/**
 * TO GET GAME HISTORY OF A USER
 * --------------------------------
 * Accepts the following details (as a JSON object):
 * userID: {
 *  player_id: ID of the user
 * }
 */
router.route("/game-history").post((req, res) => {
	const playerID = req.body.userID.player_id;
	allGames = GameHistory.find()
		.then((games) => {
			const playerGames = [];
			games.map((game) => {
				if (game.player_id.equals(playerID) || game.opponent_id.equals(playerID)) {
					playerGames.push(game);
				}
			});
			if (playerGames.length > 0) {
				res.status(200).json(playerGames);
			} else {
				res.status(404).json("There are no games available...");
			}
		})
		.catch((err) => res.status(404).json("There are no games available..."));
});

/**
 * TO ADD A NEW GAME
 * --------------------------------
 * Accepts the following details (as a JSON object):
 * gameDetails: {
 *  player_id: ID of the player,
 *  opponent_id: ID of the opponent,
 *  result: Number,
 *  pgn: String,
 *  variant: Name of the variant
 * }
 */
router.route("/add-game").post((req, res) => {
	const gameDetails = req.body.gameDetails;
	const game = new GameHistory(gameDetails);

	game.save()
		.then(() => res.status(201).json("Game Added..."))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
