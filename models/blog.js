const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

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

blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", blogSchema); // '("Blog")' is looking for the Blog collection

module.exports = Blog;
