const express = require("express");
const promotionsRouter = express.Router();

promotionsRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

promotionsRouter.get("/", (req, res) => {
  res.end("Will send all the promotions to you");
});

promotionsRouter.post("/", (req, res) => {
  res.end(
    `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
  );
});

promotionsRouter.put("/", (req, res) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /promotions");
});

promotionsRouter.delete("/", (req, res) => {
  res.end("Deleting all promotions");
});

//=========================================================================================

promotionsRouter.get("/:promotionId", (req, res) => {
  res.end(
    `Will send details of the promotion: ${req.params.promotionId} to you`
  );
});

promotionsRouter.post("/:promotionId", (req, res) => {
  res.statusCode = 403;
  res.end(
    `POST operation not supported on /promotions/${req.params.promotionId}`
  );
});

promotionsRouter.put("/:promotionId", (req, res) => {
  res.write(`Updating the promotion: ${req.params.promotionId}\n`);
  res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
});

promotionsRouter.delete("/:promotionId", (req, res) => {
  res.end(`Deleting promotion: ${req.params.promotionId}`);
});

module.exports = promotionsRouter;
