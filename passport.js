const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport=require("passport")
const app = express();

mongoose.connect("mongodb://localhost:27017/userautentication")
    .then(() => {
        console.log("Database Connected Successfully");
    }).catch((error) => {
        console.log("Failed to connect db");
    })
app.use(express.json());
// parsing the application
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
passport.use("/user", userRoutes);

const port = 5000;
app.listen(port, () => {
    console.log("Server is listening on port ", port);
})
