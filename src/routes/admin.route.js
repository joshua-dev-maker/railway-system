const express = require("express");
const Admin = require("../controllers/admin.controller");
const router = express.Router();

router.post("/signUp", Admin.register);
// router.post("/verifyemail", Admin.verifyEmail);
router.post("/loginPage", Admin.login);
// router.post("/forgetPasswordLink", Admin.forgetPasswordLink);
// router.post("/resetPassword", Admin.resetPassword);
// router.post("/updatePassword", Admin.updatePassword);

module.exports = router;
