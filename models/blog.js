const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		clap: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema); // '("Blog")' is looking for the Blog collection

module.exports = Blog;
