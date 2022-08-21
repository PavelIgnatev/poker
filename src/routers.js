const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const api = require("./controllers/api");

// routes for /api
const apiRouter = new express.Router();

apiRouter.get("/tour", api.getTournaments);
apiRouter.get("/info", api.getFormingAbility2);
apiRouter.get("/state", api.getAbility2);

apiRouter.route("/settings").get(api.getPreviewRules).post(api.postSettings);

apiRouter
  .route("/config")
  .get(api.config.get)
  .post(api.config.post)
  .patch(api.config.patch)
  .delete(api.config.delete);

apiRouter
  .route("/rules")
  .get(api.rules.get)
  .post(api.rules.post)
  .patch(api.rules.patch)
  .delete(api.rules.delete);

apiRouter.route("/sample").get(api.sample.get).post(api.sample.post);
apiRouter.route("/offpeak").get(api.offpeak.get).post(api.offpeak.post);
apiRouter.get("/aliases", api.aliases.get);
apiRouter.post("/password/admin", api.postAdminPassword);

// routes for /
const mainRouter = new express.Router();

if (process.env.NODE_ENV === "production") {
  mainRouter.use(express.static("client/build"));
  mainRouter.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
} else {
  mainRouter.use(
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    }),
  );
}

exports.apiRouter = apiRouter;
exports.mainRouter = mainRouter;
