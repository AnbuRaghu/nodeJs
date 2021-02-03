// express is used to create the rest api based application.
// 1. rest api : is mainly used to provide the communication over the
// cross platforms
// here we can share the data by utilizing the proper resource @ client's end.
// to do this now do we need to create the server?
// so that our clients can communicate with ur server or not?

// 1st we need to create the express server ?
const express = require("express");
//
const app = express();
// we create the server

// apply body-parser
const bodyParser = require("body-parser");

//mongoose
const mongoose = require("mongoose");

const db = require("./config/dbConfig").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));
// will connect to mongodb
// do we need the connection details for monogodb ?
// based on this connection details we can connect to mongodb using
// can we have config.js ==> to hold our application config details.
// mongoose

//passport specification
const passport = require("passport");

// the above code can be done as below as well
//const passportfun=require('./config/passport')
//passportfun(passport)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // it will convert all ur req body contents to json object implicitly.

const users = require("./api/users");
const profile = require("./api/profile");
const posts = require("./api/posts");
// do we need a port for communication?
const port = 5000;
app.listen(port, () => {
  console.log(`application is working with port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// devconnector

// users ==> login register
// users.js
// profile ==> all exp and edu details
// profile.js
// post ==>
// post.js

// comments
// comments.js

// 1st we need to load the express module and then we will create the
// instance.

// then we need to start the server over the specific port?
// we can consume the api using postman or in ur client application.
