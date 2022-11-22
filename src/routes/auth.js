const express = require("express");
const User = require("../controllers/auth");
const { authorize, allowAdmin } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/signup", User.signup);
router.post("/verifyemail", User.verifyEmail);
router.post("/login", User.login);
router.patch("/changepassword", authorize, User.ChangePassword);
router.post("/password-url", User.forgotPasswordUrl);
router.post("/forgotpassword", User.forgotPassword);
// router.get("/registeredUser", authorize, allowAdmin, User.registeredUsers);

module.exports = router;
