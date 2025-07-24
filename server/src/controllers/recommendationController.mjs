import Recommendation from "../models/recommendation.mjs";
import Clothing from "../models/clothing.mjs";
import Makeup from "../models/makeup.mjs";

// 🔍 Get makeup recommendations for a clothing item
export const getRecommendations = async (req, res) => {
  try {
    const clothingId = req.params.clothingId;
    const clothing = await Clothing.findById(clothingId);

    if (!clothing) {
      return res.status(404).json({ message: "Clothing not found" });
    }

    const clothingColor = clothing.color.toLowerCase();
    const skinTone = req.user?.skinTone || "medium"; // fallback if not present

    const recommendation = await Recommendation.findOne({
      clothingColor,
      skinTone,
    });

    if (!recommendation) {
      return res.status(200).json({
        message: "No specific recommendation found",
        recommendations: [],
      });
    }

    // Fetch matching makeup products
    const matchingMakeup = await Makeup.find({
      shade: { $in: recommendation.recommendedShades },
    });
    console.log("Matching Makeup Products:", matchingMakeup);

    res.status(200).json({ recommendations: matchingMakeup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ Admin: Add new recommendation rule
export const addRecommendation = async (req, res) => {
  const { clothingColor, skinTone, recommendedShades } = req.body;

  try {
    const exists = await Recommendation.findOne({ clothingColor, skinTone });
    if (exists) {
      return res.status(400).json({ message: "Recommendation already exists for this color + skin tone" });
    }

    const newEntry = await Recommendation.create({
      clothingColor,
      skinTone,
      recommendedShades,
    });

    res.status(201).json({
      message: "Recommendation rule added",
      data: newEntry,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



