const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: [true, "Please give a video link!"],
    },
    like: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

shareSchema.virtual("likes", {
  ref: "Like",
  foreignField: "video",
  localField: "_id",
});
shareSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });

  next();
});
const Share = mongoose.model("Share", shareSchema);

module.exports = Share;
