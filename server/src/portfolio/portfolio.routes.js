import express from "express";
import protect from "../middle/auth.middleware.js";
import {
  getPortfolio,
  updatePortfolio,
} from "./portfolio.controller.js";

const router = express.Router();

router.get("/", getPortfolio);
router.put("/", updatePortfolio, protect);

export default router;