const express = require("express");
const partnersRouter = express.Router();

partnersRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

partnersRouter.get("/", (req, res) => {
  res.end("Will send all the partners to you");
});

partnersRouter.post("/", (req, res) => {
  res.end(
    `Will add the partner: ${req.body.name} with description: ${req.body.description}`
  );
});

partnersRouter.put("/", (req, res) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /partners");
});

partnersRouter.delete("/", (req, res) => {
  res.end("Deleting all partners");
});

//=========================================================================================

partnersRouter.get("/:partnersId", (req, res) => {
  res.end(`Will send details of the partner: ${req.params.partnersId} to you`);
});

partnersRouter.post("/:partnersId", (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /partners/${req.params.partnersId}`);
});

partnersRouter.put("/:partnersId", (req, res) => {
  res.write(`Updating the partner: ${req.params.partnersId}\n`);
  res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
});

partnersRouter.delete("/:partnersId", (req, res) => {
  res.end(`Deleting partner: ${req.params.partnersId}`);
});

module.exports = partnersRouter;
