const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const userController = require("../controller/userController");
const tenantController = require("../controller/tenantController");
const landlordController = require("../controller/landlordController");
const adminController = require("../controller/adminController");
const upload = require("../utils/Multer");
const { authenticateToken } = require("../auth/authenticateToken");

/* GET home page. */
router.get("/", userController.documentation);
router.post("/register", userController.handleNewUser);
router.post("/admin-login", adminController.handleLogin);
router.post("/tenant-login", tenantController.handleLogin);
router.post("/landlord-login", landlordController.handleLogin);
router.get("/listhouses", tenantController.list);
router.get("/listTenants", authenticateToken, adminController.listTenants);
router.get("/listLandlords", authenticateToken, adminController.listLandlords);
router.get("/listAdmins", authenticateToken, adminController.listAdmins);
router.post(
  "/uploadhouse",
  verifyJWT,
  upload.single("file"),
  landlordController.upload
);

module.exports = router;
