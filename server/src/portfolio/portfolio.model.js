import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    navbar: {
      logoText: {
        type: String,
        required: true,
        trim: true,
      },
    },

    sidebar: {
      github: {
        type: String,
        default: "",
        trim: true,
      },
      linkedin: {
        type: String,
        default: "",
        trim: true,
      },
      leetcode: {
        type: String,
        default: "",
        trim: true,
      },
    },

    hero: {
      introText: {
        type: String,
        required: true,
        trim: true,
      },

      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      profileImage: {
        type: String,
        default: "",
      },

      buttons: {
        type: [buttonSchema],
        validate: {
          validator: (buttons) => buttons.length === 2,
          message: "Hero section must have exactly 2 buttons",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;