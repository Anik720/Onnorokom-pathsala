const Share = require("../models/shareModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");

exports.careteShare = catchAsync(async (req, res, next) => {
  const user = req.user;
  console.log("user",user);
  const share = await Share.create({
    link: req.body.link,
    user: req.user._id,
  });
  res.status(200).json({
    message: "success",
  });
});

exports.getAllShare = catchAsync(async (req, res, next) => {
  const share = await Share.find({}).populate({ path: "likes" });
  res.status(200).json({
    message: "success",
    share,
  });
});
exports.getAllShareByLoggedinUser = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  let arr=[]
  arr.push(user)
  const share = await Share.find({} );

 let videos= share.filter(x=>{
  console.log(x)
    return JSON.stringify(x.user._id)===JSON.stringify(user) 
  })
console.log(videos)
  res.status(200).json({
    message: "success",
    videos,
  });
});

// exports.getShare=catchAsync(async(req,res,next)=>{

// })
//exports.getAllShare = factory.getAll(Share);
//exports.careteShare = factory.createOne(Share);
exports.getShare = factory.getOne(Share, { path: "likes" });
exports.updateShare = factory.updateOne(Share);
exports.deleteShare = factory.deleteOne(Share);
