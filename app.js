const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const allBlogs = [];

app.get("/", (req, res) => {
  res.render("home", { allBlogs: allBlogs });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.get("/posts/:title", (req, res) => {
  const title = req.params.title;

  allBlogs.forEach((blogs) => {
    if (lodash.lowerCase(blogs.title) === lodash.lowerCase(title)) {
      res.render("post", { title: blogs.title, body: blogs.body });
    }
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };

  allBlogs.push(post);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
