import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./database/db.js";
import portfolioRoutes from "./portfolio/portfolio.routes.js";
import experienceRoutes from "./experience/experience.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
  {origin: process.env.CLIENT_URL },
));
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/experience", experienceRoutes);

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