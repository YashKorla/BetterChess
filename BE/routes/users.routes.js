const router = require("express").Router();
const User = require("../models/user.model");

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
		.catch((err) => res.status(400).json("User Already Exists..."));
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
			if (!res.statusCode === 200) {
				res.status(400).json("User Not Found");
			}
		})
		.catch((err) => res.status(400).json("User Not Found"));
});

module.exports = router;
