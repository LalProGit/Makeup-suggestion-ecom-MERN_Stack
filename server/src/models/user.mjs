import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    skinTone: {
      type: String,
      enum: ['fair', 'light', 'medium', 'tan', 'deep'],
      default: 'medium',
    },
    lipColorPreference: {
      type: String,
      enum: ['nude', 'red', 'pink'],
      default: 'nude',
    },
    isVerified: {type: Boolean, default: false},
    address: {
      house: {type: String},  
      street: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    isAdmin: {type: Boolean, default: false},
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;