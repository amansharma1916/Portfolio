import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: String,
      required: true,
      trim: true,
    },

    endDate: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    achievements: [
      {
        type: String,
        trim: true,
      },
    ],

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    displayOrder: {
      type: Number,
      default: 0,
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model(
  "Experience",
  experienceSchema
);

export default Experience;