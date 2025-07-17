import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    expiresAt: {type: Date, required: true},
});

const otpToken = mongoose.model('otpToken', otpTokenSchema);
export default otpToken;