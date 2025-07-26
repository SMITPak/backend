import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: "dpj4v5ovy",
  api_key: "884244821759248",
  api_secret: process.env.Cloudinary_Secret, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary