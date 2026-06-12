import express from "express";
import protect from "../middle/auth.middleware.js";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "./projects.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", protect, addProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;