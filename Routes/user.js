import express from "express";
import multer from "multer";
import fs from "fs-extra";
import bcrypt from "bcrypt";
import User from "../Schema/user.js";
import { GenerateToken } from "../Services/genearteTokens.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send({ msg: "file uploaded..." });
});

router.delete("/delete-image", (req, res) => {
  const { fileName } = req.body;
  const fg = fs.removeSync(`./images/${fileName}`);
  res.send({ msg: "File deleted successfully..." });
});

router.get("/", (req, res) => {
  try {
    return res.status(200).send({ status: 200, users });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password });
    await user.save();
    return res
      .status(200)
      .send({ status: 200, message: "user added successfully" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).then((res) => res?.toObject());
    if (!user) {
      return res.status(404).send({ status: 404, message: "user not found" });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(401).send({ status: 401, message: "Invalid password" });
    }
    delete user.password;
    var token = await GenerateToken(user._id, user.email)

    return res.status(200).send({ status: 200, user, ...token });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((v) => v.id == Number(id));
  try {
    if (index != -1) {
      users.splice(index, 1);
      return res.send({ status: 200, message: "Data deleted succesfully" });
    }
    return res.send({ status: 404, error: "Data not found" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.put("/update/:id", (req, res) => {
  const index = users.findIndex((v) => v.id == Number(req.params.id));
  if (index != -1) {
    users.splice(index, 1, { id: req.params.id, ...req.body });
    return res.send({ status: 200, message: "Data updated succesfully" });
  }
  return res.send({ status: 404, error: "Data not found" });
});

export default router;
