const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  count: {
    type: Number,
  },

  video: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Share",
    },
  ],
  user: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }],
});
// likeSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "Share",
//   });

//   next();
// });
likeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "User",
  });

  next();
});
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
