const express = require("express");
const Admin = require("../controllers/admin.controller");
const router = express.Router();

router.post("/signUp", Admin.register);
router.post("/loginPage", Admin.login);

module.exports = router;
