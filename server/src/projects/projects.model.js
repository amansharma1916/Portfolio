import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    github: {
      type: String,
      default: "",
      trim: true,
    },

    liveDemo: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto Increment ID
projectSchema.pre("validate", async function () {
  if (!this.isNew || this.id != null) return;

  const lastProject = await this.constructor
    .findOne()
    .sort({ id: -1 });

  this.id = lastProject ? lastProject.id + 1 : 1;
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
