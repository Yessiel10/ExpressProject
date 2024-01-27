const express = require("express");
const Partner = require("../models/partner");
const authenticate = require("../authenticate");

const partnersRouter = express.Router();

partnersRouter
  .route("/")
  .get((req, res, next) => {
    Partner.find()
      .then((Partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Partner);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // Only Admin can modify
    Partner.create(req.body)
      .then((Partner) => {
        console.log("Partner Created ", Partner);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Partner);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Partner");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin, // Only Admin can modify
    (req, res, next) => {
      Partner.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

//=========================================================================================

partnersRouter
  .route("/:partnerId")
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then((Partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Partner);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // Only Admin can modify
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((Partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Partner);
      })
      .catch((err) => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin, // Only Admin can modify
    (req, res, next) => {
      Partner.findByIdAndDelete(req.params.partnerId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

module.exports = partnersRouter;
