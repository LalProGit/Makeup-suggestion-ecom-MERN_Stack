import Makeup from "../models/makeup.mjs";

// Add new makeup product (admin)
export const addMakeupProduct = async (req, res) => {
  try {
    const image = req.file?.path;
    if (!image) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    const makeup = await Makeup.create({ ...req.body, image });
    res.status(201).json({ message: "Makeup product added", makeup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all makeup products
export const getAllMakeupProducts = async (req, res) => {
  try {
    const products = await Makeup.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single makeup product by ID
export const getMakeupProductById = async (req, res) => {
  try {
    const product = await Makeup.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
