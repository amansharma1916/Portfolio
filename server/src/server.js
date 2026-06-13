import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./database/db.js";
import portfolioRoutes from "./portfolio/portfolio.routes.js";
import experienceRoutes from "./experience/experience.routes.js";
import projectRoutes from "./projects/projects.routes.js";
import contactRoutes from "./contact/contact.routes.js";
import authRoutes from "./admin/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
  {origin: process.env.CLIENT_URL },
));
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", authRoutes);
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio CMS API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`.yellow.bold
  );
});