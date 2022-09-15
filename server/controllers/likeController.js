const Like = require("../models/likeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");

exports.getLike = catchAsync(async (req, res, next) => {
  const videoid = req.params.video_id;

  const likes = await Like.find({ video: videoid });

  res.status(200).json({
    message: "success",
    likes,
  });
});

exports.careteLike = catchAsync(async (req, res, next) => {
  const videoid = req.body.video;
  const user = req.query._id;
  //const user = req.user;
  const likes = await Like.find({});
  const likesAll = await Like.find({ video: videoid });
  //console.log("likesAll", likesAll);

  // if (likesAll.length !== 0 ){
  //   return next(new AppError("Already Exist", 404));
  // }
  let users = [];

  likes.map((like) => {

    if (JSON.stringify(like.video[0]) === JSON.stringify(videoid)) {
      
      users = [...like.user, user];
      //return next(new AppError("No document found with that ID", 404))
    }
  })
  const like = await Like.create({
    count: req.body.count,
    video: videoid,
    user: users,
  });

  res.status(200).json({
    message: "success",
  });
});

exports.updateLike = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const videoID = req.params.id;
  const likes = await Like.findOne({ video: videoID });

  console.log(likes.user.includes(user));
  if(likes.user.includes(user)){
    return next(new AppError("Already Exist", 404));
  }
  req.params.id = likes._id;
  let count = likes.count + 1;
  let users = [];
  //likes.map((like) => {
    //console.log("like",like)
    if (JSON.stringify(likes.video[0]) === JSON.stringify(videoID)) {
      users = [...likes.user, user];
      // return res.status(200).json({
      //   message: "Already exist",
      // });
    }
  // });
  req.body = { count: count, user: users };

  const doc = await Like.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  console.log(doc);
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getVideosAllLike = catchAsync(async (req, res, next) => {
  const videoId = req.query.videoid;
  //console.log(videoId)
  const likes = await Like.find({ video: videoId }).populate("user");
  console.log(likes);
  res.status(200).json({
    message: "success",
    likes,
  });
});

exports.getAllLike = factory.getAll(Like);
//exports.careteLike = factory.createOne(Like);
//exports.getLike = factory.getOne(Like);
//exports.updateLike = factory.updateOne(Like);
exports.deleteLike = factory.deleteOne(Like);
