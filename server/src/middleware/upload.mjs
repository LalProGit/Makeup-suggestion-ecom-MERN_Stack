import { storage } from "../utils/cloudinary.mjs";
import multer from "multer";

export const uploadClothingImage = multer({ storage: storage('ecom/clothing')});
export const uploadMakeupImage = multer({ storage: storage('ecom/makeup')});
