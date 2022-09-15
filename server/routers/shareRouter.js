const express = require("express");

const router = express.Router();

const shareController = require("../controllers/shareController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router.route("/getAllShareByLoggedinUser").get(protect, shareController.getAllShareByLoggedinUser)

router
  .route("/")
  .get(shareController.getAllShare)
  .post(protect, shareController.careteShare);

router
  .route("/:id")
  .get(shareController.getShare)
  .patch(shareController.updateShare)
  .delete(shareController.deleteShare);
module.exports = router;
