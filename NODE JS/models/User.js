const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	orderedItems: {
		type: Array,
		required: false,
	},
	ip: {
		type: String,
		required: false,
	},
	systeminfo: {
		type: Object,
		required: false,
	},
	messages: {
		type: Array,
		required: false,
	},
});
module.exports = mongoose.model("Users", PostSchema);
