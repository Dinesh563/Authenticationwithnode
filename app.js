//jshint esversion:6
require("dotenv").config();
const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");
const encryption=require("mongoose-encryption");


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology:true});

const Schema=new mongoose.Schema({
  email:String,
  password:String
});
 var secretkey=process.env.SECRETKEY;
Schema.plugin(encryption,{secret:secretkey,encryptedFields:["password"]});

const User=new mongoose.model("user",Schema);



app.get("/",function (req,res) {
  res.render("home");
});

app.get("/register",function (req,res) {
  res.render("register");
});

app.get("/login",function (req,res) {
  res.render("login");
});


app.post("/register",function (req,res) {
const newuser=new User({
  email:req.body.username,
  password:req.body.password
});
newuser.save(function(err){
  if(err)
  console.log(err);
  else {
    res.render("secrets")
  }
});
});



app.post("/login",function (req,res) {
  User.findOne({username:req.body.username},function(err,founduser){
    if(err)
    console.log(err);
    else {
      if(founduser){
        if(founduser.password=== req.body.password);
        res.render("secrets");
      }
    }
  });

});













app.listen(3000,function (req,res) {
console.log("Successfullly connected on port 3000");
}
);
