const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// express app
const app = express();
app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);
const dbURI = process.env.DBURI;
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => app.listen(3000))
	.catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
