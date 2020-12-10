const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});
module.exports = mongoose.model("FoodItems", PostSchema);
