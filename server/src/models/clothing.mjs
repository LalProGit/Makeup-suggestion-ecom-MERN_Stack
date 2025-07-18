import mongoose from 'mongoose';

const clothingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }, 
    image: { type: String, required: true }, 
    brand: { type: String },
    price: { type: Number, required: true },
    color: { type: String, 
      enum: ["black", "white", "red", "blue", "green", "off-white", "lavender", "sage"], 
      required: true 
    },
    type: {
      type: String,
      enum: ["top", "bottom", "dress", "jacket", "saree", "gown"],
      required: true,
    },
    size: [{
      type: String, 
      enum: ["XS", "S", "M", "L", "XL"],
    }],
    countInStock: { type: Number, default: 0 },
    tags: [{ type: String }], 
  },
  { timestamps: true }
);

const Clothing = mongoose.model("Clothing", clothingSchema);

export default Clothing;
