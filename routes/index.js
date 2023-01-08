const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const userController = require("../controller/userController");
const tenantController = require("../controller/tenantController");
const upload = require("../utils/Multer");

/* GET home page. */
router.post("/register", userController.handleNewUser);
router.post("/login", userController.handleLogin);
router.get("/list", tenantController.list);
// router.post("/upload", verifyJWT, upload.single("file"), bookController.upload);

module.exports = router;
