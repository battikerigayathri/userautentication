const passport=require("passport")
var User = require("../controllers/user.controller");
const router = require("express").Router();

// Registration route
router.post("/signup", function (req, res, next) {
  var newUser = new User; // TypeError: User is not a constructor
  User.name = req.body.name;
  User.password = req.body.password;

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
    } else {
      res.json({ message: "User registered successfully" });
    }
  });
});

// Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Profile route 
router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ username: req.user.username });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
