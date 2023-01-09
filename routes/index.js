const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const userController = require("../controller/userController");
const tenantController = require("../controller/tenantController");
const landlordController = require("../controller/landlordController");
const upload = require("../utils/Multer");

/* GET home page. */
router.post("/register", userController.handleNewUser);
router.post("/tenant-login", tenantController.handleLogin);
router.post("/landlord-login", landlordController.handleLogin);
router.get("/listhouses", tenantController.list);
router.get("/listTenants", userController.listTenants);
router.get("/listLandlords", userController.listLandlords);
router.post(
  "/uploadhouse",
  verifyJWT,
  upload.single("file"),
  landlordController.upload
);

module.exports = router;
