import Experience from "./experience.model.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(
      req.params.id
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experience",
    });
  }
};

export const createExperience = async (req, res) => {
  try {
    const experience =
      await Experience.create(req.body);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create experience",
    });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience =
      await Experience.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience =
      await Experience.findByIdAndDelete(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};