import Portfolio from "./portfolio.model.js";

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio data",
    });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: portfolio,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update portfolio",
    });
  }
};