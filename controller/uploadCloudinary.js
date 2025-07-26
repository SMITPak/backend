import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const cloudinaryUpload =
  (upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", public_id: "email" },
        (error, result) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ error: "Error uploading to Cloudinary" });
          }
          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      )
      .end(req.file.buffer); // Feed the file buffer into the Cloudinary upload stream
  });
