import mongoose from "mongoose";

const makeupProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["lipstick", "foundation", "eyeshadow", "blush", "concealer"],
      required: true,
    },
    shade: {
      type: String,
      required: true,
      enum: [
        // Lipstick shades
        "nude", "crimson", "rose", "plum", "coral",

        // Foundation shades
        "ivory", "beige", "sand", "tan", "espresso",

        // Eyeshadow shades
        "champagne", "bronze", "copper", "charcoal", "olive",

        // Blush shades
        "peach", "pink", "mauve", "berry", "terracotta",

        // Concealer shades
        "light", "neutral", "medium", "warm", "deep",
      ],
    },
    suitableForClothingColors: [{ type: String }], 
    countInStock: { type: Number, default: 0 },
    tags: [{ type: String }], // e.g., ["matte", "waterproof"]
  },
  { timestamps: true }
);

const Makeup = mongoose.model('Makeup', makeupProductSchema);
export default Makeup;
