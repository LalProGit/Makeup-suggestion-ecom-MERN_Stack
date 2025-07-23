import otpToken from "../models/otpToken.mjs";
import sendEmail from "../utils/sendEmail.mjs";

const generateOtp = async (email) => {
    const existingOtp = await otpToken.findOne({ email});
    if (existingOtp) {
        await otpToken.deleteMany({email});
    }
    const otp = Math.floor(100000 + Math.random()* 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await otpToken.create({email, otp, expiresAt});
    await sendEmail(email, "Verify your account", `your otp is ${otp}`);
}

export default generateOtp;