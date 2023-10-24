const router = require("express").Router();
const User = require("../models/user.model");
const Friends = require("../models/friends.model");

/**
 * TO REGISTER A NEW USER
 * --------------------------------
 * Accepts the following details (as a JSON object):
 * userDetails: {
 * 	username: String,
 * 	password: String,
 * 	email: String
 * }
 */
router.route("/register").post((req, res) => {
	const userDetails = req.body.userDetails;
	const newUser = new User(userDetails);

	newUser
		.save()
		.then(() => res.status(201).json("User Added..."))
		.catch((err) => res.status(400).json("Error: " + err.message));
});

/**
 * TO LOGIN USER
 * --------------------------------
 * Accepts the following details (as a JSON object):
 * userCredentials: {
 * 	username: String,
 * 	password: String
 * }
 */
router.route("/login").post((req, res) => {
	const userCredentials = req.body.userCredentials;
	res.statusCode = 400;
	User.find()
		.then((users) => {
			users.map((user) => {
				if (
					user.username === userCredentials.username &&
					user.password === userCredentials.password
				) {
					res.status(200).json(user);
				}
			});
			if (!(res.statusCode === 200)) {
				res.status(400).json("User not found...");
			}
		})
		.catch((err) => res.status(400).json("Error: " + err.message));
});

/**
 * TO LIST FRIENDS OF USER
 * --------------------------------
 * Accepts the following details (as a JSON object):
 * userID: {
 *  player_id: ID of the user
 * }
 */
router.route("/list-friends").post((req, res) => {
	const player_id = req.body.userID.player_id;
	Friends.find().then((friends) => {
		let allFriends = [];
		friends.map((friend) => {
			if (
				(friend.player_id.equals(player_id) || friend.friend_id.equals(player_id)) &&
				!allFriends.includes(friend)
			) {
				allFriends.push(friend);
			}
		});
		User.find().then((users) => {
			let friendDetails = [];
			allFriends.forEach((friend) => {
				users.map((user) => {
					if (
						!user._id.equals(player_id) &&
						(user._id.equals(friend.friend_id) || user._id.equals(friend.player_id)) &&
						!friendDetails.includes(user)
					) {
						friendDetails.push(user);
					}
				});
			});
			if (friendDetails.length > 0) {
				res.status(200).json(friendDetails);
			} else {
				res.status(404).json("Error: " + err.message);
			}
		});
	});
});

/**
 * ADD A NEW FRIEND
 * --------------------------------
 * * Accepts the following details (as a JSON object):
 * userID: {
 *  player_id: ID of the user,
 *  friend_id: ID of the friend
 * }
 */
router.route("/add-friend").post((req, res) => {
	const userID = req.body.userID;
	if (userID.player_id === userID.friend_id) {
		res.status(400).json("Player and Friend cannot have same ID...");
	} else {
		const newFriend = new Friends(userID);

		newFriend
			.save()
			.then(() => res.status(201).json("Friend Added..."))
			.catch((err) => res.status(400).json("Error: " + err.message));
	}
});

/**
 * SEARCH FOR USERNAME
 * --------------------------------
 * userID: {
 * 	username: username entered by user
 * }
 */
router.route("/search-users").post((req, res) => {
	const enteredUsername = req.body.userID.username;
	const matchingUsers = [];
	User.find().then((users) => {
		users.map((user) => {
			const username = user.username.toLowerCase();
			if (username.includes(enteredUsername.toLowerCase())) {
				matchingUsers.push(user);
			}
		});
		if (matchingUsers.length > 0) {
			res.status(200).json(matchingUsers);
		} else {
			res.status(404).json("Error: " + err.message);
		}
	});
});

module.exports = router;
