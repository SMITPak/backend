import Token from "../model/refreshToken.js";
import { convertToSeconds } from "./convertToSec.js";
import jwt from "jsonwebtoken";

export const GenerateToken = async(id, email) => {
  const accessToken = jwt.sign({ email, id }, process.env.JWT_SECRET);

  const refreshToken = jwt.sign({ email, id }, process.env.JWT_REFRESH_SECRET);

  const expiryAccessToken = Math.floor(
    Date.now() / 1000 + convertToSeconds("2h")
  );

  const expiryRefreshToken = Math.floor(
    Date.now() / 1000 + convertToSeconds("7d")
  );

  const token = new Token({
    userId: id,
    refreshToken,
    expiry: new Date(expiryRefreshToken * 1000),
  });

  await token.save()
  
  return {
    accessToken,
    refreshToken,
    expiryAccessToken,
    expiryRefreshToken
  }
};
