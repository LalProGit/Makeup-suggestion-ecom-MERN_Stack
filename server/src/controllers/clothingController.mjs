import Clothing from "../models/clothing.mjs";

// Add new clothing item (admin)
export const addClothing = async (req, res) => {
  try {
    const image = req.file?.path;
    if(!image) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    console.log("Image uploaded to Cloudinary:", image);
    console.log("Clothing data:", req.body);
    const clothing = await Clothing.create({ ...req.body, image });
    res.status(201).json({ message: "Clothing item added", clothing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all clothing items
export const getAllClothing = async (req, res) => {
  try {
    const clothes = await Clothing.find();
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single clothing item by ID
export const getClothingById = async (req, res) => {
  try {
    const item = await Clothing.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Clothing not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
