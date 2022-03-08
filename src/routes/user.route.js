const express = require("express");
const User = require("../controllers/user.controller");
const { authorize, allowAdmin } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/registeredUser", authorize, allowAdmin, User.registeredUsers);

module.exports = router;
