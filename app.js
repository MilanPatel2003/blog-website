const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const { default: mongoose } = require("mongoose");
const app = express();

async function main(){
    try{
        db = await mongoose.connect("mongodb+srv://milanpatel6454:Greedygamer007@allmightymongo.cbeekum.mongodb.net/blogDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to database server...");
} catch(err){
    console.log("failed to connect to the database");
}
}
main();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const blogSchema = new mongoose.Schema({
  title:String,
  body:String
});

const blog = mongoose.model("blog",blogSchema);


app.get("/", (req, res) => {

  blog.find({}).then(function (allBlogs) {
    res.render("home", { blogs: allBlogs});
    })


  // res.render("home", { allBlogs: allBlogs });


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
app.get("/posts/:blogid", (req, res) => {
  // const title = req.params.title;
  // allBlogs.forEach((blogs) => {
  //   if (lodash.lowerCase(blogs.title) === lodash.lowerCase(title)) {
  //     res.render("post", { title: blogs.title, body: blogs.body });
  //   }
  // });
  const currentBlogId = lodash.slice(req.params.blogid,1).join('');
  console.log(currentBlogId);

  blog.find({_id:currentBlogId}).then(function (foundBlog) {
    res.render("post",{currentBlog:foundBlog})
    })
  
});

app.post("/compose", (req, res) => {
  const post =new blog( {
    title: req.body.postTitle,
    body: req.body.postBody,
  });

  post.save().then(function () { 
    res.redirect("/");
    console.log("blog inserted in db");
   })
  
  
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
