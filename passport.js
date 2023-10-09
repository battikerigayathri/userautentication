const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser=require("body-parser")
const session = require("express-session");
const app = express();

mongoose.connect("mongodb://localhost:27017/userautentication")
    .then(() => {
        console.log("Database Connected Successfully");
    }).catch((error) => {
        console.log("Failed to connect db");
    })
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parsing the application
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const userRoutes = require("./src/router/user.routes");
app.use("/user", userRoutes);

const port = 5000;
app.listen(port, () => {
    console.log("Server is listening on port ", port);
})
