const express = require("express");

const router = express.Router();
const Item = require("../models/Item");
//Retrive all data
router.get("/", async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err) {
		res.json({ message: err });
	}
});
router.post("/", async (req, res) => {
	const item = new Item({
		name: req.body.name,
		price: req.body.price,
	});
	try {
		const savedPost = await item.save();
		console.log(savedPost);
		res.json(savedPost);
	} catch (err) {
		res.json({ message: err });
	}
});
module.exports = router;
