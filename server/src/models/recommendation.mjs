import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    clothingColor: { type: String, 
      enum: ["black", "white", "red", "blue", "green", "off-white", "lavender", "sage"], 
      required: true 
    },
    skinTone: {
      type: String,
      required: true,
      enum: ['fair', 'light', 'medium', 'tan', 'deep'],
    },
    recommendedShades: [
      {
        type: String,
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
      ]
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Recommendation", recommendationSchema);
