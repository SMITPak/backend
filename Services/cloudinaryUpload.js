import cloudinary from "../config/cloudinary.js";

async function uploadImage(img) {
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
}

export default uploadImage;
