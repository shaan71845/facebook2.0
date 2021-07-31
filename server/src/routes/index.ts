import { Application } from "express";
import authRoutes from "./auth.route";
import postRoutes from "./post.route";

const routes = (app: Application) => {
  app.use("/auth/", authRoutes);

  app.use("/posts/", postRoutes);
};

export default routes;
