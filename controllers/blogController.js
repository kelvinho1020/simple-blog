const Blog = require("../models/blog");

const blog_index = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const options = {
			page: req.query.page || 1,
			limit: req.query.limit || 10,
			sort: { createdAt: -1 },
		};
		// const result = await Blog.find().sort({ createdAt: -1 }).skip();
		const result = await Blog.paginate({}, options);
		// res.json(result);

		res.render("index", {
			title: "All Blogs",
			blogs: result.docs,
			result
		});
	} catch (err) {
		console.log(err);
	}
};

const blog_details = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then(result => res.render("details", { blog: result, title: "Blog Details" }))
		.catch(err => console.log(err));
};

const blog_create_get = (req, res) => {
	res.render("create", { title: "Create a Blog" });
};

const blog_create_post = (req, res) => {
	const blog = new Blog(req.body);

	blog
		.save()
		.then(result => {
			res.redirect("/blogs");
		})
		.catch(err => console.log(err));
};

const blog_update_clap = (req, res) => {
	const id = req.params.id;
	const blog = Blog.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	}).catch(err => console.log(err));
	res.end();
};

const blog_delete = (req, res) => {
	const id = req.params.id;
	
	Blog.findByIdAndDelete(id)
		.then(result => res.json({ redirect: `/blogs` }))
		.catch(err => console.log(err));
};

module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	blog_update_clap,
	blog_delete,
};
