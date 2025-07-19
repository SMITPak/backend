import jwt from "jsonwebtoken";

export const Middleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      res.status(401).send({ status: 401, message: err.message });
    }
  } else {
    res
      .status(401)
      .send({ status: 401, message: "You are not authorized user" });
  }
};
