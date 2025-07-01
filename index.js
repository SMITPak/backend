import express from "express";
import cors from "cors";
import router from "./Routes/index.js";
import path from 'path'

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/images', express.static('images/'))

app.use(cors());

// app.use((req, res, next) => {
//   const { key } = req?.query;
//   if (key == 123) {
//     next();
//   }
//   else{
//     res.status(404).send({ status: 404,  message: 'You are not authorized user'})
//   }
// });

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
