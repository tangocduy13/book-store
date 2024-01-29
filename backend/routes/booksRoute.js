import { Book } from "../models/bookModel.js";
import express from "express";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
        status: false,
      });
    }
    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).json({
      data: book,
      status: true,
    });
  } catch (e) {
    console.log(e);
  }
});
router.get("/", async (req, res) => {
  const books = await Book.find();
  return res.status(200).json({
    count: books.length,
    data: books,
    status: true,
  });
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      data: book,
      status: true,
    });
  } catch (e) {
    console.error(e);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
        status: false,
      });
    }
    await Book.findOneAndUpdate({ _id: id }, req.body);

    return res.status(200).json({
      status: true,
    });
  } catch (e) {
    console.error(e);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
    });
  } catch (e) {
    console.error(e);
  }
});

export default router;
