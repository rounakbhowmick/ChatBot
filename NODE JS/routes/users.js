const express = require("express");

const router = express.Router();
const User = require("../models/User");

//Retrive all data

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		// const users = await User.find({}, { orderedItems: { price: 300 } });
		// const users = await User.find({ "orderedItems.orderid": "OD7W6WR" });
		// const users = await User.find({ "orderedItems.orderId": "OD7W6WR" });
		// const users = await User.find({}, { orderedItems: 1 });
		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		phonenumber: req.body.phonenumber,
		address: req.body.address,
		orderedItems: req.body.orderedItems,
		ip: req.body.ip,
		systeminfo: req.body.systeminfo,
		messages: req.body.messages,
	});
	try {
		console.log(user);
		const savedPost = await user.save();
		console.log(savedPost);
		res.json(savedPost);
	} catch (err) {
		res.json({ message: err });
	}
});
router.get("/:email", async (req, res) => {
	try {
		const email = req.params.email;
		const user = await User.findOne({ email: email });
		res.json(user);
	} catch (err) {
		res.json({ message: err });
	}
});
router.get("/orderid/:orderid", async (req, res) => {
	try {
		console.log("Order /orderid/:orderid");
		const id = req.params.orderid;
		console.log(id);
		const users = await User.find({ "orderedItems.orderid": id });

		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});
router.patch("/:email", async (req, res, next) => {
	try {
		const email = req.params.email;
		let updates = req.body;
		//console.log(updates.)
		if (Object.keys(updates) == "messages") {
			console.log(updates);
			const findone = await User.findOne({ email: email });
			// console.log(findone.orderedItems[0].orderid);
			findone.messages.push(updates.messages);
			findone.save();
		} else if (Object.keys(updates) == "orderedItems") {
			console.log("came");
			console.log(updates);
			const findone = await User.findOne({ email: email });
			findone.orderedItems.push(updates.orderedItems);
			findone.save();
		} else {
			const result = await User.findOneAndUpdate({ email: email }, updates);
		}
		res.send({ success: "Completed" });
	} catch (error) {
		console.log(res.json(error));
	}
});

module.exports = router;
