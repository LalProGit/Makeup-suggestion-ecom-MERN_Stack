import User from "../models/user.mjs";
import otpToken from "../models/otpToken.mjs";
import generateToken from "../utils/generateToken.mjs";
import sendEmail from "../utils/sendEmail.mjs";

export const registerUser = async (req,res) => {
    const {name, email, password, phone, skinTone, lipColorPrefrence} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: "User already exists"});

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await otpToken.create({email, otp, expiresAt});
        await sendEmail(email, "Verify your account", `Your otp is ${otp}`);

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
        if(!userExists || !userExists.matchPassword(password)){
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