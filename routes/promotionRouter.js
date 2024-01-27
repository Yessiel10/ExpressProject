const express = require("express");
const Promotion = require("../models/promotion");
const authenticate = require("../authenticate");

const promotionsRouter = express.Router();

promotionsRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find()
      .then((Promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // Only Admin can modify
    Promotion.create(req.body)
      .then((Promotion) => {
        console.log("Promotion Created ", Promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Promotion);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Promotion");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin, // Only Admin can modify
    (req, res, next) => {
      Promotion.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

//=========================================================================================

promotionsRouter
  .route("/:PromotionsId")
  .get((req, res, next) => {
    Promotion.findById(req.params.PromotionsId)
      .then((Promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /Promotions/${req.params.PromotionId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // Only Admin can modify
    Promotion.findByIdAndUpdate(
      req.params.PromotionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((Promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Promotion);
      })
      .catch((err) => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin, // Only Admin can modify
    (req, res, next) => {
      Promotion.findByIdAndDelete(req.params.PromotionId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

module.exports = promotionsRouter;
