import express from 'express'
import { users } from '../constant/data.js';

const router = express.Router();

router.get("/", (req, res) => {
  try {
    return res.status(200).send({ status: 200, users });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.post("/", (req, res) => {
  users.push({ id: users.length + 1, ...req.body });
  return res.send({ status: 200, message: "Data added succesfully" });
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