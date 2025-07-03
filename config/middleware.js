export const Middleware = () => {
  app.use((req, res, next) => {
    const { key } = req?.query;
    if (key == 123) {
      next();
    } else {
      res
        .status(404)
        .send({ status: 404, message: "You are not authorized user" });
    }
  });
};
