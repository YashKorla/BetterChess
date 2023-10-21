const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
	player_id: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: true,
	},
	friend_id: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: true,
	},
});

const Friends = mongoose.model("Friend", FriendsSchema);

module.exports = Friends;
