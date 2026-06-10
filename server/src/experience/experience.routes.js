import express from "express";
import protect from "../middle/auth.middleware.js";
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "./experience.controller.js";

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);

router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

export default router;