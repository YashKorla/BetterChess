const router = require("express").Router();
const Puzzles = require("../models/puzzles.model");

/**
 * GET Puzzle
 * --------------------------------
 * Accepts the following details (as a JSON object):
 * puzzle_rating: {
 *  rating: XXX
 * }
 */
router.route("/get-puzzle").post((req, res) => {
	const rating = req.body.puzzle_rating.rating;
	const start = Boolean(req.body.puzzle_rating.start);

	if (start) {
		Puzzles.find({ rating: { $gte: rating - 50, $lte: rating + 50 } })
			.count()
			.then((count) => {
				const random = Math.floor(Math.random() * count);
				Puzzles.find({
					rating: { $gte: rating - 50, $lte: rating + 50 },
				})
					.limit(3)
					.skip(random)
					.then((results) => {
						let result_object = [];
						results.map((result) => {
							result_object.push({
								fen: result.fen,
								moves: result.moves,
								rating: result.rating,
							});
							console.log(result_object);
						});
						res.status(200).send(result_object);
					})
					.catch((err) => {
						res.status(400).json(err.message);
					});
			})
			.catch((err) => res.status(400).json("Error: " + err.message));
	} else {
		Puzzles.find({ rating: { $gte: rating - 50, $lte: rating + 50 } })
			.count()
			.then((count) => {
				const random = Math.floor(Math.random() * count);
				Puzzles.findOne({ rating: { $gte: rating - 50, $lte: rating + 50 } })
					.skip(random)
					.then((result) => {
						const result_object = {
							fen: result.fen,
							moves: result.moves,
							rating: result.rating,
						};
						console.log(result_object);
						res.status(200).json(result_object);
					})
					.catch((err) => res.status(400).json("Error: " + err.message));
			})
			.catch((err) => res.status(400).json("Error: " + err.message));
	}
});

module.exports = router;
