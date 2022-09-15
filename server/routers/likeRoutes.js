const express = require("express");

const router = express.Router();

const likeController = require("../controllers/likeController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router.route("/getVideosAllLike").get(likeController.getVideosAllLike);

router
  .route("/")
  .get(protect, likeController.getAllLike)
  .post(protect, likeController.careteLike);

router
  .route("/:id")
  .get(likeController.getLike)
  .patch(protect, likeController.updateLike)
  .delete(likeController.deleteLike);
module.exports = router;
