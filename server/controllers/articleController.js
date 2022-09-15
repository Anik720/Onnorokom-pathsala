const Article = require("../models/articlesModel");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");


exports.getAllArticle = factory.getAll(Article);
exports.careteArticle = factory.createOne(Article);
exports.getArticle = factory.getOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);



