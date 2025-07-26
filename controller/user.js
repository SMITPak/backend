import User from "../Model/user.js";
import bcrypt from "bcrypt";
import { GenerateToken } from "../Services/genearteTokens.js";

export const signup = async (req, res) => {
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
};

export const login = async (req, res) => {
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
    var token = await GenerateToken(user._id, user.email);

    return res.status(200).send({ status: 200, user, ...token });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ status: 404, message: "user not found" });
    }
    const otp = GenarteOtp();
    await User.findByIdAndUpdate(user._id, { otp });
    await transporter.sendMail({
      from: "smitwebandapp@gmail.com",
      to: email,
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: `<b>OTP: ${otp}</b>`, // HTML body
    });
    return res
      .status(200)
      .send({ status: 200, message: `email send to ${email}` });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const bcryptPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { otp },
      {
        password: bcryptPassword,
        otp: null,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: 200, message: `Password change succesfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: 500, message: err.message });
  }
};
