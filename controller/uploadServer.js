import multer from "multer";
import fs from "fs-extra";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploadServer =
  (upload.single("image"),
  (req, res, next) => {
    res.send({ msg: "file uploaded..." });
  });

export const deleteImage = (req, res) => {
  const { fileName } = req.body;
  const fg = fs.removeSync(`./images/${fileName}`);
  res.send({ msg: "File deleted successfully..." });
};
