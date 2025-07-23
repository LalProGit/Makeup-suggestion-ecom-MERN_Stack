import User from "../models/user.mjs";
import otpToken from "../models/otpToken.mjs";
import generateToken from "../utils/generateToken.mjs";
import generateOtp from "../utils/generateOtp.mjs";

export const registerUser = async (req,res) => {
    const {name, email, password, phone, skinTone, lipColorPrefrence} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: "User already exists"});

        await generateOtp(email);

        res.status(200).json({message: "Otp sent to email, Verify to create acount"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const verifyOtpAndCreateUser = async (req,res) => {
    const {name, email, password, phone, skinTone, lipColorPreference, otp} = req.body;

    try{
        const otpRecord = await otpToken.findOne({email});
        if(!otpRecord || otpRecord.otp!==otp ||otpRecord.expiresAt < new Date()) {
            return res.status(500).json({message: "Invaild or Expired OTP"});
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            skinTone,
            lipColorPreference,
            isVerified: true,
        })

        await otpToken.deleteMany({email});

        res.status(201).json({
            message: 'User registered sucessfully',
            user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            skinTone: user.skinTone,
            lipColorPreference: user.lipColorPreference,
            token: generateToken(user._id),
            }});
        
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const loginUser = async (req,res) => {
    const {email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(!userExists || !(await userExists.matchPassword(password))){
            return res.status(400).json({message: "Invalid email or password"});
        }

        res.status(201).json({
            message: "Login Sucessfull",
            user: {
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                token: generateToken(userExists._id)
            }
        });
    }catch(err){
        res.status(500).json({message: err.message})
    }

}

export const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        await generateOtp(email);
        res.status(200).json({message: "Otp sent to email"});
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try{
        const otpRecord = await otpToken.findOne({email});
        console.log(otpRecord);
        if(!otpRecord || otpRecord.otp!==otp ||otpRecord.expiresAt < new Date()) {
            return res.status(500).json({message: "Invaild or Expired OTP"});
        }
        const user =  await User.findOne({ email});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.password = newPassword;
        await user.save();
        await otpToken.deleteMany({ email});
        res.status(200).json({message: "Password reset successfully"});


    }catch (error) {
        res.status(500).json({message: error.message});
    }
}