const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PuzzleSchema = new Schema(
	{
		fen: {
			type: String,
			required: true,
		},
		moves: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		theme: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Puzzles = mongoose.model("Puzzles", PuzzleSchema);

module.exports = Puzzles;
