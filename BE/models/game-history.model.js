/**
 * player id
 * opp_id
 * result
 * pgn
 * variant
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameHistorySchema = new Schema({
	player_id: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: true,
	},
	opponent_id: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: true,
	},
	result: {
		type: Number,
		required: true,
	},
	pgn: {
		type: String,
		required: true,
	},
	variant: {
		type: String,
		required: true,
	},
});

const GameHistory = mongoose.model("GameHistory", GameHistorySchema);

module.exports = GameHistory;
